import * as ts from "typescript";
import * as path from "path";
import * as fs from "fs";


type AccessModifier = "private" | "protected" | "public";

type Parameter = {
    name: string;
    type: string;
}
type Property = Parameter & {
    access: AccessModifier;
}
type Method = {
    access: AccessModifier;
    name: string;
    types: {
        parameters?: Parameter[],
        type: string;
    }[];
}
type Constructor = {
    access: AccessModifier;
    parameters?: Parameter[]
};
type Class = {
    fileName: string;
    name: string;
    constructors?: Constructor[],
    properties?: Property[]
    methods?: Method[],
    staticMethods?: Method[]
}

/** True if this is visible outside this file, false otherwise */
function isNodeExported(node: ts.Node): boolean {
    return (
        (ts.getCombinedModifierFlags(node as ts.Declaration) & ts.ModifierFlags.Export) !== 0 ||
        (!!node.parent && node.parent.kind === ts.SyntaxKind.SourceFile)
    );
}
function ArrayFrom<A>(it: ts.Iterator<A>): A[] {
    let arr = [] as A[];
    let cur: ReturnType<ts.Iterator<A>["next"]>;
    while (!(cur = it.next()).done)
        arr.push(cur.value as A);
    return arr;
}

function generateMD(c: Class): string {
    let md = "";
    md +=
`---
title: ${c.name}
description: Description needed
---


## Overview
*Overview needed*

---


## Constructor

### \`${c.name}\`
#### \`${(c.constructors && c.constructors[0] ? c.constructors[0].access : "public")}\`
${c.constructors.map(cc => (
`#### \`new ${c.name}(${cc.parameters.map((p,i) => `${p.name}: ${p.type}`).join(", ")})\`
*Description needed*
`
)).join("")}
---


## Properties

${c.properties.filter(p => p.access === "public").length === 0 ?
    `*No public accessible properties on ${c.name}*\n` : ""}
${c.properties.map(p => (
`### \`${p.name}: ${p.type}\`
#### \`${p.access}\`
*Description needed*

`)).join("")}---


## Methods

${c.methods.map(m => (
`### \`${m.name}()\`
#### \`${m.access}\`
${m.types.map(mt => (
`#### \`${m.name}${mt.type}\`
*Description needed*
`)).join("")}
`)).join("")}---


## Static Methods

${c.staticMethods.length === 0 ?
    `*No static methods on ${c.name}*\n` : ""}
${c.staticMethods.map(m => (
`### \`${m.name}()\`
#### \`${m.access}\`
${m.types.map(mt => (
`#### \`${m.name}${mt.type}\`
*Description needed*
`)).join("")}
`)).join("")}---
`
    return md;
}

function findCommonPath(files: string[]): string {
    const splitFiles = files.map(f => f.split("/"));
    for (let i = 0; i < splitFiles[0].length; i++) {
        for (const splits of splitFiles) {
            if (splits[i] !== splitFiles[0][i]) // If not match the 1st one, then not common, return
                return splits.slice(0, i).join("/");
        }
    }
    return files[0]; // All files are the same
}

function getUniquePaths(files: string[]): string[] {
    const common = findCommonPath(files);
    return files.map(f => f.split(common)[1]);
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames: string[], outPath: string, options: ts.CompilerOptions): void {
    const program = ts.createProgram(fileNames, options);
    const classes: Class[] = [];
    const checker = program.getTypeChecker();

    for (const sourceFile of program.getSourceFiles()) {
        if (sourceFile.isDeclarationFile)
            continue;
        ts.forEachChild(sourceFile, (n) => {
            const c = getClass(n);
            if (c)
                classes.push(c);
        });
    }

    // Create output dir if it doesn't exist
    if (!fs.existsSync(path.resolve(outPath)))
        fs.mkdirSync(path.resolve(outPath), { recursive: true });

    const names = classes.map(c => c.fileName);
    const uniqueNames = getUniquePaths(names);

    for (let i = 0; i < classes.length; i++) {
        const c = classes[i];
        const name = uniqueNames[i].slice(1); // Remove leading '/'
        const split = name.split("/");
        const fileName = split[split.length-1];
        const dir = split.slice(0, split.length-1).join("/");

        // Dir if it doesn't exist
        if (!fs.existsSync(path.resolve(outPath, dir)))
            fs.mkdirSync(path.resolve(outPath, dir), { recursive: true });

        const md = generateMD(c);
        fs.writeFileSync(path.resolve(outPath, dir, fileName.slice(0, fileName.length-3)+".md"), md);
    }

    return;


    function getAccessModifier(n: ts.Declaration): AccessModifier {
        if (!n || !n.modifiers)
            return "public";
        if (n.modifiers.find(m => m.kind === ts.SyntaxKind.PublicKeyword))
            return "public";
        if (n.modifiers.find(m => m.kind === ts.SyntaxKind.ProtectedKeyword))
            return "protected";
        if (n.modifiers.find(m => m.kind === ts.SyntaxKind.PrivateKeyword))
            return "private";
        return "public"; // Default modifier
    }

    function getParameter(s: ts.Symbol): Parameter {
        return {
            name: s.getName(),
            type: checker.typeToString(checker.getTypeOfSymbolAtLocation(s, s.valueDeclaration))
        };
    }
    function getConstructors(s: ts.Symbol): Constructor[] {
        const cs = checker.getTypeOfSymbolAtLocation(s, s.valueDeclaration).getConstructSignatures();
        return cs.map(c => ({
            access: getAccessModifier(c.getDeclaration()),
            parameters: c.parameters.map(getParameter),
        }));
    }
    function getProperties(s: ts.Symbol): Property[] {
        const ps = ArrayFrom(s.members.values());
        return ps
            .filter(v => (v.valueDeclaration?.kind === ts.SyntaxKind.PropertyDeclaration))
            .map(v => ({
                access: getAccessModifier(v.valueDeclaration),
                name: v.getName(),
                type: checker.typeToString(checker.getTypeOfSymbolAtLocation(v, v.valueDeclaration))
            }));
    }
    function getMethods(s: ts.Symbol): Method[] {
        const ms = ArrayFrom(s.members.values())
            .filter(m => (m.valueDeclaration?.kind === ts.SyntaxKind.MethodDeclaration));
        return ms.map(m => {
            const type = checker.typeToString(checker.getTypeOfSymbolAtLocation(m, m.valueDeclaration));
            const types = (type.startsWith("{") ? type.split("{")[1].split("}")[0].split(";").map(t => t.trim()).filter(t => !!t) : [type]);
            return {
                access: getAccessModifier(m.valueDeclaration),
                name: m.getName(),
                types: types.map(t => ({ type: t }))
            };
        });
    }
    function getStaticMethods(s: ts.Symbol): Method[] {
        const ms = checker.getTypeOfSymbolAtLocation(s, s.valueDeclaration).getProperties().filter(m => m.name !== "prototype");
        return ms.map(m => ({
            access: getAccessModifier(m.valueDeclaration),
            name: m.name,
            types: [{
                type: checker.typeToString(checker.getTypeOfSymbolAtLocation(m, m.valueDeclaration))
            }]
        }));
    }

    /** visit nodes finding exported classes */
    function getClass(node: ts.Node): Class {
        // Only consider exported nodes
        if (!isNodeExported(node) || !ts.isClassDeclaration(node))
            return;

        const s = checker.getSymbolAtLocation(node.name);
        return {
            fileName: node.getSourceFile().fileName,
            name: s.getName(),
            constructors: getConstructors(s),
            properties: getProperties(s),
            methods: getMethods(s),
            staticMethods: getStaticMethods(s)
        }
    }
}

function getAllFiles(p: string): string[] {
    const dir = fs.readdirSync(path.resolve(p), { withFileTypes: true });
    if (!dir || dir.length === 0)
        return [];
    let files = [];
    for (const f of dir) {
        if (f.isDirectory())
            files = [...files, ...getAllFiles(path.resolve(p, f.name))];
        else
            files = [...files, path.resolve(p, f.name)];
    }
    return files;
}


generateDocumentation(getAllFiles("src/app/digital"), "build/tmp/docs", {
    target: ts.ScriptTarget.ES5,
    module: ts.ModuleKind.ESNext,
    lib: [
        "dom",
        "dom.iterable",
        "esnext"
    ]
});

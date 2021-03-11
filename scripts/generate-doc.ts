import * as ts from "typescript";
import * as path from "path";


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
description: *Description needed*
---


## Overview
*Overview needed*

---


## Constructor

### \`${c.name}\`
${c.constructors.map(cc => (
`#### \`new ${c.name}(${cc.parameters.map((p,i) => `${i>1?", ":""}${p.name}: ${p.type}`)})\`
*Description needed*
`
)).join("")}
---


## Properties

${c.properties.map(p => (
`### \`${p.name}: ${p.type}\`
*Description needed*

`)).join("")}---


## Methods

${c.methods.map(m => (
`### \`${m.name}()\`
${m.types.map(mt => (
`#### \`${m.name}${mt.type}\`
*Description needed*
`)).join("")}
`)).join("")}---


## Static Methods

${c.staticMethods.map(m => (
`### \`${m.name}()\`
${m.types.map(mt => (
`#### \`${m.name}${mt.type}\`
*Description needed*
`)).join("")}
`)).join("")}---
`
  return md;
}

/** Generate documentation for all classes in a set of .ts files */
function generateDocumentation(fileNames: string[], options: ts.CompilerOptions): void {
  const program = ts.createProgram(fileNames, options);
  const classes: Class[] = [];
  const checker = program.getTypeChecker();

  program.getSourceFiles().forEach(s => console.log(s.fileName))

  // for (const sourceFile of program.getSourceFiles()) {
  //   if (sourceFile.isDeclarationFile)
  //     continue;
  //   ts.forEachChild(sourceFile, (n) => {
  //     const c = getClass(n);
  //     if (c)
  //       classes.push(c);
  //   });
  // }
  //
  // for (const c of classes) {
  //   const md = generateMD(c);
  //   console.log(md);
  // }

  // print out the doc
  // fs.writeFileSync("classes.json", JSON.stringify(output, undefined, 4));
  // console.log(util.inspect(classes, false, null, true));

  return;


  function getAccessModifier(n: ts.Declaration): AccessModifier {
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
      name: s.getName(),
      constructors: getConstructors(s),
      properties: getProperties(s),
      methods: getMethods(s),
      staticMethods: getStaticMethods(s)
    }
  }
}

generateDocumentation([path.resolve("src/app/core/utils/math/BezierCurve.ts")], {
  target: ts.ScriptTarget.ES5,
  module: ts.ModuleKind.CommonJS
});

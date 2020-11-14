import {IOObject} from "core/models/IOObject";
import {DigitalComponent} from "digital/models/index";
import {DigitalObjectSet} from "digital/utils/ComponentUtils";
import {InputPort} from "digital/models/ports/InputPort";
import {OutputPort} from "digital/models/ports/OutputPort";
import {ANDGate} from "digital/models/ioobjects/gates/ANDGate";
import {ORGate} from "digital/models/ioobjects/gates/ORGate";
import {NOTGate} from "digital/models/ioobjects/gates/BUFGate";
import {XORGate} from "digital/models/ioobjects/gates/XORGate";


/* Notes for connecting components
    const designer = new DigitalCircuitDesigner(0);
    const a = new Switch(), b = new Switch(), o = new LED(), and_gate = new ANDGate();
    const w1 = new DigitalWire(a.getOutputPort(0), and_gate.getInputPort(0));
    const w2 = new DigitalWire(b.getOutputPort(0), and_gate.getInputPort(1));
    const w3 = new DigitalWire(and_gate.getOutputPort(0), o.getInputPort(0));

    a.getOutputPort(0).connect(w1);
    and_gate.getInputPort(0).connect(w1);

    b.getOutputPort(0).connect(w2);
    and_gate.getInputPort(1).connect(w2);

    and_gate.getOutputPort(0).connect(w3);
    o.getInputPort(0).connect(w3);

    let objectSet = new DigitalObjectSet([a, b, o, and_gate, w1, w2, w3]);
*/

//inputList[i] will need to be connected to outputList[i]
interface ExpressionToCircuitReturn {
    components: DigitalObjectSet;
    inputList: InputPort[];
    outputList: OutputPort[];
}

interface ReturnValue {
    circuit: IOObject[];
    retIndex: number;
    recentPort: OutputPort;
    inputList: InputPort[];
    outputList: OutputPort[];
}

function GenerateTokens(input: string): Array<string> | null {
    const tokenList = new Array<string>();
    let buffer = "";
    let c: string;

    for(let i = 0; i < input.length; i++) {
        c = input[i];
        switch(c) {
        case " ":
            if(buffer.length > 0) {
                tokenList.push(buffer);
                buffer = "";
            }
            break;
        case "(":
        case ")":
        case "&":
        case "^":
        case "|":
        case "!":
            if(buffer.length > 0) {
                tokenList.push(buffer);
                buffer = "";
            }
            tokenList.push(c);
            break;
        default:
            buffer += c;
            break;
        }
    }

    if(buffer.length > 0) {
        tokenList.push(buffer);
    }

    return tokenList;
}

function Parse(tokens: Array<string>, index: number, inputs: Map<string, DigitalComponent>,
               currentOperator: string): ReturnValue | null {

    if(currentOperator == "|" || currentOperator == "^" || currentOperator == "&") {
        let nextOperator: string;

        switch(currentOperator) {
        case "|":
            nextOperator = "^";
            break;
        case "^":
            nextOperator = "&";
            break;
        case "&":
            nextOperator = "!";
            break;
        }

        const leftRet = Parse(tokens, index, inputs, nextOperator);
        index = leftRet.retIndex;
        if(index >= tokens.length || tokens[index] != currentOperator) {
            return leftRet;
        }
        index += 1;
        if(index >= tokens.length) {
            throw new Error("Missing Right Operand: " + currentOperator);
        }

        const leftCircuit = leftRet.circuit;
        const leftPort = leftRet.recentPort;
        const rightRet = Parse(tokens, index, inputs, currentOperator);
        const rightCircuit = rightRet.circuit;
        index = rightRet.retIndex;
        const rightPort = rightRet.recentPort;

        let newGate: DigitalComponent;
        switch(currentOperator) {
        case "&":
            newGate = new ANDGate();
            break;
        case "^":
            newGate = new XORGate();
            break;
        case "|":
            newGate = new ORGate();
            break;
        }
        const newInputList = leftRet.inputList.concat(rightRet.inputList);
        const newOutputList = rightRet.outputList.concat(rightRet.outputList)
        newInputList.push(newGate.getInputPort(0));
        newInputList.push(newGate.getInputPort(1));
        newOutputList.push(leftPort);
        newOutputList.push(rightPort);
        const newOutput = newGate.getOutputPort(0);
        const newCircuit = leftCircuit.concat(rightCircuit);
        newCircuit.push(newGate);

        return {circuit: newCircuit, retIndex: index, recentPort: newOutput,
            inputList: newInputList, outputList: newOutputList};
    }
    else if(currentOperator == "!") {
        if(tokens[index] != "!") {
            return Parse(tokens, index, inputs, "(");
        }
        index += 1;
        if(index >= tokens.length) {
            throw new Error("Missing Operand: !");
        }

        let ret: ReturnValue;
        if(tokens[index] == "!") {
            ret = Parse(tokens, index, inputs, "!");
        }
        else {
            ret = Parse(tokens, index, inputs, "(");
        }
        const circuit = ret.circuit;
        index = ret.retIndex;
        const port = ret.recentPort;
        const gate = new NOTGate();
        const newInputList = ret.inputList;
        const newOutputList = ret.outputList;
        newInputList.push(gate.getInputPort(0));
        newOutputList.push(port);
        circuit.push(gate);
        const newOutput = gate.getOutputPort(0);

        return {circuit: circuit, retIndex: index, recentPort: newOutput,
            inputList: newInputList, outputList: newOutputList};
    }
    else if(tokens[index] == "(") {
        index += 1;
        if(index >= tokens.length)
            throw new Error("Encountered Unmatched (");
        const ret = Parse(tokens, index, inputs, "|");
        index = ret.retIndex;
        if(index >= tokens.length)
            throw new Error("Encountered Unmatched (");
        ret.retIndex += 1;
        return ret;
    }
    else {
        const inputName = tokens[index];
        if(!inputs.has(inputName)) {
            switch (inputName) {
            case "&":
            case "|":
            case "^":
                throw new Error("Missing Left Operand: " + inputName);
            case ")":
                throw new Error("Encountered Unmatched )");
            }
        }
        const inputComponent = inputs.get(inputName);
        const newOutput = inputComponent.getOutputPort(0);
        index += 1;
        return {circuit: [], retIndex: index, recentPort: newOutput, inputList: [], outputList: []};
    }
}

/**
 * Main driver function for parsing an expression into a circuit
 *
 * @param  inputs A map correlating input name to the DigitalComponent it represents
 * @param  expression The expression to be parsed
 * @param  output The DigitalComponent to use as an output, port 0 will be used
 * @return The circuit generated by the given expression, null on error (see above)
 * @throws {Error} if any of the input parameters are null or undefined
 * @throws {Error} if an input in inputs is has an input port or does not have an output port
 *                   (thus is not a "real" Input)
 * @throws {Error} if output has an output port or does not have an input port
 *                   (thus is not a "real" Output)
 * @throws {Error} if expression requests an input not found in inputs
 * @throws {Error} if there is an unmatched '(' or ')'
 * @throws {Error} if there is a '!', '&', '^', or '|' that is missing an operand
 */
export function ExpressionToCircuit(inputs: Map<string, DigitalComponent>,
                                    expression: string,
                                    output: DigitalComponent): ExpressionToCircuitReturn | null {
    if(inputs == null)  throw new Error("Null Parameter: inputs");
    if(expression == null) throw new Error("Null Parameter: expression");
    if(output == null) throw new Error("Null Parameter: output");

    const components: IOObject[] = [];
    for(const [name, component] of inputs) {
        if(component.getInputPortCount().getValue() != 0
          || component.getOutputPortCount().getValue() == 0) {
            throw new Error("Not An Input: " + name);
        }
        components.push(component);
    }

    if(output.getInputPortCount().getValue() == 0
      || output.getOutputPortCount().getValue() != 0) {
        throw new Error("Supplied Output Is Not An Output");
    }

    const tokenList = GenerateTokens(expression);
    let token: string;
    for(let i = 0; i < tokenList.length; i++) {
        token = tokenList[i];
        switch(token) {
        case "(":
        case ")":
        case "&":
        case "^":
        case "|":
        case "!":
            break;
        default:
            if(!inputs.has(token))
                throw new Error("Input Not Found: " + token);
            break;
        }
    }

    if(inputs.size == 0) {
        return {components: new DigitalObjectSet(), inputList: [], outputList: []}
    }

    const parseRet = Parse(tokenList, 0, inputs, "|");
    const index = parseRet.retIndex;
    if(index < tokenList.length && tokenList[index] == ")") {
        throw new Error("Encountered Unmatched )");
    }
    const circuit = parseRet.circuit;
    const newInputList = parseRet.inputList;
    const newOutputList = parseRet.outputList;
    newInputList.push(output.getInputPort(0));
    newOutputList.push(parseRet.recentPort);
    circuit.push(output);

    const newComponents = new DigitalObjectSet(circuit.concat(components));

    return {components: newComponents, inputList: newInputList, outputList: newOutputList};
}
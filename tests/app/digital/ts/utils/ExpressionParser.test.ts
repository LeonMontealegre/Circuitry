import "jest";


import {DigitalCircuitDesigner} from "digital/models/DigitalCircuitDesigner";
import {ConnectionAction} from "core/actions/addition/ConnectionAction";
import {Switch}              from "digital/models/ioobjects/inputs/Switch";
import {ANDGate}         from "digital/models/ioobjects/gates/ANDGate";
import {ORGate}            from "digital/models/ioobjects/gates/ORGate";
import {LED}                 from "digital/models/ioobjects/outputs/LED";
import {DigitalWire} from "digital/models/DigitalWire";
import {DigitalObjectSet} from "digital/utils/ComponentUtils";
import {IOObject} from "core/models/IOObject";

/* Notes for connecting components
    const designer = new DigitalCircuitDesigner(0)
    const a = new Switch(), b = new Switch(), o = new LED(), and_gate = new ANDGate();
    const w1 = new DigitalWire(a.getOutputPort(0), and_gate.getInputPort(0))
    const w2 = new DigitalWire(b.getOutputPort(0), and_gate.getInputPort(1))
    const w3 = new DigitalWire(and_gate.getOutputPort(0), o.getInputPort(0))

    a.getOutputPort(0).connect(w1)
    and_gate.getInputPort(0).connect(w1)

    b.getOutputPort(0).connect(w2)
    and_gate.getInputPort(1).connect(w2)

    and_gate.getOutputPort(0).connect(w3)
    o.getInputPort(0).connect(w3)

    let objectSet = new DigitalObjectSet([a, b, o, and_gate, w1, w2, w3])
*/

describe("Trevor Test", () => {

      const designer = new DigitalCircuitDesigner(0)
      const a = new Switch(), b = new Switch(), o = new LED(), and_gate = new ANDGate();
      const w1 = new DigitalWire(a.getOutputPort(0), and_gate.getInputPort(0))
      const w2 = new DigitalWire(b.getOutputPort(0), and_gate.getInputPort(1))
      const w3 = new DigitalWire(and_gate.getOutputPort(0), o.getInputPort(0))

      a.getOutputPort(0).connect(w1)
      and_gate.getInputPort(0).connect(w1)

      b.getOutputPort(0).connect(w2)
      and_gate.getInputPort(1).connect(w2)

      and_gate.getOutputPort(0).connect(w3)
      o.getInputPort(0).connect(w3)

      let objectSet = new DigitalObjectSet([a, b, o, and_gate, w1, w2, w3])
      designer.addGroup(objectSet)

    test("Test1", () => {
        expect(o.isOn()).toBe(false);
    });

    test("Test2", () => {
        a.activate(true);
        expect(o.isOn()).toBe(false);
    });

    test("Test3", () => {
        b.activate(true);
        expect(o.isOn()).toBe(true);
    });

    test("Test4", () => {
        a.activate(false);
        expect(o.isOn()).toBe(false);
    });
});
import {DEFAULT_SIZE} from "core/utils/Constants";

import {V} from "Vector";
import {ClampedValue} from "math/ClampedValue";
import {serializable} from "serialeazy";

import {ConstantSpacePositioner} from "core/models/ports/positioners/ConstantSpacePositioner";

import {DigitalComponent} from "digital/models/DigitalComponent";
import {InputPort} from "digital/models/ports/InputPort";
import {OutputPort} from "digital/models/ports/OutputPort";

@serializable("Decoder")
export class Decoder extends DigitalComponent {

    public constructor() {
        super(new ClampedValue(2,1,8),
              new ClampedValue(4,2,Math.pow(2,8)),
              V(DEFAULT_SIZE, DEFAULT_SIZE*2),
              new ConstantSpacePositioner<InputPort>(DEFAULT_SIZE/2),
              new ConstantSpacePositioner<OutputPort>(DEFAULT_SIZE/2));

        // activate 0th port for initial state
        super.activate(true, 0);
        this.setBinaryLabels();
    }

    public activate(): void {
        // Convert binary input to index of which output should be on
        const num = this.getInputPorts()
                .map(port => (port.getIsOn() ? 1 : 0))
                .reduce((prev, cur, i) => prev | (cur << i), 0);

        // Turn everything off except i === num
        this.getOutputPorts().forEach((_, i) => {
            super.activate(i === num, i);
        });
    }

    public setInputPortCount(val: number): void {
        // Calculate width using an approximation of the text with of a single "0" = 8.342285
        const padding = 8;
        const width = Math.max(2 * padding + val * 8.342285, DEFAULT_SIZE);
        this.transform.setSize(V(width, DEFAULT_SIZE/2*Math.pow(2, val)));
        super.setInputPortCount(val);
        this.setBinaryLabels();
    }

    public getDisplayName(): string {
        return "Decoder";
    }

    public setBinaryLabels(): void {
        const ports = this.getOutputPorts();
        const digitCount = Math.log2(ports.length);
        let numStr = "0".repeat(digitCount);

        for (let i = 0; i < Math.pow(2, digitCount); i++) {
            ports[i].setName(numStr);
            numStr = (numStr.substr(0, numStr.lastIndexOf("0")) + "1").padEnd(digitCount, "0");
        }
    }
}

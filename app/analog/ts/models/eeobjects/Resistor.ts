import {serializable} from "serialeazy";

import {IO_PORT_LENGTH} from "core/utils/Constants";

import {V} from "Vector";
import {ClampedValue} from "math/ClampedValue";

import {AnalogComponent} from "analog/models/AnalogComponent";

@serializable("Resistor")
export class Resistor extends AnalogComponent {
    public constructor(resistance: number = 5) {
        super(new ClampedValue(2), V(50, 30));

        this.resistance = resistance;

        this.ports.getPorts()[0].setOriginPos(V(this.getSize().x/2, 0));
        this.ports.getPorts()[0].setTargetPos(V(IO_PORT_LENGTH, 0));

        this.ports.getPorts()[1].setOriginPos(V(-this.getSize().x/2, 0));
        this.ports.getPorts()[1].setTargetPos(V(-IO_PORT_LENGTH, 0));
    }

    public getDisplayName(): string {
        return "Resistor";
    }

    public getImageName(): string {
        return "resistor.svg";
    }

    public getResistance(): number {
        return this.resistance;
    }

    public setResistance(newResistance: number): void {
        if (newResistance > 0) {
            this.resistance = newResistance;
        }
    }
}

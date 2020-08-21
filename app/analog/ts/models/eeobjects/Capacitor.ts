import {serializable} from "serialeazy";

import {IO_PORT_LENGTH} from "core/utils/Constants";

import {V} from "Vector";
import {ClampedValue} from "math/ClampedValue";

import {AnalogComponent} from "analog/models/AnalogComponent";

@serializable("Capacitor")
export class Capacitor extends AnalogComponent {

    public capacitance: number;

    public constructor(capacitance: number = 5) {
        // Not sure if size numbers are correct, copied from Resistor.ts
        super(new ClampedValue(2), V(20, 30));

        this.capacitance = capacitance;
        this.resistance = 0;

        this.ports.getPorts()[0].setOriginPos(V(this.getSize().x/2, 0));
        this.ports.getPorts()[0].setTargetPos(V(IO_PORT_LENGTH, 0));

        this.ports.getPorts()[1].setOriginPos(V(-this.getSize().x/2, 0));
        this.ports.getPorts()[1].setTargetPos(V(-IO_PORT_LENGTH, 0));
    }

    public getDisplayName(): string {
        return "Capacitor";
    }

    public getImageName(): string {
        return "capacitor.svg";
    }

    public getCapacitance(): number {
        return this.capacitance;
    }

    public setCapacitance(newCapacitance: number): void {
        if (newCapacitance > 0) {
            this.capacitance = newCapacitance;
        }
    }

    public getNetlistSymbol(): string {
        return "v" + this.netlistNum;
    }

    public getNetListStats(): string {
        return this.getCapacitance() + "u ic=0";
    }
}
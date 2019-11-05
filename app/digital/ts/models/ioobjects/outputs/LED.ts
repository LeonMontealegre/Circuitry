import {DEFAULT_SIZE,
        DEFAULT_BORDER_WIDTH,
        IO_PORT_RADIUS,
        IO_PORT_BORDER_WIDTH,
        LED_LIGHT_RADIUS,
        LED_WIDTH} from "digital/utils/Constants";

import {Vector, V} from "Vector";
import {ClampedValue} from "math/ClampedValue";

import {Component} from "../Component";

export class LED extends Component {
    private color: string;

    public constructor() {
        super(new ClampedValue(1),
              new ClampedValue(0),
              V(50, 50));
        this.color = "#ffffff";

        // Make port face down instead of sideways
        this.inputs.first.setTargetPos(V(0, 2*DEFAULT_SIZE));
    }

    // @Override
    public getMinPos(): Vector {
        const min = super.getMinPos();

        // if the LED is on, create a new border width to account for the light
        let newBorderWidth = DEFAULT_BORDER_WIDTH;
        if (this.inputs.first.getIsOn())
            newBorderWidth += (LED_LIGHT_RADIUS - LED_WIDTH/2);

        // find the corners of the object using the new border width
        const corners = this.transform.getCorners().map(
            v => v.sub(newBorderWidth)
        );

        // return the minimum position from all of these vectors
        return Vector.min(min, ...corners);
    }

    // @Override
    public getMaxPos(): Vector {
        const max = super.getMaxPos();

        // if the LED is on, create a new border width to account for the light
        let newBorderWidth = DEFAULT_BORDER_WIDTH;
        if (this.inputs.first.getIsOn())
            newBorderWidth += (LED_LIGHT_RADIUS - LED_WIDTH/2);

        // Find maximum pos from corners of transform
        const corners = this.transform.getCorners().map(
            v => v.add(newBorderWidth)
        );

        return Vector.max(max, ...corners);
    }

    // @Override
    public activate(signal: boolean, i: number = 0): void {
        this.onTransformChange();
        super.activate(signal, i);
    }

    public setColor(color: string): void {
        this.color = color;
    }

    public isOn(): boolean {
        return this.inputs.first.getIsOn();
    }

    public getColor(): string {
        return this.color;
    }

    public getDisplayName(): string {
        return "LED";
    }

    public getImageName(): string {
        return "led.svg";
    }

    public getOnImageName(): string {
        return "ledLight.svg"
    }

    public getXMLName(): string {
        return "led";
    }
}

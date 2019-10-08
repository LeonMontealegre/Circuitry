import {Transform} from "math/Transform";

import {CopyGroup} from "digital/utils/ComponentUtils"
import {IOObjectSet} from "core/utils/ComponentUtils";

import {Action} from "core/actions/Action";

import {CircuitDesigner} from "core/models/CircuitDesigner";
import {IOObject} from "core/models/IOObject";

export class CopyGroupAction implements Action {
    private designer: CircuitDesigner;

    private initialGroup: IOObject[];
    private copy: IOObjectSet;

    private transforms: Array<Transform>;

    public constructor(designer: CircuitDesigner, initialGroup: IOObject[], group: IOObjectSet) {
        this.designer = designer;
        this.initialGroup = initialGroup;
        this.copy = group;

        this.transforms = group.getComponents().map(c => c.getTransform());
    }

    public execute(): Action {
        this.copy = CopyGroup(this.initialGroup);

        // Copy over transforms
        const components = this.copy.getComponents();
        for (let i = 0; i < components.length; i++) {
            components[i].setPos(this.transforms[i].getPos());
            components[i].setAngle(this.transforms[i].getAngle());
        }

        this.designer.addGroup(this.copy);

        return this;
    }

    public undo(): Action {
        // Remove wires first
        for (const wire of this.copy.getWires())
            this.designer.removeWire(wire);

        // Remove objects
        for (const obj of this.copy.getComponents())
            this.designer.removeObject(obj);

        return this;
    }

}
import "jest";

import {ROTATION_CIRCLE_RADIUS} from "core/utils/Constants";

import {V} from "Vector";

import {ANDGate} from "digital/models/ioobjects/gates/ANDGate";
import {ORGate}  from "digital/models/ioobjects/gates/ORGate";

import {Setup}      from "test/helpers/Setup";
import {GetHelpers} from "test/helpers/Helpers";


describe("Rotate Tool", () => {
    const {input, designer, selections} = Setup();
    const {Place} = GetHelpers({designer});

    describe("Single Object", () => {
        const obj = new ANDGate();

        beforeAll(() => {
            // Add object
            Place(obj);
        });

        beforeEach(() => {
            // Reset gate rotation for each test
            obj.setAngle(0);
        });

        test("Rotate ANDGate 45° CCW from side", () => {
            input.click(V(0, 0)); // Select object
            expect(selections.get().length).toBe(1);
            expect(selections.get()).toContain(obj);

            input.move(V(-ROTATION_CIRCLE_RADIUS, 0))
                    .press()
                    .move(V(0, +ROTATION_CIRCLE_RADIUS))
                    .release();
            expect(obj.getAngle()).toBeCloseTo(-Math.PI/4);
        });

        test("Rotate ANDGate 45° CW from top", () => {
            input.click(V(0, 0)); // Select object
            expect(selections.get().length).toBe(1);
            expect(selections.get()).toContain(obj);

            input.move(V(0, +ROTATION_CIRCLE_RADIUS))
                    .press()
                    .move(V(+ROTATION_CIRCLE_RADIUS, 0))
                    .release();
            expect(obj.getAngle()).toBeCloseTo(-Math.PI/4);
        });
    });

    describe("Multiple Objects", () => {
        const obj1 = new ANDGate();
        const obj2 = new ORGate();

        beforeAll(() => {
            // Clear previous circuit
            designer.reset();

            // Add objects
            designer.addObjects([obj1, obj2]);
        });

        beforeEach(() => {
            // Reset objects
            obj1.setPos(V(-20, 20));
            obj1.setAngle(0);
            obj2.setPos(V(20, 0));
            obj2.setAngle(0);
        });

        test("Rotate Objects 45° CW", () => {
            input.drag(V(-40, -40),
                       V(40, 40)); // Select objects
            expect(selections.get().length).toBe(2);
            expect(selections.get()).toContain(obj1);
            expect(selections.get()).toContain(obj2);

            const midpoint = obj1.getPos().add(obj2.getPos()).scale(0.5);
            input.moveTo(midpoint) // Move to midpoint of objects
                    .move(V(-ROTATION_CIRCLE_RADIUS, 0))
                    .press()
                    .move(V(0, +ROTATION_CIRCLE_RADIUS))
                    .release();
            expect(obj1.getAngle()).toBeCloseTo(-Math.PI/4);
            expect(obj2.getAngle()).toBeCloseTo(-Math.PI/4);
        })
    });
});
import {DEFAULT_BORDER_WIDTH,
        DEFAULT_BORDER_COLOR,
        DEFAULT_FILL_COLOR,
        SELECTED_BORDER_COLOR,
        SELECTED_FILL_COLOR,
        DEFAULT_ON_COLOR} from "core/utils/Constants";
import {V} from "Vector";

import {Camera} from "math/Camera";

import {Renderer} from "core/rendering/Renderer";
import {Rectangle} from "core/rendering/shapes/Rectangle";
import {Style} from "core/rendering/Style";

import {SegmentDisplay} from "digital/models/ioobjects/outputs/SegmentDisplay";

import {Images} from "digital/utils/Images";
import {Line} from "core/rendering/shapes/Line";

export const SegmentDisplayRenderer = (() => {
    // const drawANDLines = function(renderer: Renderer, size: Vector, inputs: number, borderCol: string): void {
    //     const style = new Style(undefined, borderCol, DEFAULT_BORDER_WIDTH);

    //     // Draw line to visually match input ports
    //     const l1 =  (size.y/2)*((inputs-1)/2);
    //     const l2 = -(size.y/2)*((inputs-1)/2);

    //     const s = (size.x-DEFAULT_BORDER_WIDTH)/2;
    //     const p1 = V(-s, l1);
    //     const p2 = V(-s, l2);

    //     renderer.draw(new Line(p1, p2), style);
    // }

    return {
        render(renderer: Renderer, _: Camera, display: SegmentDisplay, selected: boolean): void {
            const transform = display.getTransform();

            const size = transform.getSize();

            // Draw background
            const borderCol = (selected ? SELECTED_BORDER_COLOR : DEFAULT_BORDER_COLOR);
            const fillCol   = (selected ? SELECTED_FILL_COLOR   : DEFAULT_FILL_COLOR);
            const style = new Style(fillCol, borderCol, DEFAULT_BORDER_WIDTH);
            renderer.draw(new Rectangle(V(), size), style);

            const w = 35;
            const p1 = display.getPorts()[0].getOriginPos().sub(DEFAULT_BORDER_WIDTH/2, 0);
            const p2 = display.getPorts()[display.getPorts().length-1].getOriginPos().sub(DEFAULT_BORDER_WIDTH/2, 0);
            renderer.draw(new Line(p1, p2), style);            

            // Draw lights
            const segments = display.getSegments();
            for (let i = segments.length - 1; i >= 0; i--) {
                const pos = segments[i][0].scale(V(w));
                const type = segments[i][1];
                const on  = display.getInputPort(i).getIsOn();

                const col = (on ? DEFAULT_ON_COLOR : (selected ? SELECTED_FILL_COLOR : DEFAULT_FILL_COLOR));

                const img = Images.GetImage(`segment_${type}.svg`);
                const size = V(img.width, img.height).scale(0.1);
                renderer.image(img, pos, size, col);
            }
        }
    };
})();
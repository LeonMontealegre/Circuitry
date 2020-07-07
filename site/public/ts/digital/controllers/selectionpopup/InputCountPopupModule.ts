import $ from "jquery";

import {ClampedValue} from "math/ClampedValue";

import {GroupAction} from "core/actions/GroupAction";
import {InputPortChangeAction} from "digital/actions/ports/InputPortChangeAction";
import {MuxPortChangeAction} from "digital/actions/ports/MuxPortChangeAction";
import {CoderPortChangeAction} from "digital/actions/ports/CoderPortChangeAction";

import {Gate} from "digital/models/ioobjects/gates/Gate";
import {BUFGate} from "digital/models/ioobjects/gates/BUFGate";
import {Decoder} from "digital/models/ioobjects/other/Decoder";
import {Mux} from "digital/models/ioobjects/other/Mux";

import {MainDesignerController} from "../../../shared/controllers/MainDesignerController";
import {NumberInputPopupModule} from "../../../shared/selectionpopup/NumberInputPopupModule"

export class InputCountPopupModule extends NumberInputPopupModule {

    public constructor(circuitController: MainDesignerController) {
        // Title module does not have a wrapping div
        super(circuitController, $("div#popup-input-count-text"));

        this.count = this.el.find("input#popup-input-count")[0] as HTMLInputElement;
        this.count.onchange = () => this.push();
    }

    public pull(): void {
        const selections = this.circuitController.getSelections();
        const gates = selections
                .filter(o => o instanceof Gate && !(o instanceof BUFGate)) as Gate[]
        const muxes = selections
                .filter(o => o instanceof Mux) as Mux[]
        const decos = selections
                .filter(o => o instanceof Decoder) as Decoder[];

        // Only enable if there's exactly 1 type, so just Gates or just Muxes or just Decoders
        const enable = selections.length > 0 && (selections.length == gates.length ||
                                                 selections.length == muxes.length ||
                                                 selections.length == decos.length);

        if (enable) {
            // Calculate input counts for each component
            const counts: ClampedValue[] = [];
            gates.forEach(g => counts.push(g.getInputPortCount()));
            muxes.forEach(m => counts.push(m.getSelectPortCount()));
            decos.forEach(d => counts.push(d.getInputPortCount()));

            const same = counts.every((count) => count.getValue() === counts[0].getValue());
            const min = counts.reduce((min, v) => Math.max(v.getMinValue(), min), -Infinity); // Find max minimum
            const max = counts.reduce((max, v) => Math.min(v.getMaxValue(), max), +Infinity); // Find min maximum

            this.count.value = same ? counts[0].getValue().toString() : "";
            this.count.placeholder = same ? "" : "-";
            this.previousCount = same ? counts[0].getValue() : NaN;

            this.count.min = min.toString();
            this.count.max = max.toString();
        }

        this.setEnabled(enable);
    }

    public executeChangeAction(newCount: number): void {
        const selections = this.circuitController.getSelections() as Array<Gate | Mux | Decoder>;
        this.circuitController.addAction(new GroupAction(
            selections.map(o => {
                if (o instanceof Gate && !(o instanceof BUFGate))
                    return new InputPortChangeAction(o,  newCount);
                else if (o instanceof Mux)
                    return new MuxPortChangeAction(o, newCount);
                else // Decoder
                    return new CoderPortChangeAction(o,  newCount);
            })
        ).execute());
    }
}

import { inspectable } from 'inspectable';

import { Render } from "./render";
import { PickerOptions } from "./types";

export class Picker {
    private options: PickerOptions;

    public render: Render;

    /**
     * Constructor
     */
    public constructor(options: Partial<PickerOptions>) {
        this.options = {
            pollingRate: 150,

            ...options
        };

        this.render = new Render({ ...this.options });
    }

    public init(): void {
        this.render.init();
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }
};

inspectable(Picker, {
    serialize: ({ render }) => ({ render })
});
import { RenderWorker } from "./workers";

import { Constructor } from "../types";

export interface IRenderOptions {
    pollingRate: number;
};

export class Render {
    public options: IRenderOptions;

    private workers!: RenderWorker[];

    /**
     * Constructor
     */
    public constructor(options: Partial<IRenderOptions>) {
        this.options = {
            pollingRate: 150,

            ...options
        };

        this.workers = [];
    }

    public init(): void {
        if (this.workers.length == 0)
            console.warn('workers[] empty!');

        for (const worker of this.workers) {
            worker.init();
        }
    }

    public addWorker<T extends RenderWorker = RenderWorker>(Worker: Constructor<T>): Render {
        const worker = new Worker(this);

        if (!this.workers.find(e => e.constructor === worker.constructor))
            this.workers.push(worker);

        return this;
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }
};
import $ from 'jquery';

import { Render } from '../render';

export abstract class RenderWorker {
    public enabled = true;

    protected targetSelector!: string;

    protected render: Render

    protected isRendered = false;

    protected activeSelector!: string;

    /**
     * Constructor
     */
    public constructor(render: Render) {
        this.render = render;
    }

    public init(): void {
        if (!this.isActive())
            return;

        this.execute();
    }

    public isActive() {
        return !!$(this.activeSelector)?.length && this.enabled;
    }

    protected abstract execute(): void;
    protected abstract destroy(): void;

    protected refresh(): void {
        this.destroy();
        this.execute();
    }
};
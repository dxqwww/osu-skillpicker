import { RenderModule } from "../modules";
import { IWorkerConfig, IWorkerOptions, PickerModuleWorker } from "./worker";

export interface IRenderWorkerConfig extends IWorkerConfig {
    conditionSelectorName: string;
    targetSelectorName: string;
};

export abstract class RenderWorker<
    T extends IRenderWorkerConfig = IRenderWorkerConfig
> extends PickerModuleWorker<
    RenderModule,
    T
> {

    /**
     * Constructor
     */
    public constructor(options: IWorkerOptions<T, RenderModule>) {
        super({
            config: {
                ...options.config,
            },

            module: options.module
        });
    }

    /**
     * Continue background rendering
     */
    public async continue(): Promise<void> {
        if (!this.isRendered())
            await this.execute();
    }

    /**
     * Checks if content has rendered
     */
    protected isRendered(): boolean {
        const selector = $(`.${this.config.get('targetSelectorName')}`);

        return Boolean(selector.length);
    }

    /**
     * Checks if can render
     */
    protected canRender(): boolean {
        const selector = $(`.${this.config.get('conditionSelectorName')}`)

        return Boolean(selector.length);
    }

    /**
     * Destroys rendered thing
     */
    protected destory(): void {
        if (!this.isRendered())
            return;

        $(`.${this.config.get('targetSelectorName')}`).remove();
    }
}
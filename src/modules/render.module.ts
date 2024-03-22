import { Picker } from "../picker";
import { Constructor } from "../types";
import { PickerModuleWorker } from "../workers";
import { FontRenderWorker } from "../workers/render";
import { BeatmapRenderWorker } from "../workers/render/beatmap.render.worker";
import { StylesRenderWorker } from "../workers/render/styles.render.worker";
import { IModuleConfig, IModuleOptions, PickerModule } from "./module";

export interface IRenderModuleConfig extends IModuleConfig {

};

export class RenderModule extends PickerModule<
    IRenderModuleConfig
> {

    /**
     * Constructor
     */
    public constructor(options: IModuleOptions<IRenderModuleConfig> & { picker: Picker }) {
        super({
            config: {
                ...options.config,

                heartbeatRate: 1000,
                heartbeatFailureThreshold: 3
            },

            picker: options.picker,
        });
    }

    /**
     * Returns available workers of RenderModule
     */
    protected *get_workers(): IterableIterator<Constructor<PickerModuleWorker<RenderModule>>> {
        yield StylesRenderWorker;
        yield FontRenderWorker;
        yield BeatmapRenderWorker;
    }
};
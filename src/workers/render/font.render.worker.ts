import $ from 'jquery';

import { RenderModule } from "../../modules";
import { IWorkerOptions } from "../worker";
import { IRenderWorkerConfig, RenderWorker } from "../render.worker";

export interface IFontRenderWorkerConfig extends IRenderWorkerConfig {
    googleApisPreconnectUrl: string;
    gStaticPreconnectUrl: string;

    fontUrls: string[];
};

export class FontRenderWorker extends RenderWorker<
    IFontRenderWorkerConfig
> {
    /**
     * Constructor
     */
    public constructor(options: IWorkerOptions<IFontRenderWorkerConfig, RenderModule>) {
        super({
            config: {
                ...options.config,

                isBackground: true,

                conditionSelectorName: 'head',
                targetSelectorName: 'osu-skillpicker__font',

                googleApisPreconnectUrl: 'https://fonts.googleapis.com',
                gStaticPreconnectUrl: 'https://fonts.gstatic.com',

                fontUrls: [
                    'https://fonts.googleapis.com/css2?family=Allerta&display=swap',
                    'https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap'
                ]
            },

            module: options.module
        });
    }

    /**
     * Renders the font
     */
    public async execute(): Promise<void> {
        const headSelector = this.config.get('conditionSelectorName');

        $(headSelector)
            .append(
                $('<link>')
                    .addClass(this.config.get('targetSelectorName'))
                    .attr('rel', 'preconnect')
                    .attr('href', this.config.get('googleApisPreconnectUrl'))
            )
            .append(
                $('<link>')
                    .addClass(this.config.get('targetSelectorName'))
                    .attr('rel', 'preconnect')
                    .attr('href', this.config.get('gStaticPreconnectUrl'))
                    .attr('crossorigin', '')
            );

        for (const url of this.config.get('fontUrls')) {
            $(headSelector)
                .append(
                    $('<link>')
                        .addClass(this.config.get('targetSelectorName'))
                        .attr('rel', 'stylesheet')
                        .attr('href', url)
                );
        }
    }
}
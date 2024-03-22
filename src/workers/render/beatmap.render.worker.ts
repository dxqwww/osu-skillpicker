import $ from 'jquery';

import { RenderModule } from "../../modules";
import { IWorkerOptions } from "../worker";
import { IRenderWorkerConfig, RenderWorker } from "../render.worker";

export interface IBeatmapRenderWorkerConfig extends IRenderWorkerConfig {
    beatmapPageSelectorName: string;
};

// // TODO:
// Add versioning module
// Add migrations module

// v1
const skillsets = [
    { value: 1 << 0, name: 'Jump Aim' },
    { value: 1 << 1, name: 'Aim Control' },
    { value: 1 << 2, name: 'Flow Aim' },
    { value: 1 << 3, name: 'Anti Aim' },
    { value: 1 << 4, name: 'Snap Aim' },
    { value: 1 << 5, name: 'Linear Aim' },
    { value: 1 << 6, name: 'Precision' },
    { value: 1 << 7, name: 'Stream' },
    { value: 1 << 8, name: 'Finger Control' },
    { value: 1 << 9, name: 'Stamina' },
    { value: 1 << 10, name: 'Accuracy' },
    { value: 1 << 11, name: 'Memory' },
    { value: 1 << 12, name: 'Low AR' },
    { value: 1 << 13, name: 'High AR' },
    { value: 1 << 14, name: 'Tech' },
    { value: 1 << 15, name: 'Sliders' },
    { value: 1 << 16, name: 'Alternate' },
    { value: 1 << 17, name: 'Reading' },
    { value: 1 << 18, name: 'Consistency' },
    { value: 1 << 19, name: 'Farm' },
    { value: 1 << 20, name: 'Speed' },
    { value: 1 << 21, name: 'Rhythm Changing' },
    { value: 1 << 22, name: 'Gimmick' },
];

export class BeatmapRenderWorker extends RenderWorker<
    IBeatmapRenderWorkerConfig
> {
    /**
     * Constructor
     */
    public constructor(options: IWorkerOptions<IBeatmapRenderWorkerConfig, RenderModule>) {
        super({
            config: {
                ...options.config,

                isBackground: true,

                beatmapPageSelectorName: '.js-react--beatmapset-page',

                conditionSelectorName: '.beatmapset-info',
                targetSelectorName: 'osu-skillpicker__beatmap-container'
            },

            module: options.module
        });
    }

    /**
     * Renders the font
     */
    public async execute(): Promise<void> {
        const beatmapsetPageSelector = $(this.config.get('conditionSelectorName'));
        const containerSelectorName = this.config.get('targetSelectorName');

        // TODO:
        // !prevent render of osu!plus preview container!

        // #region wrapper render 

        $(beatmapsetPageSelector)
            .after(
                $('<div>')
                    .addClass(containerSelectorName)
                    .append(
                        $('<div>')
                            .addClass(`osu-skillpicker-header`)
                            .append(
                                $('<span>')
                                    .text('osu!')
                            )
                            .append(
                                $('<span>')
                                    .text('skillpicker')
                            )
                    )
                    .append(
                        $('<div>')
                            .addClass(`osu-skillpicker-tags`)
                    )
            );

        // #endregion

        // #region tags-container render

        skillsets.forEach(skillset => {
            $(`.${containerSelectorName} .osu-skillpicker-tags`)
                .append(
                    $('<div>')
                        .addClass('osu-skillpicker-tag')
                        .attr('data-id', skillset.value)
                        .on('click', (e) => $(e.target).find('input[type="checkbox"]').prop('checked', (_, v) => !v))
                        .append(
                            $('<input>')
                                .addClass('osu-skillpicker-tag-toggle')
                                .attr('id', `osu-skillpicker-tag-toggle_${skillset.value}`)
                                .attr('type', 'checkbox')
                        )
                        .append(
                            $('<label>')
                                .addClass('osu-skillpicker-tag-label')
                                .attr('for', `osu-skillpicker-tag-toggle_${skillset.value}`)
                                .append(
                                    $('<span>')
                                        .text(skillset.name)
                                )
                        )
                )
        });

        // #endregion
    }
}
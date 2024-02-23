import $ from 'jquery';

import { Render } from '../render';
import { RenderWorker } from './worker';

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

export class BeatmapRenderWorker extends RenderWorker {
    protected activeSelector: string;

    private pickerContainerSelector: string;
    private pickerHeaderSelector: string;
    private pickerTagsSelector: string;
    private pickerSkillTagSelector: string;

    private beatmapPickerSelector: string;

    private beatmapChangeObserver: MutationObserver;

    public constructor(render: Render) {
        super(render);

        this.activeSelector = '.js-react--beatmapset-page';

        this.pickerContainerSelector = 'osu-skillpicker-container';
        this.pickerHeaderSelector = 'osu-skillpicker-header';
        this.pickerTagsSelector = 'osu-skillpicker-tags';
        this.pickerSkillTagSelector = 'osu-skillpicker-skilltag';

        this.targetSelector = 'beatmapset-info';
        this.beatmapPickerSelector = 'beatmapset-beatmap-picker';

        this.beatmapChangeObserver = new MutationObserver(() => this.refresh());
    }

    protected destroy(): void {
        if (!this.isRendered)
            return;

        $(`.${this.pickerContainerSelector}`).remove();
        this.beatmapChangeObserver.disconnect();

        this.isRendered = false;
    }

    protected execute(): void {
        if (!this.canRender())
            return;

        const self = this;

        $(`.${this.targetSelector}`).after(
            $('<div>')
                .addClass(this.pickerContainerSelector)
                .css({
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                    'user-select': 'none',
                    'display': 'flex',
                    'justify-content': 'center',
                    'align-items': 'center',
                    'flex-direction': 'column',
                    'gap': '2rem',
                    'padding': '20px 8px',
                    'background-color': '#2E3538',
                    'border-radius': '10px',
                    'margin': '10px 10px 0 10px',
                })
                .append(
                    $('<div>')
                        .addClass(this.pickerHeaderSelector)
                        .css({
                            'font-family': '\'Allerta Stencil\'',
                            'font-style': 'normal',
                            'font-weight': '400',
                            'font-size': '4vw',
                            'font-height': '82px',
                        })
                        .append(
                            $('<span>')
                                .css({
                                    'color': '#DC98A4'
                                })
                                .text('osu!')
                        )
                        .append(
                            $('<span>')
                                .css({
                                    color: '#FFFFFF',
                                })
                                .text('skillpicker')
                        )
                )
                .append(
                    $('<div>')
                        .addClass(this.pickerTagsSelector)
                        .css({
                            'display': 'flex',
                            'flex-wrap': 'wrap',
                            'justify-content': 'space-evenly',
                            'align-items': 'center',
                            'gap': '8px',
                            'font-family': '\'Allerta\'',
                            'font-style': 'normal',
                            'font-weight': '400',
                            'font-size': '16px',
                            'font-height': '20px',
                        })
                )
        );

        skillsets.forEach(skillset => {
            $(`.${this.pickerTagsSelector}`).append(
                $('<span>')
                    .addClass(`${this.pickerSkillTagSelector}__${skillset.value}`)
                    .css({
                        'flex': '0 0 calc(16.66%)',
                        'display': 'flex',
                        'justify-content': 'center',
                        'align-items': 'center',
                        'text-align': 'center',
                        'width': '150px',
                        'border-radius': '4px',
                        'border': 'solid 1px rgba(255, 255, 255, 0.5)',
                        'padding': '8px',
                        'transition': '.12s',
                        'cursor': 'pointer'
                    })
                    .on({
                        mouseenter: function () {
                            if (!self.isTagEnabled(this)) {
                                $(this).css({
                                    'border': 'solid 1px rgba(255, 255, 255, .85)',
                                    'background-color': 'rgba(57, 134, 172, .85)'
                                });
                            }
                            else {
                                $(this).css({
                                    'border': 'solid 1px rgba(255, 255, 255, 1)',
                                    'background-color': 'rgba(57, 134, 172, 1)'
                                });
                            }
                        },
                        mouseleave: function () {
                            if (!self.isTagEnabled(this)) {
                                $(this).css({
                                    'border': 'solid 1px rgba(255, 255, 255, 0.5)',
                                    'background-color': ''
                                });
                            }
                            else {
                                $(this).css({
                                    'border': 'solid 1px rgba(255, 255, 255, .75)',
                                    'background-color': 'rgba(57, 134, 172, .75)'
                                });
                            }
                        },
                        click: function () {
                            if (self.isTagEnabled(this)) {
                                $(this)
                                    .removeClass(`${self.pickerSkillTagSelector}__enabled`)
                                    .css({
                                        'border': 'solid 1px rgba(255, 255, 255, .85)',
                                        'background-color': ''
                                    });
                            } else {
                                $(this)
                                    .addClass(`${self.pickerSkillTagSelector}__enabled`)
                                    .css({
                                        'border': 'solid 1px rgba(255, 255, 255, 1)',
                                        'background-color': 'rgba(57, 134, 172, 1)'
                                    });
                            }
                        }
                    })
                    .text(skillset.name)

                // default = 0.5
                // leave = 0.5 | leave + enabled = 0.75
                // enter = 0.75 | enter + enabled = 1
            )
        });

        this.isRendered = true;

        // enable beatmap watcher
        this.beatmapChangeObserver.observe($(`.${this.beatmapPickerSelector}`)[0], { attributes: true, subtree: true });
    }

    private isTagEnabled(selector: HTMLElement): boolean {
        return $(selector).hasClass(`${this.pickerSkillTagSelector}__enabled`);
    }

    private canRender(): boolean {
        const element = $(`.${this.targetSelector}`);

        return !!element?.length && !this.isRendered;
    }
}
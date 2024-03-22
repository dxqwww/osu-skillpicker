import $ from 'jquery';

import { Render } from "../render";
import { RenderWorker } from "./worker";

export class FontRenderWorker extends RenderWorker {
    private pickerFontSelector: string;

    private googleApisPreconnectUrl: string;
    private gStaticPreconnectUrl: string;

    private allertaFontSelector: string;
    private allertaFontUrl: string;

    private allertaStencilFontSelector: string;
    private allertaStencilFontUrl: string;

    public constructor(render: Render) {
        super(render);

        this.activeSelector = 'head';
        this.pickerFontSelector = 'osu-picker__font';

        this.googleApisPreconnectUrl = 'https://fonts.googleapis.com';
        this.gStaticPreconnectUrl = 'https://fonts.gstatic.com';

        this.allertaFontSelector = 'allerta-font';
        this.allertaFontUrl = 'https://fonts.googleapis.com/css2?family=Allerta&display=swap" rel="stylesheet';

        this.allertaStencilFontSelector = 'stencil-font';
        this.allertaStencilFontUrl = 'https://fonts.googleapis.com/css2?family=Allerta+Stencil&display=swap';
    }

    protected destroy(): void {
        if (!this.isRendered)
            return;

        $(`.${this.pickerFontSelector}`).remove();

        this.isRendered = false;
    }

    protected execute(): void {
        console.log('font rendered');

        $(document.head)
            .append(
                $('<link>')
                    .addClass(this.pickerFontSelector)
                    .attr('rel', 'preconnect')
                    .attr('href', this.googleApisPreconnectUrl)
            )
            .append(
                $('<link>')
                    .addClass(this.pickerFontSelector)
                    .attr('rel', 'preconnect')
                    .attr('href', this.gStaticPreconnectUrl)
                    .attr('crossorigin', '')
            )
            .append(
                $('<link>')
                    .addClass(this.pickerFontSelector)
                    .addClass(this.allertaFontSelector)
                    .attr('rel', 'stylesheet')
                    .attr('href', this.allertaFontUrl)
            )
            .append(
                $('<link>')
                    .addClass(this.pickerFontSelector)
                    .addClass(this.allertaStencilFontSelector)
                    .attr('rel', 'stylesheet')
                    .attr('href', this.allertaStencilFontUrl)
            );

        this.isRendered = true;
    }
}
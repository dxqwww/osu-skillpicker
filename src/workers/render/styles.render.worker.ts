import $ from 'jquery';

import { RenderModule } from "../../modules";
import { IWorkerOptions } from "../worker";
import { IRenderWorkerConfig, RenderWorker } from "../render.worker";

export interface IStylesRenderWorkerConfig extends IRenderWorkerConfig {
};

// TODO:
// Make configurable style builder

export class StylesRenderWorker extends RenderWorker<
    IStylesRenderWorkerConfig
> {
    /**
     * Constructor
     */
    public constructor(options: IWorkerOptions<IStylesRenderWorkerConfig, RenderModule>) {
        super({
            config: {
                ...options.config,

                isBackground: true,

                conditionSelectorName: 'head',
                targetSelectorName: 'osu-skillpicker__styles'
            },

            module: options.module
        });
    }

    /**
     * Renders the styles
     */
    public async execute(): Promise<void> {
        const headSelector = this.config.get('conditionSelectorName');
        const stylesSelectorName = this.config.get('targetSelectorName');

        $(headSelector).append(
            $(`<style>
.osu-skillpicker__beatmap-container {
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 2rem;
    padding: 20px 8px;
    background-color: #2E3538;
    border-radius: 10px;
    margin: 10px 10px 0 10px;
}

.osu-skillpicker__beatmap-container .osu-skillpicker-header {
    font-family: 'Allerta Stencil';
    font-style: normal;
    font-weight: 400;
    font-size: 4vw;
}

.osu-skillpicker-header span:nth-child(1) {
    color: #DC98A4;
}

.osu-skillpicker-header span:nth-child(2) {
    color: #FFFFFF;
}

.osu-skillpicker-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    align-items: center;
    gap: 8px;
    font-family: Allerta;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
}

.osu-skillpicker-tag {
    flex: 0 0 calc(16.66%);
    display: flex;
    justify-content: center;
    align-items: center;
}

.osu-skillpicker-tag-toggle {
    display: none;
}

.osu-skillpicker-tag-label {
    text-align: center;
    width: 150px;
    border-radius: 4px;
    padding: 8px;
    cursor: pointer;
    
}

.osu-skillpicker-tag-label:hover {
    background-color: rgba(57, 134, 172, 1);
    transition: .12s;
}

@keyframes osu-skillpicker-tag-pop {
  0% { 
    opacity: 0.2; 
  }
  50% { 
    opacity: 0.5; 
  }
  100% {
    opacity: 1;
    transform: scale(1.1); 
  }
}

@keyframes osu-skillpicker-tag-unpop {
  0% { 
    opacity: 0.2;
    transform: scale(0.9); 
  }
  50% { 
    opacity: 0.5; 
  }
  100% {
    opacity: 1;
    transform: scale(1); 
  }
}

.osu-skillpicker-tag-toggle:checked + .osu-skillpicker-tag-label {
    animation: osu-skillpicker-tag-pop .12s ease;
    background-color: #66ccff;
}

.osu-skillpicker-tag-toggle:not(:checked) + .osu-skillpicker-tag-label {
    animation: osu-skillpicker-tag-unpop .12s ease;
}

</style>`).addClass(stylesSelectorName)
        );
    }
}
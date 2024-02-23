import { Picker } from "./picker";
import { BeatmapRenderWorker, FontRenderWorker } from "./render";

const main = async () => {
    console.log(12);

    const picker = new Picker({});

    picker.render
        .addWorker(BeatmapRenderWorker)
        .addWorker(FontRenderWorker);

    picker.init();
};

(() => {

    window.addEventListener('load', async () => {
        await main();
    }, false)
})();
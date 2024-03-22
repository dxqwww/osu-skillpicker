import { Picker } from "./picker";

const main = async () => {
    const picker = new Picker({
        config: {
            debug: true
        }
    });

    await picker.start();
};

(() => {

    window.addEventListener('load', async () => {
        await main();
    }, false)
})();
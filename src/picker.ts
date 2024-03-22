import { ConfigManager, ModuleManager } from "./common";
import { ModuleInitializingError } from "./common/errors";
import { PickerModule, RenderModule } from "./modules";
import { Constructor } from "./types";

export interface IPickerConfig {
    debug: boolean;
};

export interface IPickerOptions<T> {
    config: T;
};

/**
 * List of all available modules to load
 */
const MODULES: Constructor<PickerModule>[] = [
    RenderModule
];

export class Picker {
    public isStarted = false;

    public modules = new ModuleManager();

    public config: ConfigManager<IPickerConfig>;


    /**
     * Constructor
     */
    public constructor(options: IPickerOptions<IPickerConfig>) {
        this.config = new ConfigManager({
            ...options.config || {},

            debug: true,
        });

        this.registerModules(MODULES);
    }

    /**
     * Starts modules
     */
    public async start(): Promise<void> {
        if (!this.isStarted) {
            for (const module of this.modules) {
                try {
                    await module.start();
                } catch (error) {
                    if (error instanceof ModuleInitializingError) {
                        console.error(`<${error.name}>`, error.message);
                    }
                }
            }
        }
    }

    /**
     * Stops modules
     */
    public stop(): void {
        if (this.isStarted) {
            for (const module of this.modules) {
                module.stop();
            }
        }
    }

    /**
     * Registers the modules
     */
    private registerModules(modules: Constructor<PickerModule>[]): void {
        for (const Module of modules) {
            this.modules.register(Module, {
                picker: this
            });
        }
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    };
};
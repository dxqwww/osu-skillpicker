import { ConfigManager } from "../common";
import { PickerModule } from "../modules";
import { IPickerOptions } from "../picker";

export interface IWorkerConfig {
    isBackground: boolean;
};

export interface IWorkerOptions<
    T,
    M extends PickerModule
> extends IPickerOptions<T> {
    module: M;
}

// TODO:
// Add custom context

export abstract class PickerModuleWorker<
    M extends PickerModule,
    C extends IWorkerConfig = IWorkerConfig
> {
    public config: ConfigManager<C>;

    public module: M;

    /**
     * Constructor
     */
    protected constructor(options: IWorkerOptions<C, M>) {
        this.config = new ConfigManager<C>({
            ...options.config
        });

        this.module = options.module;
    }

    /**
     * Executes the worker
     */
    public abstract execute(): Promise<void>;

    /**
     * Continues executing the worker
     */
    public abstract continue(): Promise<void>;

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    };
}
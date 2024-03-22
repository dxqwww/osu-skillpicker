import { WorkerManager } from "../common";
import { ConfigManager } from "../common/config";
import { ModuleHeartbeatError, ModuleInitializingError } from "../common/errors";
import { IPickerOptions, Picker } from "../picker";
import { Constructor } from "../types";
import { PickerModuleWorker } from "../workers";

export interface IModuleConfig {
    heartbeatRate: number;
    heartbeatFailureThreshold: number;
};

export interface IModuleOptions<T> extends IPickerOptions<T> {
    picker: Picker;
}

export abstract class PickerModule<
    C extends IModuleConfig = IModuleConfig
> {
    public initialized = false;

    public config: ConfigManager<C>;

    public workers = new WorkerManager();

    public picker: Picker;

    private heartbeatIntervalId?: ReturnType<typeof setTimeout> | null;

    /**
     * Constructor
     */
    protected constructor(options: IModuleOptions<C>) {
        this.config = new ConfigManager({
            ...options.config
        });

        this.picker = options.picker;

        this.registerWorkers();
    }

    /**
     * Starts the module
     */
    public async start(): Promise<void> {
        if (!this.initialized) {
            this.initialized = await this.init();

            if (!this.initialized)
                throw new ModuleInitializingError('Cannot initializing module');

            this.startHeartbeating();
        }
    }

    /**
     * Stops the module
     */
    public stop(): void {
        if (this.heartbeatIntervalId) {
            clearInterval(this.heartbeatIntervalId);
            this.heartbeatIntervalId = null;
        }

        this.initialized = false;
    }

    /**
     * Returns available workers of current module
     */
    protected abstract get_workers(): IterableIterator<Constructor<PickerModuleWorker<PickerModule>>>;

    /**
     * Initializes the module
     */
    protected async init(): Promise<boolean> {

        // TODO:
        // Throw an error to a specific worker and handle it
        for (const worker of this.workers) {
            try {
                await worker.execute();
            } catch {
                return false;
            }
        }

        return true;
    }

    /**
     * Heartbeat method that calls every `heartbeatRate` ms.
     */
    protected async heartbeat(): Promise<boolean> {
        for (const worker of this.workers) {
            try {
                if (worker.config.get('isBackground'))
                    await worker.continue();
            } catch {
                return false;
            }
        }

        return true;
    }

    /**
     * Starts heartbeating
     */
    private startHeartbeating(): void {
        if (this.heartbeatIntervalId) {
            clearInterval(this.heartbeatIntervalId);
        }

        const maxThreshold = this.config.get('heartbeatFailureThreshold');
        let threshold = 0;

        this.heartbeatIntervalId = setInterval(async () => {
            try {
                if (!await this.heartbeat() && ++threshold === maxThreshold) {
                    throw new ModuleHeartbeatError(`Module does not respond for ${maxThreshold / 1000} seconds.`);
                }
                else {
                    threshold--;
                }
            } catch (error) {
                if (error instanceof ModuleHeartbeatError) {
                    console.error(`<${error.name}>`, error.message, 'Trying to restart...');

                    this.stop();
                    await this.start();
                }
            }
        }, this.config.get('heartbeatRate'));
    }

    /**
     * Registers the workers
     */
    private registerWorkers(): void {
        for (const Worker of this.get_workers()) {
            this.workers.register(Worker, {
                module: this
            });
        }
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }
}  
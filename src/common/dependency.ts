import { PickerModule } from "../modules";
import { PickerModuleWorker } from "../workers";
import { Constructor, Nullable } from "../types";

abstract class DependencyManager<T> {
    protected dependencies: Map<Constructor<T>, T> = new Map();

    /**
     * Registers T as insatnce of T 
     */
    public register(Ctor: Constructor<T>, ...params: unknown[]): void {
        if (!Ctor?.constructor?.name || this.dependencies.has(Ctor))
            return;

        this.dependencies.set(Ctor, new Ctor(...params));
    }

    /**
     * Returns the instance of T 
     */
    public get(Ctor: Constructor<T>): Nullable<T> {
        return this.dependencies.has(Ctor) ? this.dependencies.get(Ctor) : null;
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }
}

export class ModuleManager extends DependencyManager<PickerModule> {
    /**
     * Returns custom iterator
     */
    public [Symbol.iterator](): IterableIterator<PickerModule> {
        return this.dependencies.values();
    }
}

export class WorkerManager extends DependencyManager<PickerModuleWorker<PickerModule>> {
    /**
     * Returns custom iterator
     */
    public [Symbol.iterator](): IterableIterator<PickerModuleWorker<PickerModule>> {
        return this.dependencies.values();
    }
};
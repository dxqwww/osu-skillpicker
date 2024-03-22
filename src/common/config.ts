export type ConfigDefault = Record<string, any>;

// TODO:
// Fix strange behaviour with T value of `get` and `update` methods.
// Expected: intellisense works well and i can see possible values of the object
// Actual: intellisense doesn't work at all, i can't see any values, but i can't pass another value that isn't in the object.
export class ConfigManager<T extends ConfigDefault = ConfigDefault> {
    private config: T;

    /**
     * Constructor
     */
    public constructor(config: T) {
        this.config = {
            ...config
        };
    }

    /**
     * Returns the value of key
     */
    public get<K extends keyof T>(key: K): T[K] {
        return this.config[key];
    }

    /**
     * Updates the value of key
     */
    public update<K extends keyof T>(key: K, value: T[K]): void {
        if (!this.config[key] || this.config[key] === value)
            return;

        this.config[key] = value;
    }

    /**
     * Returns custom tag
     */
    public get [Symbol.toStringTag](): string {
        return this.constructor.name;
    }
};
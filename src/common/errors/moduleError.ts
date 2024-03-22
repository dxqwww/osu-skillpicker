import { PickerError } from "./error";

export class ModuleInitializingError extends PickerError {

    /**
     * Constructor
     */
    public constructor(message: string) {
        super(message);
    }
}

export class ModuleHeartbeatError extends PickerError {

    /**
     * Constructor
     */
    public constructor(message: string) {
        super(message);
    }
}
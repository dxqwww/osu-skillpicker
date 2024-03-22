export class PickerError extends Error {

    /**
     * Constructor
     */
    public constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }
}
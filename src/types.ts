import { IRenderOptions } from "./render";

export type Constructor<T = object> = new (...args: any[]) => T;

export type PickerOptions = IRenderOptions;
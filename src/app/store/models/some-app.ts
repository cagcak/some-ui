import { StoreOptions } from '@ngxs/store/src/symbols';

export namespace SomeApp {
  export const NAME = 'SomeAppState';
  export const DEFAULTS = {
    users: [],
  } as State;

  export const OPTIONS = {
    name: NAME,
    defaults: DEFAULTS,
  } as StoreOptions<State>;

  export interface State {
    users: User[];
  }

  export interface User {
    id?: number;
    name: string;
    email: string;
    phonenumber?: string;
    countryCode?: string;
    text?: string;
  }
}

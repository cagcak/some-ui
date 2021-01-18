import { StoreOptions } from '@ngxs/store/src/symbols';

export namespace Session {
  export const NAME = 'SessionState';
  export const DEFAULTS = {
    user: null,
  } as State;

  export const OPTIONS = {
    name: NAME,
    defaults: DEFAULTS,
  } as StoreOptions<State>;

  export interface State {
    user: UserLogin;
  }

  export interface UserLogin {
    id?: number;
    name: string;
    email: string;
    password: string;
  }
}

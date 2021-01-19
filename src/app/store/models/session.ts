import { StoreOptions } from '@ngxs/store/src/symbols';

export namespace Session {
  export const NAME = 'SessionState';
  export const DEFAULTS = {
    user: null,
    lang: 'en-US',
  } as State;

  export const OPTIONS = {
    name: NAME,
    defaults: DEFAULTS,
  } as StoreOptions<State>;

  export interface State {
    user: UserLogin;
    lang: AppLanguages;
  }

  export interface UserLogin {
    id?: number;
    name: string;
    email: string;
    password?: string;
  }

  export type AppLanguages = 'tr-TR' | 'en-US';
}

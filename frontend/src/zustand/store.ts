import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';
import { AXIOS_INSTANCE } from '../../orval/api/custom-instance';
import { User } from '../../orval/model';

interface StoreInterface {
  setAccessToken: (accessToken: string) => void;
  accessToken: string | null;
  axiosRun: (token: string) => void;
  setProfile: (profile: User) => void;
  profile: User | null;
  logout: () => void;
}

const getDefaultInitialState = () => ({
  accessToken: '',
  profile: null,
});

export type StoreType = ReturnType<typeof initializeStore>;

const zustandContext = createContext<StoreType | null>(null);

export const Provider = zustandContext.Provider;

export const useStore = <T>(selector: (state: StoreInterface) => T) => {
  const store = useContext(zustandContext);

  if (!store) throw new Error('Store is missing the provider');

  return useZustandStore(store, selector);
};

export const initializeStore = (
  preloadedState: Partial<StoreInterface> = {},
) => {
  return createStore<StoreInterface>((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    setAccessToken: (accessToken: string) => {
      set((state) => ({
        ...state,
        accessToken: accessToken,
      }));
      setCookie(null, 'accessToken', accessToken, { path: '/' });
    },
    axiosRun: (token: string) => {
      if (token) {
        AXIOS_INSTANCE.interceptors.request.use(function (config) {
          config.headers.Authorization = token ? `Token ${token}` : null;
          return config;
        });
      }
    },
    setProfile: (profile) => {
      set((state) => ({ ...state, profile: profile }));
    },
    logout: () => {
      set(() => ({ accessToken: null }));
      set(() => ({ profile: null }));
      destroyCookie(null, 'accessToken', { path: '/' });
    },
  }));
};

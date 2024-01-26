import { destroyCookie, setCookie } from 'nookies';
import { createContext, useContext } from 'react';
import { createStore, useStore as useZustandStore } from 'zustand';
import { AXIOS_INSTANCE } from '../../custom-instance';
import { PaginatedListingsList, User } from '../../orval/model';
import { usersMeRetrieve } from '../../orval/users/users';

interface StoreInterface {
  setAccessToken: (accessToken: string) => void;
  accessToken: string | null;
  axiosRun: (token: string) => void;
  setProfile: (token: string) => void;
  profile: User | null;
  featuredListings: PaginatedListingsList | null;
  setFeaturedListings: (list: PaginatedListingsList) => void;
  featuredListingsNumber: number; // Add this line
  setFeaturedPageNumber: (number: number) => void;

  logout: () => void;
}
const getDefaultInitialState = () => ({
  accessToken: '',
  profile: null,
  featuredListings: null,
  featuredListingsNumber: 1,
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
    setFeaturedPageNumber(number) {
      set((state) => ({
        ...state,
        featuredListingsNumber: number,
      }));
    },

    setFeaturedListings: (list: PaginatedListingsList) => {
      set((state) => ({
        ...state,
        featuredListings: {
          count: list?.count,
          next: list?.next,
          previous: list?.previous,
          results: [
            ...(state.featuredListings?.results || []),
            ...(list?.results || []),
          ],
        },
      }));
    },

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
    setProfile: async (token) => {
      if (token) {
        AXIOS_INSTANCE.interceptors.request.use(function (config) {
          config.headers.Authorization = token ? `Token ${token}` : null;
          return config;
        });
        const profile = await usersMeRetrieve();
        set((state) => ({ ...state, profile: profile }));
      }
    },
    logout: () => {
      set(() => ({ accessToken: null }));
      set(() => ({ profile: null }));
      destroyCookie(null, 'accessToken', { path: '/' });
    },
  }));
};

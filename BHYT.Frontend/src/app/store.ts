import { create } from "zustand";
import { getFromLocalStorage } from "../helpers/localStorage";

interface IToken {
  accessToken: string;
  expiredAt: string;
  refreshToken: string;
}

interface IAccount {
  id: string;
  username: string;
  userId: string;
}

interface IState {
  token: IToken | null;
  account: IAccount | null;
  setToken: (token: IToken | null) => void;
  setAccount: (account: IAccount | null) => void;
  resetAccountAndToken: () => void;
}

export const useStore = create<IState>()((set) => ({
  token: {
    accessToken: getFromLocalStorage("token"),
    expiredAt: getFromLocalStorage("expiredAt"),
    refreshToken: getFromLocalStorage("refreshToken"),
  },
  account: getFromLocalStorage("account"),
  setToken: (token) => set((state) => ({ ...state, token })),
  setAccount: (account) => set((state) => ({ ...state, account })),
  resetAccountAndToken: () => set((state) => ({ ...state, account: null, token: null })),
}));

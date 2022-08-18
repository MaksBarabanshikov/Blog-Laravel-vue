import { defineStore } from "pinia";

export type AuthStore = {
  token: string | null;
  adminToken: string | null;
};

export const useAuthStore = defineStore("auth-store", {
  state: () =>
    ({
      token: null,
      adminToken: null,
    } as AuthStore),
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setTokenAdmin(token: string) {
      this.adminToken = token;
    },
    logout() {
      this.token = null;
    },
    logoutAdmin() {
      this.adminToken = null;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
      },
    ],
  },
});

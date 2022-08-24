import { ITokenResponse } from "@/types/api";
import { useAuthStore } from "@/lib/stores/auth.store";
import router from "@/lib/router";

export function afterSuccessAuth(data: ITokenResponse) {
  const authStore = useAuthStore();
  authStore.setToken(data.plainTextToken);
  return router.push({ name: "blog" });
}

export function afterSuccessLogout() {
  const authStore = useAuthStore();
  authStore.logout();
  return router.push({ name: "auth" });
}

export function afterSuccessAdminLogin(data: ITokenResponse) {
  const authStore = useAuthStore();
  authStore.setTokenAdmin(data.plainTextToken);
  return router.push({ name: "AdminPanel" });
}

export function normalizeDate(createdAt: string) {
  const date = new Date(createdAt)

  return (
      ("0" + date.getDate()).slice(-2) +
      "." +
      ("0" + (date.getDate() + 1)).slice(-2) +
      "." +
      date.getFullYear()
  );
}

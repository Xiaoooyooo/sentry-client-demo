import createStore from "./createStore";

type User = {
  username: string;
  email: string;
  fullName: string;
};

export const useUserStore = createStore<{
  user: User | null;
  login: (user: User) => void;
  auth: () => void;
}>((set) => ({
  user: null,
  login(user: User) {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  auth() {
    const user = localStorage.getItem("user");
    if (user) {
      set({ user: JSON.parse(user) as User });
    }
  },
}));

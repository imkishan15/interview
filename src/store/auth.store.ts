import { create } from "zustand";
import { User } from "../utils/util";

type AuthState = {
  auth: User | null;
  users: User[];
  login: (user: User) => void;
  signUp: (user: User) => string | null;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set, get) => ({
  auth: JSON.parse(sessionStorage.getItem("auth") || "null"),
  users: JSON.parse(sessionStorage.getItem("users") || "[]"),

  login: (user) => {
    const users = get().users;
    const existingUser = users.find((inputUser) => inputUser.username === user.username);

    if (!existingUser) {
      alert("User not found");
      return;
    }

    if (existingUser.password !== user.password) {
      alert("Wrong password");
      return;
    }

    sessionStorage.setItem("auth", JSON.stringify(existingUser));
    set({ auth: existingUser });
  },

  signUp: (user) => {
    const users = get().users;
    const existingUser = users.find(
      (userInput) => userInput.username === user.username
    );

    if (existingUser) {
      return "Username already exists";
    }

    const updatedUsers = [...users, user];
    sessionStorage.setItem("users", JSON.stringify(updatedUsers));
    set({ users: updatedUsers });
    return null;
  },

  logout: () => {
    sessionStorage.removeItem("auth");
    set({ auth: null });
  },
}));

export default useAuthStore;

import { create } from "zustand";
import { User } from "../utils/util";
import { getHashedPassword } from "../utils/methods";

type AuthState = {
  auth: User | null;
  users: User[];
  login: (user: User) => void;
  signUp: (user: User) => string | null;
  logout: () => void;
};

const useAuthStore = create<AuthState>((set, get) => ({
  auth: JSON.parse(localStorage.getItem("auth") || "null"),
  users: JSON.parse(localStorage.getItem("users") || "[]"),

  login: (user) => {
    const users = get().users;
    const existingUser = users.find(
      (inputUser) => inputUser.username === user.username
    );

    if (!existingUser) {
      alert("User not found");
      return;
    }

    if (existingUser.password !== getHashedPassword(user.password)) {
      alert("Wrong password");
      return;
    }

    localStorage.setItem("auth", JSON.stringify(existingUser));
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
    const newUser = {
      username: user.username,
      password: getHashedPassword(user.password),
    };
    const updatedUsers = [...users, newUser];
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    set({ users: updatedUsers });
    return null;
  },

  logout: () => {
    localStorage.removeItem("auth");
    set({ auth: null });
  },
}));

export default useAuthStore;

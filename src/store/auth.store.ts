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
  
  login: (userInput) => {
    const users = get().users;
    const existingUser = users.find((user) => user.username === userInput.username);

    if (!existingUser) {
      alert("User not found");
      return;
    }

    if (existingUser.password !== getHashedPassword(userInput.password)) {
      alert("Wrong password");
      return;
    }

    localStorage.setItem("auth", JSON.stringify(existingUser));
    set({ auth: existingUser });
  },

  signUp: (userInput) => {
    const users = get().users;
    const existingUser = users.find((user) => user.username === userInput.username);

    if (existingUser) {
      return "Username already exists";
    }

    const newUser = {
      username: userInput.username,
      password: getHashedPassword(userInput.password),
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

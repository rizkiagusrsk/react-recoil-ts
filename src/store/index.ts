import { atom } from "recoil";

export const userData = atom({
  key: "user",
  default: {
    username: "",
    password: "",
  },
});

export const listPokemon = atom({
  key: "pokemon",
  default: [],
});

export const isMobile = atom({
  key: "isMobile",
  default: window.innerWidth < 1024,
});

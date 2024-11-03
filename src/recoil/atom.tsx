import { atom } from "recoil";

export const activeButtonState = atom<string>({
  key: "activeButtonState",
  default: "mainpage",
});

export const activeAdminbuttonState = atom<string>({
  key: "activeAdminButtonState",
  default: "adminpdf",
});

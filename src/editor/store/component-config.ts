import {create} from "zustand";
import type {ComponentConfig} from "../interface";

interface State {
  componentConfig: {[key: string]: ComponentConfig};
}

interface Action {
  setComponentConfig: (componentConfig: State["componentConfig"]) => void;
}

export const useComponentConfigStore = create<State & Action>((set) => ({
  componentConfig: {},
  setComponentConfig: (componentConfig) => set({componentConfig}),
}));

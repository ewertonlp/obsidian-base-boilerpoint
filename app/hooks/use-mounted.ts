import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
const getSnapshot = () => true; // No cliente, sempre retorna true
const getServerSnapshot = () => false; // No servidor, sempre retorna false

export function useMounted() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
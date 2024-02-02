import { beforeEach, describe, expect, test } from "vitest";
import storage from "./Storage";

const localStorageMock = (() => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let store = {} as any;
  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: string) {
      store[key] = value.toString();
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Should set and get an item", () => {
    const key = "testKey";
    const value = { a: 1, b: 2 };
    expect(storage.set(key, value)).toBeTruthy();
    expect(storage.get(key)).toEqual(value);
  });

  test("Should remove an item", () => {
    const key = "testKey";
    storage.set(key, { a: 1 });
    expect(storage.remove(key)).toBeTruthy();
    expect(storage.get(key)).toBeNull();
  });

  test("Should remove multiple items", () => {
    const keys = ["key1", "key2", "key3"];
    keys.forEach((key) => storage.set(key, { value: key }));
    expect(storage.removeMultiple(keys)).toBeTruthy();
    keys.forEach((key) => expect(storage.get(key)).toBeNull());
  });

  test("Should get an item that does not exist", () => {
    expect(storage.get("nonExisting")).toBeNull();
  });

  test("Should set a falsy value", () => {
    expect(storage.set("testFalsy", false)).toBeTruthy();
    expect(storage.get("testFalsy")).toBe(false);
  });
});

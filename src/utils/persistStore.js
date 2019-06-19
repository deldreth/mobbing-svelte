export default function persistStore(store, key) {
  if (typeof localStorage !== "undefined") {
    const json = localStorage.getItem(key);
    if (json) {
      store.set(JSON.parse(json));
    }

    store.subscribe(state => {
      localStorage.setItem(key, JSON.stringify(state));
    });
  }

  return store;
}

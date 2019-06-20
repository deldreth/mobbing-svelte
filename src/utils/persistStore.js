export default function persistStore(store, key) {
  if (typeof localStorage !== "undefined") {
    const json = localStorage.getItem(key);
    if (json) {
      let rehydrate = false;
      const parsedStore = JSON.parse(json);
      const unsubscribe = store.subscribe(state => {
        if (parsedStore.version === state.version) {
          rehydrate = true;
        }
      });
      unsubscribe();

      if (rehydrate) {
        store.set(parsedStore);
      }
    }

    store.subscribe(state => {
      localStorage.setItem(key, JSON.stringify(state));
    });
  }

  return store;
}

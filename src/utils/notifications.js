export async function displayNotification(body, opts = {}) {
  if (Notification.permission === "granted") {
    const serviceWorker = await navigator.serviceWorker.getRegistration();

    serviceWorker.showNotification("Mobbing", { opts, body });
  }
}

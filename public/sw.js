self.addEventListener('push', event => {
  const data = event.data?.json() || {};
  self.registration.showNotification(data.title || "New Notification", {
    body: data.body || "Hello from Service Worker!",
  });
});

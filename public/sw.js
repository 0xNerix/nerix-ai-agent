self.addEventListener('push', function (event) {
  if (event.data) {
    const data = event.data.json()
    const options = {
      body: data.body,
      icon: data.icon || '/android-icon-192x192.png',
      badge: '/android-icon-96x96.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '2',
        url: data.url || '/',
      },
      actions: [
        {
          action: 'open',
          title: 'Open App'
        }
      ]
    }
    
    // Show browser notification
    event.waitUntil(self.registration.showNotification(data.title, options))
    
    // Signal in-app notification center to reload (authenticated users only)
    event.waitUntil(
      clients.matchAll().then(function(clientList) {
        clientList.forEach(function(client) {
          client.postMessage({
            type: 'RELOAD_NOTIFICATIONS',
            timestamp: Date.now()
          })
        })
      })
    )
  }
})

self.addEventListener('notificationclick', function (event) {
  console.log('Notification click received.')
  event.notification.close()
  
  const url = event.notification.data?.url || '/'
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (let i = 0; i < clientList.length; i++) {
        const client = clientList[i]
        if (client.url === url && 'focus' in client) {
          return client.focus()
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})

self.addEventListener('install', function(event) {
  console.log('Service Worker installing.')
  self.skipWaiting()
})

self.addEventListener('activate', function(event) {
  console.log('Service Worker activating.')
  event.waitUntil(self.clients.claim())
})
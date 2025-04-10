import useNotificationsReducer from '../stores/NotificationsReducer';

const SubscribeToPush = async (
  postData,
  title = 'Default Title',
  body = 'Default Body'
) => {
  const register = await navigator.serviceWorker.register('/sw.js'); // Make sure sw.js exists

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(
      'BA5bdfv4wdGLDbU7CsJKubTEVQZ030xjSho7s4zGSwz8xwdTz8lq3qjspv36OlxQaINiOPOkaQ48srOT7XEAKZE'
    ),
  });

  console.log('Subscription:', JSON.stringify(subscription));

  if (typeof postData === 'function') {
    postData({
      subscription,
      title,
      body,
    });
  }

  // // Send subscription + custom message
  // await fetch(
  //   'https://106fhpm5-5000.inc1.devtunnels.ms/api/v1/notifications/send',
  //   {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       subscription,
  //       title,
  //       body,
  //     }),
  //     headers: { 'Content-Type': 'application/json' },
  //   }
  // );
};

export default SubscribeToPush;

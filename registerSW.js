if('serviceWorker' in navigator) {window.addEventListener('load', () => {navigator.serviceWorker.register('/vite-react-pricing/sw.js', { scope: '/vite-react-pricing/' })})}
import Echo from "laravel-echo";
import Pusher from 'pusher-js';

const echo = new Echo({
    broadcaster: 'reverb',
    key: 'n0yio342pjj34u5ua96t',
    wsHost: "192.168.193.80",
    wsPort: 8080,
    forceTLS: false,
    encrypted: true,
    disableStats: true,
});

export default echo;
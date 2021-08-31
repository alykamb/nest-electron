import {contextBridge, ipcRenderer} from 'electron'
declare const module: any;

contextBridge.exposeInMainWorld(
    "api", {
        send: (channel, data) => {
            // whitelist channels
            let validChannels = ["asynchronous-reply", "asynchronous-message"];
            if (validChannels.includes(channel)) {
                ipcRenderer.send(channel, data);
            }
        },
        receive: (channel, func) => {
            let validChannels =  ["asynchronous-reply", "asynchronous-message"];
            if (validChannels.includes(channel)) {
                // Deliberately strip event as it includes `sender` 
                ipcRenderer.on(channel, (event, ...args) => func(...args));
            }
        },
    }
);

// console.log('here again a adaw ctdawdt')
// console.log('here again a adaw ctdawdt')
// // if (
// //     module.hot.data
// //   ) {
//     // module.hot.invalidate();
// //   } else {
//     module.hot.dispose(() => {
//         console.log('here')
//         ipcRenderer.emit('dispose-preload')
//     });
//     // module.hot.accept();
// //   }
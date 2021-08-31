// Modules to control application life and create native browser window
import { app, BrowserWindow, protocol, session } from 'electron'
import axios from 'axios'
import { lookup } from 'mime-types'
import { extname, join, resolve, isAbsolute } from 'path'
import { bootstrap } from './app/app'
import * as ElectronConfig from 'electron-config'
import 'reflect-metadata'

const config = new ElectronConfig()

declare const module: any;

function createWindow () {
  // Create the browser window.

  
  const mainWindow = new BrowserWindow({
    show: false,
    width: 800,
    height: 600,
    webPreferences: {        
      preload: join(__dirname, 'preload.js')
    },
    ...config.get('winBounds')
  })

  // and load the index.html of the app.
  mainWindow.loadFile(resolve(__dirname, '../index.html'))
  mainWindow.once('ready-to-show', mainWindow.show)

  ;['focus', 'maximize', 'unmaximize', 'restore', 'resize' , 'move', 'close'].forEach((e) => {
    mainWindow.on(e as any, () => {
      config.set('winBounds', mainWindow.getBounds())
    })
  })


  // Open the DevTools.
  mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(bootstrap).then(() => {

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
        callback({
          responseHeaders: {
            ...details.responseHeaders,
            'Content-Security-Policy': ['default-src \'self\' \'unsafe-inline\' \'unsafe-eval\' http://localhost:3002 ws://localhost:3002' ]
          }
        })
      })

    // protocol.interceptFileProtocol('file', (request, callback) => {
    //     console.log(request, callback)
    //     const p = request.url.substring(7)
    //     if(isAbsolute(p)) {
    //         if(p.startsWith('/src')) {
    //             void axios(`http://localhost:3002/${p.slice(1)}`, {
    //                 method: 'GET',
    //                 responseType: 'stream'
    //             }).then((response) => {
    //                 console.log({data: response.data, mimeType: response.headers['content-type']})
    //                 callback({data: response.data, mimeType: response.headers['content-type']})
    //             })
    //             // console.log(p, join(__dirname, '../../client', p))
               
    //             // return                
    //         } else {

    //             callback({url: request.url})
    //         }
    //         // return
    //     }
    // })
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

//  if (module.hot) {
//      console.log(module.hot)
//     // module.hot.accept('main', function() {
//     //     console.log('Accepting the updated main module!');
//     // //  printMe();
//     // })
// }

// const VALUE = 'constant';

// export default VALUE;

// if (
//   module.hot.data &&
//   module.hot.data.value &&
//   module.hot.data.value !== VALUE
// ) {
//     console.log(1)
//     module.hot.invalidate();
// } else {
//     console.log(2)
//     module.hot.dispose((data) => {
//         console.log(3)
//         console.log(app, data)
//         if (process.platform !== 'darwin') 
//         // module.hot.data.app = app
//     });
    // console.log(4)
//   module.hot.accept();
// }



if (module && module.hot) {
    // module.hot.accept(['./app/app'], (data) => {
    //     console.log(bootstrap, data)
    //     // if (y !== oldY) {
    //     //   This can't be handled, bubble to parent
    //     //   module.hot.accept();
    //       return;
    //     }
    //     // This can be handled
    //     // processX(x);
    //   );
    //   module.hot.decline(
    //     ['./app/app'] // Either a string or an array of strings
    //   );
    // module.hot.accept();
    // module.hot.dispose(async () => {
    //   console.log('disposing module');
    //   console.log(app)
    //   app.exit()
    //   app.relaunch()
    //   console.log('has closed app');
    // });
  }

// if (module.hot) {
//     // Comment or remove the line below
//     // module.hot.accept();
//     // Keep the disposal logic!
//     module.hot.dispose(_data => {
//         if (process.platform !== 'darwin') app.quit()
//     });
// }
// module.hot.dispose((data) => {
    // console.log('here')
// //     if (process.platform !== 'darwin') app.quit()
//     // return {}
// // });
// // module.hot.decline();
// // console.log('here')

// // 
// // if (
// //   module.hot.data &&
// //   module.hot.data.value&&
// //   module.hot.data.value !== VALUE
// // ) {
//   module.hot.invalidate();
// // } else {
// // module.hot.dispose((data) => {
//     console.log('===================================')
    
// //     console.log(VALUE, data.value)
// //     data.value = {};
// //     if (process.platform !== 'darwin') app.quit()
// // });
// //   module.hot.accept();
// // }

// export default app
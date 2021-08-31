import { Module, OnModuleInit } from "@nestjs/common";
import { ipcMain } from "electron";
import { AppController } from "./app.controller";

@Module({
    controllers: [AppController]
})
export class AppModule implements OnModuleInit {
    onModuleInit() {
        console.log('here')
    }
    onApplicationBootstrap() {
        ipcMain.on('asynchronous-message', (event, arg) => {
            console.log(arg) // prints "ping"
            event.reply('asynchronous-reply', 'pong')
          })

        console.log('hello there')
    }
}
import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
declare const module: any;


export async function bootstrap(): Promise<void> {
    const app = await NestFactory.createApplicationContext(AppModule)
    await app.init()

    console.log('here')
    if (module.hot) {
        module.hot.accept();
        module.hot.dispose(() => {
            app.close()
        });
    }
    
}


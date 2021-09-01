import { Controller } from '@nestjs/common'

@Controller()
export class AppController {
    public a() {
        return true
    }

    public b() {
        return this.a()
    }
}

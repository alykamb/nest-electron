import { Controller } from "@nestjs/common";

@Controller()
export class AppController {
    a() {
        return true
    }

    b() {
        return this.a()
    }
}
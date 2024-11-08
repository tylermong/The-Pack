"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const prisma_module_1 = require("./prisma/prisma.module");
const user_module_1 = require("./user/user.module");
const coach_module_1 = require("./coach/coach.module");
const announcements_module_1 = require("./announcements/announcements.module");
const auth_module_1 = require("./auth/auth.module");
const prisma_service_1 = require("./prisma/prisma.service");
const class_module_1 = require("./classes/class.module");
const userClasses_module_1 = require("./userClasses/userClasses.module");
const scheduling_module_1 = require("./scheduling/scheduling.module");
const config_1 = require("@nestjs/config");
const chatroom_module_1 = require("./chatroom/chatroom.module");
const messages_module_1 = require("./messages/messages.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true }), prisma_module_1.PrismaModule, user_module_1.UserModule, coach_module_1.CoachModule,
            announcements_module_1.AnnouncementsModule, class_module_1.ClassModule, userClasses_module_1.userClassesModule, scheduling_module_1.schedulingModule, auth_module_1.AuthModule, chatroom_module_1.ChatroomModule, messages_module_1.MessagesModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
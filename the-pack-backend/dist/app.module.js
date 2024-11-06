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
const classes_module_1 = require("./classes/classes.module");
const userClasses_module_1 = require("./userClasses/userClasses.module");
const scheduling_module_1 = require("./scheduling/scheduling.module");
const userExerciseTracker_module_1 = require("./userExerciseTracker/userExerciseTracker.module");
const userNutritionTracker_module_1 = require("./userNutritionTracker/userNutritionTracker.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, user_module_1.UserModule, coach_module_1.CoachModule,
            announcements_module_1.AnnouncementsModule, classes_module_1.ClassesModule, userClasses_module_1.userClassesModule, scheduling_module_1.schedulingModule, auth_module_1.AuthModule,
            userNutritionTracker_module_1.NutritionTrackerModule, userExerciseTracker_module_1.ExerciseTrackerModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
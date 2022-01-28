import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './logical/user/user.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { LoginController } from './logical/login/login.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController, UserController, LoginController],
  providers: [AppService],
})
export class AppModule {}

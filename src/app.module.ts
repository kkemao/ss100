import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './logical/user/user.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { LoginController } from './logical/login/login.controller';
import { FileController } from './logical/file/file.controller';
import { FileModule } from './logical/file/file.module';

@Module({
  imports: [UserModule, AuthModule, FileModule],
  controllers: [AppController, UserController, LoginController, FileController],
  providers: [AppService],
})
export class AppModule {}

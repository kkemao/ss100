import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './logical/user/user.controller';
import { AppService } from './app.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { LoginController } from './logical/login/login.controller';
import { FileController } from './logical/file/file.controller';
import { FileModule } from './logical/file/file.module';
import { LabelController } from './logical/label/label.controller';
import { LabelModule } from './logical/label/label.module';
import { QuestionController } from './logical/question/question.controller';
import { QuestionModule } from './logical/question/question.module';
import { ArticleController } from './logical/article/article.controller';
import { ArticleModule } from './logical/article/article.module';
import { DashboardModule } from './logical/dashboard/dashboard.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    FileModule,
    LabelModule,
    QuestionModule,
    ArticleModule,
    DashboardModule,
  ],
  controllers: [
    AppController,
    UserController,
    LoginController,
    FileController,
    LabelController,
    QuestionController,
    ArticleController,
  ],
  providers: [AppService],
})
export class AppModule {}

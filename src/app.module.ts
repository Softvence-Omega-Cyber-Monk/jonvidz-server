import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './module/user/user.module';
import { AuthModule } from './module/auth/auth.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
     ConfigModule.forRoot({ isGlobal: true }),
      PrismaModule,
      UserModule,
      AuthModule,
   
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

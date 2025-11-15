import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      secret: 'YOUR_SECRET_KEY', // <-- এটিকে একটি এনভায়রনমেন্ট ভেরিয়েবল (.env) থেকে নেওয়া উচিত
      signOptions: { expiresIn: '1h' }, // টোকেনটি কতক্ষণ বৈধ থাকবে
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../../../common/jwt.constants';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    //console.log("payload----->", payload);
    const user = await this.prisma.user.findUnique({
      where: { id: payload?.sub },
      include:{staff:true,patient:true}
    });
    //console.log("user found", user);
    if (!user?.id) {
      throw new NotFoundException('User with this ID does not exist.');
    }

    return user; // this becomes req.user in your controllers
  }
}

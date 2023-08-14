import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UtilsService } from 'src/utils/utils.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private utilsService: UtilsService
  ) { }

  async signIn(id, pass) {
    const user = await this.usersService.findOne(id);

    if (!user) {
      throw new NotFoundException();
    }
    const passwordsMatched = await this.utilsService.comparePasswords(pass, user?.password)
    if (!passwordsMatched) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.name };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
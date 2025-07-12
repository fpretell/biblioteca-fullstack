import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // // Ruta login que usa LocalStrategy para validar usuario
  // @UseGuards(LocalAuthGuard)
  // @Post('login')
  // async login(@Request() req) {
  //   // Si pasa el guard, req.user está seteado con el usuario validado
  //   return this.authService.login(req.user);
  // }

  @Post('login')
    @ApiOperation({ summary: 'Iniciar sesión' })
    async login(@Body() loginDto: LoginDto) {
      const user = await this.authService.validateUser(loginDto.email, loginDto.password);
      if (!user) {
        return { message: 'Credenciales inválidas' };
      }

      return this.authService.login(user);
    }
}

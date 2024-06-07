import { UsuarioService } from './../../usuario/usuario.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface UsuarioPayload {
  sub: string;
  nomeUsuario: string;
  email: string;
}

@Injectable()
export class AutenticacaoService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, senhaInserida: string) {
    const usuario = await this.usuarioService.buscaPorEmail(email);

    const usuarioFoiAutenticado = await bcrypt.compare(
      senhaInserida,
      usuario.senha,
    );

    if (!usuarioFoiAutenticado) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const payload: UsuarioPayload = {
      sub: usuario.id,
      nomeUsuario: usuario.nome,
      email: usuario.email,
    };

    return {
      token_acesso: await this.jwtService.signAsync(payload),
    };
  }

  async validateAccessToken(accessToken: string) {
    return await this.jwtService.verify(accessToken, {
      secret: process.env.SEGREDO_JWT || undefined,
    });
  }

  async decodeToken(accessToken) {
    return await this.jwtService.decode(accessToken);
  }
}

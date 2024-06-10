import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AutenticacaoGuard } from '../autenticacao.guard';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDTO } from './dto/autentica.dto';
import { RequisicaoComUsuario } from '../autenticacao.guard';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  login(@Body() { email, senha }: AutenticaDTO) {
    return this.autenticacaoService.login(email, senha);
  }

  @Get('session')
  @UseGuards(AutenticacaoGuard)
  getSession(@Req() req: RequisicaoComUsuario) {
    return req.usuario;
  }
}

import {
  Controller,
  Post,
  Body,
  Get,
  Headers,
  UseGuards,
  Req,
} from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDTO } from './dto/autentica.dto';
import { AutenticacaoGuard, RequisicaoComUsuario } from '../autenticacao.guard';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  login(@Body() { email, senha }: AutenticaDTO) {
    return this.autenticacaoService.login(email, senha);
  }

  @Get('session')
  async criaSession(
    @Req() req: RequisicaoComUsuario,
    @Headers('Authorization') acessToken: string,
  ) {
    const token = acessToken.split(' ')[1];
    return (
      this.autenticacaoService.validateAccessToken(token),
      this.autenticacaoService.decodeToken(token)
    );
  }
}

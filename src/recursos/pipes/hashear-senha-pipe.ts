import { ConfigService } from '@nestjs/config';
import { PipeTransform, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashearSenhaPipe implements PipeTransform {
  constructor(private configService: ConfigService) {}

  async transform(senha: string) {
    const sal = this.configService.get<string>('SAL_SENHA');

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const senhaHasheada = await bcrypt.hash(senha, sal!);

    return senhaHasheada;
  }
}

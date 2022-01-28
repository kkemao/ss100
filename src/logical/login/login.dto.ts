import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDTO {
  @ApiProperty({ description: '用户名', example: 'zengkefan1' })
  @IsNotEmpty({ message: '用户名不能为空' })
  readonly accountName: string;
  @ApiProperty({ description: '密码不能为空', example: '123456' })
  @IsNotEmpty({ message: '密码不能为空' })
  readonly password: string;
}

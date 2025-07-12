import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import type { CreationAttributes } from 'sequelize';
import { Usuario } from './entities/usuario.model';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectModel(Usuario)
    private usuarioModel: typeof Usuario,
  ) {}

  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioModel.findOne({ where: { email } });
  }

  async findById(id: number): Promise<Usuario | null> {
    return this.usuarioModel.findByPk(id);
  }

  async register(dto: CreateUserDto) {
  const existing = await this.usuarioModel.findOne({ where: { email: dto.email } });
  if (existing) throw new ConflictException('Email ya registrado');

  const hashedPassword = await bcrypt.hash(dto.password, 10);

  // Armo el objeto con los datos para crear el usuario
  const data = {
    email: dto.email,
    password: hashedPassword,
    nombre: dto.nombre,
  };

  // Casteo explícito a Partial<Usuario> para que TypeScript no lance error
  const user = await this.usuarioModel.create(data as unknown as CreationAttributes<Usuario>);


  // Excluyo password de la respuesta
  const { password, ...result } = user.toJSON();
  return result;
}


}

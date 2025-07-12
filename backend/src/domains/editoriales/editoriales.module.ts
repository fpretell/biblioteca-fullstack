import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Editorial } from './entities/editorial.model';
import { EditorialesService } from './editoriales.service';
import { EditorialesController } from './editoriales.controller';

@Module({
  imports: [SequelizeModule.forFeature([Editorial])],
  controllers: [EditorialesController],
  providers: [EditorialesService],
})
export class EditorialesModule {}

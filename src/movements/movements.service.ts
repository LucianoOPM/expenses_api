import { Injectable } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { type PrismaService } from '@/prisma.service';

@Injectable()
export class MovementsService {
  constructor(protected readonly prismaService: PrismaService) {}
  create(createMovementDto: CreateMovementDto) {
    return 'This action adds a new movement';
  }

  findAll() {
    this.prismaService.movments.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} movement`;
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    return `This action updates a #${id} movement`;
  }

  remove(id: number) {
    return `This action removes a #${id} movement`;
  }
}

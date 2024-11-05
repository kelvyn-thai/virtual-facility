import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
  Inject,
} from '@nestjs/common';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Building } from './entities/building.entity';
import { Repository } from 'typeorm';
import { CreateWorkflowDto } from '@app/workflows';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BuildingsService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Building)
    private readonly buildingsRepository: Repository<Building>,
    @Inject('workflows-service') private client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  async create(createBuildingDto: CreateBuildingDto) {
    const building: Building = this.buildingsRepository.create({
      ...createBuildingDto,
    });

    const newBuildingEntity: Building =
      await this.buildingsRepository.save(building);

    console.log('creating workflow for building', newBuildingEntity.id);
    await this.createWorkflow(newBuildingEntity.id);

    return newBuildingEntity;
  }

  async findAll(): Promise<Building[]> {
    return await this.buildingsRepository.find();
  }

  async findOne(id: number): Promise<Building | null> {
    return await this.buildingsRepository.findOneBy({ id });
  }

  async update(id: number, updateBuildingDto: UpdateBuildingDto) {
    const foundBuilding: Building | null =
      await this.buildingsRepository.findOneBy({ id });
    if (!foundBuilding) {
      throw new BadRequestException('Can not find this building');
    }
    await this.buildingsRepository.update(id, updateBuildingDto);
  }

  async remove(id: number) {
    return this.buildingsRepository.delete(id);
  }

  async createWorkflow(buildingId: number) {
    await lastValueFrom(
      this.client.send({ cmd: 'workflows.create' }, {
        name: 'My Workflow',
        buildingId,
      } as CreateWorkflowDto),
    );
  }

  async calcTotalBuildings() {
    let result: number;
    try {
      const pattern = { cmd: 'sum' };
      const payload = [1, 2, 3];
      result = await lastValueFrom(this.client.send<number>(pattern, payload));
    } catch (error) {
      console.error('error', error);
    } finally {
      this.client.emit('user_created', { userId: 1, name: 'Kelvyn Thai' });
    }
    return result;
  }
}

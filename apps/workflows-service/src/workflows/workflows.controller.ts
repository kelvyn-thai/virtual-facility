import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/workflows';
import { WorkflowsService } from './workflows.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('workflows')
export class WorkflowsController {
  constructor(private readonly workflowsService: WorkflowsService) {}

  private readonly logger = new Logger(WorkflowsController.name);

  @MessagePattern('workflows.create')
  create(@Payload() createWorkflowDto: CreateWorkflowDto) {
    this.logger.debug('workflows.created message pattern', {
      createWorkflowDto,
    });

    return this.workflowsService.create(createWorkflowDto);
  }

  @Get()
  findAll() {
    return this.workflowsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.workflowsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWorkflowDto: UpdateWorkflowDto,
  ) {
    return this.workflowsService.update(+id, updateWorkflowDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.workflowsService.remove(+id);
  }
}

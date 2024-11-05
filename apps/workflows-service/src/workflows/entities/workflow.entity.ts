import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'workflows' })
export class Workflow {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  buildingId: number;
}

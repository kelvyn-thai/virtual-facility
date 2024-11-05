import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'buildings' })
export class Building {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
}

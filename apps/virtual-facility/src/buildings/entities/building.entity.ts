import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';

@Entity()
export class Building {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}

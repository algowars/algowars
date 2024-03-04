import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProblemInitialInputs {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  label: string;

  @Column({ nullable: false, unique: true })
  input: string;
}

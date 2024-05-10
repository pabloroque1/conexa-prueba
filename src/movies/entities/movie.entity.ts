import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @Column()
  title: string;

  @Column()
  episode_id: number;

  @Column()
  director: string;

  @Column()
  producer: string;

  @Column()
  release_date: string;
}

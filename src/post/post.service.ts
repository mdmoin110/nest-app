import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { PostGetAllInterface } from './interfaces/postGetAll.interface';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
  ) { }

  async findAll(take: number, skip: number): Promise<PostGetAllInterface> {

    const [result, total] = await this.postRepository.findAndCount(
      {
        order: { id: "DESC" },
        take: take,
        skip: skip
      }
    );

    return { result: result, total: total }
  }

  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({ where: { id } });
  }

  async create(user: Partial<Post>): Promise<Post> {
    const newuser = this.postRepository.create(user);
    return this.postRepository.save(newuser);
  }

  async update(id: number, user: Partial<Post>): Promise<Post> {
    await this.postRepository.update(id, user);
    return this.postRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<any> {
    return this.postRepository.delete(id);
  }
}
import {
  Body, Controller, Get, Post, Put, Delete, UseGuards, Param, BadRequestException, Query,
  InternalServerErrorException
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';
import { PostInterface } from './interfaces/post.interface';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostDeleteInterface } from './interfaces/postDelete.interface';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostGetAllInterface } from './interfaces/postGetAll.interface';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags, ApiQuery } from '@nestjs/swagger';

@ApiTags('Post Module')
@Controller('post')
@UseGuards(AuthGuard)
@ApiBearerAuth('JWT-auth')
export class PostController {
  constructor(private postService: PostService) { }

  @Post()
  @ApiOperation({ summary: 'create new post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          example: 'complaint',
          description: 'this is the title'
        },
        description: {
          type: 'string',
          example: 'order not yet delivered',
          description: 'this is the description'
        },
        status: {
          type: 'boolean',
          example: true,
          description: 'this is the status'
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: CreatePostDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async create(@Body() postData: CreatePostDto) {
    try {
      return this.postService.create(postData);
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @ApiOperation({ summary: 'get all records' })
  @ApiQuery({
    name: 'page',
    type: 'integer',
    description: 'enter page umber',
    required: true
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    description: 'enter limit umber',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: CreatePostDto,
    isArray: true
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  @Get()
  async findAll(@Query() query): Promise<PostGetAllInterface> {
    try {
      const take = query.limit || 10
      const skip = (query.page - 1) * query.limit || 0

      let { result, total } = await this.postService.findAll(take, skip);

      return { result, total }
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'get the record' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'fetched the record',
    type: UpdatePostDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async findOne(@Param('id') id: number): Promise<PostInterface> {
    try {
      return this.postService.findOne(id);
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  @Put()
  @ApiOperation({ summary: 'update existing post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 5,
          description: 'this is unique id',
        },
        title: {
          type: 'string',
          example: 'test',
          description: 'this is the name'
        },
        description: {
          type: 'string',
          example: 'test',
          description: 'this is the password'
        },
        status: {
          type: 'boolean',
          example: 'test',
          description: 'this is the password'
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: UpdatePostDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async update(@Body() postData: UpdatePostDto): Promise<PostInterface> {
    try {
      let { id, ...rest } = postData
      return this.postService.update(id, rest);
    } catch (error) {
      throw new InternalServerErrorException()
    }

  }


  @ApiOperation({ summary: 'update existing post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 5,
          description: 'this is unique id',
        },
        title: {
          type: 'string',
          example: 'test',
          description: 'this is the name'
        },
        description: {
          type: 'string',
          example: 'test',
          description: 'this is the password'
        },
        status: {
          type: 'boolean',
          example: 'test',
          description: 'this is the password'
        },
      }
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        raw: {
          type: 'array',
          example: [],
          description: 'this is the raw data'
        },
        affected: {
          type: 'number',
          example: 1,
          description: 'this is the number of rows affected',
        },

      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized'
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<PostDeleteInterface> {
    try {
      return this.postService.delete(id);
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}

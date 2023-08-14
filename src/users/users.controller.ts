import {
  Controller, Get, Post, Body, Put, Param, Delete,
  NotFoundException, HttpStatus, HttpException,
  InternalServerErrorException, HttpCode
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { UserDataDto } from './dto/user-data.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UtilsService } from 'src/utils/utils.service';

@ApiTags('User Module')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private utilsService: UtilsService) { }

  //get all users
  @Get()
  @ApiOperation({ summary: 'create new user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: UserDataDto,
    isArray: true,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async findAll(): Promise<User[]> {
    try {

      return this.usersService.findAll();
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }

  //create user
  @HttpCode(HttpStatus.CREATED)
  @Post()
  @ApiOperation({ summary: 'create new user' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'moin',
          description: 'this is the name'
        },
        email: {
          type: 'string',
          example: 'md@gmail.com',
          description: 'this is the email'
        },
        password: {
          type: 'string',
          example: 'mypass123',
          description: 'this is the password'
        },
      }
    }
  })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          example: 5,
          description: 'this is unique id',
        },
        name: {
          type: 'string',
          example: 'moin',
          description: 'this is the name'
        },
        email: {
          type: 'string',
          example: 'md@gmail.com',
          description: 'this is the email'
        },
        password: {
          type: 'null',
          example: null,
          description: 'this is empty password'
        },
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async create(@Body() user: UserDataDto): Promise<User> {
    try {
      user.password = await this.utilsService.encodePassword(user.password)
      const result = await this.usersService.create(user);
      result.password = null
      return result
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
      }
      else {
        throw new InternalServerErrorException()
      }
    }
  }

  //delete user
  @Delete(':id')
  @ApiOperation({ summary: 'delete the user' })
  @ApiParam({
    name: 'id',
    type: 'integer',
    description: 'enter unique id',
    required: true
  })
  @ApiResponse({
    status: 200,
    description: 'deleted the record'
  })
  @ApiResponse({
    status: 404,
    description: 'User does not exist!'
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error'
  })
  async delete(@Param('id') id: number): Promise<string> {
    //handle error if user does not exist
    try {
      const user = await this.usersService.delete(id);
      if (!user) {
        throw new NotFoundException('User does not exist!');
      }
      return 'deleted the record'
    } catch (error) {
      throw new InternalServerErrorException()
    }
  }
}

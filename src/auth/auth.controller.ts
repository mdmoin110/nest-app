import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Post,
    Request,
    UseGuards,
    InternalServerErrorException
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth Module')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    @ApiOperation({ summary: 'get authentication token' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    example: 5,
                    description: 'this is unique id',
                },
                password: {
                    type: 'string',
                    example: 'pass123',
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
                access_token: {
                    type: 'string',
                    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjExLCJ1c2VybmFtZSI6Im1vaW4iLCJpYXQiOjE2OTE5MzU0OTMsImV4cCI6MTY5MTk0MTQ5M30.skqcX3OJ4Wfw1YPBkfsGmCjTMymiV5NrFlWXaRPHH5k',
                    description: 'this is token',
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
        status: 404,
        description: 'Not Found'
    })
    signIn(@Body() signInDto: Record<string, string>) {
        try {
            return this.authService.signIn(signInDto.id, signInDto.password);
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
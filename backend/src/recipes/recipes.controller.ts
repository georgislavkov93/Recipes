import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Public, User } from 'src/decorators';
import { IUpdateRecipe } from 'src/interfaces/recipe.interface';
import { IUser } from 'src/interfaces/user.interface';
import { CreateRecipeDto } from './recipes.dto';
import { RecipesService } from './recipes.service';

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Public()
  @Get('')
  async getAll() {
    return this.recipesService.getAll();
  }

  @Get('/by-user')
  async getByUser(@User() user: IUser) {
    return this.recipesService.getByUser(user);
  }

  @Public()
  @Get('/user/:id')
  async getByUserId(@Param() params: { id: string }) {
    return this.recipesService.getByUserId(params.id);
  }

  @Public()
  @Get('/:id')
  async getById(@Param() params: { id: string }) {
    return this.recipesService.getById(params.id);
  }

  @Post('')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename(req, file, cb) {
          cb(
            null,
            `${new Date().getMonth()}${new Date().getDate()}${
              file.originalname
            }`,
          );
        },
      }),
    }),
  )
  async create(
    @Body() data: CreateRecipeDto,
    @UploadedFile() file: Express.Multer.File,
    @User() user: IUser,
  ) {
    return this.recipesService.create(data, file, user);
  }

  @Put('/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './public',
        filename(req, file, cb) {
          cb(
            null,
            `${new Date().getMonth()}${new Date().getDate()}${
              file.originalname
            }`,
          );
        },
      }),
    }),
  )
  async update(
    @Param() params: { id: string },
    @UploadedFile() file: Express.Multer.File,
    @Body() data: IUpdateRecipe,
    @User() user: IUser,
  ) {
    return this.recipesService.update(params.id, data, user, file);
  }

  @Delete('/:id')
  async delete(@Param() params: { id: string }, @User() user: IUser) {
    return this.recipesService.delete(params.id, user);
  }
}

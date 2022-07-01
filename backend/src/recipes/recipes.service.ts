import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { IRecipe, IUpdateRecipe } from 'src/interfaces/recipe.interface';
import { IUser } from 'src/interfaces/user.interface';
import { CreateRecipeDto } from './recipes.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll(): Promise<IRecipe[]> {
    const recipes: IRecipe[] = await this.prisma.recipes.findMany({
      include: { user: true },
    });
    return recipes;
  }

  async getById(id: string): Promise<IRecipe> {
    const recipe: IRecipe = await this.prisma.recipes.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    if (!recipe) throw new HttpException('The recipe does not exist', 404);

    return recipe;
  }

  async getByUser(user: IUser): Promise<IRecipe[]> {
    const currentUser: IUser = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
      include: {
        role: true,
      },
    });

    let recipes!: IRecipe[];

    if (currentUser.role.role === 'admin') {
      recipes = await this.prisma.recipes.findMany({
        include: {
          user: true,
        },
      });
    } else {
      recipes = await this.prisma.recipes.findMany({
        where: {
          userId: currentUser.id,
        },
        include: {
          user: true,
        },
      });
    }

    if (!recipes)
      throw new HttpException('The user does not have recipes', 404);

    return recipes;
  }

  async getByUserId(id: string): Promise<IRecipe[]> {
    const recipes: IRecipe[] = await this.prisma.recipes.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
      },
    });

    if (!recipes)
      throw new HttpException('The user does not have recipes', 404);

    return recipes;
  }

  async create(
    data: CreateRecipeDto,
    file: Express.Multer.File,
    user: IUser,
  ): Promise<IRecipe> {
    const currentUser: IUser = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    const recipe: IRecipe = await this.prisma.recipes.create({
      data: {
        ...data,
        image: file.filename,
        user: {
          connect: {
            id: currentUser.id,
          },
        },
      },
    });

    return recipe;
  }

  async update(
    id: string,
    data: IUpdateRecipe,
    user: IUser,
    files?: Express.Multer.File,
  ): Promise<IRecipe> {
    const recipe: IRecipe = await this.prisma.recipes.findFirst({
      where: {
        id,
        // user,
      },
    });

    if (!recipe)
      throw new HttpException(
        'The recipe does not exist or do not have permission to update',
        404,
      );

    const { file, ...obj } = data;

    const updateRecipe: IRecipe = await this.prisma.recipes.update({
      where: {
        id: recipe.id,
      },
      data: {
        ...obj,
        image: files ? files.filename : recipe.image,
      },
    });
    return updateRecipe;
  }

  async delete(id: string, user: IUser) {
    const recipe: IRecipe = await this.prisma.recipes.findFirst({
      where: {
        id,
        // user,
      },
    });

    if (!recipe)
      throw new HttpException(
        'The recipe does not exist or do not have permission to delete',
        404,
      );

    await this.prisma.recipes.delete({
      where: {
        id,
      },
    });

    throw new HttpException('The recipe has been deleted successfully', 201);
  }
}

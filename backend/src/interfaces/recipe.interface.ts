export interface IRecipe {
  id?: string;
  name: string;
  description: string;
  preparation_time: string;
  level: string;
  serves: string;
  userId: string;
  image: string;
}

export interface IUpdateRecipe {
  name?: string;
  description?: string;
  preparation_time?: string;
  file: Express.Multer.File;
}

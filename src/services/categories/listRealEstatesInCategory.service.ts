import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Category } from "../../entities";

const listRealEstatesInCategory = async (categoryId: string) => {

  const categoryRepository: Repository<Category> =
    AppDataSource.getRepository(Category);

    const findRealEstatesInCategory = await categoryRepository.findOne({
        where: {
          id: Number(categoryId)
        },
        relations: {
          realEstate: true,
        },
      });

  return findRealEstatesInCategory;
};

export { listRealEstatesInCategory };

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { RealEstate } from "../../entities";

const listSchedulesInRealEstate = async (realEstateId: number) => {

  const realEstateRepository = AppDataSource.getRepository(RealEstate)

  const findRealEstates = await realEstateRepository.findOneBy({
    id: (realEstateId),
  });

  if (!findRealEstates) {
    throw new AppError("RealEstate not found", 404);
  }

    const findSchedulesInRealEstate = await realEstateRepository.findOne({
      where:{id:realEstateId},
        relations: {
          address: true,
          category: true,
          schedules: {
            user: true,
          },
        },
      });

  return findSchedulesInRealEstate;
};

export { listSchedulesInRealEstate };

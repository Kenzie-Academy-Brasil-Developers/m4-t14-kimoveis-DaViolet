import { IRealEstate, IRealEstateReturn } from '../../interfaces/realEstate.interfaces'
import { AppDataSource } from '../../data-source'
import { AppError } from '../../errors'
import { RealEstate } from '../../entities'
import { Address } from '../../entities'
import { Category } from '../../entities'
import { Repository } from 'typeorm'
import { returnRealEstateSchema } from '../../schemas/realEstate.schema'
import { returnCategorySchema } from '../../schemas/category.schema'
import { returnAddressSchema } from '../../schemas/address.schema'

const createRealEstateService = async (realEstateData: IRealEstate): Promise<IRealEstateReturn> => {

    const realEstateRepository: Repository<RealEstate> = AppDataSource.getRepository(RealEstate)

    const addressRepository: Repository<Address> = AppDataSource.getRepository(Address)

    const categoryRepository: Repository<Category> = AppDataSource.getRepository(Category)

    const newCategory = await categoryRepository.findOne({
        where: {
            id: realEstateData.categoryId
        }
    })

    const newAddress: Address = addressRepository.create(realEstateData.address)

    const category = returnCategorySchema.parse(newCategory)

    await addressRepository.save(newAddress)

    const address = returnAddressSchema.parse(newAddress)

    const realEstate: RealEstate = realEstateRepository.create({
        ...realEstateData,
        address,
        category
        //
    });

    await realEstateRepository.save(realEstate)
    
    const newRealEstate = returnRealEstateSchema.parse(realEstate)
    
    return newRealEstate

}

export default createRealEstateService
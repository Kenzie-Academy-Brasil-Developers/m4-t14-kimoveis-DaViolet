import { createRealEstateSchema, returnRealEstateSchema, allRealEstatesSchema, returnRealEstateWithoutRelationsSchema } from '../schemas/realEstate.schema'
import { z } from 'zod'

type IRealEstate = z.infer<typeof createRealEstateSchema>
type IRealEstateReturn = z.infer<typeof returnRealEstateSchema>
type IRealEstates = z.infer<typeof allRealEstatesSchema>
type IRealEstateWithoutRelationsReturn = z.infer<typeof returnRealEstateWithoutRelationsSchema>

export {
    IRealEstate,
    IRealEstateReturn,
    IRealEstates,
    IRealEstateWithoutRelationsReturn
}
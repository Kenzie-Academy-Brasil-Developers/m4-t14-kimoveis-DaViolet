import { Request, Response } from "express";
import { ICategory } from "../interfaces/category.interfaces";
import { createCategoryService } from "../services/categories/createCategory.service";
import { listCategoriesService } from "../services/categories/listCategories.service";
import { listRealEstatesInCategory } from "../services/categories/listRealEstatesInCategory.service";

const createCategoryController = async (req: Request, res: Response) => {
    const categoryData: ICategory = req.body
    const newCategory = await createCategoryService(categoryData)

    return res.status(201).json(newCategory)

}

const listCategoriesController = async (req: Request, res: Response) => {
    
    const categories = await listCategoriesService()

    return res.json(categories)

}

const listRealEstatesInCategoryController = async (req: Request, res: Response) => {
    
    const categoryId = String(req.params.id)

    const realEstatesInCategory = await listRealEstatesInCategory(categoryId)

    return res.json(realEstatesInCategory)

}

export { createCategoryController, listCategoriesController, listRealEstatesInCategoryController };

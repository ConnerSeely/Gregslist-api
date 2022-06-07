import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors"
import { dbContext } from "../db/DbContext.js"

class CarsService {

    async getAll(query = {}) {
        return await dbContext.Cars.find(query).populate('creator', 'name picture')
    }

    async getById(id) {
        const car = await dbContext.Cars.findById(id).populate('creator', 'name picture')
        if (!car) {
            throw new BadRequest("Invalid Car Id")
        }
        return car
    }

    async create(body) {
        const car = await dbContext.Cars.create(body)
        return car
    }

    async edit(update) {
        let original = await this.getById(update.id)
        if (original.creatorId.toString() != update.creatorId) {
            throw new Forbidden("You cannot edit a car you didn't post")
        }

        original.make = update.make || original.make
        original.model = update.model || original.model
        original.year = update.year || original.year
        original.price = update.price || original.price
        original.imgUrl = update.imgUrl || original.imgUrl
        original.description = update.description || original.description

        await original.save()

        return original
    }
    async remove(id, userId) {
        const car = await this.getById(id)
        if (car.creatorId.toString() != userId) {
            throw new Forbidden("Can't remove this car")
        }
        await car.remove()
    }

}

export const carsService = new CarsService()

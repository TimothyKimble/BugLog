import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class BugsService {
  async getAll(query = {}) {
    const bugs = await dbContext.Bugs.find(query).populate('creator')
    return bugs
  }

  async getOne(id, userId) {
    const bug = await dbContext.Bugs.findById(id, userId).populate('creator')
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    return bug
  }

  async edit(body) {
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: false, runValidators: true })
    if (!bug) {
      throw new BadRequest('invalid Id')
    }
    return bug
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }
}
export const bugsService = new BugsService()

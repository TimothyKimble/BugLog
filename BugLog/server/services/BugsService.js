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

  async getNotesIn(query = {}) {
    const notes = await dbContext.Notes.find(query)
    if (!notes) {
      throw new BadRequest('Invalid Id')
    }
    return notes
  }

  async edit(body) {
    const bug = await dbContext.Bugs.findByIdAndUpdate(body.id, body, { new: false, runValidators: true })
    if (!bug) {
      throw new BadRequest('invalid Id')
    }
    if (bug.closed) {
      throw new BadRequest('This bug is closed')
    }
    return bug
  }

  async create(body) {
    const bug = await dbContext.Bugs.create(body)
    return await dbContext.Bugs.findById(bug._id).populate('creator', 'name picture')
  }

  async close(id, body) {
    const bug = await this.getOne(id)
    if (!bug) {
      throw new BadRequest('Invalid Id')
    }
    if (bug.closed === true) {
      throw new BadRequest('This bug is already closed')
    }
    body.closed = true
    const closed = await dbContext.Bugs.findByIdAndUpdate(id, body)
    return closed
  }
}
export const bugsService = new BugsService()

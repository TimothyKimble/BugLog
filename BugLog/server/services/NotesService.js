import { dbContext } from '../db/DbContext'
import { BadRequest, Forbidden } from '../utils/Errors'
class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return await dbContext.Notes.findById(note._id)
      .populate('creator', 'name picture')
  }

  async destroy(id, body) {
    const note = await dbContext.Notes.findById(id)
    if (!note) {
      throw new BadRequest('Invalid Id')
    }
    if (note.creatorId.toString() !== body.creatorId) {
      throw new Forbidden('Not Your Bug')
    }
    return await dbContext.Notes.findByIdAndDelete(id)
  }
}
export const notesService = new NotesService()

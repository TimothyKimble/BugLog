import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  async create(body) {
    const note = await dbContext.Notes.create(body)
    return note
  }
}
export const notesService = new NotesService()

import { dbContext } from '../db/DbContext'
import { BadRequest } from '../utils/Errors'
class NotesService {
  async getAll(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('Bug')
    return notes
  }

  async getAllByBugId(query = {}) {
    const notes = await dbContext.Notes.find(query).populate('creator')
    return notes
  }

  async create(body) {
    const note = await dbContext.Notes.create(body)
    return note
  }
}
export const notesService = new NotesService()

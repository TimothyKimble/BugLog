import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'
import Pop from '../utils/Notifier'

class NotesService {
  async getAllNotesInBug(id) {
    const res = await api.get('api/bugs/' + id + '/notes')
    logger.log(res.data)
    AppState.notes = res.data
  }

  async createNote(newNote, id) {
    try {
      const res = await api.post('api/notes', newNote)
      this.getAllNotesInBug(id)
      return res.data
    } catch (error) {
      Pop.toast('Problem Creating Note', 'error')
    }
  }

  async destroyNote(id, bugId) {
    try {
      if (await Pop.confirm()) {
        await api.delete('api/notes/' + id)
        this.getAllNotesInBug(bugId)
        await Pop.toast('You removed this note', 'success')
      }
    } catch (error) {
      logger.log(error, 'error')
    }
  }
}

export const notesService = new NotesService()

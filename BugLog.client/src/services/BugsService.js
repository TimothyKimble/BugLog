import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'
import Pop from '../utils/Notifier'

class BugsService {
  async getAllBugs(query = {}) {
    const res = await api.get('api/bugs' + convertToQuery(query))
    AppState.bugs = res.data
  }

  async getOneBug(id) {
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
  }

  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      AppState.activeBug = res.data
      this.getAllBugs()
      return res.data.id
    } catch (error) {
      logger.log('Could Not Make Bug', error)
    }
  }

  async editBug(newBug, id) {
    await api.put('api/bugs/' + id, newBug)
    this.getAllBugs()
  }

  async closeBug(id) {
    try {
      if (Pop.confirm === true) {
        await api.delete('api/bugs/' + id)
        this.getAllBugs()
      }
    } catch (error) {
      logger.log(error, error)
    }
  }
}
export const bugsService = new BugsService()

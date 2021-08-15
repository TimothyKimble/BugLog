import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import { convertToQuery } from '../utils/Query'

class BugsService {
  async getAllBugs(query = {}) {
    const res = await api.get('api/bugs' + convertToQuery(query))
    AppState.bugs = res.data
  }

  async getOneBug(id) {
    console.log(id)
    const res = await api.get('api/bugs/' + id)
    AppState.activeBug = res.data
    console.log(res.data)
  }

  async createBug(newBug) {
    try {
      const res = await api.post('api/bugs', newBug)
      this.getAllBugs()
    } catch (error) {
      logger.log('Could Not Make Bug', error)
    }
  }
}
export const bugsService = new BugsService()

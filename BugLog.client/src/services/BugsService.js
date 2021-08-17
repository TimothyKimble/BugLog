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
      Pop.toast('Could Not Make Bug', 'error')
    }
  }

  async editBug(id, bug) {
    try {
      const res = await api.put('api/bugs/' + id, bug)
      AppState.activeBug = res.data
      this.getOneBug(res.data.id)
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }

  async closeBug(id) {
    try {
      if (await Pop.confirm()) {
        await api.delete('api/bugs/' + id)
        this.getOneBug(id)
        await Pop.toast('You Smashed This Bug!', 'success')
      }
    } catch (error) {
      Pop.toast(error, 'error')
    }
  }
}
export const bugsService = new BugsService()

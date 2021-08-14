import BaseController from '../utils/BaseController'
import { Auth0Provider } from '@bcwdev/auth0provider'
import { notesService } from '../services/NotesService'

export class NotesController extends BaseController {
  constructor() {
    super('api/notes')
    this.router
      .get('', this.getAll)
      .get('/:id', this.getAllById)
    // NOTE: Beyond this point all routes require Authorization tokens (the user must be logged in)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.create)
  }

  async getAll(req, res, next) {
    try {
      const notes = await notesService.getAll({ creatorId: req.userInfo.id })
      res.send(notes)
    } catch (error) {
      next(error)
    }
  }

  async getAllById(req, res, next) {
    try {
      const note = await notesService.getAllByBugId(req.params.bugId)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      req.body.creatorId = req.userInfo.id
      const note = await notesService.create(req.body)
      res.send(note)
    } catch (error) {
      next(error)
    }
  }
}

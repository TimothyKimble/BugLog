<template>
  <div class="row m-0 w-100 BugsDetailsPage d-flex justify-content-center bugsBackground">
    <div class="col-md-11  my-3 texthadow">
      <div class="row m-0 w-100 bg-warning text-light textShadow CardShadowing">
        <div class="col-md-12 p-0">
          <h4 class="m-1">
            Title
          </h4>
          <h2>{{ bug.title }}</h2>
          <div class="d-flex row w-100 m-0 my-2 justify-content-between">
            <div class="p-1 col-md-2 d-flex justify-content-center flex-column align-items-center">
              <img class="rounded-pill w-50 p-0" :src="bug.creator?.picture" alt="">
              <h5 class="mt-2">
                Reported By: {{ bug.creator?.name }}
              </h5>
            </div>
            <div class="col-md-3 green p-0 d-flex justify-content-center align-items-center" v-if="bug.closed === true">
              <h1>This Bug Is Completed!</h1>
            </div>
            <div class="col-md-3 d-flex justify-content-around flex-column align-items-center" v-if="bug.closed === false">
              <h4 class="">
                Updated At: {{ new Date (bug.updatedAt).toLocaleString('en-US') }}
              </h4>
              <h4>Status: <span class="green">Open</span></h4>
            </div>
            <div class="col-md-3 d-flex justify-content-around flex-column align-items-center" v-else>
              <h5 class="">
                Updated At: {{ new Date (bug.updatedAt).toLocaleString('en-US') }}
              </h5>
              <h4>Status: <span class="red">Closed</span></h4>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-0 w-100 my-4 d-flex justify-content-end bg-secondary textShadow CardShadowing">
        <div class="col-md-12 p-0 scrollDescription border border-dark">
          <h4>Bug Description</h4>
          <h5 class="p-2">
            {{ bug.description }}
          </h5>
        </div>
        <div class="col-md-3 p-0 mt-3 d-flex justify-content-around" v-if="account.id === bug.creator?.id && bug.closed === false">
          <button @click="closeBug" class="btn btn-danger" aria-label="Close Bug Button">
            <h6>Squish Bug</h6>
          </button>
          <button class="btn btn-info" data-toggle="modal" data-target="#editModal">
            <h6>Edit Bug</h6>
          </button>
        </div>
      </div>
      <div class="row m-0 w-100 bg-warning text-light textShadow CardShadowing d-flex justify-content-center">
        <div class="col-md-2 d-flex justify-content-around align-items-center" v-if="bug.closed === false">
          <h5>Add Note</h5>
          <button class="btn btn-success rounded-pill" data-toggle="modal" data-target="#noteModal" aria-label="Add Note Button">
            +
          </button>
        </div>
        <div class="col-md-2 d-flex justify-content-around align-items-center">
          <h5>Notes</h5>
        </div>
      </div>
      <div class="row m-0 w-100 my-1 text-light textShadow d-flex justify-content-center scrollDescription">
        <NotesThread :notes="notes" />
      </div>
    </div>
  </div>
  <!-- Edit Bug Modal -->
  <div class="modal fade"
       id="editModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Edit Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6>Reported By {{ bug.creator?.name }}</h6>
          <form @submit.prevent="editBug">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     v-model="state.editedBug.title"
                     placeholder="Title..."
                     id="title"
                     name="title"
                     class="form-control"
              >
              <label for="description">Description</label>
              <textarea v-model="state.editedBug.description"
                        placeholder="Description..."
                        class="form-control"
                        name="description"
                        id="description"
                        rows="3"
                        minlength="3"
                        required
              ></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close Modal for Changing Bug">
              Close
            </button>
            <button type="submit" class="btn btn-primary" aria-label="Save Changes to Bug">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <!-- Note Modal -->
  <div class="modal fade"
       id="noteModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Add Note
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createNote">
            <div class="form-group">
              <label for="body">Enter Your Note Here!</label>
              <input type="text"
                     v-model="state.newNote.body"
                     placeholder="Note..."
                     id="body"
                     name="body"
                     class="form-control"
              >
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close Note Modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary" aria-label="Save Note">
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'
import $ from 'jquery'
import { AuthService } from '../services/AuthService'

export default {
  name: 'BugsDetailsPage',
  setup() {
    const route = useRoute()
    const bug = computed(() => AppState.activeBug)
    const state = reactive({
      editedBug: {},
      newNote: {}
    })
    onMounted(async() => {
      try {
        const id = route.params.id

        await bugsService.getOneBug(id)
      } catch (error) {
        Pop.toast('Taken to New Bug', 'success')
      }
      try {
        const id = route.params.id

        await notesService.getAllNotesInBug(id)
      } catch (error) {
        Pop.toast('Couldnt get notes', 'error')
      }
    })
    return {
      bug,
      state,
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      id: route.params.id,
      async closeBug() {
        try {
          await bugsService.closeBug(route.params.id)
        } catch (error) {
          Pop.toast('It was Too Big', 'error')
        }
      },
      async editBug() {
        try {
          await bugsService.editBug(route.params.id, state.editedBug)
          $('#editModal').modal('hide')
        } catch (error) {
          Pop.toast('Failed to Edit', 'error')
        }
      },
      async createNote() {
        if (AuthService.isAuthenticated) {
          try {
            state.newNote.bugId = route.params.id
            await notesService.createNote(state.newNote, route.params.id)
            state.newNote = {}
            $('#noteModal').modal('hide')
            Pop.toast('You Made a Note!', 'success')
          } catch (error) {
            Pop.toast('Could Note Create Note', 'error')
          }
        } else {
          Pop.toast('You Must Log In', 'error')
          $('noteModal').modal('hide')
        }
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.green{
  color: green;
}

.red {
  color: red;
}

.scrollDescription {
  overflow-y: scroll;
  max-height: 35vh;
}

.bugsBackground {
background-image: url(https://cutewallpaper.org/21/bugs-wallpaper/Cute-Bug-Wallpapers-Top-Free-Cute-Bug-Backgrounds-.jpg);
background-size: cover;
}

.bugs{
  background: #1c92d2;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #f2fcfe, #1c92d2);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #f2fcfe, #1c92d2); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.CardShadowing {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.textShadow {
    text-shadow: black 1px 1px;
}
</style>

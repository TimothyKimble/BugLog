<template>
  <div class="bugs row w-100 m-0">
    <div class="col-md-12 p-4">
      <div class="row m-0 w-100 d-flex justify-content-between">
        <div class="col-md-3 p-0">
          <h3>Bugs</h3>
        </div>
        <div class="col-md-3 p-0 d-flex align-items-center justify-content-end">
          <button class="btn btn-success" data-toggle="modal" data-target="#reportModal">
            <h6>Report</h6>
          </button>
        </div>
        <div class="col-md-12 p-3">
          <div class="row w-100 m-0 mt-2 d-flex justify-content-between align-items-center">
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <h5>Title</h5>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <h5>Reported By</h5>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <div class="row m-0 w-100 d-flex align-items-center">
                <h5 class="col-md-6 p-0">
                  Status
                </h5>
                <button class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-sort-down"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <div class="row m-0 w-100 d-flex align-items-center">
                <h5 class="col-md-9 p-0">
                  Last Modified
                </h5>
                <button class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-sort-down"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row m-0 w-100 d-flex justify-content-between scrollDescription">
            <BugThread :bugs="bugs" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div class="modal fade"
       id="reportModal"
       tabindex="-1"
       role="dialog"
       aria-labelledby="modelTitleId"
       aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Create New Bug
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <h6>Reported By {{ account.name }}</h6>
          <form @submit.prevent="createBug">
            <div class="form-group">
              <label for="title">Title</label>
              <input type="text"
                     v-model="state.newBug.title"
                     placeholder="Title..."
                     id="title"
                     name="title"
                     class="form-control"
              >
              <label for="description">Description</label>
              <textarea v-model="state.newBug.description"
                        placeholder="Description..."
                        class="form-control"
                        name="description"
                        id="description"
                        rows="3"
                        minlength="3"
                        required
              ></textarea>
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">
              Close
            </button>
            <button type="submit" class="btn btn-primary">
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
import $ from 'jquery'
import { AuthService } from '../services/AuthService'
import { useRouter } from 'vue-router'
export default {
  name: 'BugsPage',
  setup() {
    const router = useRouter()
    const state = reactive({
      newBug: {}
    })
    onMounted(async() => {
      try {
        await bugsService.getAllBugs()
      } catch (error) {
        Pop.toast(error, 'error')
      }
    })
    return {
      state,
      bugs: computed(() => AppState.bugs),
      account: computed(() => AppState.account),
      user: computed(() => AppState.user),
      async createBug() {
        if (AuthService.isAuthenticated) {
          try {
            const res = await bugsService.createBug(state.newBug)
            state.newBug = {}
            $('#reportModal').modal('hide')
            router.push({ name: 'BugDetailsPage', params: { id: res } })
            Pop.toast('You Made A Bug!', 'success')
          } catch (error) {
            Pop.toast('You Made It!', 'success')
          }
        } else {
          Pop.toast('You Must Log In', 'error')
          $('#reportModal').modal('hide')
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
  max-height: 72.5vh;
}
</style>

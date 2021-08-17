<template>
  <div class="bugs row w-100 m-0 bugs">
    <div class="col-md-12 p-4 ">
      <div class="row m-0 w-100 d-flex justify-content-end bugsBackground CardShadowing">
        <div class="col-md-12 p-0 text-center">
          <h1 class="p-3">
            Bugs
          </h1>
        </div>
        <div class="col-md-1 p-0 d-flex align-items-center justify-content-end">
          <button class="btn btn-success m-3" data-toggle="modal" data-target="#reportModal" aria-label="Create Bug" v-if="user.isAuthenticated">
            <h5 class="">
              Report
            </h5>
          </button>
        </div>
        <div class="col-md-12 p-3">
          <div class="row w-100 m-0 mt-2 d-flex justify-content-between align-items-center bg-warning text-light textShadow">
            <div class="col-md-3 p-0 d-flex align-items-center justify-content-center ">
              <h4>Title</h4>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center justify-content-center">
              <h4>Reported By</h4>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <div class="row m-0 w-100 d-flex align-items-center">
                <h4 class="col-md-6 p-0 text-center">
                  Status
                </h4>
                <button @click="filterByOpen" class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-circle green" aria-label="get Open Bugs"></i>
                </button>
                <button @click="filterByClosed" class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-circle red" aria-label="get Closed Bugs"></i>
                </button>
                <button @click="getAllBugs" class=" col-md-2 p-0 btn btn-outline-info">
                  <i class="fas fa-circle blue" aria-label="get All Bugs"></i>
                </button>
              </div>
            </div>
            <div class="col-md-3 p-0 d-flex align-items-center ">
              <div class="row m-0 w-100 d-flex align-items-center justify-content-center">
                <h4 class="col-md-4 p-0">
                  Last Modified
                </h4>
              </div>
            </div>
          </div>
          <div class="row m-0 w-100 d-flex justify-content-between scrollDescription">
            <BugThread :bugs="bugs" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-md-12 p-0 text-center">
      <h1>Report Bugs So We Can Squish Them!</h1>
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
      },
      async  filterByOpen() {
        await bugsService.getAllBugs()
        AppState.bugs = AppState.bugs.filter(b => b.closed === false)
        return AppState.bugs
      },
      async filterByClosed() {
        await bugsService.getAllBugs()
        AppState.bugs = AppState.bugs.filter(b => b.closed === true)
        return AppState.bugs
      },
      async filterByDate() {
        AppState.bugs = AppState.bugs.sort(Date)
        return AppState.bugs
      },
      async getAllBugs() {
        await bugsService.getAllBugs()
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

.blue {
  color: blue
}

.scrollDescription {
  overflow-y: scroll;
  max-height: 72.5vh;
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

.minBugPageHeight {
  min-height: 80vh;
}
</style>

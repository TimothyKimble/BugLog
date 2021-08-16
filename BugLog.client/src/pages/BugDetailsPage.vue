<template>
  <div class="row m-0 w-100 BugsDetailsPage">
    <div class="col-md-12 p-3">
      <div class="row m-0 w-100">
        <div class="col-md-12 p-0">
          <p class="m-1">
            Title
          </p>
          <h2>{{ bug.title }}</h2>
          <div class="d-flex row w-100 m-0 my-2 justify-content-between">
            <h5 class="p-1 col-md-6">
              Reported By: {{ bug.creator?.name }}
            </h5>
            <div class="col-md-3 d-flex justify-content-end" v-if="bug.closed === false">
              <h4>Status: <span class="green">Open</span></h4>
            </div>
            <div class="col-md-3 d-flex justify-content-end" v-else>
              <h4>Status: <span class="red">Closed</span></h4>
            </div>
          </div>
        </div>
      </div>
      <div class="row m-0 w-100 my-4 d-flex justify-content-end">
        <div class="col-md-12 p-0 scrollDescription border border-dark">
          <p class="p-2">
            {{ bug.description }}
          </p>
        </div>
        <div class="col-md-1 col-1 p-0  border border-dark">
          <button @click="closeBug" class="btn btn-danger">
            <h6>Squish Bug</h6>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { bugsService } from '../services/BugsService'
import { logger } from '../utils/Logger'
import { useRoute } from 'vue-router'

export default {
  name: 'BugsDetailsPage',
  setup() {
    const route = useRoute()
    const bug = computed(() => AppState.activeBug)
    onMounted(async() => {
      try {
        const id = route.params.id
        logger.log(id)
        await bugsService.getOneBug(id)
      } catch (error) {
        Pop.toast('Taken to New Bug', 'success')
      }
    })
    return {
      bug,
      account: computed(() => AppState.account),
      notes: computed(() => AppState.notes),
      id: route.params.id

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
  max-height: 25vh;
}
</style>

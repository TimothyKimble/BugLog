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
              Reported By: {{ bug.creator.name }}
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
      <div class="row m-0 w-100 my-4">
        <div class="col-md-12 p-0 scrollDescription border border-dark">
          <p class="p-2">
            {{ bug.description }}
          </p>
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
import { logger } from '../utils/Logger'
export default {
  props: {
    bug: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      time: '',
      newBug: {}
    })
    onMounted(() => {
      const old = new Date(props.bug.createdAt)
      state.time = old.toLocaleTimeString()
    })
    return {
      state,
      account: computed(() => AppState.account),
      createdDate: computed(() => {
        const d = new Date(props.bug.createdAt)
        return new Intl.DateTimeFormat('en-US').format(d)
        // new TimeAgo(d)
      })
    }
  }
}
</script>

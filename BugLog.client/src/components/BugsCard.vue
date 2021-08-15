<template>
  <div class="col-md-12 p-2">
    <div class="row w-100 m-0">
      <router-link class="col-md-3 p-0" :to="{name: 'BugDetailsPage', params: {id: bug.id}}">
        <h6>{{ bug.title }}</h6>
      </router-link>

      <div class="col-md-3 p-0">
        <h6>{{ bug.creator.name }}</h6>
      </div>
      <div class="col-md-3 p-0" v-if="bug.closed === false">
        <h6 class="green">
          Open
        </h6>
      </div>
      <div class="col-md-3 p-0" v-else>
        <h6 class="red">
          Closed
        </h6>
      </div>
      <div class="col-md-3 p-0">
        <h6>{{ bug.createdDate }}</h6>
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

<style scoped>
.green{
  color: green;
}

.red {
  color: red;
}
</style>

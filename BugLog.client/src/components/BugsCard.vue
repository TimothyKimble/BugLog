<template>
  <div class="col-md-12 p-3 m-3 bg-info grow">
    <div class="row w-100 m-0">
      <router-link class="col-md-3 p-0 text-light textShadow text-center" :to="{name: 'BugDetailsPage', params: {id: bug.id}}">
        <h5>{{ bug.title }}</h5>
      </router-link>

      <div class="col-md-3 p-0 textShadow text-center">
        <h5>{{ bug.creator.name }}</h5>
      </div>
      <div class="col-md-3 p-0 text-center" v-if="bug.closed === false">
        <h5 class="green textShadow">
          Open
        </h5>
      </div>
      <div class="col-md-3 p-0 text-center" v-else>
        <h5 class="red">
          Closed
        </h5>
      </div>
      <div class="col-md-3 p-0 textShadow text-center">
        <h5>{{ new Date (bug.updatedAt).toLocaleString('en-US') }}</h5>
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
        const d = new Date(props.bug.updatedAt)
        return new Intl.DateTimeFormat('en-US').format(d)
        // new TimeAgo(d)
      })

    }
  }
}
</script>

<style scoped>
.green{
  color: rgb(17, 247, 17);
}

.red {
  color: red;
}

.textShadow {
    text-shadow: black 1px 1px;
}

.textShadowLight{
  text-shadow: white 1px 1px
}
.grow {
transition: all .4s ease-in-out;
}
.grow:hover {
transform: scale(1.02);
}
</style>

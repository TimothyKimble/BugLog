<template>
  <div class="col-md-10 p-2 my-3 bg-secondary textShadow CardShadowing grow">
    <div class="row m-0 w-100">
      <div class="col-md-6 p-0 border border-dark">
        <h5 class="p-3">
          {{ note.body }}
        </h5>
      </div>

      <div class="col-md-4 p-0 text-break d-flex justify-content-center flex-column align-items-center">
        <img class="pictureWidth rounded-pill" :src="note.creator?.picture" alt="">
        <p class="">
          {{ note.creator?.name }}
        </p>
      </div>
      <div class="col-md-2 p-0 text-break d-flex align-items-center justify-content-center" v-if="account.id === note.creator?.id">
        <button class="btn btn-danger rounded-pill" @click="destroyNote">
          -
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from '@vue/runtime-core'
import { AppState } from '../AppState'
import Pop from '../utils/Notifier'
import { notesService } from '../services/NotesService'
import { logger } from '../utils/Logger'
export default {
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const state = reactive({

      newNote: {}
    })
    return {
      state,
      account: computed(() => AppState.account),
      async destroyNote() {
        try {
          if (AppState.activeBug.closed === false) {
            await notesService.destroyNote(props.note.id, props.note.bugId)
          } else {
            Pop.toast('This Bug is Closed', 'error')
          }
        } catch (error) {
          Pop.toast(error, 'error')
          logger.log(error)
        }
      }
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

.pictureWidth {
  width: 15%;
}
.CardShadowing {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px;
}

.textShadow {
    text-shadow: black 1px 1px;
}
.grow {
transition: all .4s ease-in-out;
}
.grow:hover {
transform: scale(1.02);
}
</style>

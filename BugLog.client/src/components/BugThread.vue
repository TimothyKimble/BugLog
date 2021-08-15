<template>
  <BugsCard v-for="b in bugs" :key="b.id" :bug="b" />
</template>

<script>
import BugsCard from '../components/BugsCard.vue'
export default {
  name: 'BugsThread',
  props: {
    bugs: {
      type: Object,
      required: true
    }
  },
  components: {
    BugsCard
  }
}
</script>

<style lang="scss" scoped>
aside {
    width: 40%;
    padding-left: .5rem;
    margin-left: .5rem;
    float: right;
    box-shadow: inset 5px 0 5px -5px #29627e;
    font-style: italic;
    color: #29627e;
}
aside > p {
    margin: .5rem;
}
p {
    font-family: 'Fira Sans', sans-serif;
}
</style>

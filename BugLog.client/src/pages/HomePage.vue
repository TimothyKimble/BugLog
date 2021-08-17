<template>
  <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center bugsBackground">
    <h1>Welcome To BugCoon!</h1>
    <h3>This is a bug logger for software applications! Click on BugsPage in the Navigation Bar to get started!</h3>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}
.bugsBackground {
background-image: url(https://cutewallpaper.org/21/bugs-wallpaper/Cute-Bug-Wallpapers-Top-Free-Cute-Bug-Backgrounds-.jpg);
background-size: cover;
}
</style>

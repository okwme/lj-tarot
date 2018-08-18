<template>
  <div class="card" :style="bg"/>
</template>

<script>
export default {
  name: 'Card',
  computed: {
    file () {
      return '/static/tarot/IMG_' + this.name.padStart(4, '0') + '.jpg'
    },
    bg () {
      return {'background-image': 'url(' + this.file + ')'}
    }
  },
  props: ['name', 'cards']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card {
height:100vh;
background-size: contain;
background-position:center center;
background-repeat: no-repeat;
}
</style>

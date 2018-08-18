<template>
  <div class="card" :style="bg"/>
</template>

<script>
export default {
  name: 'Card',
  data () {
    return {
      loaded: false,
      loading: '/static/loading.gif'
    }
  },
  watch: {
    name () {
      this.mount()
    }
  },
  mounted () {
    this.mount()
  },
  methods: {
    mount () {
      this.loaded = false
      let foo = new Image()
      foo.onload = () => {
        this.loaded = true
      }
      foo.onerror = () => {
        this.$router.push('/')
      }
      foo.src = this.bigname
    }
  },
  computed: {
    bigname () {
      return '/static/tarot/' + this.filename
    },
    smallname () {
      return '/static/tarot/JPEG/' + this.filename
    },
    filename () {
      return 'IMG_' + this.name.padStart(4, '0') + '.jpg'
    },
    bg () {
      return {
        filter: 'blur(' + (this.loaded ? 0 : 10) + 'px)',
        'background-image':
          'url(' + (this.loaded ? this.bigname : this.smallname) + ')'
      }
    }
  },
  props: ['name', 'cards']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card {
  height: 100vh;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transition: filter 300ms ease;
}
</style>

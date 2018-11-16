<template>
  <div>
    <div class="card" :style="bg"/>
    <div v-if="id" class="flex text">
      <u>{{title}}:</u><br>{{text}}
    </div>
  </div>
</template>

<script>
import tarots from '../../static/data.json'
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
      if (this.key > tarots.length || !this.id) {
        this.$router.push('/')
      }
      this.loaded = false
      let foo = new Image()
      foo.onload = () => {
        this.loaded = true
      }
      foo.onerror = (error) => {
        console.error(error)
        this.$router.push('/')
      }
      foo.src = this.bigname
    }
  },
  computed: {
    id () {
      return parseInt(this.name)
    },
    key () {
      return this.id - 1
    },
    flip () {
      return this.key % 2 === 1
    },
    card () {
      return this.id && tarots[this.key]
    },
    base () {
      let base = this.key % 2 === 0 ? this.key : this.key - 1
      return this.id && tarots[base]
    },
    bigname () {
      return '/static/tarot/' + this.filename
    },
    smallname () {
      return '/static/tarot/JPEG/' + this.filename
    },
    text () {
      return this.id && this.card.text
    },
    title () {
      return this.id && this.card.title
    },
    filename () {
      if (!this.id) return 'IMG_0000.jpg'
      return this.base.img
    },
    bg () {
      return {
        transform: this.flip ? 'scaleX(-1)' : 'scaleX(1)',
        filter: 'blur(' + (this.loaded ? 0 : 10) + 'px)',
        'background-image':
          'url(' + (this.loaded ? this.bigname : this.smallname) + ')'
      }
    }
  },
  props: ['name']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card {
  height: calc(100vh - 200px);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transition: filter 300ms ease;
}
.text {
  position: fixed;
  top: calc(100vh - 150px);
  left:50%;
  width: 100%;
  max-width: calc(100vh - 50px);
  margin: auto;
  margin-top:25px;
  transform: translateX(-50%);
  padding:10px;
  font-size: 22px;
  line-height:1.2em;
  /* background-color: rgba(255,255,255,0.5); */
  text-align: center;
}
</style>

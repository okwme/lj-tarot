<template>
  <div>
    <div class="card" :style="bg"/>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
import tarots from '../../static/data.json'
console.log(tarots)
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
      if (this.id >= tarots.length || !this.id) {
        this.$router.push('/')
      }
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
    id () {
      let id = parseInt(this.name - 1)
      return id
    },
    flip () {
      return this.id % 2 === 1
    },
    card () {
      return Object.values(tarots[this.id])
    },
    base () {
      let base = this.id % 2 === 1 ? this.id : this.id - 1
      return Object.values(tarots[base])
    },
    bigname () {
      return '/static/tarot/' + this.filename
    },
    smallname () {
      return '/static/tarot/JPEG/' + this.filename
    },
    text () {
      return this.card[2]
    },
    filename () {
      if (!this.id) return false
      return this.base[0]
    },
    bg () {
      if (!this.id) return false
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
  margin-top:100px;
  height: calc(100vh - 200px);
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transition: filter 300ms ease;
}
.text {
  width: 100%;
  max-width: calc(100vh - 50px);
  margin: auto;
  margin-top:25px;
  padding:10px;
  font-size: 22px;
  line-height:1.2em;
  /* background-color: rgba(255,255,255,0.5); */
  text-align: center;
}
</style>

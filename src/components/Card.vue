<template>
  <div id="card-page">
    <div class="card" :style="bg">
      <router-link :to="'/' + randomNum()">
        <img style="opacity: 0" :src="this.loaded ? this.bigname : this.smallname" />
      </router-link>
    </div>
    <div class="text">
      <div>
        <div>
          <template v-if="id">
            <u>{{title}}:</u><br>{{text}}
          </template>
          <template v-else>
              <div class="big">Oracle</div>
             <div class="small">By <a href="https://lettiejane.com">Lettie Jane</a></div>
          </template>
        </div>
      </div>
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
    randomNum () {
      let foo = false
      while (!foo || foo === parseInt(this.name)) {
        foo = Math.floor(Math.random() * (tarots.length - 1) + 1)
        console.log(foo, parseInt(this.name))
      }
      return foo
    },
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
        transform: this.flip ? 'rotate(180DEG)' : 'rotate(0DEG',
        filter: this.loaded ? 'blur(0px)' : 'blur(10px)',
        'background-image':
          'url(' + (this.loaded ? this.bigname : this.smallname) + ')'
      }
    }
  },
  props: ['name', 'q']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.card {
  transition: filter 300ms ease;
  filter: blur(10);
  height:50vh;
  overflow: hidden;
  text-align:center;
  background-position: center center;
  background-size: cover;
}
.card img {
  max-width: 100%;
}
.card.transform{
  transform: scaleX(-1);
}
.card.filter {
  filter: blur(0px);
}
.text {
  padding:10px;
  font-size: 22px;
  line-height:1.2em;
  text-align: left;
  height:calc(50vh - 62px);
  overflow: auto;
  background-color: rgb(255, 255, 253);
}
.text > div {
    vertical-align: middle;
}
.text > div > div {
  max-width:460px;
  margin:auto;
}
.big {
  font-size:1.4em;
  line-height:1.6em;
}
.small {
  font-size:0.8em;
  margin-bottom:1em;
}
 @media screen and (orientation:landscape) {
   .card {
     height:100vh;
     width:50vw;
     float: left;
   }
   .text {
     height:calc(100vh - 62px);
     width:50vw;
   }
 }
 @media screen and (min-width: 1024px), (min-height: 1024px) {
  .text {
      display:table;
  }
  .text > div {
    display: table-cell;
  }
 }
</style>

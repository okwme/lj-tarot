<template>
  <div>
    <form id="form" @submit.prevent="ask">
      <input ref="text" type="text"  id="ask" placeholder="Ask a question..." v-model="q"/>
      <input id="submit" type="submit" value="Tarot">
    </form>
    <div id="app" :style="bg">
      <router-view :cards="cards" />
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
export default {
  name: 'App',
  data () {
    return {
      q: null,
      cards: 144,
      loaded: false,
      filename: 'IMG_0000.jpg'
    }
  },
  mounted () {
    let foo = new Image()
    foo.onload = () => {
      this.loaded = true
    }
    foo.src = this.bigfile
  },
  watch: {
    q () {
      if (this.q.trim() === '' && this.$route.name === 'Card') {
        this.$router.push('/')
      }
    }
  },
  computed: {
    smallfile () {
      return '/static/tarot/JPEG/' + this.filename
    },
    bigfile () {
      return '/static/tarot/' + this.filename
    },
    bg () {
      return {
        filter: 'blur(' + (this.loaded ? 0 : 10) + 'px)',
        'background-image': this.$route.name
          ? 'none'
          : 'url(' + (this.loaded ? this.bigfile : this.smallfile) + ')'
      }
    }
  },
  methods: {
    ask () {
      if (!this.q || (this.q.trim() === '' && this.$route.name === 'Card')) {
        this.$router.push('/')
        return
      }
      if (!this.q || this.q.trim() === '') return
      let cards = new BigNumber(this.cards, 10)
      let mod = new BigNumber(encode(this.q), 16)
        .mod(cards.toString(16))
        .plus(1)
      if ('/' + mod === this.$route.path) {
        this.q = ''
      } else {
        this.$router.push('/' + mod)
        this.$refs.text.blur()
      }
    }
  }
}
function encode (string) {
  var number = '0x'
  var length = string.length
  for (var i = 0; i < length; i++) number += string.charCodeAt(i).toString(16)
  return number
}
document.addEventListener('touchstart', function () {}, true)
</script>

<style>
* {
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
html,
body {
  margin: 0;
  padding: 0;
  background-color: beige;
  font-family: Georgia;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
#app {
  height: 100vh;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  transition: filter 300ms ease;
}
#form {
  z-index: 2;
  display: inline-block;
  width: calc(100vh - 50px);
  max-width: calc(100% - 50px);
  height: calc(100vh / 3);
  position: fixed;
  left: 50%;
  top: 25px;
  transform: translateX(-50%) translateY(0%);
}
#ask {
  width: 100%;
  font-family: Georgia;
  border: 0px solid black;
  padding: 8px;
  font-size: 22px;
  box-shadow: inset 0 0 10px #000000;
}
#submit {
  position: fixed;
  left: 50%;
  top: calc(100vh / 6);
  transform: translateX(-50%);
  height: calc(100vh / 1.6);
  width: calc(100vh / 2);
  border: 1px solid blue;
  cursor: pointer;
  opacity: 0;
}
</style>

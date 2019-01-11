<template>
  <div>
    <div id="app">
      <router-view :q="qd" />
      <div id="form">
        <form  @submit.prevent="">
          <input maxlength="100" @keyup.enter="ask" ref="text" type="text"  id="ask" placeholder="Ask a question..." v-model="q"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import BigNumber from 'bignumber.js'
import tarots from '../static/data.json'
export default {
  name: 'App',
  data () {
    return {
      q: null,
      qd: null,
      cards: tarots.length,
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
    }
  },
  methods: {
    ask () {
      if (!this.q || (this.q.trim() === '' && this.$route.name === 'Card')) {
        this.qd = null
        this.$router.push('/')
        return
      }
      if (!this.q || this.q.trim() === '') return
      let cards = new BigNumber(this.cards, 10)
      var d = new Date()
      let mod = new BigNumber(
        toUTF8Array(this.q.toLowerCase() + d.getDate() + d.getMonth() + d.getFullYear()).reduce((acc, curr) => {
          acc += curr
          return acc
        }, 0),
        10
      )
        .mod(cards.toString(10))
        .plus(1)
      if ('/' + mod.toString(10) === this.$route.path) {
        this.q = ''
        this.qd = null
      } else {
        this.qd = this.q
        this.$router.push('/' + mod.toString(10))
        this.$refs.text.blur()
      }
    }
  }
}
// function encode (string) {
//   var number = '0x'
//   var length = string.length
//   for (var i = 0; i < length; i++) number += string.charCodeAt(i).toString(16)
//   return number
// }
document.addEventListener('touchstart', function () {}, true)

function toUTF8Array (str) {
  var utf8 = []
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i)
    if (charcode < 0x80) utf8.push(charcode)
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6),
        0x80 | (charcode & 0x3f))
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f))
    } else {
      i++
      charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff)
      utf8.push(0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f))
    }
  }
  return utf8
}

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
  font-family: Georgia;
}
input:focus,
select:focus,
textarea:focus,
button:focus {
  outline: none;
}
a, a:active, a:visited, a:hover {
  color: inherit;

}
#app {
  min-height:100vh;
}
#form {
  z-index: 2;
  display: inline-block;
  width: calc(100vw);
  position: fixed;
  left: 50%;
  bottom: 0px;
  padding:10px;
  transform: translateX(-50%) translateY(0%);
  background-color: white;
  box-shadow: 0px -2px 13px grey;
}
#ask {
  width: 100%;
  font-family: Georgia;
  padding: 8px;
  font-size: 22px;
  border: none;
  border-bottom: 1px solid black;
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
 @media screen and (orientation:landscape) {
  #form {
    width:50%;
    right:0px;
    transform: translateX(0%) translateY(0%);
  }

 }
</style>

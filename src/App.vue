<template>
  <div id="app">
    <form id="form" @submit.prevent="ask">
      <input type="text"  id="ask" placeholder="Ask a question..." v-model="q"/>
      <input id="submit" type="submit" value="Tarot">
    </form>
  <router-view :cards="cards"/>
  </div>
</template>

<script>
var SHA256 = require('crypto-js/sha256')

export default {
  name: 'App',
  data () {
    return {
      q: null,
      cards: 144,
      currCard: null,
      console: null
    }
  },
  watch: {
    q () {
      if (this.q.trim() === '' && this.$route.name === 'Card') {
        this.$router.push('/')
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
      let mod = (('0x' + SHA256(this.q).toString()) % this.cards) + 1
      if ('/' + mod === this.$route.path) {
        this.q = ''
      } else {
        this.$router.push('/' + mod)
      }
    }
  }
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
  background-image: url('/static/tarot/IMG_0000.jpg');
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
}
#form {
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

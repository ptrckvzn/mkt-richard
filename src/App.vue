i<template>
  <div id="app">
    <div @click="switchLang" id="lang">{{lang}}</div>
    <home v-show="showNav" @closeNav="showNav = false" :lang="lang" />
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section"
      v-for="(content,i) in contents"
      :key="i"
      :id="'section' + i"
      >
        <video loop muted data-autoplay  class="fp-bg">
          <source :data-src="content.path + content.name" />
        </video>
      </div>
    </full-page>
    <router-link @click.native="showNav = true; return true" id="hamburger" to="nav">MENU</router-link>
  </div>
</template>

<script>
import Home from '@/components/Home'
var contents = []
for (var i = 1; i <= 3; i++) {
  contents.push({
    type: 'video',
    name: 'V1-' + i.toString().padStart(4, '0') + '_Richard_All.mov',
    path: '/static/videos/'
  })
}
require('./assets/fullpage.parallax.min.js')
export default {
  name: 'App',
  data () {
    return {
      lang: 'en',
      showNav: true,
      contents,
      options: {
        normalScrollElements: '#nav',
        // licenseKey: 'AF5DCFEF-E50143C7-AE3BDEDE-AF93A31F',
        licenseKey: '8D262CAD-3210481C-BB3740F8-DB065455',
        parallax: true,
        parallaxOptions: {type: 'cover', property: 'translate'}
      }
    }
  },
  methods: {
    switchLang () {
      this.lang = this.lang === 'en' ? 'de' : 'en'
    },
    bgImage (i) {
      return {
        // 'background-image': 'url(https://dummyimage.com/600x400/' + Math.floor(Math.random() * 16777215).toString(16) + '/f00)'
        'background-image': 'url(http://lorempixel.com/400/200/sports/' + i + ')'
      }
    }
  },
  components: {Home}
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
* {
  box-sizing: border-box;
}
.section {
  overflow: hidden;
  position: relative;
}
#hamburger {
  position: fixed;
  top:20px;
  left:20px;
}
#lang {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index:2;
  background-color: white;
  padding:10px;
  cursor: pointer;
}
/*.bg-img {
  width: 100%;
  height: 100vh;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
}*/
/*.fp-bg:before{
  content: '';
  position: absolute;
  display: block;
  background: rgba(173, 173, 173, 0.2);
  top:0;
  bottom:0;
  height: 100%;
  width: 100%;
}*/
.fp-bg{
  /*transition: all 1000ms ease;*/
  height: 100vh;
  background-size: cover;

 /* transform: translate3d(0,0,0);
  -webkit-backface-visibility: hidden;
    backface-visibility: hidden;*/
}
video {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 100%;
  background-color: black; /* in case the video doesn't fit the whole page*/
  background-image: /* our video */ ;
  background-position: center center;
  background-size: contain;
  object-fit: cover; /*cover video background */
  z-index: 3;
}
#section0 .layer {
  position: absolute;
  z-index: 4;
  width: 100%;
  left: 0;
  top: 43%;

  /*
  * Preventing flicker on some browsers
  * See http://stackoverflow.com/a/36671466/1081396  or issue #183
  */
  -webkit-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}
</style>

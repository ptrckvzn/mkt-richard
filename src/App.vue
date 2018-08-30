i<template>
  <div id="app">
    <div id="reserve"><a target="_blank" href="https://bookings.seatris.com/restaurants/richard">{{lang === 'en' ? 'booking' : 'reservierung'}}</a></div>
    <div @click="switchLang" id="lang">{{notLang}}</div>
    <home :class="{showNav:showNav}" @closeNav="showNav = false" :lang="lang" />
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section"
      v-for="(content,i) in contents"
      :key="i"
      :id="'section' + i"
      :class="{mirror:content.name === 'richard_orange.mov' || content.name === '_DSF2502-Bearbeitet.jpg'}"
      >
        <video
         v-if="content.type === 'video'" loop muted data-autoplay  class="fp-bg" :poster="content.path + content.name.replace('mov', 'jpg')">
          <source :data-src="content.path + content.name" />
        </video>
        <div v-else class="fp-bg" :style="'background-image:url(' + content.path + content.name + ')'"></div>
        <div class="floatLogo" v-if="i === 0"><img src="/static/img/logo_big.png"></div>
      </div>
    </full-page>
    <router-link @click.native="clickMenu" id="hamburger" to="nav"><img src="/static/img/menu.png"></router-link>
  </div>
</template>

<script>
import Home from '@/components/Home'
let contents = [
  {
    type: 'video',
    name: 'richard_paul.mov',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_brot.mov',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_door.mov',
    path: '/static/videos/'
  },
  {
    type: 'image',
    name: '54_Wx1_Richard_c_LenaGanssmann-DSC_9460.jpg',
    path: '/static/videos/'
  },
  {
    type: 'image',
    name: '75_Wx1_Richard_c_LenaGanssmann-DSC_9661.jpg',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_celery.mov',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_greensauce.mov',
    path: '/static/videos/'
  },
  {
    type: 'image',
    name: 'RICHARD-Interior.jpg',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_eggplant.mov',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_orange.mov',
    path: '/static/videos/'
  },
  {
    type: 'image',
    name: '_DSF2502-Bearbeitet.jpg',
    path: '/static/videos/'
  },
  {
    type: 'video',
    name: 'richard_lamps.mov',
    path: '/static/videos/'
  },
  {
    type: 'image',
    name: '_DSF2409.jpg',
    path: '/static/videos/'
  }
]
require('./assets/fullpage.parallax.min.js')
export default {
  name: 'App',
  data () {
    return {
      lang: 'de',
      showNav: false,
      contents,
      options: {
        normalScrollElements: '#nav',
        // licenseKey: 'AF5DCFEF-E50143C7-AE3BDEDE-AF93A31F',
        licenseKey: '8D262CAD-3210481C-BB3740F8-DB065455',
        parallaxKey: 'cmVzdGF1cmFudC1yaWNoYXJkLmRlX1NPWWNHRnlZV3hzWVhnPXI2dg==',
        parallax: true,
        parallaxOptions: { type: 'cover', property: 'translate' }
      }
    }
  },
  computed: {
    notLang () {
      return this.lang === 'de' ? 'en' : 'de'
    }
  },
  mounted () {
    if (this.$route.name !== 'index') this.showNav = true
  },
  methods: {
    switchLang () {
      this.lang = this.lang === 'en' ? 'de' : 'en'
    },
    bgImage (i) {
      return {
        // 'background-image': 'url(https://dummyimage.com/600x400/' + Math.floor(Math.random() * 16777215).toString(16) + '/f00)'
        'background-image':
          'url(http://lorempixel.com/400/200/sports/' + i + ')'
      }
    },
    clickMenu () {
      console.log('clickMenu')
      this.showNav = true
    }
  },
  components: { Home }
}
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
  text-transform: uppercase;
  color: black;
  font-family: arial;
  font-weight: bold;
  font-size: 21px;
}
a,
a:active,
a:hover,
a:visited {
  text-decoration: none;
  color: black;
  weight: 700;
}
* {
  box-sizing: border-box;
}
@media only screen and (max-width: 480px) {
  body {
    /* font-size: 18px; */
  }
}
.section {
  overflow: hidden;
  position: relative;
}
#hamburger {
  position: fixed;
  top: 20px;
  left: 20px;
  filter:invert(1);
}
#hamburger img {
  max-width: 32px;
}
#lang, #reserve {
  position: fixed;
  top: 20px;
  z-index: 2;
  padding: 6px 6px;

}
#lang {
  right: 0px;
  background-color: black;
  color: white;
  cursor: pointer;
}
#reserve {
  right:41px;
  background-color: white;
  color: black;
}
.floatLogo {
  color: white;
  font-size:100px;
  text-align:center;
  /* margin-top: calc(50vh - 69px); */
  margin-top: calc(50vh - 100px);
  padding: 0px 60px;
}
.floatLogo img {
  width:100%;
  max-width: 700px;
}
@media only screen and (max-width: 480px) {
  .floatLogo {
    margin-top: calc(50vh - 150px);
  }

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
.fp-bg {
  /*transition: all 1000ms ease;*/
  height: 100vh;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
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
.mirror {
  transform: rotateY(180deg);
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

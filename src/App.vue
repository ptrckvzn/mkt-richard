<template>
  <div id="app">
    <home :class="{showNav:showNav}" @closeNav="closeNav" :lang="lang" />
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section"
      v-for="(content,i) in contents"
      :key="i"
      :id="'section' + i"
      :class="{mirror:content.name === 'richard_orange.mov' || content.name === '_DSF2502-Bearbeitet.jpg', 'video-el' : content.type=== 'video'}"
      >
        <video
        :autoplay="isMobile"
        preload="metadata"
         v-if="content.type === 'video'" loop muted class="fp-bg" :poster="content.path + content.name.replace('mov', 'jpg')">
          <source :src="content.path + content.name" />
        </video>
        <div v-else class="fp-bg" :style="'background-image:url(' + content.path + content.name + ')'"></div>
        <div class="floatLogo" v-if="i === 0"><a href="/" ><img src="/static/img/logo_big.png"></a></div>
        <div class="landingImage" v-if="i === 0 && landingImage" v-html="landingImage"/>
      </div>
    </full-page>
    <div class="siteLinks">
      <div id="reserve"><a target="_blank" href="https://bookings.seatris.com/restaurants/richard">{{lang === 'en' ? 'booking' : 'reservierung'}}</a></div>
      <div @click="switchLang" id="lang">{{notLang}}</div>
    </div>
    <router-link class="siteNav" @click.native="clickMenu"  to="nav">
      <div id="hamburger"><div class="hb"></div><div class="hb"></div><div class="hb"></div></div>
      <div id="site-menu">Menu</div>
    </router-link>
  </div>
</template>

<script>
import Home from '@/components/Home'
import { isMobile } from './assets/helpers'
let contents = [
  {
    type: 'video',
    name: 'richard_paul.mov',
    path: '/static/videos/'
  },
  // {
  //   type: 'video',
  //   name: 'richard_brot.mov',
  //   path: '/static/videos/'
  // },

  {
    type: 'image',
    name: 'richard_lamps_image.jpg',
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
  // {
  //   type: 'image',
  //   name: 'richard_greensauce.png',
  //   path: '/static/videos/'
  // },
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
  // {
  //   type: 'video',
  //   name: 'richard_lamps.mov',
  //   path: '/static/videos/'
  // },
  // {
  //   type: 'image',
  //   name: '_DSF2409.jpg',
  //   path: '/static/videos/'
  // }
  {
    type: 'image',
    name: 'RR-WEBSITE-BolkBG.jpg',
    path: '/static/videos/'
  }
]
require('./assets/fullpage.parallax.min.js')
export default {
  name: 'App',
  data () {
    return {
      isMobile: isMobile(),
      lang: 'de',
      showNav: false,
      contents,
      options: {
        scrollBar: true,
        loopBottom: true,
        touchSensitivity: 1,
        css3: true,
        onLeave: this.onLeave,
        afterLoad: this.afterLoad,
        normalScrollElements: '#nav',
        // licenseKey: 'AF5DCFEF-E50143C7-AE3BDEDE-AF93A31F',
        licenseKey: '8D262CAD-3210481C-BB3740F8-DB065455',
        // parallaxKey: 'cmVzdGF1cmFudC1yaWNoYXJkLmRlX1NPWWNHRnlZV3hzWVhnPXI2dg==',
        parallaxKey: 'bmV0bGlmeS5jb21fU2JRY0dGeVlXeHNZWGc9bmJV',
        parallax: true,
        parallaxOptions: { type: 'cover', property: 'translate' }
      }
    }
  },
  computed: {
    notLang () {
      return this.lang === 'de' ? 'en' : 'de'
    },
    landingImage () {
      return require('./assets/copy/landing_image.md')
    }
  },
  mounted () {
    if (this.$route.name !== 'richard') this.showNav = true
    let foo = document.querySelector(
      '[href="http://alvarotrigo.com/fullPage/extensions/"]'
    )
    if (foo) {
      foo.parentElement.style.display = 'none !important'
    }
  },
  methods: {
    afterLoad (origin, destination, direction) {
      if (!origin) {
        this.onLeave(origin, destination, direction)
        return
      }
      let el = origin.item
      if (hasClass(el, 'video-el')) {
        let vids = el.querySelectorAll('video')
        if (vids.length) {
          vids[0].pause()
        }
      }
    },
    onLeave (origin, destination, direction) {
      let el = destination.item
      if (hasClass(el, 'video-el')) {
        let vids = el.querySelectorAll('video')
        if (vids.length) {
          vids[0].play().catch(error => {
            console.log(error.message)
            vids[0].play()
          })
        }
      }
    },
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
    closeNav () {
      this.$refs.fullpage.api.moveSectionDown()
      this.showNav = false
    },
    clickMenu () {
      this.$refs.fullpage.api.moveSectionDown()
      this.showNav = true
    }
  },
  components: { Home }
}
function hasClass (element, className) {
  if (element.classList) return element.classList.contains(className)
  else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(
      element.className
    )
  }
}
</script>

<style lang="scss">
@import './assets/style/fonts.css';
html,
body {
  padding: 0;
  margin: 0;
  // text-transform: uppercase;
  color: black;
  font-family: 'Bodoni', times;
  font-weight: 400;
  font-size: 16px; //21px;
  letter-spacing: 0.06em;
  line-height: 1.6em;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
}
h1, h2, h3, h4, h5, h6 {
  font-size: 1.35rem;
  font-weight: 600;
  // text-decoration: underline;
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 4rem;
  letter-spacing: 0.06em;
  line-height: 1.2em;
}
a,
a:active,
a:hover,
a:visited {
  text-decoration: none;
  color: black;
  // weight: 700;
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
.siteNav,
.siteLinks {
  position: fixed;
  top: 0px;
  display: flex;
  flex-flow: row nowrap;
  right: 10vw;
}
.siteLinks {
  right: 10vw;
}
.siteNav {
  left: 20px;
}
#hamburger {
  // position: fixed;
  // top: 0px;
  // left: 40px;
  background-color: white;
  padding: 9px 8px 8px;
  // display: flex;
  // flex-flow: column nowrap;

  .hb {
    // width: 32px;
    width: 15px;
    height: 2px;
    display: block;
    background-color: black;
    // margin-bottom: 8px;
  }
  .hb:not(:last-child) {
    margin-bottom: 3px;
  }
}
// #menu {
//   background: white;
//   text-transform:
// }
#site-menu,
#lang,
#reserve {
  z-index: 2;
  padding: 6px 10px;
  line-height: 1;
  text-transform: uppercase;
}
#lang {
  // right: 100px;
  background-color: black;
  color: white;
  cursor: pointer;
}
#site-menu,
#reserve {
  // right: 140px;
  background-color: white;
  color: black;
}
#site-menu {
  padding-left: 0;
}
.landingImage {
  // text-align: center;
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  img {
    padding: 10vh 0px;
    max-height: 100vh;
    max-width: 100vw;
  }
}
.floatLogo {
  color: white;
  text-align: center;
  /* margin-top: calc(50vh - 69px); */
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 0;
  margin: auto;
  z-index: 100;
}
.floatLogo img {
  background-color: black;
  display: inline-block;
  // padding: 0.5em;
  // padding: 9px;
  // width: 137.6px;
  padding: 7px 10px;
  height: calc(1rem + 14px);
  width: auto;
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

@media only screen and (max-width: 480px) {
  // .floatLogo {
  //   text-align: left;
  //   padding-left: 100px;
  //   img {
  //     max-width: 106px;
  //   }
  // }
  .logo img {
    max-width: 106px !important;
  }
  .siteLinks {
    right: 0;
    // left: 50%;
    // bottom: 0;
    // top: unset;
    // transform: translateX(-50%);
  }
  .siteNav {
    left: 0;
  }
  .floatLogo {
    color: white;
    text-align: left;
    /* margin-top: calc(50vh - 69px); */
    // margin-top: 0;
    // margin-left: 2rem;
    position: fixed;
    top: 0;
    left: 2rem;
    transform: none;
  }
  .floatLogo img {
    padding: 7px 10px;
    height: calc(1rem + 13px);
  }
  #lang,
  #reserve {
    font-size: 12px;
    padding: 8px 10px;
    // filter: invert(100);
  }
  #lang {
    // right: 20px;
  }
  #reserve {
    // right: 48px;
  }
  #site-menu {
    display: none;
  }
  #hamburger {
    .hb {
      // width: 19.2px;
      // margin-bottom: 4.8px;
    }
  }
}
</style>

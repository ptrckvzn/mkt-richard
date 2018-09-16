<template>
  <div id="home">
    <div id="nav" class="home nav-section">
      <div class="logo">
        <img src="/static/img/logo_big.png">
      </div>
      <div  :class="arrow" id="back-button" ><img @click.self="clickBack"  src="/static/img/arrow.png"></div>
      <div class="allLinks">
        <div class="link-group" v-for="(group, i) in sections" :key="'group-' + i"  >
          <div v-for="(section, j) in group"  :key="'section-' + i + '-' + j" >
            <router-link  :to="section.nav">{{section.name[lang]}}</router-link>
          </div>
        </div>
        <div class="link-group">
          <img src="/static/img/star.png">
          <img src="/static/img/hat.png">
        </div>
      </div>
      <div class="allSections">
        <template v-for="(group, i) in sections"  >
          <section class="nav-section" v-for="(section, j) in group" :id="section.nav"  :key="'content-section-' + i+'-'+j">
            <item :lang="lang" :md="section.nav"  />
          </section>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import Item from '@/components/Item'
require('waypoints/lib/noframework.waypoints.js')
export default {
  name: 'Home',
  data () {
    return {
      atTop: true,
      routeName: null,
      sections: [
        [
          {
            nav: 'about',
            name: {
              de: 'Über uns',
              en: 'About'
            }
          },
          {
            nav: 'menu',
            component: 'MenuComponent',
            name: {
              de: 'Aktuelles Menu',
              en: 'CURRENT MENU'
            }
          },
          {
            nav: 'veg',
            name: {
              de: 'Vegetarisches Menu',
              en: 'VEGETARIAN MENU'
            }
          },
          {
            nav: 'wine',
            name: {
              de: 'Weinkarte',
              en: 'Wine'
            }
          }
        ],
        [
          {
            nav: 'news',
            name: {
              de: 'News',
              en: 'News'
            }
          },
          {
            nav: 'opening',
            name: {
              de: 'Öffnungszeiten',
              en: 'OPENING HOURS'
            }
          },
          {
            nav: 'contact',
            name: {
              de: 'Kontakt & Reservierung',
              en: 'CONTACT & RESERVATIONS'
            }
          }
        ],
        [
          {
            nav: 'press',
            name: {
              de: 'Presse',
              en: 'Press'
            }
          },
          {
            nav: 'jobs',
            name: {
              de: 'Jobs',
              en: 'Jobs'
            }
          }
        ],
        [
          {
            nav: 'impressum',
            name: {
              de: 'Impressum',
              en: 'IMPRESS'
            }
          },
          {
            nav: 'datenschutz',
            name: {
              de: 'Datenschutz',
              en: 'LEGAL TERMS'
            }
          }
        ]
      ]
    }
  },
  props: ['lang'],
  methods: {
    clickBack () {
      if (this.$route.path === '/nav') {
        this.$emit('closeNav')
        this.$router.push('/')
      } else {
        this.$router.push('/nav')
      }
      // this.atTop = true
      return false
    }
  },
  computed: {
    arrow () {
      return { rotate: !this.atTop }
    }
  },
  components: {
    Item
  },
  mounted () {
    var vm = this
    var continuousElements = document.getElementsByClassName('nav-section')
    for (var i = 0; i < continuousElements.length; i++) {
      // eslint-disable-next-line
      new Waypoint({
        element: continuousElements[i],
        offset: 25,
        handler (dir) {
          vm.atTop =
            this.element.id === 'nav' ||
            (this.element.id === 'about' && dir === 'up')
          global.noscroll = true
          setTimeout(() => {
            global.noscroll = false
          }, 1000)
          if (global.nowaypoint) return
          if (vm.$parent.showNav) {
            if (dir === 'up' && this.element.id === 'about') {
              vm.$router.replace('nav')
            } else {
              vm.$router.replace(this.element.id)
            }
          }
        },
        context: document.getElementById('nav')
      })
    }
  },
  destroyed () {
    // eslint-disable-next-line
    Waypoint.destroyAll()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 480px;
  background-color: white;
  height: 100vh;
  overflow: auto;
  z-index: 2;
  word-wrap: break-word;
  transition: transform 600ms ease;
  transform: translateX(-100%);
}
#home.showNav .home {
  transform: translateX(0);
}
#back-button {
  position: sticky;
  top: 42px;
  left: 400px;
  margin-left: -30px;
  width: 30px;
}
#back-button.rotate img {
  transform: rotate(90deg);
}

#back-button img {
  transition: transform 600ms ease;
  cursor: pointer;
  width: 70px;
  padding: 20px;
}

.allLinks {
  min-height: 100vh;
  justify-content: start;
  text-align: center;
  padding: 40px 30px 0px 30px;
  letter-spacing: 0.7px;
  line-height: 1.6em;
  font-size: 24px;
}
.allLinks .link-group {
  margin-bottom: 30px;
}
.link-group img:first-of-type {
  max-width: 40px;
  margin: 0 5px;
}
.link-group img:last-of-type {
  max-width: 55px;
  margin: 0 5px;
}

.logo {
  position: sticky;
  top: 0px;
  width: 100%;
  text-align: center;
}

.logo img {
  max-width: 172px;
  background-color: black;
  padding: 5px;
}
.allSections,
.allLinks {
  display: flex;
  flex-direction: column;
}
section {
  min-height: 100vh;
  text-align: left;
  padding: 60px 50px 0px 50px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding-bottom: 100px;
  letter-spacing: 0.4px;
  line-height: 1.2em;
  text-transform: normal;
}
section h1,
section h2 {
  line-height: 1.3em;
}
section input[type='email'] {
  font-family: 'BodoniSSK', times;
  border: 1px solid black;
  text-transform: uppercase;
  font-size: 21px;
  letter-spacing: 0.4px;
}

section input[type='submit'] {
  display: block;
  background-color: black;
  color: white;
  margin-top: 15px;
  text-transform: uppercase;
  font-size: 21px;
  letter-spacing: 0.4px;
  font-family: 'BodoniSSK', times;
}
@media only screen and (max-width: 480px) {
  #back-button {
    left: auto;
    right: 0px;
    margin-left: 0px;
    width: 100%;
    text-align: right;
  }
  #back-button img {
    margin-right: 0px;
  }
  .allLinks {
    padding: 50px 10px 0px 10px;
    line-height: 1.2em;
  }
  section {
    padding: 40px 20px 0px 20px;
  }
}
</style>

<template>
  <div >
    <div id="nav" class="home nav-section">
      <a href="#" id="back-button" @click.prevent="clickBack">back</a>
      <div class="allLinks">
        <div v-for="(section, i) in sections" :key="i" >
          <router-link  :to="section.nav">{{section.name[lang]}}</router-link>
        </div>
      </div>
      <div class="allSections">
        <section class="nav-section" v-for="(section, i) in sections" :key="i + i" :id="section.nav">
          <item :lang="lang" :md="section.nav"  />
        </section>
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
      routeName: null,
      sections: [
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
        },
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
        },
        {
          nav: 'impressum',
          name: {
            de: 'Datenschutz & Impressum',
            en: 'IMPRESS & LEGAL TERMS'
          }
        }
      ]
    }
  },
  props: ['lang'],
  methods: {
    clickBack () {
      console.log(this.$route)
      if (this.$route.path === '/nav') {
        this.$emit('closeNav')
        this.$router.push('/')
      } else {
        this.$router.push('/nav')
      }
      return false
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
        handler () {
          global.noscroll = true
          setTimeout(() => {
            global.noscroll = false
          }, 1000)
          if (global.nowaypoint) return
          vm.$router.replace(this.element.id)
        },
        context: document.getElementById('nav')
      })
    }
  },
  destroyed () {
    // eslint-disable-next-line
    Waypoint.destroyAll();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 480px;
  background-color: white;
  height: 100vh;
  overflow: auto;
  z-index: 2;
}
#back-button {
  position: fixed;
  top: 100px;
  left: 480px;
  margin-left: -30px;
}
.allLinks {
  min-height: 100vh;
  justify-content: center;
  text-align: center;
}
.allSections,
.allLinks {
  display: flex;
  flex-direction: column;
}
section {
  min-height:100vh;
  padding-top: 10px;
  text-align: center;
  padding: 0 20px 0 20px;
  display: flex;
  flex-direction: column;
    justify-content: center;
    padding-bottom:100px;
}
</style>

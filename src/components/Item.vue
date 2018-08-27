<template>
    <div >
        <template class="nav-section" v-if="lang == 'en'">
            <div v-html="en"/>
        </template>
        <template v-else>
            <div v-html="de"/>
        </template>
    </div>
</template>

<script>
export default {
  computed: {

    de () { return require('../assets/copy/' + this.md + '_de.md') },
    en () { return require('../assets/copy/' + this.md + '_en.md') }
  },
  props: ['lang', 'md']
}
</script>

<style lang="css" scoped>
</style>

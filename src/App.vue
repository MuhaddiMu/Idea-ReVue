<template>
  <v-app>
    <Loading></Loading>
    <Navbar v-if="ShowNavbar"></Navbar>
    <v-content class="mx-4 mb-4" grey lighten-4>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-content>
  </v-app>
</template>

<script>
import Loading from './views/Loading'
import Navbar from './views/Navbar'
import WebFontLoader from 'webfontloader'

export default {
  name: 'App',
  components: {
    Loading,
    Navbar
  },
  data () {
    return {
    }
  },
  methods: {
    setUser: function () {
      this.$store.dispatch('SetLoveCount')
      this.$store.dispatch('setUser')
    },
    setFontLoaded () {
      this.$emit('font-loaded')
    }
  },
  created () {
    this.setUser()

    WebFontLoader.load({
      google: {
        // Use FVD notation to include families https://github.com/typekit/fvd
        families: ['Nunito']
        // Path to stylesheet that defines font-face
      },
      active: this.setFontLoaded
    })
  },
  computed: {
    ShowNavbar () {
      if (this.$store.getters.getUser) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="scss" >
$typoOptions: display-4 display-3 display-2 display-1 headline title subtitle-1
  subtitle-2 body-1 body-2 caption overline;

%font-choice {
  font-family: "Nunito", sans-serif !important;
}

@mixin md-typography {
  @each $typoOption in $typoOptions {
    .#{$typoOption} {
      @extend %font-choice;
    }
  }
}

.v-application {
  // font-size: 12px;
  @extend %font-choice;
  @include md-typography;
}
</style>

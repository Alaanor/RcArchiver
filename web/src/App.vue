<template>
  <div id="app">
    <navigation></navigation>
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import VueMaterial from "vue-material";
import 'vue-material/dist/vue-material.css';
import Navigation from "./components/Navigation";

Vue.use(VueMaterial);

Vue.material.registerTheme({
  app: {
    primary: 'orange',
    accent: 'pink',
    warn: 'black',
    background: 'white'
  }
});

export default {
  components: {Navigation},
  name: 'app'
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition-property: opacity;
    transition-duration: .25s;
  }

  .fade-enter-active {
    transition-delay: .25s;
  }

  .fade-enter, .fade-leave-active {
    opacity: 0
  }
</style>


<template>
  <div class="navigation">
    <md-toolbar>
      <md-button class="md-icon-button" @click="toggleSidenav">
        <md-icon>menu</md-icon>
      </md-button>
      <h2 class="md-title" style="flex: 1">{{ title }}</h2>
    </md-toolbar>

    <md-sidenav class="md-left" ref="Sidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
          <h3 class="md-title">RcArchiver</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item @click.native="toggleSidenav">
          <router-link to="/" exact><span>Home</span></router-link>
        </md-list-item>
        <md-list-item @click.native="toggleSidenav">
          <router-link to="/about" exact><span>About</span></router-link>
        </md-list-item>
      </md-list>
    </md-sidenav>
  </div>
</template>

<script>
export default {
  name: 'Navigation',
  data () {
      return {
          title: 'RcArchiver'
      }
  },
  methods: {
    toggleSidenav() {
      this.$refs.Sidenav.toggle();
    }
  }
}
</script>

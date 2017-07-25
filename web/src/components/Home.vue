<template>
  <div class="home">

    <md-layout md-vertical-align="center">
      <md-layout md-align="center" md-flex="100">
        <span class="md-display-3">RcArchiver</span>
      </md-layout>

      <md-layout md-align="center">
        <md-layout md-flex-xsmall="90" md-flex-small="70" md-flex-medium="60" md-flex-large="40">
          <md-card style="width: 100%">
            <md-card-header>
              <div class="md-title">Login</div>
            </md-card-header>
            <md-card-content>
              <md-input-container>
                <label>User</label>
                <md-input type="text"></md-input>
              </md-input-container>
              <md-input-container>
                <label>Pass</label>
                <md-input type="password"></md-input>
              </md-input-container>
            </md-card-content>
            <md-card-actions>
              <md-button type="submit">Login</md-button>
            </md-card-actions>
          </md-card>
        </md-layout>
      </md-layout>

    </md-layout>

  </div>
</template>

<script>
import Vue from "vue";

Vue.material.setCurrentTheme('app');

export default {
  name: 'home',
  data () {
    return {

    }
  }
}
</script>

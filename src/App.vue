<template>
  <!-- nav bar -->
   <v-app >
    <v-navigation-drawer v-model="sidebar" app right class="body-bgs primary-bg-pk" :style="{ backgroundImage: `url(${mobileNav})` }">
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>{{ item.title }}</v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app :color="bg" class="nav-bar-bottom">
      <!-- <span class="hidden-sm-and-up"> -->
      <v-app-bar-title>
        <router-link to="/" tag="span" style="cursor: pointer;">
          <img class="navBarLogo" :src="require('./assets/img/logos/vueLogo.png')"> 
          <!-- <img class="navBarLogo hidden-md-and-up" :src="require('./assets/img/logos/logo_desktop_stacked.png')">  -->
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <span class="hidden-md-and-up">
        <v-app-bar-nav-icon @click="sidebar = !sidebar">
          <span class="material-icons primary-color-pk">
            menu
          </span>
        </v-app-bar-nav-icon>
      </span>
      <!-- <v-spacer></v-spacer> -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn
          class="navbar-btns"
          text
          v-for="item in menuItems"
          :key="item.title"
          :to="item.path">
         <v-icon class="navbar-icons material-icons-outlined" left dark>{{ item.icon }}</v-icon> 
         <span class="navbar-text"> {{ item.title }}</span>
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>


    <!-- v-main may need to replace v-content -->
    <v-main>
      <router-view></router-view>
    </v-main>


    <!-- footer -->
  <v-footer dark padless fluid>
    <v-card class="flex flower-bgs-right primary-bg-pk" :style="{ backgroundImage: `url(${footer})` }" flat tile>
           <v-row style="margin: 0px;" align="center">
              <v-col cols="12" sm="12" md="12" lg="12" xl="12" class='mt-5'>
                <img style="width: 100px;" class="hidden-md-and-up mt-5" :src="require('./assets/img/logos/footer.png')">
                <img style="width: 150px;" class="hidden-sm-and-down mt-5" :src="require('./assets/img/logos/footer.png')">
              </v-col>
               
               <v-row class="hidden-md-and-up">
                  <v-col cols="12" sm="12" md="6">
                     <v-btn class="v-btn-footer" to="/">Home</v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                     <v-btn class="v-btn-footer" to="/Gallery">Gallery</v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                     <v-btn class="v-btn-footer" to="/Blog">Blog</v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                     <v-btn class="v-btn-footer" to="/About">About</v-btn>
                  </v-col>
                  <v-col cols="12" sm="12" md="6">
                     <v-btn class="v-btn-footer" to="/Contact">Contact</v-btn>
                 </v-col>
              </v-row>
              <!-- text-md-right -->
            <!--   <v-col cols="12" sm="12" md="6" lg="5" xl="6" class="">
                <p>Pure Kismet LLC {{ new Date().getFullYear() }} — Design by: 
                   <a href="https://www.semblancestudios.com/" target="_blank"> <span class="fourth-color-pk">Semblance Studios</span></a></p>
              </v-col> -->

               <v-col cols="12" sm="12" md="12" lg="12" xl="12" class="mb-5">
                 <a target="_blank" href="https://www.facebook.com/Pure-Kismet-LLC-103897155233658"><img src="./assets/img/social/pkfacewhite.png"></a>
                 <a target="_blank" href="https://www.pinterest.com/purekismetevents/"><img src="./assets/img/social/pkpinwhite.png"></a>
                 <a target="_blank" href="https://www.instagram.com/purekismetevents/"><img src="./assets/img/social/pktwitwhite.png"></a>
                 <a target="_blank" href="https://www.tiktok.com/@purekismetevents?lang=en"><img src="./assets/img/social/pktikwhite.png"></a>
                 <br>
                 <a style="color: white;" href="tel:877-754-7638 ">877.754.7638</a>
                 <br>
                <a style="color: white;" href="mailto:PureKismetEvents@gmail.com">PureKismetEvents@gmail.com</a> 
                 <hr style="width: 10%; margin-bottom: 3px;" class="mx-auto">
                  <span>Pure Kismet, LLC {{ new Date().getFullYear() }} — Design by: 
                   <a href="https://www.semblancestudios.com/" target="_blank"> <span class="fourth-color-pk">Semblance Studios</span></a></span>
                

              </v-col>
             </v-row>

    </v-card>
  </v-footer>

    
  </v-app>
</template>

<script>
import { components } from 'aws-amplify-vue';
import { AmplifyEventBus } from 'aws-amplify-vue';
import { Auth } from 'aws-amplify';
export default {
  name: 'App',
  components: {
    ...components
  },
  data(){
    return {
      mobileNav: require('./assets/img/footer/footer.png'),
      footer: require('./assets/img/footer/footer.png'),
      sidebar: false,
      bg:'',
      menuItems: [
          { title: 'Vue CRUD', path: '/', icon: 'home' },
     ],

      icons: [
        'mdi-facebook',
        'mdi-twitter',
        'mdi-linkedin',
        'mdi-instagram',
      ],

    }
  },
  methods: {
    //transparency navbar handle
    changeColor() {
      if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
      ) {
        //this.bg = 'white';
      } else {
       // this.bg = 'transparent';
      }
    },
  },
  mounted() {
    // window.onscroll = () => {
    //   this.changeColor();
    // };
  },
}
</script>

<style>
/* global css import */
@import './assets/css/cssMain.css';
/*@import './assets/sass/variables.scss';
@import './assets/sass/content.scss';*/


#app {
  font-family: linotype-didot, serif;
  font-weight: 400;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*adjust this as needed for navbar*/
  margin-top: 0px;
}


</style>


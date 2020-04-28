<template>
    <client-only>
    <div >
        <div v-if="isLoggedIn">

            <!--========== ADMIN SIDE MENU one ========-->
            <div class="_1side_menu" v-if="isLoggedIn">
                <div class="_1side_menu_logo _new_1side_menu_logo ">
                    <!-- <h3 style="text-align:center;">Logo Image</h3> -->
                    <img class="title_image" src="https://goflank.com/images/new-brand.png" />
                </div>

                <!--~~~~~~~~ MENU CONTENT ~~~~~~~~-->
                <div class="_1side_menu_content">
                    <div class="_1side_menu_img_name">
                        <p class="_1side_menu_name">{{authInfo.firstName}} {{authInfo.lastName}}</p> 
                    </div>

                    <!--~~~ MENU LIST ~~~~~~-->
                    <div class="_1side_menu_list">
                        <Menu :active-name="activeName" :accordion="true">
                            
                            <MenuItem name="/" :to="'/'">
                                <Icon type="ios-analytics" />Dashboard & Report
                            </MenuItem>
                           
                          
                            <MenuItem name="topHeadlineList" :to="'/topHeadlineList'">
                                <Icon type="ios-analytics" />Top Headlines
                            </MenuItem>
                            <MenuItem name="coachVideoList" :to="'/coachVideoList'">
                                <Icon type="ios-analytics" />Coach Video
                            </MenuItem>
                            <MenuItem name="videoList" :to="'/videoList'">
                                <Icon type="ios-analytics" />Videos
                            </MenuItem>
                           
                            <MenuItem name="userList" :to="'/userList'">
                                <Icon type="ios-analytics" />Users
                            </MenuItem>
                            <MenuItem name="schoolList" :to="'/schoolList'">
                                <Icon type="ios-analytics" />New Coach/School
                            </MenuItem>
                            <MenuItem name="reviewList" :to="'/reviewList'">
                                <Icon type="ios-analytics" />Reviews
                            </MenuItem>
                            <MenuItem name="questionList" :to="'/questionList'">
                                <Icon type="ios-analytics" />Questions
                            </MenuItem>
                            <MenuItem name="addImage" :to="'/addImage'">
                                <Icon type="ios-analytics" />Add image
                            </MenuItem>
                            <MenuItem name="blog" :to="'/blog'">
                                <Icon type="ios-analytics" />Blog
                            </MenuItem>
                        </Menu>
                    </div>
                </div>
            </div>
            <!--========== ADMIN SIDE MENU ========-->

            <div class="header">
                <div class="_2menu  _box_shadow">
                    <div class="_2menu_logo">
                        <ul class="open_button">
                            <li>
                                <Icon type="ios-list" />
                            </li>
                            <!--<li><Icon type="ios-albums" /></li>-->
                        </ul>
                    </div>

                    <ul class="_2menu_main_ul_list_ul">
                        <li >
                            <p>Home</p>
                        </li>
                        <li >
                            <p> <a :href="`https://goflank.com/local_instructor/${authInfo.legend.id}`">Go To Profile</a> </p>
                        </li>
                        <li >
                            <p @click="logout" >Logout</p>
                        </li>

                    </ul>

                </div>
            </div>
            <!--========= HEADER ==========-->
            <transition name="component-fade" mode="out-in">
                <nuxt />
            </transition>
        </div>
        <div v-else>
          <transition name="component-fade" mode="out-in">
                <nuxt />
            </transition>
        </div>
    </div>
    </client-only>
</template>
<script>

export default {
  data(){
    return {
      flag:1,
      isAdmin: true,
      tab:14,
      isMainSite: false,
      activeName:'/'
    }
  },
  methods:{
    async logout() {
      try {
          let { data } = await this.$axios.get("/logout");
          this.$store.commit("updateAuthUser", false);
          window.location = '/login'
      } catch (error) {
          console.log(error);
      }
    },
  },
  watch:{
      $route (to, from){
      }
  },
  created(){
    if(!this.isLoggedIn) return this.$router.push('/login')
    this.activeName = this.$route.path
  }
}
</script>
<style >
.title_image {
    width: 244px;
    margin: -18px auto 0;
    height: 56px;
}
</style>

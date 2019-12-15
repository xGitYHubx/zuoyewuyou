<template>
  <div class="dashbord-container">
    <div class="dashbord-text">当前用户: {{ name }}</div>
    <!-- <img class="dashbord-img" src="../../assets/book.jpg"></img> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashbord',
  computed: {
    // ...mapGetters([
    //   'name'
    // ])
    name(){
      return JSON.parse(localStorage.getItem('userInfo')).username
    }
  },

}
</script>

<style lang="scss" scoped>
.dashbord {
  &-container {
    margin: 30px;
    
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
  &-img{
    
  }
}
</style>

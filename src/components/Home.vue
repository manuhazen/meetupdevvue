<template>
  <v-container>

    <v-layout row wrap >
      <v-flex xs12 sm6 class="text-sm-right text-xs-center">
        <v-btn large router to="/meetups" class="info">Explore Meetups</v-btn>
      </v-flex>
        <v-flex xs12 sm6 class="text-sm-left text-xs-center">
        <v-btn large router to="/meetups/new"  class="info">Organize Meetups</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mb-2">
      <v-flex xs12>
        <v-carousel  style="cursor: pointer;">
          <v-carousel-item v-for="(item,i) in meetups" :src="item.src" :key="i" @click.prevent.native="onLoadMeetup(i)">
            <div class="title mx-auto" >
              {{ item.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>

    </v-layout>

    <v-layout row wrapp class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome Meetups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  computed: {
    meetups() {
      return this.$store.getters.featuredMeetups
    }
  },
  methods: {
    onLoadMeetup(id) {
      this.$router.push('/meetups/' + id);
      console.log(id)
    }
  }
}
</script>

<style scoped>
  .title {
    bottom: 50px;
    text-align: center;
    font-size: 2em;
    background-color: rgba(0,0,0,0.3);
    padding: 20px;
    color: #ffffff;
  }
</style>

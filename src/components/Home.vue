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
        <v-carousel>
          <v-carousel-item v-for="(item,i) in items" :src="item.src" :key="i" >
            <div class="title mx-auto" @click="onLoadMeetup(i)">
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
  data() {
    return {
      items: [
        {
          title: 'Awesome Food',
          src: 'https://static1.squarespace.com/static/55723b6be4b05ed81f077108/t/5633000fe4b0072b576cc030/1446182932037/Money+for+Good.jpg?format=1500w'
        },
        {
          title: 'We need to go there',
          src: 'https://images.unsplash.com/photo-1493805503700-3219b693ffcc?ixlib=rb-0.3.5&s=9850259b418dcd691cc6e8d2019e13c8&auto=format&fit=crop&w=1350&q=80'
        },
        {
          title: 'Dude i need help',
          src: 'https://images.unsplash.com/photo-1511225160131-38607044acc7?ixlib=rb-0.3.5&s=7e61429ce86a13776775fa88f7c3ec9a&auto=format&fit=crop&w=1350&q=80'
        },
        {
          title: 'Carousel Amazing',
          src: 'https://images.unsplash.com/photo-1512532019-3bdca31ba6ed?ixlib=rb-0.3.5&s=71469e704f32fce92b1db4edda3028f7&auto=format&fit=crop&w=1350&q=80'
        }
      ]
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
    position: absolute;
    bottom: 50px;
    text-align: center;
    font-size: 2em;
    background-color: rgba(0,0,0,0.3);
    padding: 20px;
  }
</style>

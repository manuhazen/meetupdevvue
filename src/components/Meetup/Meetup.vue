<template>
  <v-container>
      <v-layout row wrap>
          <v-flex xs12>
              <v-card>
                  <v-card-title>
                      <h4 class="primary--text"> {{ meetup.title }}</h4>
                  </v-card-title>
                  <v-card-media :src="meetup.src" height="600px"></v-card-media>
                  <v-card-text>
                      <div class="mb-1"> {{ meetup.date | moment("dddd, MMMM Do YYYY") }} at {{ meetup.time }}  - {{ meetup.location }}</div>
                      <div class="info--text">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus in vel quae ullam sint quo, sunt tempore necessitatibus debitis. Alias maxime aut iste numquam optio perspiciatis atque saepe, assumenda velit.
                      </div>
                  </v-card-text>
                  <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn flat class="primary">Register</v-btn>
                  </v-card-actions>
              </v-card>
          </v-flex>
      </v-layout>
  </v-container>
</template>

<script>
export default {
    props: ['id'],

    computed: {
        meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        }
    }
}
</script>

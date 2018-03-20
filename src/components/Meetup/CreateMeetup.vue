<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <h2 class="secondary--text">Create a new meetup</h2>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="createMeetup">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="title" name="title" label="Title" id="title" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="location" name="location" label="Location" id="location" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="imageUrl" name="image" label="Image URL" id="image-url" required></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <img :src="imageUrl" height="300px">
            </v-flex>
          </v-layout>


          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-text-field v-model="description" name="description" label="Description" id="description" multi-line required></v-text-field>
            </v-flex>
          </v-layout>
          
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <h4>Choose a Date & Time</h4>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3 class="mb-3">
              <v-date-picker v-model="date"></v-date-picker>
              <span> {{ date }}</span>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-time-picker v-model="time"></v-time-picker>
              <span> {{ time }}</span>
            </v-flex>
          </v-layout>

          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-btn class="primary" :disabled="!formIsValid" type="submit">Create Meet up</v-btn>
            </v-flex>
          </v-layout>

        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      location: '',
      imageUrl: '',
      description: '',
      date: null,
      time: null
    }
  },
  computed: {
    formIsValid() {
      return this.title != '' && this.location != '' && this.description != '';
    },
    submittableDateTime() {
      const date = new Date(this.date);
      date.setHours(this.time.getHours())
      date.setMinutes(this.time.getMinutes())
      return 
    }
  },
  methods: {
    createMeetup() {
      if (!this.formIsValid) {
        return 
      }
      const meetupData = {
        title: this.title,
        location: this.location,
        description: this.description,
        imageUrl: this.imageUrl,
        date: this.date,
        time: this.time
      }
      this.$store.dispatch('createMeetup', meetupData);
      this.$router.push('/meetups');
    }
  }
}
</script>


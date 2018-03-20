<template>
  <v-container>
    <v-layout row transition="fade-transition">
      <v-flex xs12 sm6 offset-sm3 >
        <app-alert @dismissed="onDismissed" :text="error.message"  v-if="error"></app-alert>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <form @submit.prevent="signUpUser">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="email" label="Mail" id="email" v-model="email" type="email" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field name="password" label="Password" id="password" v-model="password" type="password" required></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field  name="confirmPassword" label="Confirm password" id="confirmPassword" v-model="confirmPassword" type="password" :rules="[comparePasswords]"></v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" :disabled="loading" :loading="loading">
                      Sign up
                    </v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: ''
    }
  },
  computed: {
    comparePasswords() {
      return this.password !== this.confirmPassword ? 'Password do not Match' : '';
    },
    user() {
      return this.$store.getters.user;
    },
    error() {
      return this.$store.getters.error;
    },
    loading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    user(value) {
      if ( value !== null && value !== undefined) {
        this.$router.push('/')
      } 
    }
  },
  methods: {
    signUpUser() {
      console.log(this.user)
      this.$store.dispatch('signUpUser', { email: this.email, password: this.password })
    },
    onDismissed() {
      this.$store.dispatch('clearError');
    }
  }
}
</script>


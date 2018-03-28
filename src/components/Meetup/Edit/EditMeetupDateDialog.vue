<template>
  <v-dialog width="40%" persistent v-model="editDialog">
      <v-btn accent slot="activator">
          Edit Date
      </v-btn>

      <v-card>
          <v-container>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-card-title>Edit Meetup date</v-card-title>
                  </v-flex>
              </v-layout>
              <v-divider></v-divider>
              <v-layout row wrap>
                  <v-flex xs12>
                      <v-date-picker style="width: 100%;" v-model="editableDate" actions>
                          <template scope="{save, cancel}">
                              <v-btn class="red--text darken-1" flat @click.native="editDialog = false">Close</v-btn>
                              <v-btn class="blue--text darken-1" flat @click.native="onSaveChanges">Save</v-btn>
                          </template>
                      </v-date-picker>
                  </v-flex>
              </v-layout>
          </v-container>
      </v-card>
  </v-dialog>
</template>

<script>
export default {
    props: ['meetup'],
    data() {
        return {
            editDialog: false,
            editableDate: null
        }
    },
    methods: {
        onSaveChanges() {
            const newDate = new Date(this.meetup.date)
            const newDay = new Date(this.editableDate).getUTCDate()
        }
    },
    created() {
        this.editableDate = new Date(this.meeetup.date)
    }
}
</script>

<template>
    <v-container> 
        <v-layout row wrap>
            <v-flex xs12 sm10 md8 offset-sm-1 offset-md-2>

                <v-card class="info">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media 
                                src="https://images.unsplash.com/photo-1509294329193-a9fa55ccad81" 
                                height="150px" >
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm9 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="white--text mb-0">My Meetup</h3>
                                        <div>17th July 2019</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat light to='/meetups/1'>
                                        <v-icon>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>

            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
  
}
</script>


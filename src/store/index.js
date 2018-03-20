import Vue from 'vue'
import Vuex from 'vuex'
import Chance from 'chance'

import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [
            {
                id: 1,
                title: 'Awesome Food',
                src: 'https://static1.squarespace.com/static/55723b6be4b05ed81f077108/t/5633000fe4b0072b576cc030/1446182932037/Money+for+Good.jpg?format=1500w',
                date: chance.date({string: true})
            },
            {
                id: 2,
                title: 'We need to go there',
                src: 'https://images.unsplash.com/photo-1493805503700-3219b693ffcc?ixlib=rb-0.3.5&s=9850259b418dcd691cc6e8d2019e13c8&auto=format&fit=crop&w=1350&q=80',
                date: chance.date({string: true})
            },
            {
                id: 3,
                title: 'Dude i need help',
                src: 'https://images.unsplash.com/photo-1511225160131-38607044acc7?ixlib=rb-0.3.5&s=7e61429ce86a13776775fa88f7c3ec9a&auto=format&fit=crop&w=1350&q=80',
                date: chance.date({string: true})
            },
            {
                id: 4,
                title: 'Carousel Amazing',
                src: 'https://images.unsplash.com/photo-1512532019-3bdca31ba6ed?ixlib=rb-0.3.5&s=71469e704f32fce92b1db4edda3028f7&auto=format&fit=crop&w=1350&q=80',
                date: chance.date({string: true})
            }
        ],
        user: null,
        loading: false,
        error: null,
    },
    mutations: {
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload);
        },
        setUser (state, payload){
            state.user = payload;
        },
        setLoading (state, payload) {
            state.loading = payload;
        },
        setError(state, payload) {
            state.error = payload;
        },
        clearError(state, payload ) {
            state.error = null;
        }
    },
    actions: {
        createMeetup ( {commit}, payload ) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                src: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                id: 'exampleID'
            }

            // Reach out to firebase and store it
            commit('createMeetup', meetup);
        },
        signUpUser( {commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    })
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error);
                    }
                )
        },
        signInUser( {commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password) 
                .then(
                    user => {
                        commit('setLoading', false)
                        const loggedUser = {
                            id: user.uid
                        }
                        commit('setUser', loggedUser)
                    })
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                        console.log(error);
                    }
                )
        },
        clearError({commit}) {
            commit('clearError');
        }
    },
    getters: {
        loadedMeetups (state) {
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date;
            })
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find( (meetup) => {
                    return meetup.id == meetupId;
                });
            }
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 4);
        },
        user (state) {
            return state.user
        },
        error (state) {
            return state.error;
        },
        loading (state) {
            return state.loading;
        }

    },
    
});
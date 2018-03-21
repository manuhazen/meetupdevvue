import Vue from 'vue'
import Vuex from 'vuex'
import Chance from 'chance'

import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loadedMeetups: [],
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
        },
        setLoadedMeetups( state, payload) {
            state.loadedMeetups = payload;
        }
    },
    actions: {
        loadMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then(
                    (data) => {
                        const meetups = [];
                        const obj = data.val();
                        for (let key in obj) {
                            meetups.push({
                                id: key,
                                title: obj[key].title,
                                description: obj[key].description,
                                src: obj[key].src,
                                time: obj[key].time,
                                date: obj[key].date
                            })
                        }
                        commit('setLoadedMeetups', meetups);
                        commit('setLoading', false)
                    })
                .catch( (error) => {
                    console.log(error);
                    commit('setLoading', false)
                })
        },
        createMeetup ( {commit}, payload ) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                src: payload.imageUrl,
                description: payload.description,
                date: payload.date,
                time: payload.time,
            }
            firebase.database().ref('meetups').push(meetup)
                .then( (data) => {
                    const key = data.key;
                    console.log(key);
                    commit('createMeetup', {
                        ...meetup,
                        id: key
                    });
                })
                .catch( (error) => {
                    console.log(error);
                })  
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
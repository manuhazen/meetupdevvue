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
        updateMeetupData(state, payload) {
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if(payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.description = payload.description
            }
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
        autoSignIn({commit}, payload) {
            commit('setUser', {id: payload.uid, registeredMeetups: [] })
        },
        logoutUser({commit}) {
            firebase.auth().signOut();
            commit('setUser', null)
        },
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
                                imageUrl: obj[key].imageUrl,
                                time: obj[key].time,
                                date: obj[key].date,
                                creatorId: obj[key].creatorId
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
        createMeetup ( {commit, getters}, payload ) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                time: payload.time,
                creatorId: getters.user.id,
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then( (data) => {
                    key = data.key;
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
                    console.log(payload.image)
                })
                .then(fileData => {
                    imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('meetups').child(key).update({
                        imageUrl: imageUrl
                    })
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
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
        updateMeetupData( {commit}, payload){
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetups').child(payload.id).update(updateObj)
                .then( () => {
                    commit('setLoading', false)
                    commit('updateMeetupData', payload)
                })
                .catch( error => {
                    console.log(error)
                    commit('setLoading', false)
                })
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
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Meetups from '@/components/Meetup/Meetups'
import MeetupForm from '@/components/Meetup/CreateMeetup'
import Meetup from '@/components/Meetup/Meetup'

import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    },
    {
      path: '/meetups/new',
      name: 'CreateMeetup',
      component: MeetupForm
    },
    {
      path: '/meetups/:id',
      name: 'Meetup',
      component: Meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/login',
      name: 'Signin',
      component: Signin
    }
  ]
})
import { createStore } from 'vuex';
import axiosClient from '../axios';

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        gigs: {
            loading: false,
            links: [],
            data: []
        },
        currentGig: {
            loading: false,
            data: {}
        },
        notification: {
            show: false,
            type: null,
            message: null
        }
    },
    getters: {},
    actions: {
        register({ commit }, user) {
            return axiosClient.post('/register', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data
                })
        },
        login({ commit }, user) {
            return axiosClient.post('/login', user)
                .then(({ data }) => {
                    commit('setUser', data)
                    return data;
                })
        },
        logout({ commit }) {
            return axiosClient.post('/logout')
                .then(({ data }) => {
                    commit('logout')
                    return data;
                })
        },
        saveGig({ commit }, gig) {
            delete gig.logo_preview;
            let response;
            if (gig.id) {
                // Update
                response = axiosClient.put(`/gigs/${gig.id}`, gig).then((res) => {
                    commit('setCurrentGig', res.data);
                    return res;
                })
            } else {
                // Create
                response = axiosClient.post('/gigs', gig).then((res) => {
                    commit('setCurrentGig', res.data);
                    return res;
                })
            }
        },
        getGig({ commit }, id) {
            commit('setCurrentGigLoading', true)
            return axiosClient.get(`/gigs/${id}`)
                .then((res) => {
                    commit('setCurrentGigLoading', false)
                    commit('setCurrentGig', res.data)
                    return res;
                })
                .catch((err) => {
                    commit('setCurrentGigLoading', false)
                    throw err
                })
        },
        getGigs({ commit }, {url = null} = {}) {
            url = url || '/gigs'
            commit('setGigsLoading', true)
            return axiosClient.get(url)
                .then((res) => {
                    commit('setGigsLoading', false)
                    commit('setGigs', res.data)
                    return res
                })
        },
        deleteGig({ }, id) {
            return axiosClient.delete(`/gigs/${id}`)
        },
        searchGigs({ commit }, search) {
            commit('setSearchedGigsLoading', true)
            return axiosClient.get(`/gigs-search?search=${search}`)
                .then((res) => {
                    commit('setSearchedGigsLoading', false)
                    commit('setSearchedGigs', res.data)
                    return res;
                })
        }
    },
    mutations: {
        logout: (state) => {
            state.user.data = {};
            state.user.token = null;
            sessionStorage.removeItem('TOKEN');
        },
        setUser: (state, userData) => {
            state.user.data = userData.user;
            state.user.token = userData.token;
            sessionStorage.setItem('TOKEN', userData.token);
        },
        setCurrentGigLoading: (state, loading) => {
            state.currentGig.loading = loading;
        },
        setCurrentGig: (state, gig) => {
            state.currentGig.data = gig.data;
        },
        setGigsLoading: (state, loading) => {
            state.gigs.loading = loading;
        },
        setGigs: (state, gigs) => {
            state.gigs.data = gigs.data;
            state.gigs.links = gigs.meta.links;
        },
        setSearchedGigsLoading: (state, loading) => {
            state.gigs.loading = loading;
        },
        setSearchedGigs: (state, gigs) => {
            state.gigs.data = gigs.data;
        },
        notify: (state, {message, type}) => {
            state.notification.show = true;
            state.notification.type = type;
            state.notification.message = message;
            setTimeout(() => {
                state.notification.show = false;
            }, 3000)
        }
    },
    modules: {}
});

export default store;

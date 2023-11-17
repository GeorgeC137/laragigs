import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpGigs = [
    {
        id: '20',
        title: 'Laravel Senior Developer',
        email: 'riconets@example.com',
        logo: 'https://picsum.photos/500',
        company: 'Riconets',
        location: 'Bahati, Nakuru',
        website: 'www.example.com',
        description: 'We are looking for a developer on the above mentioned language',
        created_at: '2023-10-20 18:00:00',
        updated_at: '2023-10-20 18:00:00',
        tag: ['MySQL', 'Laravel', 'Backend']
    },
    {
        id: '50',
        title: 'Angular Senior Developer',
        email: 'jiji@example.com',
        logo: 'https://picsum.photos/500',
        company: 'Jiji',
        location: 'Molo, Nakuru',
        website: 'www.jiji.com',
        description: 'We are looking for a developer on the above mentioned language',
        created_at: '2023-9-20 18:00:00',
        updated_at: '2023-9-20 18:00:00',
        tag: ['Angular', 'JavaScript', 'Frontend']
    },
    {
        id: '45',
        title: 'Vue Junior Developer',
        email: 'flani@gmail.com',
        logo: 'https://picsum.photos/500',
        company: 'Flani',
        location: '58, Nakuru',
        website: 'www.flani.com',
        description: 'We are looking for a developer on the above mentioned language',
        created_at: '2023-8-20 18:00:00',
        updated_at: '2023-8-20 18:00:00',
        tag: ['Git', 'Vue', 'Frontend']
    },
    {
        id: '25',
        title: 'Java Senior Developer',
        email: 'mycompany@example.com',
        logo: 'https://picsum.photos/500',
        company: 'MyCompany',
        location: 'Kabarak, Nakuru',
        website: 'www.mycompany.com',
        description: 'We are looking for a developer on the above mentioned language',
        created_at: '2023-7-20 18:00:00',
        updated_at: '2023-7-20 18:00:00',
        tag: ['MySQL', 'Java', 'Frontend', 'Backend']
    },
    {
        id: '15',
        title: 'Laravel Junior Developer',
        email: 'faimba@example.com',
        logo: 'https://picsum.photos/500',
        company: 'Faimba',
        location: 'Bahati, Nakuru',
        description: 'We are looking for a developer on the above mentioned language',
        website: 'www.faimba.com',
        created_at: '2023-6-20 18:00:00',
        updated_at: '2023-6-20 18:00:00',
        tag: ['MySQL', 'Laravel', 'Backend']
    },
    {
        id: '19',
        title: 'Flutter Senior Developer',
        email: 'flutter@example.com',
        logo: 'https://picsum.photos/500',
        company: 'flutter',
        location: 'Ruiru, Nairobi',
        description: 'We are looking for a developer on the above mentioned language',
        website: 'www.flutter.com',
        created_at: '2023-5-20 18:00:00',
        updated_at: '2023-5-20 18:00:00',
        tag: ['Flutter', 'Git', 'Frontend']
    }
];

const store = createStore({
    state: {
        user: {
            data: {},
            token: sessionStorage.getItem('TOKEN'),
        },
        gigs: [...tmpGigs]
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
                    commit('updateGig', res.data);
                    return res;
                })
            } else {
                // Create
                response = axiosClient.post('/gigs', gig).then((res) => {
                    commit('saveGig', res.data);
                    return res;
                })
            }
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
        saveGig: (state, gig) => {
            state.gigs = [...state.gigs, gig.data];
        },
        updateGig: (state, gig) => {
            state.gigs = state.gigs.map((g) => {
                if(g.id === gig.data.id) {
                    return gig.data;
                }
                return g;
            })
        }
    },
    modules: {}
});

export default store;

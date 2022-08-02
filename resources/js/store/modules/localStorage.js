import axios from "../../utils/axios"

const moduleLocalStorage = {
    state: {
        token: null,
        name: null
    },
    actions: {
        checkToken: ({ commit }) => {
            const token = localStorage.getItem('x_xsrf_token')

            if (!token) {
                return commit('updateToken', null)
            }

            return commit('updateToken', token)
        },

        checkName: async ({ commit }) => {
            const token = localStorage.getItem('x_xsrf_token')

           if (token) {

               commit('updateName', {data: null, error: null, loading: true})

               try {

                   const { data, status } = await axios.get('/api/user')

                   if (status >= 400) {
                       throw new Error(data.message || "Что-то пошло не так")
                   }

                   commit('updateName', {data, error: null, loading: false})

                   return {data, error: null}

               } catch (error) {
                   console.log(error)

                   commit('updateName', {data: null, error})

                   return {data: null, error}
               }
           }
        }
    },
    mutations: {
        updateToken: (state, payload) => state.token = payload,
        updateCreateToken: (state, payload) => state.token = payload,
        updateName: (state, payload) => state.name = payload
    },
    getters: {
        getToken: state => state.token,
        getName: state => state.name
    },
}

export default moduleLocalStorage

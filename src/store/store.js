
import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        menu_list:[],
    },
    mutations:{
        CHANGE_MENU_LIST(state,arr){
            state.menu_list = arr
        },
    },
    getters:{

    }
})

export default store
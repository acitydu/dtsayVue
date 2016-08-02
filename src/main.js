import Vue from 'vue'
import WildVue from 'wildvue'
import Wilddog from 'wilddog'
/*import App from './App'*/
import index from './App'
import articlelist from './components/articlelist'
import articleinfo from './components/articleinfo'
import user from './components/user'
import post from './components/post'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui' 
import 'normalize.css/normalize.css'
/*import 'mint-ui/lib/style.css'*/
import './assets/css/main.css'
import 'vux/dist/vux.css'
import pagetabbar from './components/pagetabbar'
import vux from './components/vux'

Vue.use(WildVue)
Vue.use(VueResource)
Vue.use(VueRouter)

Vue.config.debug = true;//开启错误提示
/* eslint-disable no-new */
/*new Vue({
  el: 'body',
  components: { App,tabbar }
})*/
var App = Vue.extend({
	components: {
	    vux,pagetabbar,articlelist
	},
});

var router = new VueRouter()
router.map({
    '/articlelist': {
    	name:'articlelist',
        component: articlelist
    },
    '/index':{
        name:'index',
        component:index,
    },
    '/user':{
        name:'user',
        component:user,
    },
    '/post':{
        name:'post',
        component:post,
    },
    '/articleinfo/:aid':{
        name:'articleinfo',
        component:articleinfo,
    }
})

router.redirect({
  '*': '/articlelist'
})

router.start(App, '#app')

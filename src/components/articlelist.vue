<template>
  	<scroller lock-x scrollbar-y 
  	use-pulldown 
  	:pulldown-status.sync="pulldownStatus" 
  	@pulldown:loading="load" 
  	class="scroller-div" 
  	:pulldown-config=pulldownConfig
  	enable-horizontal-swiping>

        <div class="scroller-container" >
            <div class="swiper-container">...3<br>3<br></div>
            <div class="content">
            	<ul>
				    <li v-for="value in anObject" data-aid="{{ $key }}" >
				    	<div @click="gotoinfo">{{ value.atlcontent }}：{{ value.atldesc }}</div>
				    	<a v-on:click="gotolike">like</a>
				    </li>
				    3<br>3<br>3<br>3<br>3<br>3<br>3<br>3<br>3<br>3<br>3<br>3<br>
				</ul>
            </div>
        </div>
        <div slot="pulldown" class="xs-plugin-pulldown-container xs-plugin-pulldown-down" style="position: absolute; width: 100%; height: 60px; line-height: 60px; top: -60px; text-align: center;">
            <span v-show="pulldownStatus === 'default'"></span>
            <span class="pulldown-arrow" v-show="pulldownStatus === 'down' || pulldownStatus === 'up'" :class="{'rotate': pulldownStatus === 'up'}">↓</span>
            <span v-show="pulldownStatus === 'loading'"><spinner type="ios-small"></spinner></span>
        </div>
	</scroller>
</template>

<style>
.scroller-div{padding-bottom:60px;box-sizing:border-box;}
</style>

<script type="text/babel">
import scroller from 'vux/src/components/scroller';
import spinner from 'vux/src/components/spinner';

var ref = new Wilddog("https://dtsay.wilddogio.com");
var refatls = new Wilddog("https://dtsay.wilddogio.com/atls");
var authData;

export default {
    components: {
      scroller,spinner
    },
    data () {
	    return {
	    	pulldownStatus:"default",
	    	pulldownConfig:{
	    		
	    	},
	    	load:function(){
				console.log(1)
			}
	    }
	},
	wilddog: {
	    // 完整语法
	    anObject: {
		    source: refatls,
		    // 可选，作为对象绑定
		    asObject: true,
		    // 可选，提供一个回调
		    cancelCallback: function () {
		    	//alert(1);
		    }
	    }
	},
	methods: {
	    gotolike: function (event) {
	    	var aid = event.target.parentNode.getAttribute("data-aid");
	    	console.log(aid);
	    	var date = new Date();
	    	var datetime = date.getTime();
	    	console.log(date+"|"+datetime);
	    	if (authData) {
	    		var aref = new Wilddog("https://dtsay.wilddogio.com/atls/"+aid)
		    	var newPostRef = refatls.child(aid).push(
					{
						atldesc:this.atldesc,
	    				atlcontent:this.atlcontent,
						atltime:datetime,
						atluser:authData.uid,
						atllikes:{}
					}
				)
			} else {
			    console.log("User is logged out")
			}
	    },
	    gotoinfo: function(event){
	    	var aid = event.target.parentNode.getAttribute("data-aid");
	    	this.$route.router.go({ name: 'articleinfo', params: { aid: aid }})
	    }
	},
	route: {
	    activate: function (transition) {
		    authData = ref.getAuth()
			if (authData) {
			    console.log("User " + authData.uid + " is logged in with " + authData.provider);
			} else {
			    console.log("User is logged out");
			}
		    transition.next();
	    },
	    deactivate: function (transition) {
	        console.log('hook-example deactivated!');
	        transition.next();
	    }
	}
}
</script>
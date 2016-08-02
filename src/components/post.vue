<template>
  	<group title="标题">
  		<x-input id="atldesc" placeholder="请输入时间、背景等" :value.sync="atldesc" type="text"></x-input>
	</group>
	<group title="喆理正文">
		<x-textarea :max="200" id="atlcontent" placeholder="请输入喆理" :value.sync="atlcontent"></x-textarea>
	</group>
	<x-button @click="gotopost">发布喆理</x-button>
</template>

<script type="text/babel">
import group from 'vux/src/components/group'
import XInput from 'vux/src/components/x-input'
import XTextarea from 'vux/src/components/x-textarea'
import XButton from 'vux/src/components/x-button'

var refatls = new Wilddog("https://dtsay.wilddogio.com/atls");

var ref = new Wilddog("https://dtsay.wilddogio.com");
var authData;

export default {
    components: {
      group,XInput,XTextarea,XButton
    },
    data () {
	    return {
	    	atldesc:"",
	    	atlcontent:""
	    }
	},
	methods: {
	    gotopost: function (event) {
	    	var date = new Date();
	    	var datetime = date.getTime();
	    	console.log(date+"|"+datetime);
	    	if (authData) {
		    	var newPostRef = refatls.push(
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
		    transition.next()
	    },
	    deactivate: function (transition) {
	        console.log('hook-example deactivated!')
	        transition.next()
	    }
	}
}
</script>
<template>
  	<div>是<!-- {{$route.params.aid}} --> {{atldesc}} {{atlcontent}}</div>
</template>

<style>
/* .scroller-div{overflow-y:scroll!important;padding-bottom:60px;box-sizing:border-box;} */
</style>

<script type="text/babel">
var ref = new Wilddog("https://dtsay.wilddogio.com");
var refatls = new Wilddog("https://dtsay.wilddogio.com/atls");
var authData,aobj={};


export default {
    components: {
    },
    data () {
	    return {
	    	aid:"",
	    	atldesc:"",
	    	atlcontent:""
	    }
	},
	methods: {
	    gotolike: function (event) {
	    	console.log(event.target.parentNode.getAttribute("data-aid"));
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
	    /*activate: function (transition) {
		    authData = ref.getAuth()
			if (authData) {
			    console.log("User " + authData.uid + " is logged in with " + authData.provider);

		    	ref.child(aid).on("value", function(datasnapshot) {
			        console.log(datasnapshot.val());
			    });
			} else {
			    console.log("User is logged out");
			}
		    transition.next();
	    },*/
	    deactivate: function (transition) {
	        console.log('hook-example deactivated!');
	        transition.next();
	    },
	    data:function(transition){
	    	this.aid = transition.to.params.aid;
	    	authData = ref.getAuth();
			if (authData) {
			    console.log("登录成功：User " + authData.uid + " is logged in with " + authData.provider);
			    
		    	refatls.child(transition.to.params.aid).on("value", function(datasnapshot) {
			        aobj = datasnapshot.val();
			        transition.next({
				        atldesc : aobj.atldesc,
				        atlcontent : aobj.atlcontent
				    })
			    });
			} else {
			    console.log("已登出：User is logged out");
			}
	    	
	    }
	}
}
</script>
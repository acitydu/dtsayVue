<template>
  	<group>
	  	<cell title="我的" value="Protected" @click="click"></cell>
	</group>
</template>

<script type="text/babel">
import group from 'vux/src/components/group'
import cell from 'vux/src/components/cell'

var ref = new Wilddog("https://dtsay.wilddogio.com/");
ref.child("data/g1").on("value", function(datasnapshot) {
    //console.log(datasnapshot.val());
});

//  通过一个自定义的Wilddog Token来认证用户
var token = localStorage.dtsaytoken


function authHandlerToken (error, authData) {
	if (error) {
        //console.log("Token Login Failed!", error);
        ref.authWithOAuthPopup("weibo", authHandler);
    } 
    else {
        //console.log("Authenticated successfully with payload:", authData);
    }
}

function authHandler(error, authData) {
    if (error) {
        //console.log("Weibo Login Failed!", error);
    } 
    else {
        //console.log("Authenticated successfully with payload:", authData);
        var refuser = new Wilddog("https://dtsay.wilddogio.com/user");
        refuser.child(authData.uid).set(
			{
				username:authData.weibo.username,
				profile_image_url:authData.weibo.cachedUserProfile.profile_image_url
			}
		);
		localStorage.dtsaytoken = authData.token;
    }
}



export default {
    components: {
      group,cell
    },
    data () {
	    return {
	    	
	    }
	},
	methods: {
	    click: function () {
	        alert('click')
	    }
	},
	route: {
	    activate: function (transition) {
		    var authData = ref.getAuth()
			if (authData) {
			    console.log("User " + authData.uid + " is logged in with " + authData.provider)
			} else {
			    console.log("User is logged out")
			    ref.authWithCustomToken(token, authHandlerToken)
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
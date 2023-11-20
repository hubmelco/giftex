import React from 'react';
import {GoogleLogin} from "react-google-login";

const clientID = "226396248276-hg5hj7tr2fbhsiu55o5v75unhtl8ipo7.apps.googleusercontent.com";

/**
 * Google login
 * 
 * Implemented by 2020 group
 */
function GoogleLogIn() {
    const onSuccess = (res) => {
        console.log(res);
        // axios.get(`https://people.googleapis.com/v1/${res.googleId}`)
        //     .then(function(res){
        //         console.log(res);
        //     })
    }
    const onFailure = (res) =>{
        console.log("[Login failed] res: ", res)
    }

    return (
        <div>
            <GoogleLogin
            clientId={clientID}
            buttenText={"Login"}
            scope = 'https://www.googleapis.com/auth/user.birthday.read'
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}/>
        </div>
    )
}

export default GoogleLogIn;
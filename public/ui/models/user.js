import m from 'mithril';
import localforage from 'localforage'
import {getCookie, deleteCookie} from '../../util/cookie.js';

export var UserModel = {
    NewUser: {},
    User: null,
    GetUserfromStorage: function(){
        console.log("user : ", UserModel.User)
        if (!UserModel.User || !UserModel.User.email){
            console.log("No user, lets look for a user");
            return localforage.getItem('AuthUser').then(function(user){
                console.log("Got User");
                console.log(user)
                if (user != null){
                    UserModel.User = user
                    m.redraw()
                    return
                }
                UserModel.User = null
                m.redraw()
            })
        }
    },
    Login : (loginUser) => {
        return m.request({
            method: "POST",
            url: "/api/users/login",
            data: loginUser
        }).then(function(response) {
            console.log("User Login response#: ", response);
            var cookie = getCookie("X-USER-TOKEN")
            console.log("cookie:", cookie)
            return localforage.setItem('AuthUser', response.user)
          })
          .then(function(){
            UserModel.GetUserfromStorage();
            m.route.set("/dashboard/");
        })
    },
    Logout : () => {
        localforage.removeItem("AuthUser");
        UserModel.User = null;
        deleteCookie("X-USER-TOKEN");
        console.log("Cooookie deleted!");
        m.redraw()
        m.route.set("/");
    },
    Signup: () => {
        UserModel.NewUser.image = "";
        return m.request({
            method: "POST",
            url: "/api/users",
            data: UserModel.NewUser
        }).then((response) => {
            console.log("response: ", response);
        })
    }
}
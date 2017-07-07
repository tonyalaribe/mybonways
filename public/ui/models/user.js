import m from 'mithril';

export var UserModel = {
    NewUser: {},
    User: {},
    Login : () => {
        return m.request({
            method: "POST",
            url: "/api/users/login",
            data: UserModel.NewUser
        }).then((response) => {
            console.log("response: ", response);
        })
    },
    Logout : () => {

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
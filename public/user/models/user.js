import m from 'mithril';

export var UserModel = {
    User: {},
    SignupUser: {},
    LoginUser: {},
    Login: () => {
        return m.request({}).then((response) => {
            
        })
    },
    Signup: () => {
        console.log("Signup")
    },
    Logout: () => {
        return m.request({})
    }
}
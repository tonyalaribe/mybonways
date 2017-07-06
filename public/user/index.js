import m from 'mithril';

import SignupPage from './containers/signupPage.js';
import AdminShell from './containers/adminShell.js';
import OffCanvasMenu from './components/offCanvasMenu.js';

var root = document.getElementById('appContainer');

m.route.prefix('/user');
m.route(root, '/signup', {
    '/signup': {
        view: (vnode) => {
            return m(SignupPage, vnode.attrs)
        }
    }
});
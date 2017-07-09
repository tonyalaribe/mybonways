import m from 'mithril';
import {UserModel} from '../models/user.js';

var Favourites = {
    oncreate: () => {
        // UserModel.GetUserfromStorage();
    },
    view: (vnode) => {
        return (
            <section>
                {m.fragment(vnode.attrs, vnode.children)}
                <div class="">
                    {UserModel.User?
                    <section>
                        <h2 class="red-custom">Favourites</h2>
                    </section>
                    : ""}
                </div>
            </section>
        )
    }
}

export default Favourites;
import m from 'mithril';

var Dashboard = {
    view: (vnode) => {
        return (
            <section>
                {m.fragment(vnode.attrs, vnode.children)}
                <div class="pa2">
                    <p>Board</p>
                </div>
            </section>
        )
    }
}

export default Dashboard;
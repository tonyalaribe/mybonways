import m from 'mithril';
import {UserModel} from '../models/user.js';

var Dashboard = {
    oncreate: () => {
        UserModel.GetReservations();
    },
    view: (vnode) => {
        return (
            <section>
                {m.fragment(vnode.attrs, vnode.children)}
                <div class="pa2">
                    <h2 class="red-custom tc underline">Reserved Promos.</h2>
                    {/*Reserved promos goes here.*/}
                    {UserModel.Reservations?UserModel.Reservations.map((reservation, i) => {
                        return (
                        <div class="dib w-50 pa1 fl" key={i}>
                            <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/" + reservation.slug} oncreate={m.route.link}>
                            <div class="f8 pv1 tr pa1">
                                <img src="/assets/img/svg/cart.svg" style="height:0.6rem;" />
                                <span class="red-custom">{reservation.company_id}</span>
                            </div>
                            <div class="w-100 cover overflow-hidden" style={"background-image:url(" + reservation.featured_image_b64 + ")"} oncreate={(vnode) => {
                                vnode.dom.style.height = (vnode.dom.offsetWidth / 1.5) + "px" }}>
                                <img src={reservation.featured_image} class="w-100 br2" />
                            </div>
                            <span class="f7 lh-title dib pa1 ">{reservation.item_name}</span>
                            <div class="f8 pa1 tr cf">
                                <div class="dib w-50 fl">
                                    <span class=" red-custom db fw6 f5">{(((parseInt(reservation.old_price) - parseInt(reservation.new_price)) / parseInt(reservation.old_price)) * 100).toFixed(1)}%</span>
                                </div>
                                <div class="dib w-50 fl">
                                    <strong class="dark-gray db">{reservation.new_price}CFA</strong>
                                    <span class="strike db">{reservation.old_price}CFA</span>
                                </div>
                            </div>
                            <div class="f8 pa1 pv2 ">
                                <span class="pa1">
                                    <img src="/assets/img/svg/like-hollow.svg" class="dib pr1" style="height:0.5rem;" />
                                <span class="dib">200</span>
                                </span>
                                <span class="pa1">
                                    <img src="/assets/img/svg/comment.svg" class="pr1" style="height:0.5rem;" />
                                    <span class="dib">12</span>
                                </span>
                            </div>
                            </a>
                        </div>
                        )
                    }) : <p>No Reservations yet.</p>}
                </div>
            </section>
        )
    }
}

export default Dashboard;
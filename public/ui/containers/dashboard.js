import m from 'mithril';

var Dashboard = {
    view: (vnode) => {
        return (
            <section>
                {m.fragment(vnode.attrs, vnode.children)}
                <div class="pa2">
                    <h2 class="red-custom tc underline">Reserved Promos.</h2>
                    {/*Reserved promos goes here.*/}
                    <div class="dib w-50 pa1 fl">
                        <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/"} oncreate={m.route.link}>
                          <div class="f8 pv1 tr pa1">
                            <img src="/assets/img/svg/cart.svg" style="height:0.6rem;" />
                            <span class="red-custom"> company_id </span>
                          </div>
                          <div class="w-100 cover overflow-hidden" style={"background-image:url('')"} oncreate={(vnode) => {
                            vnode.dom.style.height = (vnode.dom.offsetWidth / 1.5) + "px"
                          }}>
                            <img src="https://s3-us-west-2.amazonaws.com/test-past3/slide_images/8efe6ccf-5f9d-11e7-9eb3-78acc0541b73" class="w-100 br2" />
                          </div>
                          <span class="f7 lh-title dib pa1 ">item_name</span>
                          <div class="f8 pa1 tr cf">
                            <div class="dib w-50 fl">
                              <span class=" red-custom db fw6 f5">
                                  {/*{(((parseInt(promo.old_price) - parseInt(promo.new_price)) / parseInt(promo.old_price)) * 100).toFixed(1)}%*/}
                                  50%
                                  </span>
                            </div>
                            <div class="dib w-50 fl">
                              <strong class="dark-gray db">200CFA</strong>
                              <span class="strike db">400CFA</span>
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
                        <div class="dib w-50 pa1 fl">
                            <a class="br2 gray hover-bg-light-gray-custom fl bg-white hover-shadow-m2 ba b--light-gray link w-100" href={"/promo/"} oncreate={m.route.link}>
                            <div class="f8 pv1 tr pa1">
                                <img src="/assets/img/svg/cart.svg" style="height:0.6rem;" />
                                <span class="red-custom"> company_id </span>
                            </div>
                            <div class="w-100 cover overflow-hidden" style={"background-image:url('')"} oncreate={(vnode) => {
                                vnode.dom.style.height = (vnode.dom.offsetWidth / 1.5) + "px"
                            }}>
                                <img src="https://s3-us-west-2.amazonaws.com/test-past3/slide_images/8efe6ccf-5f9d-11e7-9eb3-78acc0541b73" class="w-100 br2" />
                            </div>
                            <span class="f7 lh-title dib pa1 ">item_name</span>
                            <div class="f8 pa1 tr cf">
                                <div class="dib w-50 fl">
                                <span class=" red-custom db fw6 f5">
                                    {/*{(((parseInt(promo.old_price) - parseInt(promo.new_price)) / parseInt(promo.old_price)) * 100).toFixed(1)}%*/}
                                    50%
                                    </span>
                                </div>
                                <div class="dib w-50 fl">
                                <strong class="dark-gray db">200CFA</strong>
                                <span class="strike db">400CFA</span>
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
                </div>
            </section>
        )
    }
}

export default Dashboard;
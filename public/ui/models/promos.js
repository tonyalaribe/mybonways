import m from 'mithril';

export var Promos = {
    FeaturedPromos : [],
    Promo: {promo_images:""},
    PromoMerchant: {},
    Page: 1,
    GetFeaturedPromos: () => {
        return m.request({
            method: "GET",
            url: "/api/featuredpromos",
        }).then((response) => {
            console.log("featured promos response:", response);
            Promos.FeaturedPromos = response;
        }).catch((error) => {
            console.error("featured promos error: ", error)
        })
    },
    LoadMore: () => {
        return m.request({
            method: "GET",
            url: "/api/featuredpromos/" + ++Promos.Page
        }).then((response) => {
            console.log("more promos: ", response);
            if(response.length > 0 ) {
                Promos.FeaturedPromos.push.apply(Promos.FeaturedPromos, response);
                // Promos.FeaturedPromos = Promos.FeaturedPromos.concat(response);
            }
            
        }).catch((error) => {
            console.error("more promos Error: ", error);
        })
    },
    GetPromo: (slug) => {
        return m.request({
            method: "GET",
            url: "/api/promo/" + slug
        }).then((response) => {
            console.log("Promo details response: ", response);
            Promos.Promo = response;
            m.redraw();
            Promos.GetPromoMerchant(response.company_id);
        }).catch((error) => {
            console.error("promos details error: ", error)
        })
    },
    GetPromoMerchant: (company_id) => {
        return m.request({
            method: "GET",
            url: "/api/merchant/" + company_id
        }).then((response) => {
            console.log("Promo merchant response: ", response);
            Promos.PromoMerchant = response;
        }).catch((error) => {
            console.error("Promos merchant error: ", error)
        })
    },
    Reserve: (id) => {
        console.log("Reserve this promo. UserID: ", id);
        return m.request({
            method: "POST",
            url: "/api/promos/reserve",
            data: Promos.Promo
        }).then((response) => {
            console.log("reserve response: ", response);
        })
    }
}
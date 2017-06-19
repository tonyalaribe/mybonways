import m from 'mithril';

function genFakePromos(n) {
    var fakePromos = [];
    for (var i = 1; i < n; i++) {
        var p = {};
        p.ID = i;
        p.Name = "Name " + i;
        p.Category = "Category " + i;
        p.OldPrice = 1000 * i;
        p.NewPrice = p.OldPrice - 500;
        p.Description = "Description " + i;
        p.StartDate = "12/09/2017";
        p.EndDate = "19/09/2017";

        fakePromos.push(p);
    }
    return fakePromos;
}
/*
    {
  "item_name":"my item"
  "company_id":"calli"
  "category":"cat"
  "old_price":2000
  "new_price":1000
  "start_date":"2017-06-14T20:00:05.869Z"
  "end_date":"2017-06-14T20:00:05.869Z"
  "description":"description_one"
  "images":[]
}
*/


export var Promos = {
    AllPromos: [],
    NewPromo: {},
    GetAllPromos: function() {
        return m.request({
            method: "GET",
            url: "/api/merchants/promo"
        }).then(function(response) {
            console.log("get promo Response: ", response);
            Promos.AllPromos = response
            m.redraw()
            // if successful, add the new promo to the promo list
        })
    },
    SaveNew: function() {
        // TODO:: Save a new promo.
        return m.request({
            method: "POST",
            url: "/api/merchants/promo",
            data: Promos.NewPromo
        }).then(function(response) {
            console.log("New promo Response: ", response);
            // if successful, add the new promo to the promo list
        })
    }
}
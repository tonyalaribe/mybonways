import m from 'mithril';
import {search} from '../models/search.js';
import {getCookie} from '../../util/cookie.js';

var searchNav = {
  searchError: "",
  oncreate: (vnode) => {
    let input = document.getElementById("areaInput")
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place.geometry.location)

      // check if itemname is set...
      if (!search.searchData.item) {
        // give the user instructions here...
        searchNav.searchError = "Specify an item.";
        m.redraw();
        console.log("no items name...")
        return;
      }
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log("No details available for input: '" + place.name + "'");
        return;
      }
      // do the search here
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      console.log("lat : ", lat, " lng : ", lng);
      var querystring = m.buildQueryString({q: search.searchData.item, lat: lat, lng: lng})
      searchNav.searchError = "";
      search.searchFor(search.searchData.item, lat, lng);
      m.route.set("/search?" + querystring);
      m.redraw()
    });
    if (getCookie("X-USER-TOKEN") !== ""){
      searchNav.Loggedin = true
    }
  },
  Loggedin: false,
  view: (vnode) => {
    return (
    <section>
      <div class="flex flex-row pv1 ph2">
        <div class="flex pa1 pr3">
          {searchNav.Loggedin?<a class="red-custom f3 pointer" onclick={() => vnode.attrs.slideout.toggle()}>☰</a>
          : <a href="/signup" class="bg-white red ba b--red pa1 br2 no-underline" oncreate={m.route.link}>Signup/Login</a>}
        </div>
        <div class="flex flex-row flex-auto">
          <div class="flex flex-auto  justify-center pa1 tc">
              <a href="/map" class={(m.route.get() == "/map" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>Map</a>            
          </div>
          <div class="flex flex-auto justify-center pa1 tc">
              <a href="/" class={(m.route.get() == "/" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>Hot</a>
          </div>
          <div class="flex flex-auto justify-center pa1 tc">
              <a href="/2in1" class={(m.route.get() == "/2in1" ? "bg-red-custom white " : " red-custom " ) +" pa1 dib w-100 br-pill no-underline"} oncreate={m.route.link}>2 in 1</a>            
          </div>
        </div>
      </div>
      <div class="pa2">
            <div class=" cf flex justify-between relative">
                <div class="dib   flex relative " style="flex:7">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                    <img src="/assets/img/svg/search.svg" class="" style="height:0.8rem;" />
                </span>
                <input type="search" class={(searchNav.searchError? " b--red " : " b--transparent ") + " w-100 pa1 ba input-reset searchinput bg-light-gray-custom"} placeholder="search"oninput={m.withAttr("value", function (value) {
                      search.searchData.item = value;
                    })}/>
                </div>
                <div class="dib ml2 flex relative" style="flex:3">
                <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
                    <img src="/assets/img/svg/location.svg" class="" style="height:0.8rem;" />
                </span>
                <input type="search" class="w-100 pa1 input-reset searchinput bg-light-gray-custom bw2 b--transparent" placeholder="area" id="areaInput"
                    oninput={m.withAttr("value", function (value) {
                      search.searchData.area = value;
                    })} />
                </div>
            </div>
        </div>
    </section>
    )
  }
}

export default searchNav;
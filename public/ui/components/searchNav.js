import m from 'mithril';
import {search} from '../models/search.js';
import {UserModel} from '../models/user.js';
import {getCookie} from '../../util/cookie.js';
import tingle from 'tingle.js';



window.setLocation = function(){
  if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position)
        search.searchData.lat = position.coords.latitude
        search.searchData.lng = position.coords.longitude
        document.getElementById("areaInput").value = position.coords.latitude+","+position.coords.longitude
      },
      (error)=>{
        console.log(error)
      },
      {
        enableHighAccuracy: true,
        maximumAge        : 30000,
        timeout           : 27000
      });
  } else {
      console.log("no geolocation support")
  }
}

// instanciate new modal
var modal = new tingle.modal({
    footer: true,
    stickyFooter: false,
    closeMethods: ['overlay', 'button', 'escape'],
    closeLabel: "Close",
    cssClass: [ 'custom-class-2'],
    onOpen: function() {
        console.log('modal open');
    },
    onClose: function() {
        console.log('modal closed');
    },
    beforeClose: function() {
        // here's goes some logic
        // e.g. save content before closing the modal
        return true; // close the modal
    	return false; // nothing happens
    }
});
modal.setContent(`
  <div class="">
      <div class="db relative mv2" >
        <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
            <img src="/assets/img/svg/search.svg" class="" style="height:0.7rem;" />
        </span>
        <input type="search" class=" b--transparent w-100 pa2 ba input-reset searchinput bg-light-gray-custom" placeholder="search term eg. cars, home deals, etc" id="searchQuery"/>
      </div>
      <br/>
      <div class="pv2">
        <div class="tc ">
          <button class="pa2 dib" onclick="window.setLocation()">
            <svg xmlns="http://www.w3.org/2000/svg" class="h1" viewBox="0 0 561 561"><path d="M280.5 178.5c-56.1 0-102 45.9-102 102 0 56.1 45.9 102 102 102 56.1 0 102-45.9 102-102C382.5 224.4 336.6 178.5 280.5 178.5zM507.5 255C494.7 147.9 410.6 63.8 306 53.6V0h-51v53.6C147.9 63.8 63.8 147.9 53.6 255H0v51h53.6C66.3 413.1 150.5 497.3 255 507.5V561h51v-53.5C413.1 494.7 497.3 410.6 507.5 306H561v-51H507.5zM280.5 459C181.1 459 102 380 102 280.5S181.1 102 280.5 102 459 181.1 459 280.5 380 459 280.5 459z"/></svg>
            <span>search around current location</span>
          </button>
        </div>
      </div>
      <div class="tc ">
        <strong>or</strong>
      </div>
      <div class="db relative mv2" >
        <span class="dib searchbtn z-3 pv1 " style="padding-top:0.60rem">
            <img src="/assets/img/svg/location.svg" class="" style="height:0.7rem;" />
        </span>
        <input type="search" class="w-100 pa2 input-reset searchinput bg-light-gray-custom  b--transparent" placeholder="select location" id="areaInput" />
      </div>
  </div>
  `);
// add another button
modal.addFooterBtn('cancel', 'tingle-btn tingle-btn--danger', function() {
    // here goes some logic
    modal.close();
});
// add a button

modal.addFooterBtn('search', 'tingle-btn tingle-btn--primary tingle-btn--pull-right', function() {
    // here goes some logic
    search.searchData.item = document.getElementById("searchQuery").value


    // var lat = place.geometry.location.lat();
    // var lng = place.geometry.location.lng();
    let {lat, lng} = search.searchData;
    console.log("lat : ", lat, " lng : ", lng);
    var querystring = m.buildQueryString({q: search.searchData.item, lat: lat, lng: lng})
    searchNav.searchError = "";
    search.searchFor(search.searchData.item, lat, lng);
    console.log(querystring)
    modal.close()
    m.route.set("/search?" + querystring);

});

var searchNav = {
  searchError: "",
  oncreate: (vnode) => {
    let input = document.getElementById("areaInput")
    var autocomplete = new google.maps.places.Autocomplete(input);
    autocomplete.addListener('place_changed', function () {
      var place = autocomplete.getPlace();
      console.log(place.geometry.location)
      if (!place.geometry) {
        // User entered the name of a Place that was not suggested and
        // pressed the Enter key, or the Place Details request failed.
        console.log("No details available for input: '" + place.name + "'");
        return;
      }
      // do the search here
      var lat = place.geometry.location.lat();
      var lng = place.geometry.location.lng();
      search.searchData.lat = lat
      search.searchData.lng = lng
      m.redraw()
    });
    // var cookie = getCookie("X-USER-TOKEN");
    // if (cookie === ""){
    //   console.log("X-USER-TOKEN: ", cookie, " user:", UserModel.User);
    // } else {
    //   console.log(cookie)
    // }


  },
  launchSearchModal:function(){
    // set content

    // open modal
    modal.open();
  },
  // Loggedin: false,
  view: (vnode) => {
    return (
    <section>
      <div class="flex flex-row pv1 ph2">
        <div class="flex pa1 pr3">
          <a class="red-custom f3 pointer" onclick={() => vnode.attrs.slideout.toggle()}>☰</a>
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
      <div class="ph2 flex">
        <button class="bg-transparent b--transparent ma0 pa0 dib w-100" onclick={searchNav.launchSearchModal}>
            <div class=" cf flex justify-between relative">
                <div class="dib   flex relative tl" style="flex:7">
                  <span class={(searchNav.searchError? " b--red " : " b--transparent ") + " w-100  ba bg-light-gray-custom ph2 pv2" } >
                      <img src="/assets/img/svg/search.svg" class="pr2" style="height:0.7rem;" />
                    search
                  </span>
                </div>
                <div class="dib ml2 flex relative tl" style="flex:3">
                  <span class="w-100  bg-light-gray-custom bw2 b--transparent ph2 pv2" id="areaInput"
                    >
                    <img src="/assets/img/svg/location.svg" class="pr2" style="height:0.7rem;" />
                    area
                  </span>
                </div>
            </div>
          </button>
        </div>
    </section>
    )
  }
}

export default searchNav;

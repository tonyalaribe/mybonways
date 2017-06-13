import m from "mithril";
import {ListingsModel} from '../models/listings.js';
import {ListingItem} from '../components/listingItem.js';

var FindListings = {
  Search:function(){
    var query = document.getElementById("SearchBox").value;
    ListingsModel.SearchForListings(query)
  },
  oncreate:function(){
    ListingsModel.SearchForListings()
  },
  view:function(){
    return (
      <section>
        <div class="pa3 bg-white shadow-m2">
          <div>
            <h3>Find Listings</h3>
          </div>
        </div>
        <div class="pa3 bg-white shadow-m2">
          <div>
            <input type="search" class="pa3 w-100" id="SearchBox"/>
            <button  class="bw0 shadow-4 pv2 ph3" onclick={FindListings.Search}>Search</button>
          </div>
        </div>
        <section class="pv3 ">
          {
            ListingsModel.SearchListings.map(function(listing, key){
              console.log(listing)
              if (listing.Type==="listing"){
                return (<ListingItem listing={listing.Listing} key={key} />);
              }else{
                return
              }
          })
        }
        </section>
      </section>
    )
  }
}

export default FindListings;

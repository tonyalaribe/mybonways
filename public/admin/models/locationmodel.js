import m from 'mithril';
// import {branch} from "./branches.js";

export var LocationModel = {
    NewLocation: {},
    AddLocation: () => {
        return m.request({
            method: "POST",
            url: "/api/admins/locations/neighbourhood",
            data: LocationModel.NewLocation
        }).then((response) => {
            console.log("Add location response: ", response);
        })
    },
    AllCountries: [],
    AllCities: [],
    AllNeighbourhoods: [],
    LocationUpdate: {},
    NewLocationUpdate: {},
    UpdateNeighbourhood: () => {
        var location = LocationModel.LocationUpdate
        return m.request({
            method: "PUT",
            url: "/api/locations/neighbourhood?country="
            + location.country + "&city=" + location.city + "&neighbourhood=" + location.neighbourhood,
            data: LocationModel.NewLocationUpdate
        }).then((response) => {
            console.log("Update location response: ", response)
        }).catch((error) => {
            console.error("Update Location Error: ", error)
        })
    },
    GetCountries: () => {
        return m.request({
            method: "GET",
            url: "/api/locations/countries"
        }).then((response)=>{
            console.log("response: ", response)
            LocationModel.AllCountries = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    },
    GetCities: (country) => {
        return m.request({
            method: "GET",
            url: "/api/locations/cities?country=" + country
        }).then((response)=>{
            console.log("response: ", response)
            LocationModel.AllCities = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    },
    GetNeighbourhoods: () => {
        return m.request({
            method: "GET",
            url: "/api/locations/neighbourhood?country=" + LocationModel.LocationUpdate.country + "&city=" + LocationModel.LocationUpdate.city
        }).then((response)=>{
            console.log("response: ", response)
            LocationModel.AllNeighbourhoods = response;
        }).catch((error) => {
            console.log("error: ", error)
        })
    }
}
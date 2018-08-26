import React, { Component } from 'react';
import '../App.css';

import Sidebar from './Sidebar';
import * as Sites from '../sites.json';

import globe from '../images/globe.png';


// TODO: make api file, like in myReads project


class Main extends Component {
    constructor(props){
        super(props)

        this.state = {
            sites: Sites,
            filteredSites: [],
            markers: [],
            filteredMarkers: [],
            infowindow: {},
            map: {},
            sidebarShowing: true
        } 
    }


    componentDidMount(){
        this.renderMap();
        this.getPhotos();
    }

    renderMap = () => {
        const key = "AIzaSyC5ZHBlasW7FicVvD-9IyOkQWIzuk-Ht8M";
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${key}&v=3&callback=initMap`)
        window.initMap = this.initMap
    }

    // make the map from google maps api, and place markers at each site location
    initMap = () => {
        const sites = this.state.sites;

        let zoom = Math.ceil(Math.log2(window.innerWidth)) - 8.69;
        /* 
        zoom calculation by Adam Thomas
        * this is to have a map of the entire world without repeating countries, as much     as is possible
        https://stackoverflow.com/questions/9893680/google-maps-api-v3-show-the-whole-world
        */

        // load the map if the google maps api is available
        if (window.google){
            let infowindow = new window.google.maps.InfoWindow();
            this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: {lat: 0, lng: 0},
            gestureHandling: 'cooperative'
            });
            // TODO: make function for initial markers?
            this.setState({map: this.map, infowindow: infowindow})
            this.placeInitialMarkers(sites)
        } else {
            console.log('there was a problem')
        }
            
    }

    
    placeInitialMarkers = (sitesArray) =>  {
        var bounds = new window.google.maps.LatLngBounds();
        
       
        // TODO: put tabIndex 0 on each marker? 
        let markers = this.state.markers;
        let marker;
        
        /* 1. loop over the list of sites to create a marker and add it to the map at the         site coordinates
           2. add click event listener on each marker
        */
   
        sitesArray.forEach(value => {
            if (value.markerShowing){
                marker = new window.google.maps.Marker({
                    position: value.coords,
                    map: this.state.map,
                    title: value.name,
                    photoId: value.photoId
                })
                bounds.extend(marker.position)
                markers.push(marker)
                marker.addListener('click', this.onMarkerClick)  
            }
        })
    
         //this.map.fitBounds(bounds); // this doesn't work. why not???
         this.setState({markers: markers}) 
    }

    placeFilteredMarkers(sitesArray){
        let markers = this.state.markers;
       
        sitesArray.forEach( (value, index) => {
            if (!value.markerShowing){
            markers[index].setMap(null)
            } else {
                markers[index].setMap(this.state.map)
            }  
        })
    }

    

    onMarkerClick = (e) => {
        // get the coordinates of the marker that was clicked
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()
       
        // loop over the markers array to find which one has coordinates that match the coordinates of the marker that was clicked
        const markers = this.state.markers;
        const marker = markers.find(value => (value.position.lat() === lat) && (value.position.lng() === lng))

        // find the site with the same coords as the clicked marker, to get the image source for the infowindow
        const sites = this.state.sites;
        const site = sites.find(value => (value.coords.lat === lat) && (value.coords.lng = lng))
        const photoUrl = site.photoSrc;

        this.populateInfowindow(marker, photoUrl)

        
        /*
        const searchQuery = marker.title;
        
        const endpoint = `https://api.flickr.com/services/rest/?method=flickr.photos.search&tags=${searchQuery}&api_key=${key}&format=json&per_page50&nojsoncallback=1&extras=url_q`
        
        const key = '25a8dff4a6f0efab5e05292f9f665372';
        const photoId = marker.photoId;

        const endpoint2 = `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${key}&photo_id=${photoId}&format=json&nojsoncallback=1`


       fetch(endpoint2)
        .then(function(response){
            if (response.ok){
               return response.json()
            }
        })
        .then(data => {
            // get the large square thumbnail image
            let photoUrl = data.sizes.size[1].source

            // build the info window html content 
            infowindow.setContent(
                `<div class="infowindow">
                    <img class="location-photo" src=${photoUrl} alt=${marker.title}>
                    <p class="location-title">${marker.title}</p>
                </div>`
            );
            infowindow.open(this.map, marker);
            
        })
        .catch(err => console.log('error: ', err))
        */
    }

    populateInfowindow(marker, url) {
        // attach the info window to the specific marker that was clicked
        let infowindow = this.state.infowindow;
       
        if(infowindow.marker !== marker){
            infowindow.marker = marker;
            infowindow.setContent(
                `<div class="infowindow">
                    <img class="location-photo" src=${url} alt=${marker.title}>
                    <p class="location-title">${marker.title}</p>
                </div>`
            );
            infowindow.open(this.map, marker);
        } 
           
    }

    getPhotos = () => {
        // use flickr api to get the source url for each location photo
        let sites = this.state.sites;
        const key = '25a8dff4a6f0efab5e05292f9f665372';

        // this will return an array of promises
        const promises = sites.map( value => {
            return fetch(`https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key=${key}&photo_id=${value.photoId}&format=json&nojsoncallback=1`)
            .then(function(response){
                if (response.ok){
                return response.json()
                }
            })
            .then(data => {
                // get the large square thumbnail image
                return data.sizes.size[1].source   
            })
            .catch(err => console.log('error: ', err))
            })
        
        // resolve all promises and attach the url to each location object
        Promise.all(promises)
            .then( data => {
                data.forEach((value, index) => sites[index].photoSrc = value)})
            .catch(err => console.log('Error: ', err))

        // update the sites' state to include the photo url
        this.setState({sites: sites})
    }

    handleChange = (e) => {
        const allSites = this.state.sites;
        let filtered = this.state.filteredSites;
        const siteType = e.target.value;

        
        const infowindow = this.state.infowindow;
        infowindow.close();

        if (siteType === 'all'){
            filtered = allSites.map(value => value)
            allSites.map(value => value.markerShowing = true)
        } else {
            filtered = allSites.filter( value => value.type === siteType)
            allSites.map(value => {
                if (value.type !== siteType){
                    return value.markerShowing = false;
                } else {
                    return value.markerShowing = true;
                }
            })
        }

        this.setState({filteredSites: filtered, sites: allSites})
        this.placeFilteredMarkers(allSites)
    }

    onSiteClick = (e) => {
        const markers = this.state.markers;

        // find the marker corresponding to the site that was clicked
        const index = markers.findIndex( (value) => value.title === e.target.textContent)
        
         // find the site with the name matching the text content of the clicked list item, to get the image source for the infowindow
         const sites = this.state.sites;
         const site = sites.find(value => value.name === e.target.textContent)
         const photoUrl = site.photoSrc;
 
         // open the infowindow 
         this.populateInfowindow(markers[index], photoUrl)   
    }

    toggleSidebar = (e) => {
        const sidebarState = this.state.sidebarShowing;
   
        if (!sidebarState){
          this.setState({
              sidebarShowing: true
          })
        } else {
            this.setState({
                sidebarShowing: false
            })
        }
   
     }


    render(){
        
        return (
            <div className="main">
                <p className="unesco-intro">
                    <button onClick={this.toggleSidebar}  className="menu-icon-button">
                        {/* Globe by Nick Novell from the Noun Project */}
                        <img className="globe" src={globe} alt="Menu icon"/>
                    </button>
                    CLick the globe to toggle the list of sites
                </p>
                
                { this.state.sidebarShowing
                 ? <Sidebar allSites={this.state.sites} filteredSites={this.state.filteredSites} onClick={this.onSiteClick} onChange={this.handleChange}/>
                 : <div></div>
                }

                <div tabIndex="0" id="map" className='map' aria-label="map" role="application"></div> 
            </div>
        )
         
    }
}

export default Main;

function loadScript(src){
    // get the first script tag
    const index = window.document.getElementsByTagName("script")[0];
  
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.defer = true;
    
    // make sure this script will always be the first script
    index.parentNode.insertBefore(script, index)
  
  }

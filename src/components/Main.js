import React, { Component } from 'react';
import Sidebar from './Sidebar';
import * as Sites from '../sites.json';
import globe from '../images/globe.png';
import Error from './Error';


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
            sidebarShowing: false,
            mapError: false
        } 
    }

    // as soon as the component is mounted, begin ajax request for flickr photos
    componentDidMount(){
        this.getPhotos();
    }


    getPhotos = () => {
        // use flickr api to get the source url for each location photo
        const sites = this.state.sites;
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

        /* 1. first update the sites' state to include the dynamic data (photo urls),
           2. THEN load the script and map to the page
        */
        this.setState({sites: sites}, this.renderMap)
    }


    // load the google maps api script
    renderMap = () => {
        const key = "AIzaSyC5ZHBlasW7FicVvD-9IyOkQWIzuk-Ht8M";
        loadScript(`https://maps.googleapis.com/maps/api/js?key=${key}&v=3&callback=initMap`)
        window.initMap = this.initMap
    }


    // make the map from google maps api, and place markers at each site location
    initMap = () => {
        const sites = this.state.sites;

        const zoom = Math.ceil(Math.log2(window.innerWidth)) - 8.69;
        /* 
        zoom calculation by Adam Thomas
        * this is to have a map of the entire world without repeating countries, as much as is possible
        https://stackoverflow.com/questions/9893680/google-maps-api-v3-show-the-whole-world
        */

        // load the map if the google maps api is available
        if (window.google){
            const infowindow = new window.google.maps.InfoWindow();

            this.map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: zoom,
            center: {lat: 0, lng: 0},
            gestureHandling: 'cooperative'
            });
            
            this.setState({map: this.map, infowindow: infowindow})
            this.placeInitialMarkers(sites)
        } else {
            // if google map fails, mapError: true will cause the Error component to be rendered
            this.setState({mapError: true})
        }       
    }

    
    placeInitialMarkers = (sitesArray) =>  {
        const bounds = new window.google.maps.LatLngBounds();
        const markers = this.state.markers;
        let marker;
        let icon;
        
        /* 1. loop over the list of sites to create a marker (with properties needed for the infowindow) for each site, colored according to site type, and add it to the map at the site coordinates
           2. add click event listener on each marker
        */
   
        sitesArray.forEach(value => {    
            if (value.type === 'cultural'){
                icon = 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png'
            } else if (value.type === 'natural'){
                icon = 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            } else {
                icon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png' 
            }
            
            marker = new window.google.maps.Marker({
                position: value.coords,
                map: this.state.map,
                title: value.name,
                photoId: value.photoId,
                icon: icon,
                location: value.location,
                type: value.type,
                date: value.inscribed
            })
            bounds.extend(marker.position)
            markers.push(marker)
            marker.addListener('click', this.onMarkerClick)
        })
    
         this.map.fitBounds(bounds); 
         this.setState({markers: markers}) 
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
    }


    // Fill the infowindow with the site photo and information
    populateInfowindow(marker, url) {
        const infowindow = this.state.infowindow;

        // use string methods to get the color of the marker icon
        const color = marker.icon.substr(41).split('-')[0];

        // check to make sure a different marker is being clicked
        if(infowindow.marker !== marker){ 

            // if so, assign the infowindow to that marker
            infowindow.marker = marker;

            // if the site image is unavailable, just show text
            if (!url){
                infowindow.setContent(
                    `<div class="infowindow">
                        <div class="location-info">
                            <p class="location-title ${color}Border">${marker.title}</p>
                            <p class="location-location">${marker.location}</p>
                            <p class="location-type">
                                <span class="bullet ${color}Bullet">&bull;</span> ${marker.type} site
                            </p>
                        </div>
                    </div>`
                );
            } else {
            // otherwise show the photo and the location information
                infowindow.setContent(
                    `<div class="infowindow">
                        <img class="location-photo" src=${url} alt=${marker.title}>
                        <div class="location-info">
                            <p class="location-title ${color}Border">${marker.title}</p>
                            <p class="location-location">${marker.location}</p>
                            <p class="location-inscription">Date of Inscription: ${marker.date}</p>
                            <p class="location-type">
                                <span class="bullet ${color}Bullet">&bull;</span> ${marker.type} site
                            </p>
                        </div>
                    </div>`
                );
            }
            
            // attach the info window to the specific marker that was clicked
            infowindow.open(this.map, marker);
        }      
    }


    // when the globe icon is clicked, toggle the visibility of the sidebar
    toggleSidebar = (e) => {
        const sidebarState = this.state.sidebarShowing;
        const sites = this.state.sites;
        const filteredSites = this.state.filteredSites;

        // if there is an infowindow open, close it
        const infowindow = this.state.infowindow;
        infowindow.close();
   
        if (!sidebarState){
          this.setState({
              sidebarShowing: true
          })
        } else {
            /* when the sidebar is closed, 
               1. put all markers back on the map
               2. put all sites back in the list view of sites
            */
            sites.map(value => value.markerShowing = true)
            this.placeFilteredMarkers(sites)
            filteredSites.length = 0;
            this.setState({
                sidebarShowing: false,
                filteredSites: filteredSites
            })
        }
     }


    // use the select element to filter sites by type
    handleChange = (e) => {
        const allSites = this.state.sites;
        let filtered = this.state.filteredSites; 
        const siteType = e.target.value;
        
        // if any infowindow was open, close it
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


    placeFilteredMarkers(sitesArray){
        const markers = this.state.markers;
       
        sitesArray.forEach( (value, index) => {
            if (!value.markerShowing){
            markers[index].setMap(null)
            } else {
                markers[index].setMap(this.state.map)
            }  
        })
    }


    // handle user clicking or tabbing onto one of the sites in the sidebar list of sites
    handleListItemEvent = (e) => {
        const key = e.key;

        // reference the state with object destructuring instead of a new variable
        const { sites, markers } = this.state;

         // find the marker corresponding to the site that triggered the event
         const index = markers.findIndex( (value) => value.title === e.target.textContent)
                    
         // find the site with the name matching the text content of the clicked list item, to get the image source for the infowindow
         const site = sites.find(value => value.name === e.target.textContent)
         const photoUrl = site.photoSrc;

         this.animateMarker(markers[index])
        
        // account for keypress event
        if (key){
            if (key === 'Enter'){
            // open the infowindow on the marker that triggered the event
            this.populateInfowindow(markers[index], photoUrl)   
            }
        // account for click event
        } else {
            this.populateInfowindow(markers[index], photoUrl)   
        }              
    }


    // apply bounce animation on marker when sidebar list item is chosen
    animateMarker(marker){
        marker.setAnimation(window.google.maps.Animation.BOUNCE)

        setTimeout(() => {
            this.removeAnimation(marker)
        }, 1500)
    }


    // stop the marker bounce animation
    removeAnimation(marker){
        marker.setAnimation(null)
    }


    render(){
       if (this.state.mapError){
           return <Error />    
       } else {
            return (
                <main className="main">      
                    <h2 className='subheading'>Explore the UNESCO World Heritage Sites</h2>
                    <p className="unesco-intro">
                        <button onClick={this.toggleSidebar}
                                className="menu-icon-button"
                                aria-label="menu"
                        >
                            {/* Globe icon by Nick Novell from the Noun Project */}
                            <img className="globe" src={globe} alt="Menu icon"/>
                        </button>
                        Click the globe to view and filter the list of sites
                    </p>

                    { this.state.sidebarShowing
                        ? <Sidebar allSites={this.state.sites}
                                   filteredSites={this.state.filteredSites} 
                                   onKeyPress={this.handleListItemEvent} 
                                   onClick={this.handleListItemEvent} 
                                   onChange={this.handleChange}
                            />
                        : <div></div>
                    }
        
                    <div tabIndex="0" id="map" className='map' aria-label="map" role="application"></div>
                    
                </main>
            )
        }     
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

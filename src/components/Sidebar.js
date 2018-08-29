import React, { Component } from 'react'
import '../App.css'

class Sidebar extends Component {
    
    
    render(){
        const allSites = this.props.allSites;
        const filteredSites = this.props.filteredSites;

        return (
            // filter by type of site
            <div id="sidebar" className="sidebar"> 
                <select id="sidebar-select" className="sidebar-select" aria-label="type of site" onChange={this.props.onChange}>
                    <option value="all">All Sites</option>
                    <option value="cultural">Cultural</option>
                    <option value="natural">Natural</option>
                    <option value="mixed">Mixed</option>
                </select>

                {/* if the user has filtered the sites, show the filtered sites. otherwise show all of the sites */}
                <ul id="sidebar-list" className="sidebar-list" onKeyPress={this.props.onKeyPress} onClick={this.props.onClick} >
                { filteredSites.length !== 0  
                    ? filteredSites.map(site => {   
                        return <li  tabIndex="0" className="sidebar-listItem" key={site.name}>
                            {site.name}
                        </li> })    
                    : allSites.map(site => {
                        return <li tabIndex="0" className="sidebar-listItem" key={site.name}>
                            {site.name}
                        </li>})
                }  
                </ul>
            </div>
        )
    }
}

export default Sidebar;
/*
{ filteredSites.length !== 0  
    ? filteredSites.map(site => {   
        return <li className="sidebar-listItem" key={site.name}>
            {site.name}
        </li> })    
    : allSites.map(site => {
        return <li className="sidebar-listItem" key={site.name}>
            {site.name}
        </li>})
}  
*/

/*
{( () => {
    if (filteredSites.length !== 0){
        filteredSites.map( site => {
            if (site.type === 'natural'){
                return <li className="sidebar-listItem naturalSite">{site.name}</li>                         
            } else if (site.type === 'cultural'){
                return <li className="sidebar-listItem culturalSite">{site.name}</li>
            } else {
                return <li className="sidebar-listItem mixedSite">{site.name}</li>
            }
        })
    }else {
        allSites.map( site => {
            if (site.type === 'natural'){
                return <li className="sidebar-listItem naturalSite">{site.name}</li>                         
            } else if (site.type === 'cultural'){
                return <li className="sidebar-listItem culturalSite">{site.name}</li>
            } else {
                return <li className="sidebar-listItem mixedSite">{site.name}</li>
            }
        })
    }
}

)()}
*/
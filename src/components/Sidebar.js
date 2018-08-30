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
                    <option value="cultural">Cultural Sites</option>
                    <option value="natural">Natural Sites</option>
                    <option value="mixed">Mixed Sites</option>
                </select>

                {/* if the user has filtered the sites, show the filtered sites. otherwise show all of the sites */}
                <ul id="sidebar-list" className="sidebar-list" onKeyPress={this.props.onKeyPress} onClick={this.props.onClick} >
                    {
                        filteredSites.length !== 0 
                        ? filteredSites.map( site => {
                            if (site.type === 'natural'){
                                return <li tabIndex="0" key={site.name} className={'sidebar-listItem natural'}>{site.name}</li>                         
                            } else if (site.type === 'cultural'){
                                return <li tabIndex="0" key={site.name} className={'sidebar-listItem cultural'}>{site.name}</li>
                            } else {
                                return <li tabIndex="0" key={site.name} className={'sidebar-listItem mixed'}>{site.name}</li>
                            }
                        })
                        : allSites.map( site => {
                            if (site.type === 'natural'){
                                return <li tabIndex="0" key={site.name} className={'sidebar-listItem natural'}>{site.name}</li>                         
                            } else if (site.type === 'cultural'){
                                return <li tabIndex="0" key={site.name} className={'sidebar-listItem cultural'}>{site.name}</li>
                            } else {
                                return <li tabIndex="0" key={site.name} className={'sidebar-listItem mixed'}>{site.name}</li>
                            }
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Sidebar;


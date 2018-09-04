import React from 'react'
//import '../App.css'
import PropTypes from 'prop-types'

function Sidebar (props) {
    
    const allSites = props.allSites;
    const filteredSites = props.filteredSites;

    return (
        // filter by type of site
        <div id="sidebar" className="sidebar"> 
            <select id="sidebar-select" className="sidebar-select" aria-label="type of site" onChange={props.onChange}>
                <option value="all">All Sites</option>
                <option value="cultural">Cultural Sites</option>
                <option value="natural">Natural Sites</option>
                <option value="mixed">Mixed Sites</option>
            </select>

            {/* if the user has filtered the sites, show the filtered sites. otherwise show all of the sites */}
            <ul id="sidebar-list" className="sidebar-list" onKeyPress={props.onKeyPress} onClick={props.onClick} >
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

Sidebar.propTypes = {
    onChange: PropTypes.func.isRequired,
    onClick: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    allSites: PropTypes.array.isRequired,
    filteredSites: PropTypes.array.isRequired
}

export default Sidebar;


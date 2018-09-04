import React from 'react';

function Footer() {
   
    return (
        <div className="footer">
            <p className="quote"><q>From country to country, languages differ but the sight of the Moon is the same and the hearts of men are one!</q> ~ Ki no Tsurayuki</p>
            <p className="learn-more">Learn more about the UNESCO World Heritage Sites <a target='_blank' href='https://whc.unesco.org/en/list/' rel='noopener noreferrer'>here</a> (link opens a new window)</p>
            <p className="api-attribution">This product uses the Flickr API but is not endorsed or certified by SumgMug, Inc.</p>
        </div>
    )
}

export default Footer
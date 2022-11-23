import React from 'react'

export default function OnUpdated(props) {

    const { e, count } = props;



    return (
        <div className='onUpdated-step'>
            <div className='step-data'>
                <div className='step-count'><span>{count}</span></div>
                <p className='step_message' contentEditable>Page navigated to</p>
            </div>
            <div className='pageNavPrev'>
                {(e.data.tab.favIconUrl) && <div className='pageFavicon'>
                    <img src={e.data.tab.favIconUrl} />
                </div>}
                <div className='pageDets'>
                    <p className='pageTitle'>{e.data.tab.title}</p>
                    <p className='redirectedTo'>{e.data.tab.url}</p>
                </div>
            </div>
        </div>
    )
}

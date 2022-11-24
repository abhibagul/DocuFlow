import React from 'react'

export default function OnHighlight(props) {

    const { e, count } = props;



    return (
        <div className='onUpdated-step'>
            <div className='step-data'>
                <div className='step-count'><span>{count}</span></div>
                <p className='step_message' suppressContentEditableWarning={true} contentEditable> Open the {e.data.title} tab. </p>
            </div>
            <div className='pageNavPrev'>
                {(e.data.favIconUrl) && <div className='pageFavicon'>
                    <img src={e.data.favIconUrl} />
                </div>}
                <div className='pageDets'>
                    <p className='pageTitle'>{e.data.title}</p>
                    <p className='redirectedTo'>{e.data.url}</p>
                </div>
            </div>
        </div>
    )
}

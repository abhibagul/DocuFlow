import React from 'react'
import parse from 'html-react-parser';

export default function OnHighlight(props) {

    const { e, count, updateMsg } = props;



    return (
        <div className='onUpdated-step'>
            <div className='step-data'>
                <div className='step-count'><span>{count}</span></div>
                <p className='step_message' onKeyUp={(el) => { updateMsg(`steps[${(count - 1)}]`, { ...e, "msg": encodeURIComponent((el.target.innerHTML) ? el.target.innerHTML : "") }) }} suppressContentEditableWarning={true} contentEditable>
                    {
                        (e.hasOwnProperty("msg")) ?
                            <span>
                                {(e.msg.length > 0) ? parse(decodeURIComponent(e.msg)) : ""}
                            </span>
                            :
                            <span>
                                Open the {e.data.title} tab.
                            </span>
                    }
                </p>
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

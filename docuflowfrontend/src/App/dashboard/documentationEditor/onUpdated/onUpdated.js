import React from 'react'
import parse from 'html-react-parser';

export default function OnUpdated(props) {

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
                                Page navigated to
                            </span>
                    }</p>
            </div>
            <div className='pageNavPrev'>
                {(e.data.tab.favIconUrl) && <div className='pageFavicon'>
                    <img src={e.data.tab.favIconUrl} />
                </div>}
                <div className='pageDets'>
                    <p className='pageTitle'>{(e.data.tab.title.length > 80) ? e.data.tab.title.substring(0, 77) + "..." : e.data.tab.title}</p>
                    <p className='redirectedTo'>{(e.data.tab.url.length > 80) ? e.data.tab.url.substring(0, 77) + "..." : e.data.tab.url}</p>
                </div>
            </div>
        </div>
    )
}

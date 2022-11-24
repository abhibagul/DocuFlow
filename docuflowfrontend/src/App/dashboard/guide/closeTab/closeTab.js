import React, { useEffect, useState } from 'react'
import parse from 'html-react-parser';

export default function CloseTab(props) {

    const { e, allSteps, count } = props;

    let [clTab, setClTab] = useState({
        gotTab: false,
        tabDetails: {}
    })

    useEffect(() => {
        filterToGetData();
    }, [])

    const filterToGetData = () => {
        allSteps.map((elm) => {
            if (elm.data.tabId === e.data) {
                setClTab({ gotTab: true, tabDetails: elm })

            }
        });
    }

    return (
        <div className='onUpdated-step'>

            {(clTab.gotTab) ?
                <>
                    <div className='step-data'>
                        <div className='step-count'><span>{count}</span></div>
                        <p className='step_message'>
                            {
                                (e.hasOwnProperty("msg")) ?
                                    <span>
                                        {(e.msg.length > 0) ? parse(decodeURIComponent(e.msg)) : ""}
                                    </span>
                                    :
                                    <span>
                                        Close the tab ({(clTab.tabDetails.data.tab.title.length > 40) ? clTab.tabDetails.data.tab.title.substr(0, 37) + "..." : clTab.tabDetails.data.tab.title}).
                                    </span>
                            }
                        </p>
                    </div>
                    <div className='pageNavPrev'>
                        {(clTab.tabDetails.data.tab.favIconUrl) && <div className='pageFavicon'>
                            <img src={clTab.tabDetails.data.tab.favIconUrl} />
                        </div>}
                        <div className='pageDets'>
                            <p className='pageTitle'>{(clTab.tabDetails.data.tab.title.length > 80) ? clTab.tabDetails.data.tab.title.substr(0, 77) + "..." : clTab.tabDetails.data.tab.title}</p>
                            <p className='redirectedTo'>{(clTab.tabDetails.data.tab.url.length > 80) ? clTab.tabDetails.data.tab.url.substr(0, 77) + "..." : clTab.tabDetails.data.tab.url.length}</p>
                        </div>
                    </div>
                </>
                :
                <div className='step-data'>
                    <div className='step-count'><span>{count}</span></div>
                    <p className='step_message'>
                        {
                            (e.hasOwnProperty("msg")) ?
                                <span>
                                    {(e.msg.length > 0) ? parse(decodeURIComponent(e.msg)) : ""}
                                </span>
                                :
                                <span>
                                    Close the tab.
                                </span>
                        }
                    </p>
                </div>
            }
        </div>
    )
}

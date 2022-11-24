import React from 'react'
import parse from 'html-react-parser';

export default function CutSelection(props) {
    const { e, count } = props;

    const getKeysHolding = (node) => {
        let holding = [];

        if (node.altKey) {
            holding.push("<kbd>Alt</kbd>")
        }

        if (node.ctrlKey) {
            holding.push("<kbd>Ctrl</kbd>")
        }

        if (node.shiftKey) {
            holding.push("<kbd>Shift</kbd>")
        }

        if (holding.length > 0) {
            return " While holding " + holding.join(" + ") + " key(s)"
        } else {
            return ""
        }
    }

    return (
        <div>
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
                                {getKeysHolding(e.data.event)} do a cut selection.
                            </span>
                    }
                </p>
            </div>
            <div className='step_prevImg'>
                {
                    (e.img) ? <img src={'/' + e.img} /> : ""
                }
            </div>
        </div>
    )
}

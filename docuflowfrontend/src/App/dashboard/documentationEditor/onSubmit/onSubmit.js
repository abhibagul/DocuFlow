import React from 'react'
import parse from 'html-react-parser';

export default function OnSubmit(props) {
    const { e, count, updateMsg } = props;

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
                <p className='step_message' onKeyUp={(el) => { updateMsg(`steps[${(count - 1)}]`, { ...e, "msg": encodeURIComponent((el.target.innerHTML) ? el.target.innerHTML : "") }) }} suppressContentEditableWarning={true} contentEditable>
                    {
                        (e.hasOwnProperty("msg")) ?
                            <span>
                                {(e.msg.length > 0) ? parse(decodeURIComponent(e.msg)) : ""}
                            </span>
                            :
                            <span>
                                {parse(getKeysHolding(e.data.event))} Submit the form.
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

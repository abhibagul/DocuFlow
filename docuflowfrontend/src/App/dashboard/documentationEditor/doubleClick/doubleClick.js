import React from 'react'
import parse from 'html-react-parser';

export default function DoubleClick(props) {
    const { e, count } = props;



    const getClickType = (node) => {
        switch (node.nodeName) {
            case "INPUT":
                return "input."
                break;
            case "P":
                return "paragraph."
                break;
            case "DIV":
                return "document."
                break;
            case "A":
                return `link (${node.innerText}).`
                break;
            case "IMG":
                return `image.`
                break;
            default:
                return node.nodeName
        }
    }

    const getClickPosition = (node) => {
        //calculate the click position
        // as we are reducing the image size to 1200
        let __clickPositions = { top: 0, left: 0 }
        __clickPositions.top = ((node.clientY / node.windowH) * 100) + "%";
        __clickPositions.left = ((node.clientX / node.windowW) * 100) + "%";
        return __clickPositions;
    }

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
                <p className='step_message' contentEditable> {parse(getKeysHolding(e.data.event))} Double Click on the {getClickType(e.data.event.target)}</p>
            </div>
            <div className='step_prevImg'>
                <div className='prev_action_shower' style={getClickPosition(e.data.event)}></div>
                {
                    (e.img) ? <img src={'/' + e.img} /> : ""
                }
            </div>
        </div>
    )
}

import React from 'react'
import { Link } from 'react-router-dom'

export default function DocumentItem(props) {

    const getTime = (time) => {
        time = time.split("T");
        return time[0];
    }

    return (
        <div className='documentationItem'>
            <Link to={`/documentation/editor/${props.elem._id}/`}>
                <div className='doc-item'>
                    <h1>{props.elem.projectName}</h1>
                    <span className='document-date'>{getTime(props.elem.documentCreated)}</span>
                </div>
            </Link>
        </div>
    )
}

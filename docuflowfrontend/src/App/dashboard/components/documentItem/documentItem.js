import React from 'react'
import { Link } from 'react-router-dom'
export default function DocumentItem(props) {
    return (
        <div>
            <Link to={`/documentation/editor/${props.elem._id}/`}>
                {props.elem.projectName}
            </Link>
        </div>
    )
}

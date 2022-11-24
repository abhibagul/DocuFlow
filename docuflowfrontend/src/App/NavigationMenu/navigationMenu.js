import React, { useEffect } from 'react'
import './navigationMenu.css'
import { useNavigate } from 'react-router-dom';

export default function NavigationMenu(props) {
    const navigate = useNavigate();

    useEffect(() => {

    }, [props.saveBtn, props.isPublish])

    return (
        <header>
            <div className='nav-inner'>
                <div className='logo'>
                    <img src='/assets/logo_dark.png' />
                </div>
                <div className='navlist'>
                    <nav>
                        <ul>
                            {(props.documentId) && <li><a href='/'>File</a>
                                <ul>
                                    <li><a onClick={() => props.saveDocumentation()} >Save</a></li>
                                    <li><a onClick={() => props.publishDocumentation()} >{(props.isPublish) ? "Unpublish" : "Publish"}</a></li>
                                    <li><a onClick={() => props.deleteDocumentation()}>Delete</a></li>
                                    <li><a href='/dashboard'>Exit</a></li>
                                </ul>
                            </li>}
                            {(props.documentId) && <li><a href='/dashboard'>My Documentations</a></li>}
                            <li><a href='https://github.com/abhibagul/DocuFlow' target="_blank">About</a></li>
                        </ul>
                    </nav>
                </div>
                {(props.pubAction) && <div className='save_meta'>
                    <button onClick={() => props.saveDocumentation()} style={props.saveBtn.current}>Save</button>
                    <button onClick={() => props.publishDocumentation()}>{(props.isPublish) ? "Unpublish" : "Publish"}</button>
                </div>}
                <div className='userAccount'>
                    <ul>
                        <li onClick={() => { localStorage.removeItem('token'); navigate("/") }}><span className='userChar'>Logout</span></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

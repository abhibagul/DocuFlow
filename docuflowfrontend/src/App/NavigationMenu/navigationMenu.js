import React from 'react'
import './navigationMenu.css'
import { useNavigate } from 'react-router-dom';

export default function NavigationMenu(props) {
    const navigate = useNavigate();
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
                                    <li><a href='/'>Save</a></li>
                                    <li><a href='/'>Delete</a></li>
                                    <li><a href='/dashboard'>Exit</a></li>
                                </ul>
                            </li>}
                            {(props.documentId) && <li><a href='/dashboard'>My Documentations</a></li>}
                            <li><a href='/'>About</a></li>
                        </ul>
                    </nav>
                </div>
                <div className='userAccount'>
                    <ul>
                        <li onClick={() => { localStorage.removeItem('token'); navigate("/") }}><span className='userChar'>Logout</span></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

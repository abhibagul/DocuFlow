import React from 'react'
import './navigationMenu.css'

export default function NavigationMenu() {
    return (
        <header>
            <div className='nav-inner'>
                <div className='logo'>
                    <img src='/assets/logo_dark.png' />
                </div>
                <div className='navlist'>
                    <nav>
                        <ul>
                            <li><a href='/'>File</a>
                                <ul>
                                    <li><a href='/'>Save</a></li>
                                    <li><a href='/'>Delete</a></li>
                                    <li><a href='/'>Exit</a></li>
                                </ul>
                            </li>
                            <li><a href='/dashboard'>My Documentations</a></li>
                            <li><a href='/'>About</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

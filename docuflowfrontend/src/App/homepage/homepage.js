import React from 'react'
import { Link } from 'react-router-dom';

import './homepage.css'
export default function Homepage() {
    return (
        <div className='homapage'>
            <header>
                <div className='home-container header'>
                    <div className='logo'>
                        <img src='/assets/logo_dark.png' />
                    </div>
                    <div className='navmenu'>
                        <nav>
                            <ul>
                                <li><Link to='/'>Home</Link></li>
                                <li><a href='https://github.com/abhibagul/DocuFlow' target="_blank">Github Project</a></li>
                            </ul>
                        </nav>
                    </div>
                    <div className='login_actions'>
                        <ul>
                            <li className='login'><Link to='/login/'>Login</Link></li>
                            <li className='signup'><Link to='/signup/'>Signup</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
            <main>
                <div className='hero-wrap'>
                    <div className='open-wrap'>
                        <div className='home-container'>
                            <span>🌍 This is an open-source project</span>
                        </div>
                    </div>
                    <div className='hero-clip'>
                        <div className='bg-grad'></div>
                    </div>
                    <div className='home-container hero-text'>
                        <h1>Simple way to create a step by step guide</h1>
                        <p>This tool will record all the steps you perform for the task and create a step by step procedure for it.</p>
                        <Link className='btn_started' to="/signup">Let's Get started..</Link>
                    </div>
                    <div className='home-container hero-text burnoverlay'>
                        <h1>Simple way to create a step by step guide</h1>
                        <p>This tool will record all the steps you perform for the task and create a step by step procedure for it.</p>
                        <Link className='btn_started' to="/signup">Let's Get started..</Link>
                    </div>
                    <div className='home-container hero-text text-back'>
                        <h1>Simple way to create a step by step guide</h1>
                        <p>This tool will record all the steps you perform for the task and create a step by step procedure for it.</p>
                        <Link className='btn_started' to="/signup">Let's Get started..</Link>
                    </div>

                    <div className='blur-bg-img'>
                        <img src='/assets/hero1.JPG' />
                    </div>
                </div>

                <div className='main-wrap home-container'>
                    <div className='steps-to-use'>
                        <h3>How to use it?</h3>
                    </div>
                    <div className="documentation-homepage-flow">
                        <div className='documentation doc-row'>

                            <section className={`step `} >
                                <div className='step'>
                                    <div className='step-data'>
                                        <div className='step-count'><span>1</span></div>
                                        <p className='step_message'>
                                            Click on the <kbd>Start Record</kbd> button
                                        </p>
                                    </div>
                                    <div className='step_prevImg'>
                                        <div className='prev_action_shower' style={{ left: "40%", top: "43%" }}></div>
                                        <img src='/assets/step1.png' />
                                    </div>
                                </div>
                            </section>

                            <section className={`step `} >
                                <div className='step'>
                                    <div className='step-data'>
                                        <div className='step-count'><span>2</span></div>
                                        <p className='step_message'>
                                            Do your task
                                        </p>
                                    </div>
                                    <div className='step_prevImg'>
                                        <div className='prev_action_shower' style={{ left: "35%", top: "51%" }}></div>
                                        <img src='/assets/step2.JPG' />
                                    </div>
                                </div>
                            </section>

                            <section className={`step `} >
                                <div className='step'>
                                    <div className='step-data'>
                                        <div className='step-count'><span>3</span></div>
                                        <p className='step_message'>
                                            Click on the <kbd>Stop Record</kbd> button
                                        </p>
                                    </div>
                                    <div className='step_prevImg'>
                                        <div className='prev_action_shower' style={{ left: "27%", top: "61%" }}></div>
                                        <img src='/assets/step3.png' />
                                    </div>
                                </div>
                            </section>

                            <section className={`step `} >
                                <div className='step'>
                                    <div className='step-data'>
                                        <div className='step-count'><span>4</span></div>
                                        <p className='step_message'>
                                            Here is your new step by step documentation
                                        </p>
                                    </div>
                                    <div className='step_prevImg'>
                                        <img src='/assets/hero1.JPG' />
                                    </div>
                                </div>
                            </section>
                        </div >
                    </div >
                </div>

                <div className="home-container btmfooter">
                    <div className='steps-to-use'>
                        <h3>This is open source project. Explore its sourcecode here,</h3>
                        <a href='https://github.com/abhibagul/DocuFlow' target="_blank">https://github.com/abhibagul/DocuFlow</a>
                    </div>
                </div>
            </main >
        </div >
    )
}

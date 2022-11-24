import React from 'react'

export default function InstallExtension() {
    return (
        <div className='installExtension'>
            <h2>To Get started, you will need to install extension.</h2>

            <h3>Here are the steps to do that,</h3>

            <div className="documentation-homepage-flow">
                <div className='documentation doc-row'>

                    <section className={`step `} >
                        <div className='step'>
                            <div className='step-data'>
                                <div className='step-count'><span>1</span></div>
                                <p className='step_message'>
                                    Go to <a href='https://github.com/abhibagul/DocuFlow'>https://github.com/abhibagul/DocuFlow</a> and click on <kbd>code</kbd> and then <kbd>download</kbd>.
                                </p>
                            </div>
                            <div className='step_prevImg'>
                                <div className='prev_action_shower' style={{ left: "68%", top: "32%" }}></div>
                                <img src='/assets/install1.JPG' />
                            </div>
                        </div>
                    </section>

                    <section className={`step `} >
                        <div className='step'>
                            <div className='step-data'>
                                <div className='step-count'><span>2</span></div>
                                <p className='step_message'>
                                    In chrome click on three dots &gt; more options &gt; extensions.
                                </p>
                            </div>
                            <div className='step_prevImg'>
                                <div className='prev_action_shower' style={{ left: "58%", top: "72%" }}></div>
                                <img src='/assets/install2.png' />
                            </div>
                        </div>
                    </section>

                    <section className={`step `} >
                        <div className='step'>
                            <div className='step-data'>
                                <div className='step-count'><span>3</span></div>
                                <p className='step_message'>
                                    Turn on the developer mode in top right corner. and then click on the <kbd>Load Unpacked</kbd> option. From the folder selection select the chrome extension folder of the repository.
                                </p>
                            </div>
                            <div className='step_prevImg'>
                                <div className='prev_action_shower' style={{ left: "58%", top: "72%" }}></div>
                                <img src='/assets/install3.JPG' />
                            </div>
                        </div>
                    </section>

                    <section className={`step `} >
                        <div className='step'>
                            <div className='step-data'>
                                <div className='step-count'><span>4</span></div>
                                <p className='step_message'>
                                    Login into the plugin and start recording your tasks.
                                </p>
                            </div>
                            <div className='step_prevImg'>
                                <div className='prev_action_shower' style={{ left: "52%", top: "59%" }}></div>
                                <img src='/assets/install4.JPG' />
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

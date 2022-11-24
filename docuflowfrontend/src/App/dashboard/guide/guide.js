import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';


import AnchorLink from './AnchorLink/anchorLink';
import OnUpdated from './onUpdated/onUpdated';
import OnSubmit from './onSubmit/onSubmit';
import CopySelection from './copySelection/copySelection';
import PasteSelection from './pasteSelection/pasteSelection';
import ContextMenuClick from './contextMenuClick/contextMenuClick';
import CutSelection from './cutSelection/cutSelection';
import OnHighlight from './onHighlight/onHighlight';
import CloseTab from './closeTab/closeTab';
import DoubleClick from './doubleClick/doubleClick';

import axios from 'axios';
import parse from 'html-react-parser';

import { useNavigate } from 'react-router-dom';

import './documentation.css'
export default function Guide(props) {
    const navigate = useNavigate();

    const { documId } = useParams();


    let [docData, setDocData] = useState({
        authorId: null,
        projectName: "New Documentation",
        published: false,
        documentCreated: "2022-11-22T15:42:06.489+00:00",
        steps: []
    })

    useEffect(() => {
        loadDocumentationData();
    }, [])

    useEffect(() => {

    }, [docData])


    const loadDocumentationData = async () => {
        try {
            await axios.post('/api/guide/', {
                documentId: documId
            }, {
            }).then(response => {
                // console.log(response.data.data);
                if (response && response.data && response.data.data) {
                    setDocData({ ...docData, ...response.data.data });
                    return;
                }

                navigate("/")

            }).catch(err => {
                alert("Something went wrong", JSON.stringify(err));
                navigate("/")
            })


        } catch (err) {
            alert("Please reload the page, unable to get fetch the documentations")
            navigate("/")
        }
    }

    const getTime = (time) => {
        time = time.split("T");
        return time[0];
    }






    return (
        <>
            <div className='documentation_header doc-row'>
                <div className='left_meta'>
                    <h1>{parse(decodeURIComponent(docData.projectName))}</h1>
                    <div className='documentationMeta'>
                        <span>Created on: {getTime(docData.documentCreated)}</span>
                    </div>

                    <div className='docLink'>
                        <span className='docURL'>
                            <a href={`https://${window.location.hostname}/guide/${documId}/`} target="_blank">{`https://${window.location.hostname}/guide/${documId}/`}</a>
                        </span>
                    </div>
                </div>

            </div>
            <div className="documentation_outer">
                <div className='documentation doc-row'>

                    {

                        (docData && (docData.steps.length > 0)) &&

                        docData.steps.map((e, i) => {
                            return (
                                <section key={i} className={`step step-${i}`} data-step={i}>
                                    {(e.type == "AnchorLinkClick") && <AnchorLink key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "onUpdated") && <OnUpdated key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "submit") && <OnSubmit key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "copySelection") && <CopySelection key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "pasteSelection") && <PasteSelection key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "contextMenuClick") && <ContextMenuClick key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "cutSelection") && <CutSelection key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "onHighlight") && <OnHighlight key={i} e={e} count={(i + 1)} />}
                                    {(e.type == "onRemoved") && <CloseTab key={i} e={e} allSteps={docData.steps} count={(i + 1)} />}
                                    {(e.type == "doubleClick") && <DoubleClick key={i} e={e} count={(i + 1)} />}
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

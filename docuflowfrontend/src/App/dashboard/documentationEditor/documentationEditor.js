import React, { useEffect, useState, useRef } from 'react'

import { useUser } from '../../auth/useUser';
import { useToken } from '../../auth/useToken';
import { useParams } from 'react-router-dom';

import NavigationMenu from '../../NavigationMenu/navigationMenu';

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

import { set, get, create } from "lodash";
import axios from 'axios';
import parse from 'html-react-parser';

import './documentation.css'
export default function DocumentationEditor(props) {

    const user = useUser();
    const [token,] = useToken();
    const { id } = user;
    const { documId } = useParams();
    const timerSaveText = useRef();


    let [docData, setDocData] = useState({
        authorId: null,
        projectName: "New Documentation",
        documentCreated: "2022-11-22T15:42:06.489+00:00",
        steps: []
    })

    useEffect(() => {
        loadDocumentationData();
    }, [])

    useEffect(() => {

    }, [docData])

    const setData = (path, value) => {
        console.log(path, value)

        let __docData = { ...docData };
        set(__docData, path, value);

        clearInterval(timerSaveText.current);
        timerSaveText.current = setTimeout(() => {
            setDocData(__docData);
        }, 2000);

    }

    const loadDocumentationData = async () => {
        try {
            await axios.post('/api/document/', {
                id: id,
                documentId: documId
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                // console.log(response.data.data);
                if (response && response.data && response.data.data) {
                    setDocData({ ...docData, ...response.data.data });
                }

            }).catch(err => {
                alert("Something went wrong", JSON.stringify(err));
            })


        } catch (err) {
            alert("Please reload the page, unable to get fetch the documentations")
        }
    }

    const getTime = (time) => {
        time = time.split("T");
        return time[0];
    }


    return (
        <>
            <NavigationMenu documentId={documId} user={user} />
            <div className='documentation_header doc-row'>
                <h1 contentEditable suppressContentEditableWarning={true} onKeyUp={(e) => { setData("projectName", encodeURIComponent((e.target.innerHTML) ? e.target.innerHTML : "")) }}>{parse(decodeURIComponent(docData.projectName))}</h1>
                <div className='documentationMeta'>
                    <span>Created on: {getTime(docData.documentCreated)}</span>
                </div>
            </div>
            <div className="documentation_outer">
                <div className='documentation doc-row'>

                    {

                        (docData && (docData.steps.length > 0)) &&

                        docData.steps.map((e, i) => {
                            return (
                                <section key={i} className={`step step-${i}`} data-step={i}>
                                    {(e.type == "AnchorLinkClick") && <AnchorLink key={i} updateMsg={setData} e={e} count={(i + 1)} />}
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

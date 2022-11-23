import React, { useEffect, useState } from 'react'
import axios from 'axios';
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

import './documentation.css'
export default function DocumentationEditor(props) {

    const user = useUser();
    const [token,] = useToken();
    const { id } = user;
    const { documId } = useParams();


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
            <NavigationMenu />
            <div className='documentation_header doc-row'>
                <h1>{docData.projectName}</h1>
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
                                    {(e.type == "AnchorLinkClick") && <AnchorLink e={e} count={(i + 1)} />}
                                    {(e.type == "onUpdated") && <OnUpdated e={e} count={(i + 1)} />}
                                    {(e.type == "submit") && <OnSubmit e={e} count={(i + 1)} />}
                                    {(e.type == "copySelection") && <CopySelection e={e} count={(i + 1)} />}
                                    {(e.type == "pasteSelection") && <PasteSelection e={e} count={(i + 1)} />}
                                    {(e.type == "contextMenuClick") && <ContextMenuClick e={e} count={(i + 1)} />}
                                    {(e.type == "cutSelection") && <CutSelection e={e} count={(i + 1)} />}
                                    {(e.type == "onHighlight") && <OnHighlight e={e} count={(i + 1)} />}
                                    {(e.type == "onRemoved") && <CloseTab e={e} allSteps={docData.steps} count={(i + 1)} />}
                                    {(e.type == "doubleClick") && <DoubleClick e={e} count={(i + 1)} />}
                                </section>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

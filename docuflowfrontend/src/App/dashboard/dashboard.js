import React, { useEffect, useState } from 'react'
import { useUser } from '../auth/useUser'
import { useToken } from '../auth/useToken'
import axios from 'axios';
import DocumentItem from './components/documentItem/documentItem';
import NavigationMenu from '../NavigationMenu/navigationMenu';
import InstallExtension from './installExtension/installExtension';

import './dash.css'

export default function Dashboard() {

    const user = useUser();
    const [token,] = useToken();
    const { id } = user;

    const [docs, setDocs] = useState({
        documents: []
    })

    useEffect(() => {
        loadUserDocs();
    }, [])

    const loadUserDocs = async () => {
        try {
            await axios.post('/api/documentations/', {
                id: id
            }, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(response => {
                // 

                console.log(response.data.data);
                if (response && response.data && response.data.data) {
                    setDocs({ ...docs, documents: response.data.data });
                    return;
                }
                alert("Something went wrong", JSON.stringify(response));


            }).catch(err => {
                alert("Something went wrong", JSON.stringify(err));
            })


        } catch (err) {
            alert("Please reload the page, unable to get fetch the documentations")
        }
    }

    return (
        <div className='dashboard'>
            <NavigationMenu documentId={null} user={user} pubAction={false} saveBtn={{}} />
            <div className={(docs.documents.length > 0) ? 'userDocumentations dash-row-grid' : 'userDocumentations installPlugin'}>

                {
                    (docs.documents.length > 0) ?
                        docs.documents.map((e, i) => {
                            return (<DocumentItem key={i} elem={e} />)
                        })
                        :
                        <span>
                            <InstallExtension />
                        </span>
                }
            </div>
        </div>
    )
}

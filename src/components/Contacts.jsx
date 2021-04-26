import React, { useState, useEffect } from 'react'
import Contactform from "./Contactform";
import firebaseDb from '../firebase';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Contacts() {
    let [contactObjects, setContactObjects] = useState({});
    let [currentId, setCurrentId] = useState('');
    let [whichFeidYouWantToUpdate, setWhichFeidYouWantToUpdate] = useState({});

    useEffect(() => {
        if(currentId !== ''){
            setWhichFeidYouWantToUpdate(contactObjects[currentId]);
            console.log(contactObjects[currentId]);
        }
    }, [currentId])

// create and update
    let addOrEdit = obj => {
        // console.log(obj);
        if(currentId === "")
            firebaseDb.child('contacts').push(obj, err => console.log(err));
        else
            firebaseDb.child(`contacts/${currentId}`).set(obj, err =>{ 
                if(err)
                    console.log(err);
                else
                    setCurrentId('');
            });
    }

//read operation
    useEffect(() => {
        firebaseDb.child('contacts').on('value', snapshot => {
            if (snapshot.val() != null){
                setContactObjects({
                    ...snapshot.val()
                })
            }
        })
    }, [])


//delete operation 
    function deleteRow(key){
        if(window.confirm('Are you Sure to delete this record ?')){
            firebaseDb.child(`contacts/${key}`).remove( err =>{ 
                if(err)
                    console.log(err);
            })
        }
    }

    return (
        <div>
            <h1 className = "headingDiv">contact registration</h1>
            <div className="contact">
                <Contactform addOrEdit = {addOrEdit} whichFeidYouWantToUpdate = {whichFeidYouWantToUpdate} currentId = {currentId}/>

            <div className="tableDiv" >
                <table id="customers">
                    <tr>
                        <th>Full Name</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Action</th>
                    </tr>
                    {
                        Object.keys(contactObjects).map((val,index) => {
                            return (
                                <tr key = {val}>
                                    <td>{contactObjects[val].fullname}</td>
                                    <td>{contactObjects[val].phone}</td>
                                    <td>{contactObjects[val].email}</td>
                                    <td>{contactObjects[val].address}</td>
                                    <td>
                                        <BorderColorIcon style = {{color: "#303086",cursor: "pointer"}} onClick = {() => {setCurrentId(val); console.log(val)}}/>
                                        |<DeleteIcon style = {{color: "red", cursor: "pointer"}} onClick = {() => deleteRow(val)} />
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </table>
                </div>
            </div>
            
        </div>
    )
}

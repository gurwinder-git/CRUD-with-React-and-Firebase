import React, { useState, useEffect } from 'react';

export default function Contactform(props) {

    const initialFormValues = {
        fullname: "",
        email: "",
        phone: "",
        address: "",
    }
    
    
    let [values, setValues] = useState(initialFormValues);

    useEffect(() => {
        if( Object.keys(props.whichFeidYouWantToUpdate).length !== 0 ){

            setValues({
                ...props.whichFeidYouWantToUpdate,
            })
        }
    }, [props.whichFeidYouWantToUpdate])

    

    function inputHandler(e){
        let name = e.target.name;
        let value = e.target.value;

        setValues({
            ...values,
            [name]: value
        })
    }

    function submitHandler(e){
        e.preventDefault();
        props.addOrEdit(values);
        setValues({
        fullname: "",
        email: "",
        phone: "",
        address: "",})
    }



    return (
    <>
        <div className = "formDiv">
            <form autoComplete = "off" style = {{display: "flex", flexDirection: "column"}} onSubmit = {submitHandler}>
                <input name = "fullname" style = {{width: "100%"}} type="text" placeholder = "Full Name" value = {values.fullname} onChange = {inputHandler} required/>

                <div style = {{display: "flex", flexDirection: "row",}}>

                    <input name = "email" style = {{width: "50%"}} type="text" placeholder = "Email" value = {values.email} onChange = {inputHandler} required/>

                    <input name = "phone" style = {{width: '50%', marginLeft: '10px'}} type="text" placeholder = "Phone" value = {values.phone} onChange = {inputHandler} required/> 

                </div>

                <textarea name = "address" placeholder = "Enter Address" value = {values.address} onChange = {inputHandler} required></textarea>

                <input type="submit" value= { props.currentId !== '' ? "Update": 'Save'}/>
            </form>
        </div>
        
    </> 
    )
}

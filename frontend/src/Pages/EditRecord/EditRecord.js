import React, { useState, useEffect } from 'react'
import Axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export default function EditRecord() {
    const { updateId } = useParams();
    const navigate = useNavigate();
    const [a, setA] = useState([]);
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [age, setAge] = useState("");

    useEffect(()=>{
        fetch('http://localhost:8081/queries')
        .then(res => res.json())
        .then(data => { 
            const filtereddata = data.filter((p)=>p.product_id === parseInt(updateId,10))
            setA(filtereddata.map((p)=>p.product_id));
            console.log(a);
         })
    },[a])
    

    const handleUpdate = (id, name_, country_, age_) => {
        const updatedName = name !== "" ? name : name_;
        const updatedCountry = country !== "" ? country : country_;
        const updatedAge = age !== "" ? age : age_;
        if (id == updateId){
            Axios.post(`http://localhost:8081/update/${id}`, {
                name: updatedName,
                country: updatedCountry,
                age: updatedAge
            })
        }
        navigate('/');
    }
    return (
        <>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <form>
                <label>Name : </label>
                <input type='text' id='name' name='name' onChange={(e) => setName(e.target.value)} /><br />

                <label>Country : </label>
                <input type='text' id='country' name='country' onChange={(e) => setCountry(e.target.value)} /><br />

                <label>Age : </label>
                <input type='text' id='age' name='age' onChange={(e) => setAge(e.target.value)} /><br />

                <button onClick={() => handleUpdate(a, name, country, age)} className='container'>submit</button>
            </form>
        </div>
        </>
    )
}

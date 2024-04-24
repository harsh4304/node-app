import React, { useState, useEffect } from 'react'
import Axios from 'axios'
export default function AddRecord() {
    const [a, setA] = useState([]);
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [age, setAge] = useState("");

    useEffect(() => {
        fetch('http://localhost:8081/queries')
            .then(res => res.json())
            .then(data => { setA(data); })
    }, [a])

    const handleCreate = () => {
        Axios.post('http://localhost:8081/create', {
            name: name,
            country: country,
            age: age
        })
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

                    <button onClick={handleCreate} className='container'>Submit</button>
                </form>
            </div>
        </>
    )
}

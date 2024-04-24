import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom';
export default function Index() {
    const [a, setA] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8081/queries')
            .then(res => res.json())
            .then(data => { setA(data); })
    }, [a])

    


    const handleDelete = (name) => {
        Axios.delete(`http://localhost:8081/delete/${name}`)
    }

    return (<>

        <div className='container'>

            <table style={{ border: '1px solid black', marginTop: '10px' }}>
                <tr style={{border:'1px solid black'}}>
                    <th>Product Id</th>
                    <th>Product Name</th>
                    <th>Category Id</th>
                    <th>Supplier Id</th>
                    <th>Stock Quantity</th>
                    <th>Unit Price</th>
                </tr>

                {a.map((p, index) => (<>

                    <tr style={{border:'1px solid black'}}>
                        <td>{p.product_id}</td>
                        <td>{p.product_name}</td>
                        <td>{p.category_id}</td>
                        <td>{p.supplier_id}</td>
                        <td>{p.stock_quantity}</td>
                        <td>{p.unit_price}</td>
                        <td>
                            <button onClick={()=>handleDelete(p.product_name)} className='container'>Delete record</button><br />
                            <Link to={'/update/'+`${p.product_id}`}><button className='container'>Update record</button></Link>
                        </td>
                    </tr >
                </>))}
            </table>

            <Link to='/add-record'>
                <button>Add new record</button>
            </Link>


        </div >
    </>
    )
}

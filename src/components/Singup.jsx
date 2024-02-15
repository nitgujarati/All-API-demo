import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import '../App.css'
const App = () => {
    const [allData, setAllData] = useState([]);
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [hobby, setHobby] = useState('');

    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');
    const [loader, setLoader] = useState('');

    const getAllData = async () => {
        setLoader(<Loader />);
        await fetch('http://localhost:1024/list')
            .then(res => res.json())
            .then(dat => {
                setAllData(dat);
                setLoader('');
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        getAllData();
    }, []);

    const saveData = async () => {

        if (name === "" || age === "" || hobby === "") {
            alert("please fill in all fields")
        } else {
            setLoader(<Loader />);
            const data = { name, age, hobby };
            await fetch('http://localhost:1024/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...data })
            })
                .then(res => res.json())
                .then(data => {
                    getAllData();
                    setLoader('');
                    setName('');
                    setAge('');
                    setHobby('');
                })
                .catch(err => console.log(err));
        }

    };

    const deleteData = async (id_d) => {
        setLoader(<Loader />);
        await fetch(`http://localhost:1024/delete/${id_d}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res)
            .then(data => {
                getAllData();
                setLoader('');
            })
            .catch(err => console.log(err));
    };

    const editData = async (id_e) => {
        setLoader(<Loader />);
        await fetch(`http://localhost:1024/list/${id_e}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(data => {
                setName(data.name);
                setAge(data.age);
                setHobby(data.hobby);
                setId(data._id);
                setIsEdit(true);
                setLoader('');
            })
            .catch(err => console.log(err));
    };

    const updateData = async () => {
        setLoader(<Loader />);
        const data = { name, age, hobby };
        await fetch(`http://localhost:1024/update/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
            .then(res => res)
            .then(data => {
                getAllData();
                setLoader('');
                setIsEdit(false);
                setName('');
                setAge('');
                setHobby('');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            { loader }
            <div>
                <p>Name</p> <input onChange={ e => setName(e.target.value) } value={ name } type="text" />
            </div>
            <div>
                <p>Age</p> <input onChange={ e => setAge(e.target.value) } value={ age } type="text" />
            </div>
            <div>
                <p>Hobby</p>  <input onChange={ e => setHobby(e.target.value) } value={ hobby } type="text" />
            </div>

            <div>
                {
                    isEdit ?
                        <button onClick={ updateData }>Update</button>
                        :
                        <button onClick={ saveData }>Save</button>
                }
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Password</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allData.map((ele, index) => (
                            <tr key={ index }>
                                <td>{ ele.name }</td>
                                <td>{ ele.age }</td>
                                <td>{ ele.hobby }</td>
                                <td>
                                    <button onClick={ () => deleteData(ele._id) }>Delete</button>
                                    <button onClick={ () => editData(ele._id) }>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default App;

import React, { useEffect, useState } from 'react'
import Loder from './Loder'
import './App.css'
const App = () => {
    const [allData, setAllData] = useState([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState("");
    const [loader, setLoader] = useState("")

    const getAllData = async () => {
        setLoader(<Loder />)
        await fetch("https://node-main.vercel.app/api/list-todo")
            .then(res => res.json())
            .then((dat) => {
                setAllData(dat)
                setLoader("")
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getAllData();
    }, []);

    const saveData = async () => {
        setLoader(<Loder />)
        const data = { name, email, password, gender };
        await fetch("https://node-main.vercel.app/api/add-todo", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
            .then(res => res.json())
            .then((data) => {
                getAllData();
                setLoader("")
            })
            .catch(err => console.log(err))
    }

    const deleteData = async (id_d) => {
        setLoader(<Loder />)
        await fetch(`https://node-main.vercel.app/api/delete-todo/${id_d}`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res)
            .then((data) => {
                getAllData();
                setLoader("")
            })
            .catch(err => console.log(err))
    }

    const editData = async (id_e) => {
        setLoader(<Loder />)
        await fetch(`https://node-main.vercel.app/api/get-edit-todo/${id_e}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => res.json())
            .then((data) => {
                setName(data.name)
                setEmail(data.email)
                setPassword(data.password)
                setGender(data.gender)
                setId(data._id)
                setIsEdit(true)
                setLoader("")
            })
            .catch(err => console.log(err))
    }

    const updateData = async () => {
        setLoader(<Loder />)
        const data = { name, email, password, gender };
        await fetch(`https://node-main.vercel.app/api/update-todo/${id}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...data })
        })
            .then(res => res)
            .then((data) => {
                getAllData();
                setLoader("")
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            { loader }
            <div className='my-3 w-[275px] flex justify-between'>
                <p>Name</p> <input onChange={ (e) => setName(e.target.value) } value={ name } className='border border-[black]' type="text" />
            </div>
            <div className='my-3 w-[275px] flex justify-between'>
                <p>Email</p> <input onChange={ (e) => setEmail(e.target.value) } value={ email } className='border border-[black]' type="text" />
            </div>
            <div className='my-3 w-[275px] flex justify-between'>
                <p>Password</p>  <input onChange={ (e) => setPassword(e.target.value) } value={ password } className='border border-[black]' type="text" />
            </div>
            <div className='my-3 w-[275px] flex justify-between'>
                <p>Gender</p> <input onChange={ (e) => setGender(e.target.value) } value={ gender } className='border border-[black]' type="text" />
            </div>
            <div className='my-3 w-[275px] flex justify-center'>
                {
                    isEdit ?
                        <button onClick={ updateData } className='p-2 border bg-slate-500 rounded-lg'>Update</button>
                        :
                        <button onClick={ saveData } className='p-2 border bg-slate-500 rounded-lg'>Save</button>
                }
            </div>


            <table className='border-[3px] border-[red]'>
                <thead>
                    <tr>
                        <th className='border-[3px] border-[green] p-3'>Name</th>
                        <th className='border-[3px] border-[green] p-3'>Email</th>
                        <th className='border-[3px] border-[green] p-3'>Password</th>
                        <th className='border-[3px] border-[green] p-3'>Gender</th>
                        <th className='border-[3px] border-[green] p-3'>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allData.map((ele, index) => (
                            <tr key={ index }>
                                <td className='border-[3px] border-[green] p-3'>{ ele.name }</td>
                                <td className='border-[3px] border-[green] p-3'>{ ele.email }</td>
                                <td className='border-[3px] border-[green] p-3'>{ ele.password }</td>
                                <td className='border-[3px] border-[green] p-3'>{ ele.gender }</td>
                                <td className='border-[3px] border-[green] p-3'>
                                    <button onClick={ () => deleteData(ele._id) } className='p-2 border bg-red-500 rounded-lg text-white'>Delete</button>
                                    <button onClick={ () => editData(ele._id) } className='p-2 border bg-gray-500 rounded-lg text-white'>Edit</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default App
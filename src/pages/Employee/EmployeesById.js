import axios from 'axios';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const EmployeesById = () => {
    const {empId} = useParams();
    const getEmployeeById = async() =>{
        try {
            const res = await axios.post(`http://localhost:8000/api/employee//${empId}`)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{getEmployeeById()},[])

  return (
    <div className='main-content'>EmployeesById:{empId}</div>
  )
}

export default EmployeesById
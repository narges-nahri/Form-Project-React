import React,{ useEffect, useState } from 'react';
import { validate } from './validate';
import styles from "./SignUp.module.css";
import { Link } from 'react-router-dom';

//tostify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from "./toast"


const Login = () => {

    const [ data ,setData ] = useState({
        name:"",
        email:"",
        password:""
    })

    const [errors , setErrors] = useState({});
    const [touched , setTouched] = useState({});


     useEffect( ()=>{
        setErrors(validate(data , "login"))
    },[data , touched ])

    const changeHandler = event =>{
        if(event.target.name === data.isAccepted ){
            setData({...data , [event.target.name]:event.target.checked})
        }else{
            setData({...data , [event.target.name]:event.target.value})
        }

    }

    const focuseHandler = event =>{
        setTouched({...touched , [event.target.name]: true })
    }

    const submitHandler = event =>{
        event.preventDefault();
        if(!Object.keys(errors).length){
            notify("You signed up successfully" , "success")
        }else{
            notify("Invalid data" , "error")
            setTouched({
                name:true,
                email:true,
                password:true,
                confirmPassword:true,
                isAccepted:true
            })
        }
    }


    return (
        <div className={styles.container}>
            <form onSubmit={submitHandler} className={styles.formContainer} >
                <h2 className={styles.header}>SignUp</h2>
              
                <div className={styles.formField}>
                    <label>Email</label>
                    <input 
                        className={(errors.email && touched.email ? styles.uncompleted : styles.formInput)}
                        type="text" 
                        name="email" 
                        value={data.email} 
                        onChange={changeHandler} 
                        onFocus={focuseHandler} 
                    />
                    {errors.email && touched.email && <span>{errors.email}</span>}
                </div>
                <div className={styles.formField}>
                    <label>Password</label>
                    <input 
                        className={(errors.password && touched.password ? styles.uncompleted : styles.formInput )}
                        type="password" 
                        name="password" 
                        value={data.password} 
                        onChange={changeHandler} 
                        onFocus={focuseHandler} 
                    />
                    {errors.password && touched.password && <span>{errors.password}</span>}
                </div>
                <div className={styles.formButtons}>
                    <Link to="/signup" >SignUp</Link>
                    <button>Login</button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
};

export default Login;
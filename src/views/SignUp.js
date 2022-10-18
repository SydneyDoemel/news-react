import React, { Component } from 'react'
import { Link, Navigate } from 'react-router-dom';

export default class SignUp extends Component {
constructor(props) {
  super(props)

  this.state = {
    redirect:false,
    message: false,
    error:false,
  }
}

    sendSignUpInfo = async (e) => {
        try{
        e.preventDefault();

        if (e.target.password.value !== e.target.confirmPassword.value){
            return
        }

        const res = await fetch('http://localhost:5000/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({
                username: e.target.username.value,
                email: e.target.email.value,
                password: e.target.password.value
            })
        });
        const data = await res.json();
        console.log(data)
        this.setState({redirect: true})}catch (error) {
            this.setState({error: true});
        }
    };

    render() {
        return this.state.redirect ? <Navigate to="/login"/>:
         (<>
         <div className='login-card'>
            <div className="login-header-cont">
            <h5 className="login-header">Signup For </h5>
              <h5 className="brand-label">Dispatched </h5>
            </div>
            <form className='' onSubmit={(e)=>{this.sendSignUpInfo(e)}}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3 login-form">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirmPassword'/>
                </div>
                
                <button type="submit" className="btn btn-primary login-btn ">Sign Up<i className="fa-solid fa-arrow-right-long fa-lg"></i></button>
                <p className="mt-3">
                Already have an account?{" "}
                <Link to='/login' className="login-link2" href="#">
                  Log In
                </Link>
                .
              </p>
            </form>

            </div>
          
            </>
        )
    }
}

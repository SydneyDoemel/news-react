import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';

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

        if (e.target.password.value !== e.target.confirmPassword.value){ // making sure the password AND confirm password match
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
         (
            <form className='col-4' onSubmit={(e)=>{this.sendSignUpInfo(e)}}>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                    <input type="text" className="form-control" name='username'/>
                </div>


                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email'/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='confirmPassword'/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

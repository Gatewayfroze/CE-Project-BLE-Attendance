/*index.jsx*/
import React from "react";
import '../Styles/styles.css'
import logo from '../logo.svg';
import { Link } from "react-router-dom";
import { Container, FormGroup, Button, Input, Label } from 'reactstrap'
//Functional Component 
const MainPage = () => {
    return (
        <div className='page-login' >
            <h1 className='LogoApp' style={{ fontSize: 50, marginTop:150}}>ATTENDA</h1>
            <div style={{ textAlign: 'center' }}>
                <div style={{marginLeft:550,marginRight:550,marginTop:30,backgroundColor:'#e9f2e9',borderRadius:10,padding:10}}>
                    <div>

                        <div className='field'>
                            <div className='control'>
                                <Label className='label'>Username</Label>
                            </div>
                            <Input />
                        </div>
                        <div className='field'>
                            <div className='control'>
                                <Label className='label'>Password</Label>
                            </div>
                            <Input />
                        </div>

                        <button className='button is-primary'>
                            <a href="/enroll">Login</a>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
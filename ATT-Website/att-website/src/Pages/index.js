/*index.jsx*/
import React from "react";
import '../Styles/styles.css'
import logo from '../logo.svg';
import { Link } from "react-router-dom";
import {Container,FormGroup,Button,Input,Label} from 'reactstrap'
//Functional Component 
const MainPage = () => {
    return (
        <div className='page-login' >
            <div>
                <h1 className='LogoApp'>Logo Website</h1>
                <div className='boxx' >
                    <Container>
                        <FormGroup>
                            <Label>Username</Label>
                            <Input />
                        </FormGroup>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input />
                        </FormGroup>
                        <Button>
                            <a href="/enroll">Login</a>
                    </Button>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
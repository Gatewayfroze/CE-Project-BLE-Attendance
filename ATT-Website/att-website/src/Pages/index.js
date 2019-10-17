/*index.jsx*/
import React from "react";
import '../Styles/styles.css'
import { Link } from "react-router-dom";
import { Button, Form, Container, Input, FormGroup, Label } from 'reactstrap'
//Functional Component 
const MainPage = () => {
    return (
        <div className='page' >
            <div>

                <h1 className='LogoApp'>Logo Website</h1>
                <div className='card' >
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
import React, { useState, useEffect } from 'react';
// import Layout from '../../components/Layout';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
// import Input from '../../components/UI/Input';
import { login } from '../actions/auth.action';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import AOS from 'aos';
import 'aos/dist/aos.css';
import HeroNavbar from './HeroNavbar';
import '../Styling/LoginPage.css';

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();
    const Navigate = useNavigate();
    
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    

    const userLogin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    useEffect(() => {
        if (auth.authenticate) {
            Navigate('/home');
        }
    }, [auth.authenticate, Navigate]);
    
    // if(auth.authenticate){
    //     Navigate('/')
    // }

    return (
        <>
        <HeroNavbar />
        <div className="login-container">
        <div className="login-box"  data-aos="zoom-in">
          <h1  data-aos="fade-up">Login Account</h1>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={userLogin}>
          <div className="input-container">
            <FontAwesomeIcon icon={faUser} className="input-icon"  data-aos="zoom-in"/>
            <input  data-aos="zoom-in"
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              autoComplete="off"
            />
          </div>
          <div className="input-container">
            <FontAwesomeIcon icon={faLock} className="input-icon"  data-aos="zoom-in"/>
            <input  data-aos="zoom-in"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              autoComplete="off"
            />
            <FontAwesomeIcon 
              icon={showPassword ? faEyeSlash : faEye}
              className="password-toggle-icon"
              onClick={togglePasswordVisibility}
            />
          </div>
          <div className="forget-pass">
            <a href="/forget-password">Forget Password ?</a>
          </div>
          <div className="login-btn">
            <button type='submit'>Login</button>
          </div>
          </form>
        </div>
      </div>
            {/* <Container>
                <Row style={{ marginTop: '50px' }}>
                    <Col md={{span: 6, offset: 3}}>
                        <Form onSubmit={userLogin}>
                            <input 
                                label="Email"
                                placeholder="Email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />

                            <input 
                                label="Password"
                                placeholder="Password"
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
                
            </Container> */}
         </>
    )

}

export default Signin


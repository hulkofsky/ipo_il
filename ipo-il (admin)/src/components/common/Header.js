import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap'
import Logo from '../../assets/images/logo.png';
import { toLogin } from '../../helper'

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <Container className="header">
                    <Row>
                        <Col xs="6" className="text-left">
							<img className="logo" src={Logo} alt="logo"/>
                        </Col>
                        <Col xs="6" className="text-right">
							<Button outline color="success" onClick={() => {
                                toLogin()
                            }}>Log out</Button>
                        </Col>
                    </Row>
                </Container>
            </header>
        );
    }
}

export default HeaderComponent;
import React, { Component } from 'react';
import { Container } from 'reactstrap'

class FooterComponent extends Component {
    render() {
        return (
            <footer>
                <Container className="footer text-center">
					Copyright © 2012-2018. All rights reserved.
                </Container>
            </footer>
        );
    }
}

export default FooterComponent;
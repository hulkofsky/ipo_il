import React, { Component } from 'react';
import { Button, Collapse } from 'reactstrap'

class ColapseComponent extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <React.Fragment>
                <Button color="link" onClick={this.toggle}>
                    {
                        this.state.collapse ?
                            'Hide'
                            :
                            'Show'
                    }
                </Button>
                <Collapse isOpen={this.state.collapse}>
                    {
                        Object.keys(this.props.data).map((content, id) => (
                            <React.Fragment key={id}>
                                {content}
                                <br />
                            </React.Fragment>
                        ))
                    }
                </Collapse>
            </React.Fragment>
        );
    };
}

export default ColapseComponent;
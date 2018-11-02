import React, { Component } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';

class SidebarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: '',
        }
    }

    componentWillMount() {
        let path = this.props.history.location.pathname.split('/')
        this.setState({ active: path[path.length - 1] })
    }

    componentWillReceiveProps(nextProps) {
        let path = nextProps.history.location.pathname.split('/')
        this.setState({ active: path[path.length - 1] })
    }
    
    handleClick(path) {
        this.props.history.push(path)
    }

    render() {
        return (
            <ListGroup flush className="sidebar">
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'admins'}
                    onClick={() => this.handleClick('/table/admins')}

                >
                    Admins
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'banks'}
                    onClick={() => this.handleClick('/table/banks')}
                >
                    Banks
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'companyContacts'}
                    onClick={() => this.handleClick('/table/companyContacts')}
                >
                    Company Contacts
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'contactUsMail'}
                    onClick={() => this.handleClick('/table/contactUsMail')}

                >
                    Contact Us Mail
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'content'}
                    onClick={() => this.handleClick('/table/content')}

                >
                    Content
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'enterpreneurs'}
                    onClick={() => this.handleClick('/table/enterpreneurs')}

                >
                    Enterpreneurs
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'investors'}
                    onClick={() => this.handleClick('/table/investors')}

                >
                    Investors
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'ourteam'}
                    onClick={() => this.handleClick('/table/ourteam')}

                >
                    Ourteam
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'projects'}
                    onClick={() => this.handleClick('/table/projects')}

                >
                    Projects
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'project_statuses'}
                    onClick={() => this.handleClick('/table/project_statuses')}

                >
                    Project Statuses
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'purchases'}
                    onClick={() => this.handleClick('/table/purchases')}

                >
                    Purchases
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'purchasesProjects'}
                    onClick={() => this.handleClick('/table/purchasesProjects')}

                >
                    Purchases Projects
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'purchaseStatuses'}
                    onClick={() => this.handleClick('/table/purchaseStatuses')}

                >
                    Purchase Statuses
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'subscribersProjects'}
                    onClick={() => this.handleClick('/table/subscribersProjects')}

                >
                    Subscribers Projects
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'subscribers'}
                    onClick={() => this.handleClick('/table/subscribers')}

                >
                    Subscribers
                </ListGroupItem>
                <ListGroupItem
                    tag="button"
                    href={null}
                    action
                    active={this.state.active === 'visits'}
                    onClick={() => this.handleClick('/table/visits')}

                >
                    Visits
                </ListGroupItem>
            </ListGroup>
        );
    }
}

export default SidebarComponent;
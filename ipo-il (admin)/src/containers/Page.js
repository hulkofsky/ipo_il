import React, { Component } from 'react';
import ls from 'local-storage';
import { Switch, Route, Redirect } from 'react-router';
import { Container, Row, Col } from 'reactstrap'

import Header from "../components/common/Header";
import Admins from "../components/Tables/Admins/Table";
import Banks from "../components/Tables/Banks/Table";
import CompanyContacts from "../components/Tables/CompanyContacts/Table";
import ContactUsMail from "../components/Tables/ContactUsMail/Table";
import Content from "../components/Tables/Content/Table";
import Enterpreneurs from "../components/Tables/Enterpreneurs/Table";
import Investors from "../components/Tables/Investors/Table";
import Ourteam from "../components/Tables/Ourteam/Table";
import Projects from "../components/Tables/Projects/Table";
import ProjectStatuses from "../components/Tables/ProjectStatuses/Table";
import Purchases from "../components/Tables/Purchases/Table";
import PurchasesProjects from "../components/Tables/PurchasesProjects/Table";
import PurchaseStatuses from "../components/Tables/PurchaseStatuses/Table";
import SubscribersProjects from "../components/Tables/SubscribersProjects/Table";
import Subscribers from "../components/Tables/Subscribers/Table";
import Visits from "../components/Tables/Visits/Table";
import NotFound from "../components/NotFound";

import Sidebar from "../components/common/Sidebar";

import { toLogin } from '../helper'

class PageContainer extends Component {
    componentWillMount() {
        let token = ls.get('token')
        if (!token)
			toLogin()
    }

    render() {
        return (
            <React.Fragment>
                <Header history={this.props.history}/>
                <Container className="content">
                    <Row>
                        <Col xs="3">
                            <Sidebar history={this.props.history}/>
                        </Col>
                        <Col xs="9">
                            <Switch>
								<Redirect exact from='/' to='/table/admins' />
                                <Route exact path="/table/admins" component={Admins} />
                                <Route exact path="/table/banks" component={Banks} />
                                <Route exact path="/table/companyContacts" component={CompanyContacts} />
                                <Route exact path="/table/contactUsMail" component={ContactUsMail} />
                                <Route exact path="/table/content" component={Content} />
                                <Route exact path="/table/enterpreneurs" component={Enterpreneurs} />
                                <Route exact path="/table/investors" component={Investors} />
                                <Route exact path="/table/ourteam" component={Ourteam} />
                                <Route exact path="/table/projects" component={Projects} />
                                <Route exact path="/table/project_statuses" component={ProjectStatuses} />
                                <Route exact path="/table/purchases" component={Purchases} />
                                <Route exact path="/table/purchasesProjects" component={PurchasesProjects} />
                                <Route exact path="/table/purchaseStatuses" component={PurchaseStatuses} />
                                <Route exact path="/table/subscribersProjects" component={SubscribersProjects} />
                                <Route exact path="/table/subscribers" component={Subscribers} />
                                <Route exact path="/table/visits" component={Visits} />
                                <Route component={NotFound} />
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </React.Fragment>
        );
    };
}

export default PageContainer;
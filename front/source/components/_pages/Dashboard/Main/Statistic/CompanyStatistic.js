import React, { Component } from 'react';
import Stat from './Stat';
import { connect } from 'react-redux';
import { getProjectStatistic, setCurrentUnitValue, checkFilter } from '../../../../../redux/actions/projectsActions';
import SecondaryHeader from '../../SecondaryHeader';
import Loader from '../../partials/Loader';
import Tabs from '../../../../Tabs/Tabs.index';
import Tab from '../../../../Tabs/Tabs.item';
import StatSubsrc from './StatSubscr';
import StatAmount from './StatAmount';
import StatVisits from './StatVisits';
import './stat.styl';

import m from '../../../../_HOC/lang.hoc'

class CompanyStatistic extends Component {

  componentDidMount() {
    this.props.getProjectStatistic('company', this.props.params);
  }

  render() {
    const {
      dateRanges,
      dateRanges: { statFilter },
      stats,
      currentUnitValue,
    } = this.props.projects;

    const {lang} = this.props 

    let content;
    let controls = false;


    if(!stats) {
      content = <Loader />
    } else {
      content = (
        <div className="stat" dir={this.props.dir}>
          <div className="stat__inner">
            <Tabs defaultActiveTabIndex={1} height={10} tabsAddClassName='stat__tabs'>
              <Tab title="Visits">
                <StatVisits
                  {...this.props}
                  {...this.props.project}
                />
              </Tab>
              <Tab title="Already Collected Money">
                <StatAmount
                  {...this.props}
                  {...this.props.project}
                />
              </Tab>
              <Tab title="Subscribers">
                <StatSubsrc
                  {...this.props}
                  {...this.props.project}
                />
              </Tab>
            </Tabs>
          </div>
        </div>
      )
    }

    console.log(this.props.profile)
    const secHeaderText = []

    return (
      <div className="">
        <SecondaryHeader statisticControls />
        {content}
      </div>
    );
  }

}

export default connect(
  state => ({
    projects: state.projects,
    profile: state.profile
  }), { getProjectStatistic, checkFilter }
)(CompanyStatistic)

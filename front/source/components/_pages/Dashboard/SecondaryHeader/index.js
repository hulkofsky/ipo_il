import React, { Component } from 'react';
import { Crumbs, Controls } from './partials';
import CrumbsEnt from './CrumbsEnt'
import StatisticLink from '../partials/StaticticLink';
import StaticticControls from './StaticticControls';
import './secondary-header.styl';
import CreateNewProjectButton from '../partials/CreateNewProjectButton';

class SecondaryHeader extends Component {

  render() {
    const {
      hasCrumbs = true,
      crumbs,
      createNewButton,
      button = false,
      controls = false,
      statisticLink = false,
      statisticControls = false,
      projectId,
      statisticButtonText,
      dir,
      userType,
      text
     } = this.props;


    return (
      <div className="secondary-header">
        { hasCrumbs && userType == 'enterpreneur' && <CrumbsEnt crumbs={crumbs} text={text}/>}
        { hasCrumbs && userType != 'enterpreneur' && <Crumbs crumbs={crumbs}/>}
        { controls && <Controls />}
        { statisticButtonText &&
          <StatisticLink
            projectId={this.props.projectId}
            text={statisticButtonText}
          />
        }
        { statisticControls && <StaticticControls />}
        { createNewButton && <div className='CreateNewProjectButton__wrapper'><CreateNewProjectButton  dir={dir}/></div> }
      </div>
    );
  }

}

export default SecondaryHeader;

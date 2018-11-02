import React, { Component, Fragment } from 'react';
import SecondaryHeader from '../../SecondaryHeader';
import Checkbox from '../../partials/Checkbox';
import './settings.styl';

import { getSettings, resetSettings } from '../../../../../redux/reducers/getSettings.reducer';
import { settings } from '../../../../../utils/routesBack'
import { connect } from 'react-redux';
import multiLang from '../../../../_HOC/lang.hoc'

const checkboxes = [
  {
    checked: false,
    label:'Project on evaluation stage',
    name: 'evaluation',
    nameFromBeck: 'project_eval_notification'
  },
  {
    checked: false,
    label:'Deleted project',
    name: 'deleted',
    nameFromBeck: 'project_deleted_notification'
  },
  {
    checked: false,
    label:'Project became running',
    name: 'running',
    nameFromBeck: 'project_running_notification'
  },
  {
    checked: false,
    label:'Edited project',
    name: 'edited',
    nameFromBeck: 'project_edited_notification'
  },
  {
    checked: false,
    label:'Subscription on project',
    name: 'subscribtion',
    nameFromBeck: 'project_subscription_notification'
  },
  {
    checked: false,
    label:'Project days left',
    name: 'days_left',
    nameFromBeck: 'project_days_left_notification'
  },
  {
    checked: false,
    label:'Purchases of project',
    name: 'purchase',
    nameFromBeck: 'project_purchases_notification'
  }

]

class Settings extends Component {

  state = {
    fields: [
  {
    checked: false,
    label:'Project on evaluation stage',
    name: 'evaluation',
    nameFromBeck: 'project_eval_notification'
  },
  {
    checked: false,
    label:'Deleted project',
    name: 'deleted',
    nameFromBeck: 'project_deleted_notification'
  },
  {
    checked: false,
    label:'Project became running',
    name: 'running',
    nameFromBeck: 'project_running_notification'
  },
  {
    checked: false,
    label:'Edited project',
    name: 'edited',
    nameFromBeck: 'project_edited_notification'
  },
  {
    checked: false,
    label:'Subscription on project',
    name: 'subscribtion',
    nameFromBeck: 'project_subscription_notification'
  },
  {
    checked: false,
    label:'Project days left',
    name: 'days_left',
    nameFromBeck: 'project_days_left_notification'
  },
  {
    checked: false,
    label:'Purchases of project',
    name: 'purchase',
    nameFromBeck: 'project_purchases_notification'
  }

]
}

  componentDidMount = () => {
      // console.log(this.props)
      const {lang, getSettings} = this.props
      const settings = `enterpreneur/${window.localStorage.getItem('user-id')}/settings`
      getSettings(lang, settings)
  //     console.log(this.props)
  //     console.log(this.props.settings)
  // }
}

  componentDidUpdate = () => {

  }

  // changeChecked = (name) => {
  //   console.log(this.state)
  //   console.log(name)

  // }

  componentWillUnmount = () => {
    const { resetSettings } = this.props
    resetSettings()
  }

  renderPage() {

    const {lang, settings, dir} = this.props
    if(!settings.usersettings) return null
    console.log(settings)
    console.log(this.props)



    let newState = checkboxes.map((item, i) => {
      let newValue = item;
      for (let key in settings.usersettings) {
        if(item.nameFromBeck == key) {
          newValue = {
            ...item,
            checked: settings.usersettings[key],
          }
        }
      }
      return newValue;

    })

    let lastState  = newState.map((item, i) => {
      switch (item.name) {
        case 'evaluation':
          return {
            ...item,
            label: settings.pageContent[1][lang].project_on_eval
          }
        case 'deleted':
          return {
              ...item,
              label: settings.pageContent[1][lang].deleted_project
            }
        case 'running':
          return {
              ...item,
              label: settings.pageContent[1][lang].project_running
            }

        case 'edited':
          return {
              ...item,
              label: settings.pageContent[1][lang].edited_project
            }

        case 'subscribtion':
          return {
              ...item,
              label: settings.pageContent[1][lang].subscription
            }

        case 'days_left':
          return {
              ...item,
              label: settings.pageContent[1][lang].days_left
            }

        case 'purchase':
          return {
              ...item,
              label: settings.pageContent[1][lang].purchases
            }

        default: break

      }
    })
    // console.log(lastState)


    // console.log(newState)

    let mainText = settings.pageContent[1][lang].descr;
    let header = settings.pageContent[1][lang].title_settings
    const userType = this.props.match.params.userType
    const secHeaderName = [header]
    // console.log(this.props)
    // console.log(header)
    // console.log(mainText)
    return (
      <div>
        <SecondaryHeader controls={false} button={true} text={secHeaderName} userType={userType}/>
          {/*<div className='createNewTab__main-header'>
            <span>Settings</span>
          </div>*/}
          <main className="dash-inner">
            <div className="settings">
              <div className="settings__header" dir={dir}>
                {header}
              </div>
              <div className="settings__descr" dir={dir}>
                {mainText}
              </div>
              <div className="settings__form" dir={dir}>
                  {lastState.map( checkbox => {
                    return (
                      <Checkbox {...checkbox} key={checkbox.name} name={checkbox.name} />
                    )
                  })}
              </div>
            </div>
          </main>
        </div>
      )
  }

  render() {
    return (
        <Fragment>
          {this.renderPage()}
        </Fragment>
    );
  }

}

const mapStateToProps = state => {
  return {
    settings: state.settings
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSettings: (lang, settings) => (dispatch(getSettings(lang, settings))),
    resetSettings: () => (dispatch(resetSettings()))
  }
  }

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(Settings)
)

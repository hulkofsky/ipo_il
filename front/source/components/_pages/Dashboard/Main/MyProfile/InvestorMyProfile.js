import React, { Component } from 'react';
import SecondaryHeader from '../../SecondaryHeader';
import ProfileButton from './ProfileButton';
import FormField from '../../partials/FormField';
import Input from '../../../../formFields/FormField.input';
import Select from 'react-select';
import { getPageContent, resetPageContent } from '../../../../../redux/reducers/pageContent.reducer';
import { connect } from 'react-redux';
import Loader from '../../partials/Loader';
import multilang from '../../../../_HOC/lang.hoc'
import './investor.styl';
import axios from 'axios';
import config from '../../../../../utils/config';

class Profile extends Component {

  state = {
    isEditable: false,
    fields: null,
  }


  // do request to server for data
  componentDidMount() {
    const { getPageContent, lang } = this.props;
    const { userId } = this.props.match.params;
    getPageContent(lang, `investor/${userId}/myprofile`);
  }


  // waiting for form (and other) data and put values to state.fields = {}
  componentDidUpdate = prevProps => {
    const newSettings = this.props.content.usersettings;
    const allBanks = this.props.content.banks;

    if(!newSettings) {
      return;
    }

    if(prevProps.content.usersettings !== newSettings) {
      this.setState(prev => {
        const newState = Object.assign({}, prev);
        newState.fields = {};
        const { fields } = newState;

        Object.keys(newSettings).forEach(field => {
          newState.fields[field] = newSettings[field];
        })

        fields.password = '';
        fields.confPass = '';
        fields['bank_name'] = allBanks[newSettings['bank_id'] - 1].name;

        return newState;
      })
    }
  }


  // toggle is form editable or not, by default not editable
  editAction = () => {
    this.setState(prev => ({
      isEditable: !prev.isEditable,
    }))
  }


  // put form data to server
  // don't fire if form is not editable
  saveAction = () => {
    if(!this.state.isEditable) {
      return;
    }

    const { userId } = this.props.match.params;
    axios.put(`${config.domain}/investor/${userId}/myprofile`, this.state.fields);
  }


  changeHandlerCreator = select => {
    // if form is not editable returns just callback which doesn't do anything
    // for preventing warning
    if(!this.state.isEditable) {
      return () => {};
    }

    const inputsHandlers = e => {
      const { name, value } = e.target;
      this.setState(prev => {
        const newState = Object.assign({}, prev);
        // form elements have the same 'name' attr as fields names from server
        newState.fields[name] = value;
        return newState;
      })
    }

    const selectHandler = e => {
      const { name: selectName } = select;
      this.setState(prev => {
        const newState = Object.assign({}, prev);
        newState.fields[selectName] = e.label;
        return newState;
      })
    }

    if(!select) {
      return inputsHandlers;
    } else {
      return selectHandler;
    }
  }


  render() {
    let { content, projectType, lang, items, investor, staticTitles, dir } = this.props;
    let settings, titles, banks, crumbs;

    // wait for data from server
    // state gets that data in componentDidUpdate method
    if(!this.state.fields) {
      return <Loader/>;
    }

    settings = this.state.fields;
    banks = content.banks;
    titles = content.pageContent[1][lang];

    return (
      <div>
        <SecondaryHeader/>
        <main className="dash-inner">
          <div className="profile">
            <div className="profile__buttons">
              <ProfileButton
                text={titles['edit_btn']}
                addedClassName={`profile-button-edit ${this.state.isEditable ? 'active' : ''}`}
                clickHandler={this.editAction}
              />
              <ProfileButton text={titles['save_btn']} addedClassName="profile-button-save" clickHandler={this.saveAction} />
            </div>
            <div className="profile__form">
              <FormField label={titles['investor.first_name.label']} addedClassName="" id='profile__first-name'>
                <Input
                  type="text"
                  errors={[]}
                  name="first_name"
                  value={settings['first_name']}
                  placeholder={titles['investor.first_name']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
              <FormField label={titles['investor.last_name.label']} addedClassName="" id='profile__last-name'>
                <Input
                  type="text"
                  errors={[]}
                  name="last_name"
                  value={settings['last_name']}
                  placeholder={titles['investor.last_name']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
              <FormField label={titles['investor.email.label']} addedClassName="" id='profile__email'>
                <Input
                  type="email"
                  errors={[]}
                  name="email"
                  placeholder={titles['investor.email']}
                  value={settings['email']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
              <FormField label={titles['investor.phone.label']} addedClassName="" id='profile__phone'>
                <Input
                  type="phone"
                  errors={[]}
                  name="phone"
                  placeholder={titles['investor.phone']}
                  value={settings['phone']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
              <FormField
                label={titles['investor.bank.label']}
                addedClassName=""
                id='profile__bank'
              >
                <Select
                  className="profile__form-field-select"
                  name="bank_name"
                  options={banks.map( bank => {
                    return {
                      label: bank.name,
                      value: bank.id,
                    }
                  })}
                  placeholder={settings['bank_name']}
                  value={settings['bank_name']}
                  onChange={this.changeHandlerCreator({name: 'bank_name'})}
                />
              </FormField>
              <FormField label={titles['investor.account.label']} addedClassName="" id='profile__account'>
                <Input
                  type="text"
                  errors={[]}
                  name="account_number"
                  placeholder={titles['investor.account']}
                  value={settings['account_number']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
              <FormField label={titles['investor.pass.label']} addedClassName="" id='profile__password'>
                <Input
                  type="password"
                  errors={[]}
                  name="password"
                  value={settings['password']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
              <FormField label={titles['investor.confirm_pass']} addedClassName="" id='profile__password'>
                <Input
                  type="password"
                  errors={[]}
                  name="confPass"
                  value={settings['confPass']}
                  changeValue={this.changeHandlerCreator()}
                />
              </FormField>
            </div>
          </div>
        </main>
      </div>
    );
  }

}

export default connect(
  state => {
    return {
      content: state.pageContent
    }
  }, { getPageContent, resetPageContent }
)(multilang(Profile));

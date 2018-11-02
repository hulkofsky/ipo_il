import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { isAuthed, setToken } from '../../../../redux/reducers/auth.reducer';
import { dataToSubmit } from '../../../formFields/utils';
import lang from '../../../_HOC/lang.hoc';
import { showOverlay } from '../../../../redux/reducers/overlay.reducer';
import Input from '../../../formFields/FormField.input';
import '../../LogIn/LogIn.style.styl';

class aLogInForm extends PureComponent {
  static propTypes = {
    contentText: PropTypes.object,
    openModal: PropTypes.func,
    dir: PropTypes.string,
    showOverlay: PropTypes.func,
    setToken: PropTypes.func,
  }
  state = {
    adminEmail: { value: '', errors: [], validationRules: [] },
    adminPassword: { value: '', errors: [], validationRules: [] }
  }
  componentDidMount () {
    const { setToken } = this.props;
    this.setToken = setToken.bind(this);
  }
  handleChangeValue = (evt, file) => {
    const { name, type, value, checked } = evt.target;
    return this.setState({
      [name]: {
        ...this.state[name],
        value: type === 'checkbox' ? checked : value
      }
    });
  }
  handleChangeErrors = (evt, errors) => {
    const { name } = evt.target;
    return this.setState({
      [name]: {
        ...this.state[name],
        errors: [...errors]
      }
    });
  }
  handleChangeValidationRules = (evt, rules) => {
    const { name } = evt.target;
    return this.setState({
      [name]: {
        ...this.state[name],
        validationRules: [...rules]
      }
    });
  }
  handleSubmit = async (evt) => {
    evt && evt.preventDefault && evt.preventDefault()
    dataToSubmit(this.state).then((data) => {
      return this.fetch('/adminpanel/signin', {
        method: 'POST',
        body: JSON.stringify({
          username: data.adminEmail,
          password: data.adminPassword,
        }),
      });
    }).then((res) => {
      this.setToken(res.token);
      return Promise.resolve(res);
    });
  }
  disabledButton = () => {
    const array = [];
    const errors = [];
    for (let key in this.state) {
      if (this.state.hasOwnProperty(key)) {
        errors.push(!! this.state[key].errors.length);
        array.push((this.state[key].optional === true && this.state[key].value === '') ? true : !! this.state[key].value);
      };
    };
    return (array.includes(false) || errors.includes(true));
  }
  onClick = () => {
    const { showOverlay, openModal } = this.props;
    showOverlay();
    openModal();
  }
  renderPage () {
    const { dir, lang, contentText } = this.props;
    const { adminEmail, adminPassword } = this.state;
    if (! contentText) return null;
    return (
      <form className="log-in"
        noValidate
        onSubmit={this.handleSubmit}
      >
        <div className="log-in__container">
          <Input type="email"
            name="adminEmail"
            { ...adminEmail }
            label={ contentText['admin_log_in.email_field'] }
            labelDone={ contentText['admin_log_in.email_field.label'] }
            validation={[ 'required' ]}
            changeValue={ this.handleChangeValue }
            changeErrors={ this.handleChangeErrors }
          />
          <Input type="password"
            name="adminPassword"
            { ...adminPassword }
            label={ contentText['admin_log_in.pass_field'] }
            labelDone={ contentText['admin_log_in.pass_field.label'] }
            validation={[ 'required' ]}
            changeValue={ this.handleChangeValue }
            changeErrors={ this.handleChangeErrors }
            changeValidationRules={ this.handleChangeValidationRules }
          />
          <div className="log-in__forgot" dir={ dir }>
            <a href="#"
              className="log-in__forgot-link"
              dir={ dir }
              onClick={ this.onClick }
            >
              { contentText['admin_log_in.forgot_link'] }
            </a>
          </div>
        </div>
        <div className="sign-up__button-wrapper">
          <button type="submit"
            className="sign-up__submit-button button button-main"
            disabled={ this.disabledButton() }
            dir={ dir }
          >
            Log In
          </button>
        </div>

      </form>
    );
  }
  render() {
    return (
      <Fragment>
        { this.renderPage() }
      </Fragment>
    );
  }
}

const mapStateToProps = null;
const mapDispatchToProps = { showOverlay, setToken, isAuthed };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(lang(aLogInForm)))
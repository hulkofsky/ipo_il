import React, { Component } from 'react';
import { connect } from 'react-redux';
import multiLang from '../../../_HOC/lang.hoc'
import {changeSearchField} from '../../../../redux/reducers/changeSearchField.reducer'
import {history} from '../../../../history'

class Search extends Component {

  state = {
    value: '',
    isActive: false
  }

  changeInput = (e) => {
    this.setState({
      value: e.target.value
    })
  }

  componentDidUpdate = () => {
    const {changeSearchField} = this.props
    changeSearchField(this.state.value)

    const userType = window.localStorage.getItem('user-type')
    const userId = window.localStorage.getItem('user-id')
    if(this.state.isActive && this.state.value) {
      history.push(`/dash/${userType}/${userId}/projects/search`)
    }
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    // if (this.state == nextState) return fals
    return this.state == nextState ? false : true
  }

  onFocus = () => {
    console.log('onFocus')
    this.setState({
      value: '',
      isActive: true
    })
  }

  onBlur = () => {
    console.log('onBlur')
    // this.setState({
    //   value: '',
    //   isActive: false
    // })
  }

  render() {
    console.log(this.state.value)
    const { dir } = this.props
    return (
      <div className="dash-header__search" dir={dir}>
        <input
          className="form-control__field"
          type="text"
          value={this.state.value}
          placeholder={this.props.placeholder}
          onChange={this.changeInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
        />
      </div>
    );
  }

}

const mapStateToProps = state => {
  return {
    projects: state.allProjects.company_projects.projects
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeSearchField: (value) => (dispatch(changeSearchField(value)))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(
  multiLang(Search)
);

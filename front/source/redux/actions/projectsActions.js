import ProjectApi from '../../utils/api';
import { projects } from '../constants';

export function getProjectStatistic(type, props) {
  return dispatch => {
    dispatch({type: projects.singleStart});

    const { getProjectStat } = new ProjectApi();

    return getProjectStat(type, props)
      .then( res => {
        dispatch({type: projects.singleSuccess, data: res.data, projectType: type});
      })
      .catch( rej => {
        dispatch({type: projects.singleFail});
      })
  }
}

export function changeStatFilter(value) {
  return dispatch => {
    dispatch({type: projects.changeStatFilter, value});
  }
}

export function setCurrentUnitValue(value) {
  return dispatch => {
    return dispatch({type: projects.setCurrentUnit, value})
  }
}

export function checkFilter(statType) {
  return dispatch => {
    return dispatch({type: projects.checkFilter, statType});
  }
}

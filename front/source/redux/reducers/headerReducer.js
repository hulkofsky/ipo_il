import { header } from '../constants';
import _ from 'lodash';

const initialState = {
  isMenuOpened: false,
  filters: {
    field: 'all',
    money: 'all',
    time: 'all',
  },
  // statFilter: {
  //   value: 'week',
  //   options: [
  //     {
  //       value: 'week',
  //       title: 'Last week',
  //     },
  //     {
  //       value: 'month',
  //       title: 'Last month',
  //     },
  //     {
  //       value: '3-month',
  //       title: 'Last 3 month',
  //     },
  //     {
  //       value: '6-month',
  //       title: 'Last 6 month',
  //     },
  //     {
  //       value: 'year',
  //       title: 'Last year',
  //     },
  //   ]
  // },
}

export default (state = initialState, action) => {
  // debugger
  switch (action.type) {
    case header.toggleMenu: {
      const newState = _.cloneDeep(state);
      newState.isMenuOpened = !newState.isMenuOpened;

      return newState;
    }

    case header.changeFilter: {
      const { name, value } = action.filterObj;
      const newState = _.cloneDeep(state);
      newState.filters[name] = value;

      return newState;
    }

    default:
      return state;
  }
}

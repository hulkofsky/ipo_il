const header = {
  toggleMenu: 'HEADER_MENU_TOGGLE',
  changeFilter: 'HEADER_FILTER_CHANGE',
}

const projects = {};
requestsActionTypesCreate(projects, 'PROJECTS_LIST', 'list');
requestsActionTypesCreate(projects, 'PROJECT', 'single');
projects.changeStatFilter = 'PROJECT_STAT_FILTER_CHANGE';
projects.setCurrentUnit = 'PROJECT_SET_CURRENT_UNIT';
projects.checkFilter = 'PROJECT_CHECK_FILTER';

export {
  header,
  projects,
}

function requestsActionTypesCreate(store, entity, namePrefix) {

  const typesArray = [
    {
      name: `${namePrefix}Start`,
      value: 'GET_START',
    },
    {
      name: `${namePrefix}Success`,
      value: 'GET_SUCCESS',
    },
    {
      name: `${namePrefix}Fail`,
      value: 'GET_FAIL',
    },
  ];

  typesArray.forEach( type => {
    store[type.name] = `${entity}_${type.value}`;
  })
}

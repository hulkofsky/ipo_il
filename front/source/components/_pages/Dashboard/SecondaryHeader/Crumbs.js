import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import {connect} from 'react-redux'

class Crumbs extends Component {

  parsePath = () => {
    const fullPath = this.props.location.pathname;
    const splittedPath = fullPath.split('/');
    let resultPathes = [];

    splittedPath.forEach( path => {
      // exclude unnecassary pathes and create others
      path && path !== 'dash' && resultPathes.push( detectPath(path) );
    })

    return resultPathes;

    function detectPath(path) {
      const linkNames = {
        'projects': 'My Projects',
        'purchase': 'Purchase Projects',
        'profile': 'My Profile',
        'settings': 'Settings',
        'terms': 'Terms of service',
        'createNew': 'Create a New project',
        'all_team_edit': 'All Team Edit'
      };

      const resLink = {
        text: linkNames[path],
        path: createPath(path),
      };

      return resLink;

      function createPath(path) {
        const currentPathStack = resultPathes[ resultPathes.length - 1] && resultPathes[ resultPathes.length - 1].path || '/dash';

        return `${currentPathStack}/${path}`;
      }
    }
  }

  getCrumbs = () => {
    const { crumbs } = this.props;
    let links;

    if(!crumbs) {
      links = this.parsePath();
    } else {
      links = crumbs;
    }

    return links.map( link => {
      if(link.text) {
        return (
          <li className='crumbs__item' key={link.text + link.path} >
            <Link to={'/' + link.path} className="crumbs__link">
              {link.text}
            </Link>
          </li>
        )
      } else {
        return null;
      }
    })

    function createAnchor() {
      return <a/>
    }
  }

  render() {
    console.log(this.props)
    return (
      <div className="crumbs">
        <ul className="crumbs__list">
          {this.getCrumbs()}
        </ul>
      </div>
    );
  }

}

export { Crumbs }

 const mapStateToProps = state => {
  return {
    links: state.projects.items
  }
}

export default connect(mapStateToProps, null)(withRouter(Crumbs));

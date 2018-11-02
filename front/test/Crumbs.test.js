import React from 'react';
import { Crumbs } from '../source/components/_pages/Dashboard/SecondaryHeader/Crumbs';
import { MemoryRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';

test('Automatically parsing path and create array of link objects', () => {

  [
    {
      pathname: '/dash/projects',
      expectedPathes: [
        '/dash/projects',
      ]
    },
    {
      pathname: '/dash/projects/purchase',
      expectedPathes: [
        '/dash/projects',
        '/dash/projects/purchase',
      ]
    },
    {
      pathname: '/dash/projects/purchase/projects',
      expectedPathes: [
        '/dash/projects',
        '/dash/projects/purchase',
        '/dash/projects/purchase/projects',
      ]
    },
  ].forEach( path => {
    const crumb = renderer.create(
      <Crumbs location={{pathname: path.pathname}} linkAsAnchor={true}/>
    );

    const parsedPathes = crumb.getInstance().parsePath();

    path.expectedPathes.forEach( (expectedString, index) => {
      expect(parsedPathes[index].path).toEqual(expectedString);
    })
  })

})

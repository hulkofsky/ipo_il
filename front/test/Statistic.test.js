import React from 'react';
// import { Crumbs } from '../source/components/_pages/Dashboard/SecondaryHeader/Crumbs';
// import { MemoryRouter as Router } from 'react-router-dom';
import StatGraphValueScale from '../source/components/_pages/Dashboard/Main/Statistic/Stat';
import renderer from 'react-test-renderer';


  const data = [
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-10T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-11T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-12T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-13T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-14T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-15T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-16T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
    {
      "id": "7",
      "investor_id": 1,
      "project_id": 1,
      "purchase_date": "2010-06-17T07:00:00.000Z",
      "status_id": 4,
      "unit_count": Math.random() * 1000,
      "unit_price": 10,
      "po_doc": ""
    },
  ]

  const purchases = [
    {
        "id": "7",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 100,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "5",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 300,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "6",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 304,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "8",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 308,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "13",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 312,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "14",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 340,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "15",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "16",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 300,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "21",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "22",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "23",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "24",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "29",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "30",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "31",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "32",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "37",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "38",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "39",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "40",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "45",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "46",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "47",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
    {
        "id": "48",
        "investor_id": 1,
        "project_id": 1,
        "purchase_date": "2018-08-21T21:00:00.000Z",
        "status_id": 4,
        "unit_count": 500,
        "unit_price": 10,
        "po_doc": ""
    },
  ]

  let count = 0;
  let dateCount = 0;

  purchases.forEach( (item, i, arr) => {
    item.close = item.unit_count;
    item.date = item.purchase_date;
    let newDate = new Date(item.date);
    const day = newDate.getDate();
    newDate.setDate(day + dateCount);
    dateCount++;
    item.date = newDate;
    item.close += count * 1;

    if(i < arr.length / 2) {
      count++;
    } else {
      count--;
    }
  })

  const resArr = [];

const ScaleComponent = renderer.create(
  <StatGraphValueScale items={purchases} margin={{}} />
).getInstance();

test('Rounding the max digit of number', () => {
    const testCases = [
      {
        test: 321312,
        expected: 400000
      },
      {
        test: 956,
        expected: 1000,
      },
      {
        test: 1000,
        expected: 1000
      },
      {
        test: 999999,
        expected: 1000000
      },
      {
        test: 321.23,
        expected: 400,
      },
      {
        test: 0,
        expected: 0,
      }
    ]

    testCases.forEach( testCase => {
      const testRes = ScaleComponent.floorValue(testCase.test);
      expect(testRes).toEqual(testCase.expected);
    })
})

// test('Detect optimal scaling', () => {
//   const testCases = [
//     {
//       test: 6587,
//       expected: [1400, 1400 * 2, 1400 * 3, 1400 * 4, 1400 * 5];
//     }
//   ]
// })







test('Testing graph component', () => {


  // creates intermidiate points between existing for smoothy floating info point
  function smoothGraph() {
    const minPointsAmount = 500;
    const arr = purchases;
    const { length } = arr;

    if(length >= minPointsAmount ) {
      return;
    }

    const differenceOfPoints = minPointsAmount - length;
    // how many points need to add between each current points
    const additionalPointsBetweenEach = Math.floor(minPointsAmount / length);

    for(let i = 0; i < length-1; i++) {
      const currentItem = arr[i];
      const nextItem = arr[i + 1];

      const valuesDifference = nextItem.close - currentItem.close;
      const increaseValueToEachPoint = valuesDifference / additionalPointsBetweenEach;

      const dateDifference = nextItem.date - currentItem.date;
      const increaseDateToEachpoint = dateDifference / additionalPointsBetweenEach;

      currentItem.isFake = false;
      resArr.push(currentItem);

      // create intermidiate points
      for(let ii = 0; ii < additionalPointsBetweenEach; ii++) {
        const objToPush = Object.assign({}, currentItem);
        objToPush.close += increaseValueToEachPoint * ii;
        objToPush.isFake = true;

        const newDate = new Date(currentItem.date.valueOf() + increaseDateToEachpoint * ii);
        objToPush.date = newDate;
        resArr.push(objToPush);
      }
    }
  }


})

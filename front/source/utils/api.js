import uuid from 'uuid/v4';
import axios from 'axios';

// export function getProjectsApi() {
//   return new Promise( (res, rej) => {
//     res(
//       [
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//         {
//           enterpreneur_id: 2,
//           project_name: 'TES 4 Oblivion',
//           project_field: 'Video Games',
//           project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
//           status_id: 2,
//           money_to_collect: 79999.56,
//           money_collected: 80000.78,
//           money_invested: 2000.312,
//           video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
//           project_finish_date: '2018-10-22 00:00:00',
//           min_unit_price: 10,
//           min_units: 1,
//           tashkif_file: '',
//           project_files: [],
//           project_team: [],
//           id: uuid(),
//         },
//       ]
//     )
//   })
// }
//
// export function getProjectSingleApi(id) {
//   return new Promise( (res, rej) => {
//     // setTimeout( () => {
//       res(
//         {
//           purchases: [
//             {
//               "id": "7",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-04-28T23:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 20,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "5",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-01T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 320,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "6",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-01T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 304,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "8",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-03T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 120,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "13",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-04T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 312,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "14",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-04T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 340,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "15",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-05T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "16",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-06T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 300,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "21",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-07T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "22",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-08T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "23",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-08T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "24",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-09T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "29",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-10T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "30",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-11T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "31",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-11T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "32",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-18T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "37",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-18T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 50,
//               "po_doc": ""
//             },
//             {
//               "id": "38",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-18T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 30,
//               "po_doc": ""
//             },
//             {
//               "id": "39",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-18T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "40",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-18T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 10,
//               "po_doc": ""
//             },
//             {
//               "id": "45",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-18T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 120,
//               "po_doc": ""
//             },
//             {
//               "id": "46",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-20T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 1000,
//               "unit_price": 120,
//               "po_doc": ""
//             },
//             {
//               "id": "47",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-20T21:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 500,
//               "unit_price": 130,
//               "po_doc": ""
//             },
//             {
//               "id": "48",
//               "investor_id": 1,
//               "project_id": 1,
//               "purchase_date": "2018-08-27T09:00:00.000Z",
//               "status_id": 4,
//               "unit_count": 700,
//               "unit_price": 110,
//               "po_doc": ""
//             },
//           ]
//         }
//       )
//     // }, 1000)
//   })
// }

class ProjectApi {
  constructor(props) {
    // super(props);
    this.path = 'http://192.168.88.170:3000';
  }

  getProjectStat = (type, props) => {
    const types = {

      investor: () => {
        const { userId, projectType, projectId } = props;

        return axios.get(`${this.path}/investor/${userId}/${projectType}/${projectId}/statistics`);
        // // return new Promise( (res, rej) => {
        //   res(
        //     {
        //       data: {
        //         purchases: [
        //           {
        //             "id": "7",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-04-28T23:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 20,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "5",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-01T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 320,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "6",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-01T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 304,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "8",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-03T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 120,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "13",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-04T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 312,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "14",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-04T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 340,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "15",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-05T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "16",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-06T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 300,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "21",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-07T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "22",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-08T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "23",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-08T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "24",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-09T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "29",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-10T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "30",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-11T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "31",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-11T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "32",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-18T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "37",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-18T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 50,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "38",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-18T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 30,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "39",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-18T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "40",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-18T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 50000000,
        //             "unit_price": 10,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "45",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-18T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 120,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "46",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-20T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 1000,
        //             "unit_price": 120,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "47",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-20T21:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 500,
        //             "unit_price": 130,
        //             "po_doc": ""
        //           },
        //           {
        //             "id": "48",
        //             "investor_id": 1,
        //             "project_id": 1,
        //             "purchase_date": "2018-08-27T09:00:00.000Z",
        //             "status_id": 4,
        //             "unit_count": 700,
        //             "unit_price": 110,
        //             "po_doc": ""
        //           },
        //         ]
        //       }
        //     }
        //   )
        // })
      },

      company: () => {
        const { userId, projectType, projectId } = props;

        return axios.get(`${this.path}/enterpreneur/${userId}/projects/${projectId}/statistics`);
      },
    }

    return types[type]();
  }

  getProjectsList = () => {
    return new Promise( (res, rej) => {
      res(
        [
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
          {
            enterpreneur_id: 2,
            project_name: 'TES 4 Oblivion',
            project_field: 'Video Games',
            project_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin tristique justo eget mauris posuere vestibulum. Sed tincidunt, leo ac faucibus convallis, nisl urna mollis diam, quis dapibus massa nulla sed erat. Curabitur at ipsum metus. Vivamus id ante vitae ipsum viverra aliquam eget sit amet dui. Praesent efficitur hendrerit tempus.',
            status_id: 2,
            money_to_collect: 79999.56,
            money_collected: 80000.78,
            money_invested: 2000.312,
            video_url: 'https://www.youtube.com/watch?v=mWLZ07U85h0',
            project_finish_date: '2018-10-22 00:00:00',
            min_unit_price: 10,
            min_units: 1,
            tashkif_file: '',
            project_files: [],
            project_team: [],
            id: uuid(),
          },
        ]
      )
    })
  }
}

export default ProjectApi;

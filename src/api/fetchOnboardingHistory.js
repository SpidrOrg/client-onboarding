// import _ from 'lodash';
import getApiBase from './getApiBase';

// let cachedData = {
//   headers: [
//     'Tenant ID',
//     'Host',
//     'Creation at (UAT)',
//     'Processed At(UAT)',
//     'Creation at (QA)',
//     'Processed At(QA)',
//     'Creation at (DEV)',
//     'Processed At(DEV)',
//   ],
//   data: [
//     [
//       '9658298042',
//       'rweg',
//       '2023-05-15T20:08:37.487Z',
//       'pending',
//       '2023-05-15T20:08:37.487Z',
//       'pending',
//       '2023-05-15T20:08:37.487Z',
//       'pending',
//     ],
//     [
//       '8222408569',
//       'fsrgggg',
//       '2023-05-15T20:57:25.126Z',
//       'pending',
//       '2023-05-15T20:57:25.126Z',
//       'pending',
//       '2023-05-15T20:57:25.126Z',
//       'pending',
//     ],
//     [
//       '5152439294',
//       'fsru',
//       '2023-05-15T21:12:24.360Z',
//       'pending',
//       '2023-05-15T21:12:24.360Z',
//       'pending',
//       '2023-05-15T21:12:24.360Z',
//       'pending',
//     ],
//     [
//       '4654544466',
//       'fsr',
//       '2023-05-15T20:08:02.229Z',
//       'pending',
//       '2023-05-15T20:08:02.229Z',
//       'pending',
//       '2023-05-15T20:08:02.229Z',
//       'pending',
//     ],
//     [
//       '7371922353',
//       '4wfrfw',
//       '2023-05-15T20:27:50.796Z',
//       'pending',
//       '2023-05-15T20:27:50.796Z',
//       'pending',
//       '2023-05-15T20:27:50.796Z',
//       'pending',
//     ],
//     [
//       '2657895408',
//       'rwegnn',
//       '2023-05-15T20:56:40.498Z',
//       'pending',
//       '2023-05-15T20:56:40.498Z',
//       'pending',
//       '2023-05-15T20:56:40.498Z',
//       'pending',
//     ],
//     [
//       '6683733535',
//       'fsr3333',
//       '2023-05-15T21:06:21.352Z',
//       'pending',
//       '2023-05-15T21:06:21.352Z',
//       'pending',
//       '2023-05-15T21:06:21.352Z',
//       'pending',
//     ],
//     [
//       '5985095462',
//       'visdcop',
//       '2023-05-15T19:56:01.469Z',
//       'pending',
//       '2023-05-15T19:56:01.469Z',
//       'pending',
//       '2023-05-15T19:56:01.469Z',
//       'pending',
//     ],
//     [
//       '2117584755',
//       'democorp',
//       '2023-05-15T10:47:09.113Z',
//       '2023-05-15T10:57:09.113Z',
//       null,
//       null,
//       null,
//       null,
//     ],
//     [
//       '3008464237',
//       'ttttt',
//       '2023-05-15T21:09:20.460Z',
//       'pending',
//       '2023-05-15T21:09:20.460Z',
//       'pending',
//       '2023-05-15T21:09:20.460Z',
//       'pending',
//     ],
//     [
//       '6842516200',
//       'abhaycool',
//       '2023-05-15T17:39:19.356Z',
//       'pending',
//       '2023-05-15T17:39:19.356Z',
//       '2023-05-15T17:51:10.894Z',
//       '2023-05-15T17:39:19.356Z',
//       'pending',
//     ],
//     [
//       '2117584766',
//       'rmuat',
//       '2023-05-15T10:47:09.113Z',
//       '2023-05-15T10:57:09.113Z',
//       null,
//       null,
//       null,
//       null,
//     ],
//     [
//       '3854038959',
//       'fsrm',
//       '2023-05-15T20:54:42.664Z',
//       'pending',
//       '2023-05-15T20:54:42.664Z',
//       'pending',
//       '2023-05-15T20:54:42.664Z',
//       'pending',
//     ],
//     [
//       '4503982588',
//       'cobdchost',
//       '2023-05-15T16:39:36.857Z',
//       'pending',
//       '2023-05-15T16:39:36.857Z',
//       '2023-05-15T17:36:44.873Z',
//       '2023-05-15T16:39:36.857Z',
//       'pending',
//     ],
//     [
//       '3021090232',
//       'fsrjjjj',
//       '2023-05-15T21:10:36.260Z',
//       'pending',
//       '2023-05-15T21:10:36.260Z',
//       'pending',
//       '2023-05-15T21:10:36.260Z',
//       'pending',
//     ],
//     [
//       '8825200184',
//       '4wfrfw',
//       '2023-05-15T20:27:50.781Z',
//       'pending',
//       '2023-05-15T20:27:50.781Z',
//       'pending',
//       '2023-05-15T20:27:50.781Z',
//       'pending',
//     ],
//     [
//       '3868323960',
//       'fsrrrrr',
//       '2023-05-15T21:00:21.347Z',
//       'pending',
//       '2023-05-15T21:00:21.347Z',
//       'pending',
//       '2023-05-15T21:00:21.347Z',
//       'pending',
//     ],
//   ],
// };

export default async function () {
  return await getApiBase('history', {});
}

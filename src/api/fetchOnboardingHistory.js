// import _ from 'lodash';
import getApiBase from './getApiBase';

export default async function () {
  const data = await getApiBase('history', {});

  let dataForUi = data;

  return dataForUi;
}

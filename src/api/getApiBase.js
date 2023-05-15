import { invokeGetApi } from '@/idpUtils';

export default async function (enpoint, payload) {
  const data = await invokeGetApi(enpoint, payload);
  return data;
}

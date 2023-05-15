import { invokePostApi } from '@/idpUtils';

export default async function (enpoint, payload) {
  const data = await invokePostApi(enpoint, payload);
  return data;
}

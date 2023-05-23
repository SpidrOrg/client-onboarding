import postApiBase from '../postApiBase';
import { format } from 'date-fns';

export default async function ({
  tenantId,
  adminEmail,
  categories,
  chosenModel,
  frequency,
  host,
  name,
  phone,
  selectedDataSources,
  selectedClientDataSources,
  startDate,
  endDate,
}) {
  const startDateM = format(
    new Date(startDate.year, startDate.month),
    'yyyy-MM'
  );
  const endDateM = format(new Date(endDate.year, endDate.month), 'yyyy-MM');

  const payload = {
    adminEmail,
    categories,
    chosenModel,
    frequency,
    host,
    name,
    phone,
    selectedDataSources,
    selectedClientDataSources,
    startDate: startDateM,
    endDate: endDateM,
  };

  if (tenantId) {
    payload.tenantId = tenantId;
  }

  return await postApiBase('new', payload);
}

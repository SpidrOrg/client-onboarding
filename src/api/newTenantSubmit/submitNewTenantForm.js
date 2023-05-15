import postApiBase from '../postApiBase';
import {format} from "date-fns"

export default async function ({
   adminEmail,
   categories,
   chosenModel,
   frequency,
   host,
   name,
   phone,
   selectedDataSources,
   startDate,
   endDate
}) {
  const startDateM = format(new Date(startDate.year, startDate.month), 'yyyy-MM');
  const endDateM = format(new Date(endDate.year, endDate.month), 'yyyy-MM')

  const data = await postApiBase('new1', {
    adminEmail,
    categories,
    chosenModel,
    frequency,
    host,
    name,
    phone,
    selectedDataSources,
    startDate: startDateM,
    endDate: endDateM
  });

  return data;
}

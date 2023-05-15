import postApiBase from '../postApiBase';

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
  const data = await postApiBase('new1', {
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
  });

  return data;
}

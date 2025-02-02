export const useSaveCsv = () => {
  const getHeaders = (data: Record<string, string>[]) => {
    let biggestDataItem = data[0];
    data.forEach((item) => {
      if (Object.keys(item) > Object.keys(biggestDataItem)) {
        biggestDataItem = item;
      }
    });

    return Object.keys(biggestDataItem);
  };

  const saveCsv = (data: Record<string, string>[], filename: string) => {
    const headers = getHeaders(data);
    const csvString = [
      headers,
      ...data.map((item) => Object.values(item)), // Map your data fields accordingly
    ]
      .map((row) => row.join(','))
      .join('\n');

    // Create a Blob from the CSV string
    const blob = new Blob([csvString], { type: 'text/csv' });

    // Generate a download link and initiate the download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return saveCsv;
};

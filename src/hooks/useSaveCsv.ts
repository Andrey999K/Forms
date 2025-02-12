import { useCallback } from 'react';

export const useSaveCsv = () => {
  const getHeaders = (data: Record<string, string>[]) => {
    if (data.length === 0) return [];

    let biggestDataItem = data[0];
    data.forEach((item) => {
      if (Object.keys(item).length > Object.keys(biggestDataItem).length) {
        biggestDataItem = item;
      }
    });

    return Object.keys(biggestDataItem);
  };

  const saveCsv = useCallback((data: Record<string, string>[], filename: string) => {
    const headers = getHeaders(data);

    const escapeField = (field: string) => {
      const stringField = String(field);
      if (stringField.includes(',') || stringField.includes('"') || stringField.includes('\n')) {
        return `"${stringField.replace(/"/g, '""')}"`;
      }
      return stringField;
    };

    const csvRows = [
      headers.map(escapeField),
      ...data.map((item) => headers.map((header) => escapeField(item[header] || ''))),
    ];

    const csvString = csvRows.map((row) => row.join(',')).join('\n');

    const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
    const csvData = new Uint8Array([...bom, ...new TextEncoder().encode(csvString)]);

    const blob = new Blob([csvData], {
      type: 'text/csv;charset=utf-8',
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'download.csv';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return saveCsv;
};

import axios from 'axios';
import * as cheerio from 'cheerio';

/**
 * Scrapes data from the Google Spreadsheet and processes it.
 * @returns {Promise<{ headers: string[], rows: Array<Object> }>} Cleaned data with headers and rows.
 */
const scrapeDataFromSpreadsheet = async () => {
  try {
    const url = 'https://docs.google.com/spreadsheets/d/1l2JK2aof5zgaexIJ7L_TDywnIPKM7Cd_4wZnXXcAih4/gviz/tq?tqx=out:html&tq&gid=1';
    const { data: html } = await axios.get(url);

    const $ = cheerio.load(html);
    const table = $('table').first();

    const rows = [];
    table.find('tr').each((_, tr) => {
      const row = [];
      $(tr)
        .find('td')
        .each((_, td) => {
          row.push($(td).text());
        });
      rows.push(row);
    });

    let headers = [];
    const cleanedRows = [];
    let spot = 0;

    for (const row of rows) {
      if (!spot) {
        headers = row.slice(0, 6); // Extract first 6 columns as headers
        spot++;
        continue;
      }
      const cleanedRow = row.slice(0, 7).map((cell) =>
        cell.replace(/\xa0/g, '').replace('YES', true)
      );
      const rowObject = headers.reduce((obj, header, index) => {
        if (header === 'LINK') {
          const linkText = cleanedRow[index] || '';
          obj[header] = linkText
            // ? `<a href="${linkText}" target="_blank" rel="noopener noreferrer">${linkText}</a>`
            ? `${linkText}`
            : '';
        } else {
          obj[header] = cleanedRow[index] || '';
        }
        return obj;
      }, {});
      cleanedRows.push(rowObject);
    }

    return { headers, rows: cleanedRows };
  } catch (error) {
    console.error('Error fetching or processing spreadsheet:', error);
    return { headers: [], rows: [] };
  }
};

export default scrapeDataFromSpreadsheet;

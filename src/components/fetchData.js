// import axios from 'axios';
// import * as cheerio from 'cheerio';

// const scrapeDataFromSpreadsheet = async () => {
//   try {
//     const url = 'https://docs.google.com/spreadsheets/d/1l2JK2aof5zgaexIJ7L_TDywnIPKM7Cd_4wZnXXcAih4/gviz/tq?tqx=out:html&tq&gid=1';
//     const { data: html } = await axios.get(url);

//     const $ = cheerio.load(html);
//     const table = $('table').first();

//     const rows = [];
//     table.find('tr').each((_, tr) => {
//       const row = [];
//       $(tr)
//         .find('td')
//         .each((_, td) => {
//           row.push($(td).text());
//         });
//       rows.push(row);
//     });

//     let headers = [];
//     const cleanedRows = [];
//     let spot = 0;

//     for (const row of rows) {
//       if (!spot) {
//         headers = row.slice(0, 6);
//         spot++;
//         continue;
//       }
//       const cleanedRow = row.slice(0, 7).map((cell) =>
//         cell.replace(/\xa0/g, '').replace('YES', true)
//       );
//       const rowObject = headers.reduce((obj, header, index) => {
//         if (header === 'LINK') {
//           const linkText = cleanedRow[index] || '';
//           obj[header] = linkText
//             ? `${linkText}`
//             : '';
//         } else {
//           obj[header] = cleanedRow[index] || '';
//         }
//         return obj;
//       }, {});
//       cleanedRows.push(rowObject);
//     }

//     return { headers, rows: cleanedRows };
//   } catch (error) {
//     console.error('Error fetching or processing spreadsheet:', error);
//     return { headers: [], rows: [] };
//   }
// };

// export default scrapeDataFromSpreadsheet;
/////////////////////////////////////////////
import axios from 'axios';
require('dotenv').config();

const fetchSpreadsheetData = async () => {
  const apiKey = process.env.SHEETS_API;
  const spreadsheetId = '1l2JK2aof5zgaexIJ7L_TDywnIPKM7Cd_4wZnXXcAih4';
  const range = 'Sheet1!A1:Z1000'; // Adjust the range as needed

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data.values;

    if (!data || data.length === 0) {
      throw new Error('No data found in the spreadsheet.');
    }

    const headers = data[0];
    const rows = data.slice(1).map((row) => {
      const rowObject = {};
      headers.forEach((header, index) => {
        let cellValue = row[index] || '';
        if (header === 'HIT?') {
          cellValue = cellValue === 'YES';
        } else if (header === 'LINK') {
          cellValue = cellValue ? `<a href="${cellValue}">${cellValue}</a>` : '';
        }
        rowObject[header] = cellValue;
      });
      return rowObject;
    });

    return { headers, rows };
  } catch (error) {
    console.error('Error fetching or processing spreadsheet:', error);
    return { headers: [], rows: [] };
  }
};

export default fetchSpreadsheetData;


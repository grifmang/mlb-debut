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
//       const cleanedRow = row.slice(0, 5).map((cell) =>
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

const fetchSpreadsheetData = async () => {
  const apiKey = process.env.REACT_APP_SHEETS_API;
  const spreadsheetId = '1l2JK2aof5zgaexIJ7L_TDywnIPKM7Cd_4wZnXXcAih4';
  const range = 'Sheet1!A1:Z1000'; // Adjust the range as needed

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data.values;

    if (!data || data.length === 0) {
      throw new Error('No data found in the spreadsheet.');
    }

    const headers = data[0].slice(0, 5);
    console.log(data)
    console.log(data.slice(1))
    const rows = data.slice(1).map((row) => {
      const rowObject = {};
      headers.forEach((header, index) => {
        let cellValue = row[index] || '';
        if (header === 'HIT?') {
          cellValue = cellValue === 'YES';
        } else if (header === 'LINK') {
          // cellValue = cellValue ? `<a href="${cellValue}">${cellValue}</a>` : '';
          const cleanedRow = row.slice(0, 5).map((cell) =>
            cell.replace(/\xa0/g, '').replace('YES', true)
          );

          if (header === 'LINK') {
            const linkText = cleanedRow[index] || '';
            row[header] = linkText
              ? `${linkText}`
              : '';
          } else {
            row[header] = cleanedRow[index] || '';
          }        
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
//////////////////////////////////////
// Not working
// import axios from 'axios';

// const fetchSpreadsheetData = async () => {
//   const apiKey = process.env.REACT_APP_SHEETS_API;
//   const spreadsheetId = '1l2JK2aof5zgaexIJ7L_TDywnIPKM7Cd_4wZnXXcAih4';
//   const range = 'Sheet1!A1:Z1000'; // Adjust the range as needed

//   const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

//   try {
//     const response = await axios.get(url);
//     const data = response.data.values;

//     if (!data || data.length === 0) {
//       throw new Error('No data found in the spreadsheet.');
//     }

//     // Define only the required columns
//     const requiredColumns = ['Debut Patch Checklist', 'Hit', 'Date Hit', 'Where?', 'Link'];

//     // Find indexes of the required columns in the headers row
//     const headers = data[0];
//     const columnIndexes = requiredColumns.map(col => headers.indexOf(col)).filter(index => index !== -1);

//     if (columnIndexes.length !== requiredColumns.length) {
//       throw new Error('One or more required columns are missing in the spreadsheet.');
//     }

//     // Extract only the required columns
//     const filteredRows = data.slice(1).map(row => {
//       const rowObject = {};
//       requiredColumns.forEach((col, i) => {
//         let cellValue = row[columnIndexes[i]] || '';

//         if (col === 'Hit') {
//           cellValue = cellValue === 'YES';
//         } else if (col === 'Link') {
//           cellValue = cellValue ? `<a href="${cellValue}">${cellValue}</a>` : '';
//         }

//         rowObject[col] = cellValue;
//       });

//       return rowObject;
//     });

//     return { headers: requiredColumns, rows: filteredRows };
//   } catch (error) {
//     console.error('Error fetching or processing spreadsheet:', error);
//     return { headers: [], rows: [] };
//   }
// };

// export default fetchSpreadsheetData;


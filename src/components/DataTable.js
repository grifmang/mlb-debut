// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import scrapeDataFromSpreadsheet from './fetchData'; // Import the script
// import './DataTable.css'; // Import CSS

// const DataTable = () => {
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     const fetchAndSetData = async () => {
//       const { headers, rows } = await scrapeDataFromSpreadsheet();

//       // Dynamically generate columns from headers
//       const dynamicColumns = headers.map((header) => ({
//         field: header,
//         headerName: header,
//         headerClassName: 'header-color',
//         width: 150,
//         flex: 1,
//         ...(header === 'LINK' && {
//           renderCell: (params) => (
//             <a
//               href={params.value}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{ textDecoration: 'none', color: 'blue' }}
//             >
//               {params.value}
//             </a>
//           ),
//         }),
//       }));

//       setColumns(dynamicColumns);
//       setRows(
//         rows.map((row, index) => ({
//           id: index, // Add unique `id` for each row
//           ...row,
//         }))
//       );
//     };

//     fetchAndSetData();
//   }, []);

//   return (
//     <div className="data-table-container">
//       <h1 className="data-table-header">
//         <img 
//           src="/patch.jpg" 
//           alt="MLB Debut Patch Logo" 
//           style={{ height: '50px', marginRight: '10px' }}
//         />
//         2024 MLB Debut Patch Card Hit List
//       </h1>
//       <div style={{ height: '80vh', width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           getRowClassName={(params) =>
//             params.row['HIT?'] ? 'row-hit' : '' 
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default DataTable;

////////////////////////////////////////////////////
import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import scrapeDataFromSpreadsheet from './fetchData'; // Import the script
import './DataTable.css'; // Import CSS

const DataTable = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const { headers, rows } = await scrapeDataFromSpreadsheet();

      // Dynamically generate columns from headers
      const dynamicColumns = headers.map((header) => {
        // Calculate a reasonable column width based on data
        const sampleData = rows.map((row) => String(row[header] || ''));
        const maxLength = Math.max(header.length, ...sampleData.map((item) => item.length));
        const calculatedWidth = Math.min(Math.max(maxLength * 10, 145), 475); // Adjust min/max as needed

        return {
          field: header,
          headerName: header,
          headerClassName: 'header-color',
          width: calculatedWidth, 
          flex: header === 'LINK' || header === 'DEBUT PATCH CHECKLIST' ? 2 : 1,
          ...(header === 'LINK' && {
            renderCell: (params) => (
              <a
                href={params.value}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', color: 'blue' }}
              >
                {params.value}
              </a>
            ),
          }),
        };
      });

      setColumns(dynamicColumns);
      setRows(
        rows.map((row, index) => ({
          id: index, // Add unique `id` for each row
          ...row,
        }))
      );
    };

    fetchAndSetData();
  }, []);

  return (
    <div className="data-table-container">
      <h1 className="data-table-header">
        <img 
          src="/patch.jpg" 
          alt="MLB Debut Patch Logo" 
          style={{ height: '50px', marginRight: '10px' }}
        />
        2024 MLB Debut Patch Card Hit List
      </h1>
      <div style={{ height: '80vh', width: '100%', display: 'flex', flexDirection: 'column'  }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.row['HIT?'] ? 'row-hit' : '' 
          }
          disableColumnMenu
        />
      </div>
    </div>
  );
};

export default DataTable;


////////////////////////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import scrapeDataFromSpreadsheet from './fetchData'; // Import the script
// import './DataTable.css'; // Import CSS

// const DataTable = () => {
//   const [columns, setColumns] = useState([]);
//   const [rows, setRows] = useState([]);

//   useEffect(() => {
//     const fetchAndSetData = async () => {
//       const { headers, rows } = await scrapeDataFromSpreadsheet();

//       // Dynamically generate columns from headers
//       const dynamicColumns = headers.map((header) => {
//         const sampleData = rows.map((row) => String(row[header] || ''));
//         const maxLength = Math.max(
//           header.length,
//           ...sampleData.map((item) => item.length)
//         );

//         // Calculate width dynamically: use larger widths for longer fields like LINK
//         let calculatedWidth = maxLength * 10; // Base width on character count
//         if (header === 'LINK') {
//           calculatedWidth = Math.max(calculatedWidth, 300); // Ensure LINK has a minimum larger width
//         } else {
//           calculatedWidth = Math.min(calculatedWidth, 200); // Cap smaller columns to a reasonable size
//         }

//         return {
//           field: header,
//           headerName: header,
//           headerClassName: 'header-color',
//           width: calculatedWidth, // Assign calculated width
//           flex: header === 'LINK' || header === 'DEBUT PATCH CHECKLIST' ? 2 : 1, // Give LINK higher flex for better responsiveness
//           ...(header === 'LINK' && {
//             renderCell: (params) => (
//               <a
//                 href={params.value}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 style={{ textDecoration: 'none', color: 'blue' }}
//               >
//                 {params.value}
//               </a>
//             ),
//           }),
//         };
//       });

//       setColumns(dynamicColumns);
//       setRows(
//         rows.map((row, index) => ({
//           id: index, // Add unique `id` for each row
//           ...row,
//         }))
//       );
//     };

//     fetchAndSetData();
//   }, []);

//   return (
//     <div className="data-table-container">
//       <h1 className="data-table-header">
//         <img 
//           src="/patch.jpg" 
//           alt="MLB Debut Patch Logo" 
//           style={{ height: '50px', marginRight: '10px' }}
//         />
//         2024 MLB Debut Patch Card Hit List
//       </h1>
//       <div style={{ height: '80vh', width: '100%' }}>
//         <DataGrid
//           rows={rows}
//           columns={columns}
//           getRowClassName={(params) =>
//             params.row['HIT?'] ? 'row-hit' : '' 
//           }
//           autoHeight
//           disableColumnMenu
//         />
//       </div>
//     </div>
//   );
// };

// export default DataTable;

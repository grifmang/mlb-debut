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
      const dynamicColumns = headers.map((header) => ({
        field: header,
        headerName: header,
        width: 150,
      }));

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
      {/* <h1 className="data-table-header"><img src='public\patch.jpg' alt='MLB Debut Patch Logo' />2024 MLB Debut Patch Card hit list</h1> */}
      <h1 className="data-table-header header-color">
        <img 
          src="/patch.jpg" 
          alt="MLB Debut Patch Logo" 
          style={{ height: '50px', marginRight: '10px' }}
        />
        2024 MLB Debut Patch Card Hit List
      </h1>
      <div style={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          getRowClassName={(params) =>
            params.row['HIT?'] ? 'row-hit' : '' // Apply styling based on the "HIT?" column
          }
        />
      </div>
    </div>
  );
};

export default DataTable;

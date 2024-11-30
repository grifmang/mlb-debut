import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import scrapeDataFromSpreadsheet from './fetchData';
import './DataTable.css';

const DataTable = () => {
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      const { headers, rows } = await scrapeDataFromSpreadsheet();

      const dynamicColumns = headers.map((header) => {
        const sampleData = rows.map((row) => String(row[header] || ''));
        const maxLength = Math.max(header.length, ...sampleData.map((item) => item.length));
        const calculatedWidth = Math.min(Math.max(maxLength * 10, 145), 475);

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
          id: index,
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
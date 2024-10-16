import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLalinsData } from '../../store/lalin';
import * as XLSX from 'xlsx';

const columns = [
  { name: 'No.', selector: row => row.no, sortable: false },
  { name: 'Ruas', selector: row => row.IdCabang, sortable: true },
  { name: 'Gerbang', selector: row => row.IdGerbang, sortable: false },
  { name: 'Gardu', selector: row => row.IdGardu, sortable: false },
  { name: 'Metode Pembayaran', selector: row => row.metodePembayaran, sortable: false },
  { name: 'Gol I', selector: row => row.golI, sortable: false },
  { name: 'Gol II', selector: row => row.golII, sortable: false },
  { name: 'Gol III', selector: row => row.golIII, sortable: false },
  { name: 'Gol IV', selector: row => row.golIV, sortable: false },
  { name: 'Gol V', selector: row => row.golV, sortable: false },
  { name: 'Total Lalin', selector: row => row.totalLalin, sortable: false },
];

const LalinTableComponent = () => {
  const dispatch = useDispatch();
  const { data = [], loading, error } = useSelector((state) => state.lalins);
  const [filter, setFilter] = useState('total');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchLalinsData());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const groupedData = data.rows.rows.reduce((acc, item) => {
    const dateKey = new Date(item.Tanggal).toISOString().split('T')[0];
    const key = `${dateKey}-${item.IdCabang}-${item.IdGerbang}-${item.IdGardu}`;
    
    if (!acc[key]) {
      acc[key] = {
        IdCabang: item.IdCabang,
        IdGerbang: item.IdGerbang,
        IdGardu: item.IdGardu,
        Tanggal: item.Tanggal,
        golI: 0,
        golII: 0,
        golIII: 0,
        golIV: 0,
        golV: 0,
        totalLalin: 0,
        Tunai: item.Tunai,
        eMandiri: item.eMandiri,
        eBri: item.eBri,
        eBni: item.eBni,
        eBca: item.eBca,
        eDKI: item.eDKI,
        eMega: item.eMega,
        eNobu: item.eNobu,
        eFlo: item.eFlo,
      };
    }

    if (item.Golongan === 1) acc[key].golI += 1;
    if (item.Golongan === 2) acc[key].golII += 1;
    if (item.Golongan === 3) acc[key].golIII += 1;
    if (item.Golongan === 4) acc[key].golIV += 1;
    if (item.Golongan === 5) acc[key].golV += 1;

    acc[key].totalLalin = acc[key].golI + acc[key].golII + acc[key].golIII + acc[key].golIV + acc[key].golV;

    return acc;
  }, {});

  const getMetodePembayaran = (item) => {
    switch (filter) {
      case 'tunai':
        return item.Tunai > 0 ? 'Tunai' : '-';
      case 'e-money':
        return (item.eMandiri > 0 || item.eBri > 0 || item.eBni > 0 || item.eBca > 0 || item.eDKI > 0 || item.eMega > 0 || item.eNobu > 0) ? 'E-Money' : '-';
      case 'flo':
        return item.eFlo > 0 ? 'Flo' : '-';
      case 'total-e-toll':
        return (item.eFlo > 0 || item.Tunai > 0 || item.eMandiri > 0 || item.eBri > 0 || item.eBni > 0 || item.eBca > 0) ? 'E-Toll + Tunai + Flo' : '-';
      case 'total':
      default:
        return 'Keseluruhan';
    }
  };

  const formattedData = Object.values(groupedData).map((item, index) => ({
    ...item,
    no: index + 1,
    metodePembayaran: getMetodePembayaran(item),
  }));

  const filteredData = formattedData.filter(item => {
    switch (filter) {
      case 'tunai':
        return item.Tunai > 0;
      case 'e-money':
        return item.eMandiri > 0 || item.eBri > 0 || item.eBni > 0 || item.eBca > 0 || item.eDKI > 0 || item.eMega > 0 || item.eNobu > 0;
      case 'flo':
        return item.eFlo > 0;
      case 'total-e-toll':
        return item.eFlo > 0 || item.Tunai > 0 || item.eMandiri > 0 || item.eBri > 0 || item.eBni > 0 || item.eBca > 0;
      case 'total':
      default:
        return true;
    }
  }).filter(item => {
    return (
      item.IdCabang.toString().includes(searchTerm) || 
      item.IdGerbang.toString().includes(searchTerm) ||
      item.IdGardu.toString().includes(searchTerm) ||
      item.metodePembayaran.includes(searchTerm)
    );
  });

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data Lalin');
    XLSX.writeFile(workbook, 'data_lalin.xlsx');
  };

  return (
    <div>
      <h3 className='py-5'>Data Lalin</h3>

      <div className="mb-4 flex justify-end">
        <button onClick={exportToExcel} className="px-4 py-2 rounded bg-green-500 text-white">
          Export
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-4">
        <button onClick={() => setFilter('total')} className={`px-4 py-2 rounded mr-2 ${filter === 'total' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Total Keseluruhan
        </button>
        <button onClick={() => setFilter('tunai')} className={`px-4 py-2 rounded mr-2 ${filter === 'tunai' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Total Tunai
        </button>
        <button onClick={() => setFilter('e-money')} className={`px-4 py-2 rounded mr-2 ${filter === 'e-money' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Total E-Money
        </button>
        <button onClick={() => setFilter('flo')} className={`px-4 py-2 rounded mr-2 ${filter === 'flo' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Total Flo
        </button>
        <button onClick={() => setFilter('total-e-toll')} className={`px-4 py-2 rounded ${filter === 'total-e-toll' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
          Total E-Toll + Tunai + Flo
        </button>
      </div>

      {/* Pencarian Section */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded"
        />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        highlightOnHover
      />
    </div>
  );
};

export default LalinTableComponent;

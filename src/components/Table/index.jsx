import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { deleteGerbang, updateGerbang, createGerbang, fetchGerbangData } from '../../store/gerbang';
import Modal from 'react-modal';

// Set elemen root untuk modal
Modal.setAppElement('#root');

const DataTableComponent = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.gerbang);
  const [filterText, setFilterText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [newGerbang, setNewGerbang] = useState({ id: '', IdCabang: '', NamaGerbang: '', NamaCabang: '' });
  const [editGerbang, setEditGerbang] = useState({ id: '', IdCabang: '', NamaGerbang: '', NamaCabang: '' });

  const columns = [
    { name: 'No', selector: row => row.no, sortable: false },
    { name: 'Ruas', selector: row => row.NamaCabang, sortable: true },
    { name: 'Gerbang', selector: row => row.NamaGerbang, sortable: false },
    {
      name: 'Aksi',
      cell: row => (
        <>
          <button
            className='bg-red-500 text-white px-2 py-1 rounded mr-2'
            onClick={() => handleDelete(row)}
          >
            Hapus
          </button>
          <button
            className='bg-blue-500 text-white px-2 py-1 rounded'
            onClick={() => handleEdit(row)}
          >
            Edit
          </button>
        </>
      ),
      ignoreRowClick: true,
      button: true,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data || data.length === 0) return null;

  const filteredData = data.filter(item =>
    (item.NamaGerbang && item.NamaGerbang.toLowerCase().includes(filterText.toLowerCase()) || item.NamaCabang && item.NamaCabang.toLowerCase().includes(filterText.toLowerCase()))
  );

  const formattedData = filteredData.map((item, index) => ({
    ...item,
    no: index + 1,
  }));

  const handleDelete = (row) => {
    const { id, IdCabang } = row;
    dispatch(deleteGerbang({ id, idCabang: IdCabang }));
  };

  const handleEdit = (row) => {
    setEditGerbang(row); // Set the selected gerbang to edit
    setIsEditModalOpen(true); // Open the edit modal
  };

  const handleSaveEdit = () => {
    dispatch(updateGerbang(editGerbang));
    dispatch(fetchGerbangData());
    setIsEditModalOpen(false);
  };

  const handleCreate = () => {
    dispatch(createGerbang(newGerbang));
    setNewGerbang({ id: '', IdCabang: '', NamaGerbang: '', NamaCabang: '' });
    setIsModalOpen(false);
    dispatch(fetchGerbangData());
  };

  return (
    <div>
      <h3 className='py-5'>Master Data Gerbang</h3>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search"
          value={filterText}
          onChange={(e) => setFilterText(e.target.value)}
          className="mb-2 p-2 rounded border border-gray-300 flex-1 mr-2 max-w-[250px]"
        />
        <button 
          className='bg-green-500 text-white px-4 py-2 rounded'
          onClick={() => setIsModalOpen(true)}
        >
          Tambah Gerbang
        </button>
      </div>

      <DataTable
        columns={columns}
        data={formattedData}
        pagination
        highlightOnHover
      />

      {/* Modal untuk menambah gerbang */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Tambah Gerbang"
        className="bg-white rounded shadow-lg p-6 w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-lg font-semibold mb-4">Tambah Gerbang Baru</h2>
        {/* Form fields for new gerbang */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">ID Gerbang:</label>
          <input
            type="number"
            value={newGerbang.id}
            onChange={(e) => setNewGerbang({ ...newGerbang, id: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Id Cabang:</label>
          <input
            type="number"
            value={newGerbang.IdCabang}
            onChange={(e) => setNewGerbang({ ...newGerbang, IdCabang: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Gerbang:</label>
          <input
            type="text"
            value={newGerbang.NamaGerbang}
            onChange={(e) => setNewGerbang({ ...newGerbang, NamaGerbang: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Cabang:</label>
          <input
            type="text"
            value={newGerbang.NamaCabang}
            onChange={(e) => setNewGerbang({ ...newGerbang, NamaCabang: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleCreate} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Simpan</button>
          <button onClick={() => setIsModalOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
        </div>
      </Modal>

      {/* Modal untuk edit gerbang */}
      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setIsEditModalOpen(false)}
        contentLabel="Edit Gerbang"
        className="bg-white rounded shadow-lg p-6 w-1/3 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <h2 className="text-lg font-semibold mb-4">Edit Gerbang</h2>
        {/* Form fields for editing gerbang */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">ID Gerbang:</label>
          <input
            type="number"
            value={editGerbang.id}
            onChange={(e) => setEditGerbang({ ...editGerbang, id: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
            readOnly
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Id Cabang:</label>
          <input
            type="number"
            value={editGerbang.IdCabang}
            onChange={(e) => setEditGerbang({ ...editGerbang, IdCabang: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Gerbang:</label>
          <input
            type="text"
            value={editGerbang.NamaGerbang}
            onChange={(e) => setEditGerbang({ ...editGerbang, NamaGerbang: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nama Cabang:</label>
          <input
            type="text"
            value={editGerbang.NamaCabang}
            onChange={(e) => setEditGerbang({ ...editGerbang, NamaCabang: e.target.value })}
            className="mt-1 p-2 border border-gray-300 rounded w-full"
          />
        </div>
        <div className="flex justify-end">
          <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Simpan</button>
          <button onClick={() => setIsEditModalOpen(false)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded">Batal</button>
        </div>
      </Modal>
    </div>
  );
};

export default DataTableComponent;

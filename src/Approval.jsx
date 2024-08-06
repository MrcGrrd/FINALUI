import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Approval = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [remarksError, setRemarksError] = useState('');
  const [activeTab, setActiveTab] = useState('TO REVIEW');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://192.168.1.5/api/approval');
        setOrders(response.data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleApproveClick = () => {
    setShowConfirmation(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleConfirmApprove = () => {
    setOrders(orders.map(order =>
      order === selectedOrder ? { ...order, approvalStatus: 'Approved' } : order
    ));
    setShowConfirmation(false);
    setSelectedOrder(null);

    Swal.fire({
      icon: 'success',
      title: 'Approved!',
      text: 'The request has been successfully approved.',
    });
  };

  const handleConfirmReject = () => {
    if (remarks.trim() === '') {
      setRemarksError('Remarks are required.');
      return;
    }

    setOrders(orders.map(order =>
      order === selectedOrder ? { ...order, approvalStatus: 'Rejected' } : order
    ));
    setShowRejectModal(false);
    setSelectedOrder(null);
    setRemarks('');

    Swal.fire({
      icon: 'error',
      title: 'Rejected!',
      text: 'The request has been rejected.',
    });
  };

  const handleCancelApprove = () => {
    setShowConfirmation(false);
  };

  const handleCancelReject = () => {
    setShowRejectModal(false);
    setRemarksError('');
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleView = (order) => {
    setSelectedOrder(order);
  };

  const handleClose = () => {
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter(order => {
    if (activeTab === 'TO REVIEW') {
      return order.pr_stat === 'O'; // Adjust this logic based on your approvalStatus or pr_stat
    }
    return true;
  }).filter(order => 
    order.pr_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.act_desc.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.pr_date.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto h-screen p-4 bg-white overflow-auto" style={{ maxWidth: '1200px', maxHeight: '800px' }}>
      {/* Tabs */}
      <div className="flex space-x-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${activeTab === 'TO REVIEW' ? 'bg-gray-500 text-white' : 'bg-white text-blue-400'}`}
          onClick={() => setActiveTab('TO REVIEW')}
        >
          TO REVIEW
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'APPROVED' ? 'bg-gray-500 text-white' : 'bg-white text-blue-400'}`}
          onClick={() => setActiveTab('APPROVED')}
        >
          APPROVED
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'REJECTED' ? 'bg-gray-500 text-white' : 'bg-white text-blue-400'}`}
          onClick={() => setActiveTab('REJECTED')}
        >
          REJECTED
        </button>
      </div>
      <div className="mb-4 flex justify-end">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search" 
            className="p-2 pr-10 border bg-white text-black border-gray-300 rounded" 
            value={searchTerm} 
            onChange={handleSearch} 
          />
          <FontAwesomeIcon 
            icon={faSearch} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500" 
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 text-black">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b">Document Number</th>
              <th className="px-4 py-2 border-b">Document Date</th>
              <th className="px-4 py-2 border-b">Responsibility Center</th>
              <th className="px-4 py-2 border-b">Branch</th>
              <th className="px-4 py-2 border-b">Remarks</th>
              <th className="px-4 py-2 border-b">status</th>
              <th className="px-4 py-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border-b">{order.pr_no}</td>
                <td className="px-4 py-2 border-b">{new Date(order.pr_date).toLocaleDateString()}</td>
                <td className="px-4 py-2 border-b">{order.act_desc}</td>
                <td className="px-4 py-2 border-b">{order.branchcode}</td>
                <td className="px-4 py-2 border-b">{order.remarks}</td>
                <td className="px-4 py-2 border-b">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2" onClick={() => handleView(order)}>View</button>
                  {order.approvalStatus === 'Approved' && <span className="ml-2 text-green-500">Approved</span>}
                  {order.approvalStatus === 'Rejected' && <span className="ml-2 text-red-500">Rejected</span>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black text-black bg-opacity-50">
          <div className="bg-white p-10 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-bold mb-4">Approval Request Details</h2>
            <hr />
            <br />
            <p className='mb-1'><strong>Document Number :</strong> {selectedOrder.pr_no}</p>
            <p className='mb-1'><strong>Document Date :</strong> {new Date(selectedOrder.pr_date).toLocaleDateString()}</p>
            <p className='mb-1'><strong>Responsibility Center :</strong> {selectedOrder.act_desc}</p>
            <p className='mb-1'><strong>Branch :</strong> {selectedOrder.branchcode}</p>
            <p className='mb-1'><strong>Remarks :</strong> {selectedOrder.remarks}</p>
            <br />
            <div className="mt-4 p-2 bg-gray-200 rounded border-gray-500">
              <p className="text-gray-600 text-center">
                <FontAwesomeIcon icon={faInfoCircle} className="text-gray-600 mr-1 text-md" />
                Make sure to check the Form thoroughly before finalizing. This action cannot be undone.
              </p>
            </div>
            <br />
            <div className="flex items-center justify-center mb-4">
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleApproveClick}>✓ Approve</button>
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleRejectClick}>✗ Disapprove</button>
            </div>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={handleClose}>Close</button>
          </div>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to approve this document?</h3>
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleCancelApprove}>No</button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleConfirmApprove}>Yes</button>
            </div>
          </div>
        </div>
      )}

      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold text-gray-800">Are you sure you want to reject this document?</h3>
            <textarea
              className="w-full p-2 mt-2 border rounded bg-white text-black"
              placeholder="Enter remarks*"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
            {remarksError && <p className="text-red-500 text-sm mt-2">{remarksError}</p>}
            <div className="flex justify-end mt-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleCancelReject}>No</button>
              <button
                className={`bg-green-500 text-white px-4 py-2 rounded-lg mx-2 ${remarks.trim() === '' && 'opacity-50 cursor-not-allowed'}`}
                onClick={handleConfirmReject}
                disabled={remarks.trim() === ''}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Approval;

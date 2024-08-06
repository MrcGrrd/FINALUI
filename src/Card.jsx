import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

function Card() {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [remarksError, setRemarksError] = useState('');

  const handleApproveClick = () => {
    setShowConfirmation(true);
  };

  const handleRejectClick = () => {
    setShowRejectModal(true);
  };

  const handleConfirmApprove = () => {
    // Handle the approval logic here
    setShowConfirmation(false);
  };

  const handleCancelApprove = () => {
    setShowConfirmation(false);
  };

  const handleConfirmReject = () => {
    if (remarks.trim() === '') {
      setRemarksError('Remarks are required.');
      return;
    }

    // Handle the rejection logic here, possibly including the remarks
    console.log('Document rejected with remarks:', remarks);
    setShowRejectModal(false);
  };

  const handleCancelReject = () => {
    setShowRejectModal(false);
    setRemarksError('');
  };

  return (
    <div className="flex items-center justify-center bg-gray-200 rounded">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800">Approval Request</h2>
        <br />
        <hr />
        <br />
        <span className="bg-blue-100 text-blue-500 font-semibold px-2 py-1 rounded-full text-xs">
          Pending
        </span>
        <span className="bg-red-500 text-white font-semibold px-2 py-1 rounded-full text-xs">
          Urgent
        </span>
        <div className="mt-4">
          <div className="flex justify-between">
            <span className="text-gray-600">Document Type :</span>
            <span className="text-gray-900">Purchase Order</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Document Number :</span>
            <span className="text-gray-900">PO-0001</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Branch :</span>
            <span className="text-gray-900">Head Office</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">User :</span>
            <span className="text-gray-900">NAYSA Admin</span>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-600">Remarks :</span>
            <span className="text-gray-900">Supplies order</span>
          </div>
          <br />
          <div className="mt-4 p-2 bg-white rounded border-gray-500">
            <p className="text-gray-600 text-center">
              <FontAwesomeIcon icon={faInfoCircle} className="text-gray-600 mr-1" />
              Please review the Purchase Order Form before finalizing.
            </p>
            <p className="text-gray-600 text-center">This action cannot be undone.</p>
          </div>
          <br />
          <div className="flex items-center justify-center mb-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleApproveClick}>✓ Approve</button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg mx-2" onClick={handleRejectClick}>✗ Reject</button>
          </div>
        </div>
      </div>

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
}

export default Card;

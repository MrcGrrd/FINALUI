import React from 'react';

const ApprovalCard = ({ patient }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 m-2 w-full sm:w-1/2 lg:w-1/3">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-lg font-semibold">{patient.name}</h2>
          <p className="text-gray-500">{patient.date}</p>
        </div>
        <div>
          {/* Badge or status */}
        </div>
      </div>
      <div>
        <p><strong>Doctor:</strong> {patient.doctor}</p>
        <p><strong>Schedule:</strong> {patient.schedule}</p>
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-red-500 text-white px-4 py-2 rounded">Decline</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Approve</button>
      </div>
    </div>
  );
};

export default ApprovalCard;

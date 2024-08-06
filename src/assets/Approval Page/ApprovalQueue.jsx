import React from 'react';
import PatientCard from './ApprovalCard';

const patients = [
  // Example data
  { name: 'Jerome Bellingham', date: '12 Dec, 2023', doctor: 'Dr. Dianne Rachel', schedule: '7 Jan, 2023 - 10:30' },
  // More patients...
];

const PatientQueue = () => {
  return (
    <div className="p-4 flex flex-wrap justify-center">
      {patients.map((patient, index) => (
        <PatientCard key={index} patient={patient} />
      ))}
    </div>
  );
};

export default PatientQueue;

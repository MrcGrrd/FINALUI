import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  var cors = require('cors');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:8000/api/submit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify(formData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Data sent successfully:", data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  App.use(cors())
  return (
    <div className="selection:bg-rose-500 selection:text-white">
      <div className="min-h-screen bg-gray flex justify-center items-center">
        <div className="p-8 flex-1">
          <div className="w-80 bg-white rounded-3xl mx-auto overflow-hidden shadow-xl">
            <div className="relative h-48 bg-blue-600 rounded-bl-4xl">
              <svg className="absolute bottom-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#ffffff" fillOpacity={1} d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,85.3C672,75,768,85,864,122.7C960,160,1056,224,1152,245.3C1248,267,1344,245,1392,234.7L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
              </svg>
            </div>
            <div className="px-10 pt-4 pb-8 bg-white rounded-tr-4xl">
              <h1 className="text-2xl font-semibold text-gray-900">SEND</h1>
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="relative">
                  <input
                    id="FirstName"
                    name="FirstName"
                    type="text"
                    className="peer h-10 w-full border-b-2 bg-white border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="FirstName"
                    value={formData.FirstName}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="FirstName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    First Name
                  </label>
                </div>
                <div className="mt-10 relative">
                  <input
                    id="LastName"
                    name="LastName"
                    type="text"
                    className="peer h-10 w-full border-b-2 bg-white border-gray-300 text-gray-900 placeholder-transparent focus:outline-none focus:border-rose-600"
                    placeholder="LastName"
                    value={formData.LastName}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="LastName"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Last Name
                  </label>
                </div>

                <input
                  type="submit"
                  value="Send Data"
                  className="mt-20 px-4 py-2 rounded bg-blue-600 hover:bg-blue-600 text-white font-semibold text-center block w-full focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-600 focus:ring-opacity-80 cursor-pointer"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

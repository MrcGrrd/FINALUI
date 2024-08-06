import React, { useState } from 'react';

const Table = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="container mx-auto p-12 flex flex-wrap">
      <div className="w-full md:w-11/12 md:pr-8">
        <div className="section border border-gray-300 p-6 mb-6">
          <h1 className="text-xl font-bold mb-4">Settings - Credential - SEND</h1>
          <form id="settings" action="/save-settings" method="POST">
            <div className="section mb-6">
              <div className="section-title font-semibold mb-4">Information</div>
              <div className="form-group mb-4 flex items-center">
                <label className="block w-40" htmlFor="name">NAME</label>
                <input className="flex-1 p-2 border" type="text" id="name" name="name" value="NAYSA Solutions, Inc." disabled />
              </div>
              <div className="form-group mb-4 flex items-center">
                <label className="block w-40" htmlFor="type">TYPE</label>
                <input className="flex-1 p-2 border" type="text" id="type" name="type" value="CAS" disabled />
              </div>
              <div className="form-group mb-4 flex items-center">
                <label className="block w-40" htmlFor="user_id">USER ID</label>
                <input className="flex-1 p-2 border" type="text" id="user_id" name="user_id" />
              </div>
              <div className="form-group mb-4 flex items-center">
                <label className="block w-40" htmlFor="password">PASSWORD</label>
                <input className="flex-1 p-2 border" type={passwordVisible ? 'text' : 'password'} id="password" name="password" />
                <div className="checkbox-container flex items-center ml-4">
                  <input type="checkbox" id="togglePassword" checked={passwordVisible} onChange={() => setPasswordVisible(!passwordVisible)} />
                  <label className="ml-2" htmlFor="togglePassword">Show</label>
                </div>
              </div>
            </div>

            <div className="section mb-6">
              <div className="section-title font-semibold mb-4">Application Setting</div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="public_key">PUBLIC KEY</label>
                <textarea className="w-full p-2 border" id="public_key" name="public_key" rows="5">MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAteOyNBP4EcaR1QmlY7lJzkNr5tfbPp4a60oGEt5cB0ACAkuSDnOIT7KrHDPawtFfRqITzjo5t2UweSIzZdd2Zakh1GLI081metOYgL0QpZ/5bJ6Z1tYiuOzab4kvYBiRZvqCYMN4UYvnMTo5FthXdgHcpBE7E3wIRbJI5+ZP65uzEHL/Kwr5p1h2UWbO0zmm8FYPH5Wtk4KcX3ZHoJeOcknxKJ0DuX2nic1CGtVHbIK5XXnCv01wjSSmBzOtpHJ1OfGhe2Poc0HhJ8LBN15UkP8rDAGqJlITa/T+Anw9PMW2pXq/ceN+n8Zz84c3jvYdngfWB8LYq/jVWCj0nYWiVAfOmBYi9Jig1LE7X+MfKZd+3tAoVn2IVt7JVuHj9SKD1ZDxfUUnhzfRiPfPk6Snic9mkg7X4MI6mf57Ci6PXfERrRMXtJ7g2UrqcOfSD20ltVNd9QxnlGVZ3ALrIuGFQiwRJ9GNHoF4mdieSP7FvYWLXbKi0sMIEWRLdJc8Wk1Dg+VzhM1/wdBttZfzgMT3PSvQVx/hcHnDnxzx9Z2meHhaZP3seCms07UJFROcSOVHb+1B2/WwVJ0uCc5tXmRZkTXAtFjEw+iezF1l0VQ+Bm92U4f3V2TThRbHRL44eWroo0QF49xnhJrwMjcdGW8+ggkUb2OVEDqxcWT8HHLRqdsCAwEAAQ==</textarea>
              </div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="private_key">PRIVATE KEY</label>
                <textarea className="w-full p-2 border" id="private_key" name="private_key" rows="5"></textarea>
              </div>
            </div>

            <div className="section mb-6">
              <div className="section-title font-semibold mb-4">Endpoint</div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="auth">AUTH</label>
                <input className="w-full p-2 border" type="text" id="auth" name="auth" value="" />
              </div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="issuance">SEND</label>
                <input className="w-full p-2 border" type="text" id="issuance" name="issuance" value="" />
              </div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="inquiry">RECEIVE</label>
                <input className="w-full p-2 border" type="text" id="inquiry" name="inquiry" value="" />
              </div>
            </div>

            <div className="section mb-6">
              <div className="section-title font-semibold mb-4">URI</div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="uri_auth">AUTH</label>
                <input className="w-full p-2 border" type="text" id="uri_auth" name="uri_auth" value="" />
              </div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="uri_issuance">SEND</label>
                <input className="w-full p-2 border" type="text" id="uri_issuance" name="uri_issuance" value="" />
              </div>
              <div className="form-group mb-4">
                <label className="block mb-2" htmlFor="uri_inquiry">RECEIVE</label>
                <input className="w-full p-2 border" type="text" id="uri_inquiry" name="uri_inquiry" value="" />
              </div>
            </div>

            <div className="form-actions text-center clear-both">
              <button className="p-2 px-4 bg-blue-500 text-white mr-4" type="submit">Save</button>
              <button className="p-2 px-4 bg-gray-300" type="reset">Clear</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Table;

import React, { useState } from 'react';
import './App.css';

function App() {
  const [table, setTable] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rate: '',
    balance: '',
    deposit: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function validate() {
    const { name, email, rate, balance, deposit } = formData;

    if (name.length < 4) {
      alert('Ism kamida 4 ta belgi');
      return false;
    }

    const gmailPattern = /^[a-zA-Z0-9._%+-]{6,}@gmail\.com$/;
    if (!gmailPattern.test(email)) {
      alert("Email noto'g'ri. '@gmail.com' bilan tugashi kerak!");
      return false;
    }

    if (isNaN(rate) || rate <= 0) {
      alert('Rate 0 ga teng bo‘lmasligi kerak');
      return false;
    }

    if (isNaN(balance) || balance <= 0) {
      alert('Balance 0 ga teng bo‘lmasligi kerak');
      return false;
    }

    if (isNaN(deposit) || deposit <= 0) {
      alert('Deposit 0 ga teng bo‘lmasligi kerak');
      return false;
    }

    return true;
  }

  const handleAddCustomer = () => {
    const isValid = validate();

    if (!isValid) return;
    if (
      formData.name &&
      formData.email &&
      formData.rate &&
      formData.balance &&
      formData.deposit
    ) {
      setTable((prev) => [...prev, formData]);
      setShowModal(false);
      setFormData({ name: '', email: '', rate: '', balance: '', deposit: '' });
    } else {
      alert('Please fill in all fields!');
    }
  };

  return (
    <div>
      <div className="header">
        <div className="container header__container">
          <div className="header-logo">
            <form>
              <input
                className="header-input"
                type="text"
                placeholder="Search"
              />
            </form>
          </div>
          <div className="header-button">
            <button onClick={() => setShowModal(true)} className="btn">
              Add Customer
            </button>
          </div>
        </div>

        <table className="container">
          <thead>
            <tr className="text-[#606F89] uppercase text-[12px] font-semibold">
              <th className="w-[3%]">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Rate</th>
              <th>Balance</th>
              <th>Deposit</th>
            </tr>
          </thead>
          <tbody>
            {table.map((customer, index) => (
              <tr key={index} className="text-[14px]">
                <td className="w-[3%]">{index + 1}</td>
                <td>{customer.name}</td>
                <td>{customer.email}</td>
                <td>{customer.rate}</td>
                <td>{customer.balance}</td>
                <td>{customer.deposit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="footer">
        <div className="container footer__container">
          <h2 className="title">Active customers: {table.length}</h2>
          <div className="footer-main">
            <h4>Rows per page: 10</h4>
            <h5>
              1-{Math.min(10, table.length)} of {table.length}
            </h5>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="container modal">
          <div className="modal-content">
            <h2>Add Customer</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="rate">Rate:</label>
                <input
                  type="number"
                  id="rate"
                  name="rate"
                  value={formData.rate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance:</label>
                <input
                  type="number"
                  id="balance"
                  name="balance"
                  value={formData.balance}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="deposit">Deposit:</label>
                <input
                  type="number"
                  id="deposit"
                  name="deposit"
                  value={formData.deposit}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="modal-actions">
              <button onClick={handleAddCustomer} className="btn btn-primary">
                Save
              </button>
              <button onClick={() => setShowModal(false)} className="btn">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import getData from "../services/getData";
import {Link } from 'react-router-dom';
const CustomerForm = () => {
  const [name, setName] = useState('');
  const [customers, setCustomers] = useState([]);

  const getD = async () => {
    const response = await getData("http://localhost:8000/clients/?first_name="+name+"&last_name="+name+"&email="+name);
    setCustomers([...response]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', { name });
    getD();
  };

  return (<>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user_name">Entrer le nom : </label>
        <input
          type="text"
          id="user_name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <button type="submit">Submit</button>
       
    </form>
    <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th>Pays</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={"tr_"+index}>
              <td><Link to={"/sales/"+customer.customers_id}>{customer.last_name}</Link></td>
              <td><Link to={"/sales/"+customer.customers_id}>{customer.first_name}</Link></td>
              <td><Link to={"/sales/"+customer.customers_id}>{customer.email}</Link></td>
              <td><Link to={"/sales/"+customer.customers_id}>{customer.phone}</Link></td>
              <td><Link to={"/sales/"+customer.customers_id}>{customer.country}</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      </>
  );
};

export default CustomerForm;
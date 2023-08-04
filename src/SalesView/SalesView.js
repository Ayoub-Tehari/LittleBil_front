import React, { useState, useEffect } from 'react';
import getData from '../services/getData';
import { useParams } from 'react-router-dom';

const SalesView = (props) => {

  const { customerId } = useParams();
  const [sales, setSales] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const getD = async () => {
    setIsLoading(true);
    const response = await getData(
      `http://localhost:8000/sales/?page=${page}&customer_id=${customerId}`
    );
    if (response.length === 0) {
      // No more data to load
      setHasMore(false);
    } else {
      setSales((prevSales) => [...prevSales, ...response]);
      setPage((prevPage) => prevPage + 1);
    }
    setIsLoading(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      // User has scrolled to the bottom of the page
      if (!isLoading && hasMore) {
        getD();
      }
    }
  };

  useEffect(() => {
    getD();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [customerId]);

  const formatDateToFrench = (dateStr) => {
    // Assuming dateStr is in the format "YYYY-MM-DD"
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Completed At</th>
            <th>Currency</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Line Items</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>{formatDateToFrench(sale.completed_at_date)}</td>
              <td>{sale.currency}</td>
              <td>{sale.total}</td>
              <td>{sale.payment}</td>
              <td>
                <ul>
                  {sale.line_items.map((item, index) => (
                    <li key={index}>
                      {item.product_model} - {item.product_price} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && <p>Loading...</p>}
      {!isLoading && !hasMore && <p>No more data to load.</p>}
    </div>
  );
};

export default SalesView;
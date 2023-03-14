import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../Components/Loading";
const AdminDashBoard = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/orders`, {
          withCredentials: true,
        });
        setData(res.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      {loading && <Loading />}
      {!loading && data.length > 0 && (
        <>
          {data.map((order) => (
            <div key={order._id}>
              <h1> delievery status : {order.delivery_status}</h1>
              <h1>payment status : {order.payment_status}</h1>
              <h1>commande placée le : {order.createdAt}</h1>
              <h1>email du client : {order.emailAddress}</h1>
              <h1>mobile du client : {order.phoneNumber}</h1>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AdminDashBoard;

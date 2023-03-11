import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../Components/Loading";
import { Container } from "@mui/system";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import moment from "moment";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
const UserDashboard = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:8800/api/orders/${id}`, {
        withCredentials: true,
      });
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [id]);
  const deleteOrder = async () => {
    try {
      axios.delete(`http://localhost:8800/api/orders/${id}`, {
        withCredentials: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      sx={{ marginTop: "40px", marginBottom: "50px", height: "100vh" }}
    >
      {loading && <Loading />}
      {!loading && (
        <>
          {/* EACH ORDER HAS THIS */}
          <Typography
            variant="h1"
            fontSize="26px"
            fontWeight="400"
            textAlign="center"
            marginBottom="30px"
          >
            TABLEAU DE BORD
          </Typography>
          {data.length === 0 && (
            <Typography textAlign="center" marginTop="10px" marginBottom="10px">
              Vous n'avez pas acheter un produit
            </Typography>
          )}
          {data.length !== 0 && (
            <>
              <Table size="medium" className="shadow-lg">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Produit / Réservation</TableCell>
                    <TableCell>Total</TableCell>
                    <TableCell>Status de delivrance</TableCell>
                    <TableCell>Status de paiement</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow key={row._id}>
                      <TableCell>
                        {moment(row.createdAt).format("DD-MM-YYYY HH:mm ")}
                      </TableCell>
                      {row.products.map((product) => (
                        <div key={product._id}>
                          <TableCell>{product.title}</TableCell>
                        </div>
                      ))}
                      <TableCell>{row.total} DZD</TableCell>

                      <TableCell>{row.delivery_status}</TableCell>
                      <TableCell>{row.payment_status}</TableCell>
                      <TableCell>
                        <IconButton size="medium" onClick={deleteOrder}>
                          <DeleteForeverIcon sx={{ color: "tomato" }} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default UserDashboard;

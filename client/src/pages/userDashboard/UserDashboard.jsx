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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const UserDashboard = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
  const deleteOrder = async (order) => {
    try {
      await axios.delete(`http://localhost:8800/api/orders/${order}`, {
        withCredentials: true,
      });
      setOpen(false);
      setData(data.filter((item) => item._id !== order));
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
              <Table className="shadow-lg">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Produit / Réservation</TableCell>
                    <TableCell align="left">Total</TableCell>
                    <TableCell>Status de delivrance</TableCell>
                    <TableCell>Status de paiement</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.map((row) => (
                    <TableRow hover="true">
                      <TableCell>
                        {moment(row.createdAt).format("DD-MM-YYYY HH:mm ")}
                      </TableCell>
                      {row.products.map((product) => (
                        <div key={product._id}>
                          <TableCell>
                            {product.title} ({product.count})
                          </TableCell>
                        </div>
                      ))}

                      <TableCell>{row.total} د.ج</TableCell>

                      <TableCell>
                        {row.delivery_status === "pending" && (
                          <Typography
                            color="error"
                            size="small"
                            textAlign="center"
                          >
                            En cours de traitement
                          </Typography>
                        )}
                        {row.delivery_status === "shipping" && (
                          <Typography
                            className="text-amber-500"
                            size="small"
                            textAlign="center"
                          >
                            En cours d'expédition
                          </Typography>
                        )}
                        {row.delivery_status === "done" && (
                          <Typography
                            className="text-green-600"
                            size="small"
                            textAlign="center"
                          >
                            Livrée
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell>
                        {row.payment_status === "not payed" && (
                          <Typography
                            color="error"
                            size="small"
                            textAlign="center"
                          >
                            Non payée
                          </Typography>
                        )}
                        {row.payment_status === "payed" && (
                          <Typography
                            className="text-green-600"
                            size="small"
                            textAlign="center"
                          >
                            Payée
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>
                        {row.payment_status === "not payed" && (
                          <IconButton>
                            <DeleteForeverIcon
                              sx={{ color: "tomato" }}
                              onClick={handleClickOpen}
                            />
                          </IconButton>
                        )}
                        <Dialog open={open} keepMounted onClose={handleClose}>
                          <DialogTitle>{"Annuler votre commande?"}</DialogTitle>
                          <DialogContent>
                            <DialogContentText>
                              Vous annulerez votre commande. Êtes-vous sûr?
                            </DialogContentText>
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose}>ANNULER</Button>
                            <Button onClick={() => deleteOrder(row._id)}>
                              ACCEPTER
                            </Button>
                          </DialogActions>
                        </Dialog>
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

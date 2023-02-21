import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SupportIcon from "@mui/icons-material/Support";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
const Contact = () => {
  return (
    <div className="p-5">
      <h1 className="text-2xl text-center mt-6">Envoyez nous un message!</h1>
      <Box
        display="flex"
        sx={{
          flexDirection: {
            xs: "column",
            sm: "row",
          },
          marginTop: "45px",
          gap: {
            xs: "1rem",
            sm: "10rem",
          },
        }}
      >
        {/* Main */}
        <div className="flex flex-col flex-wrap mt-6">
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "400", fontSize: "24px" }}
          >
            Comment on peut vous aider?
          </Typography>
          <Typography>
            Si vous avez des questions, des recommandations, des avis n'hesitez
            pas a nous ecrire un message.
          </Typography>
          <br />
          <Typography
            variant="h4"
            component="h1"
            sx={{ fontWeight: "400", fontSize: "24px" }}
          >
            Des complications lors de l'achat de nos produits?
          </Typography>
          <Typography>
            Pas de panique! Envoyez nous un message et on va tout régler.
          </Typography>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="center"
            gap="40px"
            marginTop="40px"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignContent="center"
              alignItems="center"
            >
              <LocalShippingIcon sx={{ fontSize: "60px" }} />
              <Typography>Fast shipping</Typography>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignContent="center"
              alignItems="center"
            >
              <SupportIcon sx={{ fontSize: "60px" }} />
              <Typography>24/7 avalaible support</Typography>
            </Box>
          </Box>
        </div>
        {/* Form */}
        <form className="flex flex-col gap-3 p-4 mt-2">
          <Typography
            variant="h2"
            sx={{
              fontSize: { sm: "19px", xs: "24px" },
              textAlign: { xs: "center" },
            }}
          >
            Remplissez ce formulaire pour nous laisser un message
          </Typography>
          <input
            type="text"
            placeholder="Nom"
            required
            className="px-2 py-3 border border-solid border-black"
          />
          <input
            type="text"
            placeholder="Prenom"
            required
            className="px-2 py-3 border border-solid border-black"
          />
          <input
            type="email"
            placeholder="Email@example.com"
            required
            className="px-2 py-3 border border-solid border-black"
          />
          <textarea
            placeholder="Ecrivez quelque chose..."
            className="px-2 py-5 border border-solid border-black"
          />
          <button className="border border-solid border-black h-10 w-28 hover:bg-gray-200">
            Envoyer
          </button>
        </form>
      </Box>
    </div>
  );
};

export default Contact;

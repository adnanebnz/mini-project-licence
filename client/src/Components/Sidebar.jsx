import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Sidebar() {

    return (
        <Grid item xs={12} md={4}>
            <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
                <Typography variant="h6" gutterBottom>
                    test
                </Typography>
                <Typography>test</Typography>
            </Paper>
            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Archives
            </Typography>

            <Link display="block" variant="body1" href="">
                test
            </Link>



            <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Social
            </Typography>

            <Link
                display="block"
                variant="body1"
                href="#"

                sx={{ mb: 0.5 }}>
                <Stack direction="row" spacing={1} alignItems="center">

                    <span></span>
                </Stack>
            </Link>
        </Grid >
    );
}

export default Sidebar;

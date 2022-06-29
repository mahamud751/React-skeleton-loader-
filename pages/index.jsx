import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import axios from "axios";
import { useEffect, useState } from "react";
export default function Home(props) {
  const data = props.data;
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (data) {
      setTimeout(function () {
        setIsLoading(false);
      }, 4000);
    }
  }, []);

  return (
    <Container sx={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        {data.map((item, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card sx={{ maxWidth: 345 }}>
              {isLoading ? (
                <>
                  <Skeleton variant="rectangular" animation="wave" height={140} />

                  <CardContent>
                    <Typography gutterBottom variant="h5"></Typography>

                    <Box sx={{ pt: 0.5 }}>
                      <Skeleton animation="wave" />
                      <Skeleton width="60%" animation="wave" />
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                  </CardActions>
                </>
              ) : (
                <>
                  <CardMedia component="img" height="140" image={item.img} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.name || <Skeleton />}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.fullDescription || <Skeleton />}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Share</Button>
                    <Button size="small">Learn More</Button>
                  </CardActions>
                </>
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get("https://guarded-garden-69209.herokuapp.com/productsAll");
  return {
    props: { data },
  };
}

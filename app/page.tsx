"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";

export default function Page() {
  const [pdfs, setPdfs] = useState<{ id: number; preview: string; download: string }[]>([]);
  const router = useRouter();
  const theme = useTheme();

  const fetchPdfs = async () => {
    const res = await axios.get("http://localhost:8080/pdfs");
    setPdfs(res.data);
  };

  useEffect(() => {
    fetchPdfs();
  }, []);

  const HoverCard = styled(Card)(({ theme }) => ({
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
      transform: "translateY(-5px) scale(1.05)",
      boxShadow: theme.shadows[6],
    },
  }));

  const HoverImage = styled(CardMedia)({
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.1) translateY(-4px)",
    },
  });

  return (
    <Box sx={{ bgcolor: "#f0f4f8", minHeight: "100vh", py: 4 }}>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
          <Typography variant="h4" color="primary" fontWeight={600}>
            📄 Captured PDFs
          </Typography>
          <Button variant="contained" size="large" onClick={() => router.push("/capture")}>
            📷 Capture Photos
          </Button>
        </Box>

        <Grid container spacing={3}>
          {pdfs.map((pdf, i) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={3}
              key={pdf.id}
              component={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <HoverCard>
                <CardActionArea href={`http://localhost:8080${pdf.download}`} target="_blank">
                  <HoverImage
                    component="img"
                    height="160"
                    image={`http://localhost:8080${pdf.preview}`}
                  />
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ fontWeight: 500 }}
                    >
                      View PDF
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </HoverCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

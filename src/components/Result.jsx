import React from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";

const Result = ({ loading, imageUrl, ref }) => {
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Typography
        variant="h1"
        fontSize={"40px"}
        color={"#454545"}
        fontWeight={"bold"}
      >
        Remove Image Background
      </Typography>

      <Box
        component={"div"}
        height={300}
        width={500}
        borderRadius={5}
        marginTop={4}
        bgcolor={"white"}
        sx={{ boxShadow: 3, cursor: "pointer", overflow: "hidden" }}
      >
        {loading ? (
          <Skeleton
            width={"100%"}
            height={"100%"}
            animation="wave"
            variant="rectangle"
          />
        ) : (
          <img src={imageUrl} alt="result-image" className="image" />
        )}
      </Box>
      {!loading && (
        <Box>
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginTop: "10px", mr: 2 }}
            size="large"
          >
            Download
          </Button>
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
            size="large"
            onClick={() => ref.current.click()}
          >
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Result;

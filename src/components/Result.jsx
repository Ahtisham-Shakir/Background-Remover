import React from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";

const Result = ({
  loading,
  imageUrl,
  resultUrl,
  fileId,
  handleImageSelect,
}) => {
  async function downloadImage() {
    // Replace the URL with the URL of the image you want to download
    const dlUrl = `${resultUrl}`;

    // Send a GET request for the image
    fetch(dlUrl)
      .then((response) => response.blob())
      .then((blob) => {
        // Create a temporary anchor element to download the image
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "image.jpg");

        // Add the anchor element to the DOM and click it to start the download
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
    console.log(fileId);
    const res = await fetch(`http://127.0.0.1:5000/delete?filename=${fileId}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.text();
    console.log(data);
  }

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
          <img src={`${resultUrl}`} alt="result-image" className="image" />
        )}
      </Box>
      {!loading && (
        <Box>
          {/* <a
            href={}
            download
            onClick={(e) => e.stopPropagation()}
          > */}
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginTop: "10px", mr: 2 }}
            size="large"
            onClick={downloadImage}
          >
            Download
          </Button>
          {/* </a> */}
          <Button
            variant="contained"
            sx={{ marginBottom: "10px", marginTop: "10px" }}
            size="large"
          >
            Upload
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Result;

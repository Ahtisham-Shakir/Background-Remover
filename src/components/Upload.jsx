import React, { useState, useRef } from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Result from "./Result";

const Upload = () => {
  const inputRef = useRef(null);
  const newRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resultUrl, setResultUrl] = useState(null);
  // const [fileId, setFileId] = useState(null);

  const handleImageSelect = async (e) => {
    setLoading(true);
    const image = e.target.files[0];
    try {
      if (image) {
        const imgData = new FormData();
        imgData.append("file", image);
        imgData.append("cloud_name", "dyoevozju");
        imgData.append("upload_preset", "ujexarog");
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dyoevozju/image/upload",
          {
            method: "post",
            body: imgData,
          }
        );
        const data = await response.json();
        setImageUrl(data?.url);
        const res = await fetch("http://127.0.0.1:5000/api/upload", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            file: data?.url,
          },
        });
        const resData = await res.json();
        setResultUrl(resData?.url);
        const fileId = resData?.fileId;

        setLoading(false);

        // Delete file in the background
        deleteFile(fileId);
      } else {
        setLoading(false);
        alert("Please select an image");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
  };

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
  }

  const deleteFile = async (fileId) => {
    const res = await fetch(`http://127.0.0.1:5000/delete?filename=${fileId}`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
    });
    const data = await res.text();
    console.log(data);
  };

  return (
    <Box marginTop={5}>
      {!imageUrl ? (
        <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
          <Typography
            variant="h1"
            fontSize={"40px"}
            color={"#454545"}
            fontWeight={"bold"}
          >
            Remove Image Background
          </Typography>
          <label>
            <Box
              component={"div"}
              height={300}
              width={500}
              borderRadius={5}
              marginTop={4}
              display={"flex"}
              flexDirection={"column"}
              alignItems={"center"}
              justifyContent={"center"}
              bgcolor={"white"}
              sx={{ boxShadow: 3, cursor: "pointer" }}
            >
              <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageSelect}
                style={{ width: "0px", height: "0px", position: "absolute" }}
              />
              <UploadIcon
                sx={{ fontSize: "100px" }}
                style={{ color: "#d3d3d3" }}
              />
              <Typography
                component={"p"}
                marginY={3}
                fontSize={22}
                color={"#454545"}
              >
                Upload an image to remove background
              </Typography>
              <Button
                variant="contained"
                sx={{ marginBottom: "10px" }}
                size="large"
                onClick={() => inputRef.current.click()}
              >
                Upload image
              </Button>
            </Box>
          </label>
        </Box>
      ) : (
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
              <Button
                variant="contained"
                sx={{ marginBottom: "10px", marginTop: "10px", mr: 2 }}
                size="large"
                onClick={downloadImage}
              >
                Download
              </Button>
              <input
                type="file"
                accept="image/*"
                ref={newRef}
                onChange={handleImageSelect}
                style={{ width: "0px", height: "0px", position: "absolute" }}
              />
              <Button
                variant="contained"
                sx={{ marginBottom: "10px", marginTop: "10px" }}
                size="large"
                onClick={() => newRef.current.click()}
              >
                Upload
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Upload;

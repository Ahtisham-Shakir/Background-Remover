import React, { useState, useRef } from "react";
import { Box, Button, Typography, Skeleton } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import Result from "./Result";

const Upload = () => {
  const inputRef = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);

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
        setLoading(false);
      } else {
        setLoading(false);
        alert("Please select an image");
      }
    } catch (error) {
      console.log("error", error);
      setLoading(false);
    }
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
        <Result loading={loading} imageUrl={imageUrl} ref={inputRef.current} />
      )}
    </Box>
  );
};

export default Upload;

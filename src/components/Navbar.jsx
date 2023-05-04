import React from "react";
import LayersIcon from "@mui/icons-material/Layers";
import { Box, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <Box
      borderBottom={1}
      borderColor={"#eee"}
      paddingY={3}
      paddingX={2}
      component={"div"}
      className="bShadow"
    >
      <Box display="flex" justifyContent={"center"} alignItems={"center"}>
        <LayersIcon fontSize="large" />
        <Typography variant="h2" fontSize={30} fontWeight={"bold"}>
          Bg Remover
        </Typography>
      </Box>
    </Box>
  );
};

export default Navbar;

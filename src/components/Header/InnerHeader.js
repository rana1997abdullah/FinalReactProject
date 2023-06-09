import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import { Box } from "@mui/material";
import DrawerCmp from "./Drawer";
import { StyledItem, StyledList, StyledToolbar } from "./styles";

import StartFirebase from "../firebase/index";
import { useEffect } from "react";
import { onValue, ref } from "firebase/database";

const HeaderList = [
  "Today's Deals",
  "Customer Service",
  "Registry",
  "Gift Cards",
  "Sell",
];
const InnerHeader = ({ loggedIn, username }) => {
  const [open, setState] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    const startRef = ref(StartFirebase(), "Categories");
    onValue(startRef, (snapshot) => {
      const res = snapshot.val();
      setData(res);
    });
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };

  return (
    <StyledToolbar sx={{ flexGrow: 1 }}>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>

      <Typography variant="h6">All</Typography>
      <Box sx={{ flex: 1 }}>
        <StyledList sx={{ flexGrow: 1 }}>
          {HeaderList.map((el) => {
            return <StyledItem key={el}>{el}</StyledItem>;
          })}
        </StyledList>
      </Box>
      <StyledItem>Shop deals in Electronics</StyledItem>

      <DrawerCmp
        open={open}
        toggleDrawer={toggleDrawer}
        data={data}
        loggedIn={loggedIn}
        username={username}
      />
    </StyledToolbar>
  );
};
export default InnerHeader;

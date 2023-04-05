import React from "react";
import { useEffect, useState } from "react";
import logo from "./logo.png";
// import banner from "./banner.gif";
import "./App.css";
import abi from "./contracts";
import { ethers } from "ethers";
import {
  Button,
  Link,
  Avatar,
  Box,
  Card,
  Divider,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GetAppIcon from "@mui/icons-material/GetApp";

// You token contract address
const contractAddress = "0xdF7ce0cA1e39863248B07652ccDAb5f51D07F1f2";

// the fee in wei, fee = 1000000000000000 means 0.001 BNB
const fee = 9000000000000000;

function App() {
  const [currentAccount, setCurrentAccount] = useState(null);

  const checkWalletIsConnected = () => {
    const { ethereum } = window;
    if (!ethereum) {
      console.log("Metamask NOT Installed");
      return;
    } else {
      console.log("Metamask Installed");
    }
  };

  const connectWalletHandler = async () => {
    const { ethereum } = window;
    if (!ethereum) {
      alert("Please Install Metamask!");
    }

    try {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found an account :", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const connectWalletButton = () => {
    return (
      <Button
        onClick={connectWalletHandler}
        variant="outlined"
        sx={{ color: "blue" }}
        startIcon={<AccountBalanceWalletIcon />}
      >
        Connect Wallet
      </Button>
    );
  };

  const airdropButton = () => {
    return (
      <Button
        onClick={airdropHandler}
        variant="outlined"
        sx={{ color: "blue" }}
        startIcon={<GetAppIcon />}
      >
        Claim Airdrop
      </Button>
    );
  };

  useEffect(() => {
    checkWalletIsConnected();
  }, []);

  const airdropHandler = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        console.log("Intialize payment");
        let getadrp = await contract.dropTokens({ value: fee });
        console.log(contract);
        if (getadrp) {
          alert(
            "Congratulations, you got our airdrop, you will receive your tokens very soon"
          );
        } else {
          alert(
            "Something wrong, Maybe you don't have enough core balance for transaction fee or your wallet already have this token"
          );
        }
      }
    } catch (err) {
      alert(
        "Something wrong, Maybe you don't have enough Core balance for transaction fee or your wallet already have this token"
      );
      console.log(err);
    }
  };

  const color = "#c3a129";
  const bgColor = "#120f03";

  return (
    <Box
      p={4}
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card
        sx={{ maxWidth: 750, bgcolor: { bgColor }, margintop: "5vh" }}
        elevation="24"
      >
        <CardHeader
          avatar={<Avatar src={logo} sx={{ width: 90, height: 90 }} />}
          titleTypographyProps={{ variant: "h3", align: "center" }}
          title="Core Infinity Airdrop"
          style={{
            backgroundColor: "#c3a129",
            color: "#ffffff",
            fontfamily: "Kaushan Script",
          }}
        />
        {/* <CardMedia component="img" height="500" image={logo} alt="" /> */}
        <CardContent>
          <Box m={4} pt={4}>
            <Card elevation="2">
              <Typography variant="h3" color={color} p={2} align="center">
                Welcome To The Future Of NFT On Core Blockchain
              </Typography>
              <Divider />
              <Typography
                variant="h5"
                color={color}
                p={2}
                align="center"
                marginRight={5}
                marginLeft={5}
              >
                We reward our early stage community.Thank you for your support!
              </Typography>
              <Divider />
              <Link href="https://t.me/coreinfinityT" underline="hover">
                <Typography
                  variant="h6"
                  color={color}
                  align="center"
                  padding={3}
                >
                  Join the Official Telegram
                </Typography>
              </Link>
              <Divider />
              <Typography variant="h5" color={color} p={2} align="center">
                Claim 10000 CIT
              </Typography>
            </Card>
          </Box>
        </CardContent>
        <Box p={4}>
          <CardActions style={{ justifyContent: "center" }}>
            {currentAccount ? airdropButton() : connectWalletButton()}
          </CardActions>
        </Box>
      </Card>
    </Box>
  );
}

export default App;

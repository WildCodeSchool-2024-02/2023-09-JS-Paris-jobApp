import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import LogoIcon from "./Logo";
import { UserContext } from "../contexts/user.context";

function Navbar() {
  const [anchorElUser, setAnchorElUser] = useState<HTMLButtonElement | null>(
    null,
  );
  const navigate = useNavigate();
	const userContext = useContext(UserContext);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
		logout();
  };

	const logout = () => {
		userContext?.setUser(undefined);
		navigate("/login");
	}

  return (
    <AppBar position="static" sx={{ background: "#ff1493ad" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <LogoIcon />
          <Box sx={{ flexGrow: 1 }} /> {/* pousse l'avatar à droite */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "40px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {!userContext?.user ? (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/login")}
                    >
                      Connexion
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/register")}
                    >
                      Inscription
                    </Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/")}
                    >
                      Nos offres
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/")}
                    >
                      Favoris
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => navigate("/")}
                    >
                      Admin
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;

"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAppSelector } from "@/redux/hooks";
import { UserSelectors } from "@/redux/features/user/userSelectors";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import { Roles } from "types";

export const Header = () => {
  const user = useAppSelector(UserSelectors.getUser());
  const { isSignedIn, wallet } = useAppSelector((state) => state.web3);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000",
        }}
      >
        <Box>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 25px",
            }}
          >
            <Typography variant="h6" component="div">
              SuperSchool
            </Typography>

            {user?.role === Roles[Roles.Admin] && <AdminToolbar />}
            {user?.role === Roles[Roles.Instructor] && <InstructorToolbar />}
            {user?.role === Roles[Roles.Student] && <StudentToolbar />}

            <Box sx={{ display: "flex", alignItems: "center" }}>
              {!user && (
                <Button href={"/login"} sx={{ mr: 5 }}>
                  Đăng nhập
                </Button>
              )}
              {!!user && (
                <Box>
                  <Button
                    id="basic-button"
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{ mr: 5 }}
                  >
                    {(user.full_name as string) || "ADMIN"}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      "aria-labelledby": "basic-button",
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                    transformOrigin={{ vertical: "top", horizontal: "center" }}
                  >
                    <MenuItem onClick={handleClose}>Hồ sơ</MenuItem>
                    <MenuItem
                      onClick={() => {
                        handleClose();
                      }}
                    >
                      Đăng xuất
                    </MenuItem>
                  </Menu>
                </Box>
              )}
              <Button
                id="basic-button-2"
                aria-controls={open ? "basic-menu-2" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                startIcon={<AccountBalanceWalletIcon />}
                color="inherit"
                onClick={(e) => {
                  if (!isSignedIn) return wallet?.signIn();
                  handleClick2(e);
                }}
              >
                {isSignedIn ? wallet?.accountId : "Kết nối ví"}
              </Button>
              <Menu
                id="basic-menu-2"
                anchorEl={anchorEl2}
                open={open2}
                onClose={handleClose2}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                transformOrigin={{ vertical: "top", horizontal: "center" }}
              >
                <MenuItem
                  onClick={(e) => {
                    handleClose2();
                    wallet?.signOut();
                  }}
                >
                  Hủy kết nối với ví
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>
    </Box>
  );
};

const AdminToolbar = () => {
  return (
    <Toolbar>
      <Button sx={{ margin: "0 5px" }} href={"/admin/majors"} color="inherit">
        Quản lý ngành học
      </Button>
      <Button sx={{ margin: "0 5px" }} href={"/admin/subjects"} color="inherit">
        Quản lý môn học
      </Button>
      <Button sx={{ margin: "0 5px" }} href={"/admin/students"} color="inherit">
        Quản lý sinh viên
      </Button>
      <Button sx={{ margin: "0 5px" }} href={"/admin/instructors"} color="inherit">
        Quản lý giảng viên
      </Button>
    </Toolbar>
  );
};

const InstructorToolbar = () => {
  return (
    <Toolbar>
      <Button sx={{ margin: "0 5px" }} href={"/instructor/subjects"} color="inherit">
        Danh sách môn học đang dạy
      </Button>
    </Toolbar>
  );
};

const StudentToolbar = () => {
  return (
    <Toolbar>
      <Button sx={{ margin: "0 5px" }} href={"/student/subject-register"} color="inherit">
        Đăng ký môn học
      </Button>
      <Button sx={{ margin: "0 5px" }} href={"/student/subjects"} color="inherit">
        Danh sách môn học
      </Button>
      <Button sx={{ margin: "0 5px" }} href={"/student/score"} color="inherit">
        Bảng điểm số
      </Button>
      <Button sx={{ margin: "0 5px" }} href={"/student/degree"} color="inherit">
        Bằng cấp
      </Button>
    </Toolbar>
  );
};

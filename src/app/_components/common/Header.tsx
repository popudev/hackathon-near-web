"use client";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { useAppSelector } from "@/redux/hooks";
import { RoleType } from "@/services/major/types";
import { UserSelectors } from "@/redux/features/user/userSelectors";

export const Header = () => {
  const user = useAppSelector(UserSelectors.getUser());
  const { isSignedIn, wallet } = useAppSelector((state) => state.web3);

  return (
    <Box>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "rgba(0,0,0,0.8)",
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

            {user?.role === RoleType.ADMIN && <AdminToolbar />}
            {user?.role === RoleType.INSTRUCTOR && <InstructorToolbar />}
            {user?.role === RoleType.STUDENT && <StudentToolbar />}

            {!user && (
              <Button href={"/login"} color="inherit">
                Đăng nhập
              </Button>
            )}

            {!!user && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Box sx={{ marginRight: "10px" }}>{user.full_name as string}</Box>
                <Button
                  startIcon={<AccountBalanceWalletIcon />}
                  color="inherit"
                  onClick={() => {
                    if (!isSignedIn) wallet?.signIn();
                  }}
                >
                  {isSignedIn ? wallet?.accountId : "Kết nối ví"}
                </Button>
              </Box>
            )}
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

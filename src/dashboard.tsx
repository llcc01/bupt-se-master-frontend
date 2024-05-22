import { Button } from "@mui/material";

export const Dashboard = () => {
  return (
    <div>
      <h1>中央空调控制系统</h1>
      <h2>主机开关</h2>
      <Button variant="contained">开</Button>
      <Button
        variant="contained"
        style={{
          marginLeft: "10px",
        }}
      >
        关
      </Button>
    </div>
  );
};

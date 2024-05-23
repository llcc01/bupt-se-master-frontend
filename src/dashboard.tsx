import {
  Box,
  Button,
  Card,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  Switch,
  TextField,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { CentralUnit } from "./type";
import {
  getAcMasterStatus,
  setAcMasterFrequency,
  turnOffAcMaster,
  turnOnAcMaster,
} from "./api/ac";
import { Title } from "react-admin";

export const Dashboard = () => {
  const [status, setStatus] = useState<CentralUnit>({
    status: "off",
    unitId: 1,
    frequency: 1,
  });

  const loaded = useRef(false);

  useEffect(() => {
    if (loaded.current) {
      return;
    }
    loaded.current = true;
    getAcMasterStatus().then((res) => {
      setStatus(res.data.data);
    });
  }, []);

  const FreqField = () => {
    const [newFreq, setNewFreq] = useState<number>(status?.frequency);
    const [error, setError] = useState<boolean>(false);
    return (
      <Box display="flex" alignItems="" gap={2} p={2}>
        <TextField
          error={error}
          helperText={error ? "请输入1-100的整数" : ""}
          label="更新间隔"
          defaultValue={status?.frequency}
          disabled={!status}
          type="number"
          InputProps={{
            endAdornment: "分",
          }}
          onChange={(e) => {
            const freq = parseInt(e.target.value);
            if (freq < 1 || freq > 100) {
              setError(true);
            } else {
              setError(false);
              setNewFreq(freq);
            }
          }}
        />
        <Button
          variant="contained"
          disabled={newFreq == status.frequency}
          onClick={() => {
            setAcMasterFrequency(newFreq).then((res) => {
              setStatus(res.data.data);
            });
          }}
        >
          确认
        </Button>
      </Box>
    );
  };

  return (
    <Card>
      <Title title="中央空调控制系统" />
      <Box p={2}>
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              // title="中央空调"
              checked={status?.status === "on"}
              disabled={!status}
              onClick={() => {
                if (status?.status === "on") {
                  turnOffAcMaster()
                    .then((res) => {
                      setStatus(res.data.data);
                    })
                    .catch((err) => {
                      if (err.response.data.message === "中央空调已关闭") {
                        setStatus({ ...status, status: "off" });
                      }
                    });
                } else {
                  turnOnAcMaster()
                    .then((res) => {
                      setStatus(res.data.data);
                    })
                    .catch((err) => {
                      if (err.response.data.message === "中央空调已开机") {
                        setStatus({ ...status, status: "on" });
                      }
                    });
                }
              }}
            />
          }
          label="开关"
        />
        <Divider />
        <FreqField />
        <Divider />
        <List>
          <ListItem>
            <ListItemText primary="ID" secondary={status?.unitId} />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="模式"
              secondary={
                status?.mode === "cooling"
                  ? "制冷"
                  : status?.mode === "heating"
                  ? "制热"
                  : "自动"
              }
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="当前温度"
              secondary={status?.currentTemperature + "℃"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="默认温度"
              secondary={status?.defaultTemperature + "℃"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="最低温度"
              secondary={status?.minTemperature + "℃"}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="最高温度"
              secondary={status?.maxTemperature + "℃"}
            />
          </ListItem>
        </List>
      </Box>
    </Card>
  );
};

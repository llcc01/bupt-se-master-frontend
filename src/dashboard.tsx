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
import { Title, useStore } from "react-admin";

const FreqField = (props: { status: any; setStatus: (status: any) => any }) => {
  const [newFreq, setNewFreq] = useState<number>(props.status.frequency);
  const [error, setError] = useState<boolean>(false);
  const [_, setIntervalTime] = useStore<number>("interval");
  const [timer, setTimer] = useStore("timer");

  return (
    <Box display="flex" alignItems="" gap={2} p={2}>
      <TextField
        error={error}
        helperText={error ? "请输入1-100的整数" : ""}
        label="更新间隔"
        defaultValue={props.status?.frequency}
        disabled={!props.status}
        type="number"
        InputProps={{
          endAdornment: "秒",
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
        disabled={newFreq == props.status.frequency}
        onClick={() => {
          setAcMasterFrequency(newFreq).then((res) => {
            props.setStatus?.(res.data.data);
            setIntervalTime(res.data.data.frequency);
            console.log("setIntervalTime", res.data.data.frequency);

            if (timer) {
              console.log("clearInterval", timer);
              clearInterval(timer);
            }
            setTimer(
              setInterval(() => {
                getAcMasterStatus().then((res) => {
                  props.setStatus(res.data.data);
                });
              }, res.data.data.frequency * 1000)
            );
            console.log("setInterval", res.data.data.frequency);
          });
        }}
      >
        确认
      </Button>
    </Box>
  );
};

export const Dashboard = () => {
  const [status, setStatus] = useState<CentralUnit>({
    status: "off",
    unitId: 1,
  });

  const loaded = useRef(false);

  const [intervalTime, setIntervalTime] = useStore<number>("interval", 10);

  const [timer, setTimer] = useStore("timer");

  useEffect(() => {
    if (loaded.current) {
      return;
    }
    loaded.current = true;
    getAcMasterStatus().then((res) => {
      setStatus(res.data.data);
      setIntervalTime(res.data.data.frequency);
    });

    if (timer) {
      clearInterval(timer);
    }
    setTimer(
      setInterval(() => {
        getAcMasterStatus().then((res) => {
          setStatus(res.data.data);
        });
      }, intervalTime * 1000)
    );

    console.log("setInterval", intervalTime);
    return () => {
      clearInterval(timer);
      console.log("clearInterval", intervalTime);
      loaded.current = false;
    };
  }, []);

  return (
    <Card>
      <Title title="中央空调控制系统" />
      <Box p={2}>
        <FormControlLabel
          labelPlacement="start"
          control={
            <Switch
              // title="中央空调"
              checked={status?.status === "on" || status?.status === "standby"}
              disabled={!status}
              onClick={() => {
                if (status?.status === "on" || status?.status === "standby") {
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
        {status.frequency && (
          <FreqField status={status} setStatus={setStatus} />
        )}
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
                  : "未知"
              }
            />
          </ListItem>
          {/* <ListItem>
            <ListItemText
              primary="当前温度"
              secondary={status?.currentTemperature + "℃"}
            />
          </ListItem> */}
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
          <ListItem>
            <ListItemText
              primary="当前状态"
              secondary={
                status?.status === "on"
                  ? "开"
                  : status?.status === "off"
                  ? "关"
                  : status?.status === "standby"
                  ? "待机"
                  : "未知"
              }
            />
          </ListItem>
        </List>
      </Box>
    </Card>
  );
};

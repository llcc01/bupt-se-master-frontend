import {
  BooleanField,
  Create,
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  SimpleForm,
  TextField,
  TextInput,
} from "react-admin";
import { Room } from "./type";

export const RoomList = () => (
  <List>
    <Datagrid>
      <NumberField source="roomId" label="房间号" />
      <NumberField
        source="currentTemperature"
        label="当前温度(℃)"
        options={{ minimumFractionDigits: 1 }}
      />
      <NumberField
        source="targetTemperature"
        label="目标温度(℃)"
        options={{ minimumFractionDigits: 1 }}
      />
      <FunctionField
        source="fanSpeed"
        label="风速"
        render={(r: Room) => {
          return r.fanSpeed === "low"
            ? "低"
            : r.fanSpeed === "medium"
            ? "中"
            : r.fanSpeed === "high"
            ? "高"
            : "自动";
        }}
      />
      <NumberField source="temperatureThreshold" label="温度阈值" />
      <FunctionField
        source="status"
        label="状态"
        render={(record: Room) => (record.status === "on" ? "开" : "关")}
      />
      <FunctionField
        source="mode"
        label="模式"
        render={(r: Room) => {
          return r.mode === "cooling"
            ? "制冷"
            : r.mode === "heating"
            ? "制热"
            : "自动";
        }}
      />
      <DateField source="lastUpdate" label="更新时间" />
      <FunctionField
        source="serviceStatus"
        label="服务状态"
        render={(r: Room) => {
          return r.serviceStatus === "serving"
            ? "服务中"
            : r.serviceStatus === "waiting"
            ? "等待中"
            : "空闲";
        }}
      />
      <NumberField source="energyConsumed" label="消耗" />
      <NumberField source="costAccumulated" label="费用" />
      <NumberField source="unitId" label="中央空调" />
    </Datagrid>
  </List>
);

export const RoomCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="roomId" />
      </SimpleForm>
    </Create>
  );
};

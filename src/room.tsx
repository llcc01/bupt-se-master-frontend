import {
  ArrayField,
  Create,
  Datagrid,
  DateField,
  FunctionField,
  List,
  NumberField,
  ReferenceOneField,
  ShowButton,
  ShowContextProvider,
  ShowView,
  SimpleForm,
  SimpleShowLayout,
  TabbedShowLayout,
  TextField,
  TextInput,
  useShowController,
  useStore,
} from "react-admin";
import { ControlLog2, Room } from "./type";
import { Box } from "@mui/material";

export const RoomList = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [intervalTime, _] = useStore<number>("interval", 10);
  return (
    <List
      pagination={<></>}
      queryOptions={{
        refetchInterval: intervalTime * 1000,
      }}
    >
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
          render={(record: Room) =>
            record.status === "on"
              ? "开"
              : record.status === "off"
              ? "关"
              : record.status === "standby"
              ? "待机"
              : "未知"
          }
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
        <DateField source="lastUpdate" label="更新时间" showTime />
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
        <Box sx={{ alignItems: "center", display: "flex" }}>
          <ShowButton />
        </Box>
      </Datagrid>
    </List>
  );
};

export const RoomCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="roomId" />
      </SimpleForm>
    </Create>
  );
};

const RoomReportDetail = () => {
  return (
    <ArrayField source="log">
      <Datagrid bulkActionButtons={false}>
        <NumberField
          source="actualTemp"
          label="开始温度(℃)"
          options={{ minimumFractionDigits: 1 }}
        />
        <NumberField
          source="endTemp"
          label="结束温度(℃)"
          options={{ minimumFractionDigits: 1 }}
        />
        <FunctionField
          source="requestedFanSpeed"
          label="请求风速"
          render={(r: ControlLog2) => {
            return r.requestedFanSpeed === "low"
              ? "低"
              : r.requestedFanSpeed === "medium"
              ? "中"
              : r.requestedFanSpeed === "high"
              ? "高"
              : "自动";
          }}
        />
        <NumberField source="cost" label="费用" />
        <NumberField source="energyConsumed" label="消耗" />
        <NumberField source="duration" label="持续时间" />
        <DateField source="requestTime" label="请求时间" showTime />
        <DateField source="endTime" label="结束时间" showTime />
      </Datagrid>
    </ArrayField>
  );
};

const RoomReport = () => {
  return (
    <SimpleShowLayout>
      {/* <NumberField source="reportId" label="报告号" /> */}
      <NumberField source="roomId" label="房间号" />
      <TextField source="creator" label="创建者" />
      <TextField source="type" label="类型" />
      <DateField source="generationDate" label="生成时间" showTime />
      <NumberField source="totalCost" label="费用" />
      <NumberField source="totalEnergyConsumed" label="消耗" />
      <NumberField source="usageTime" label="使用次数" />
      <RoomReportDetail />
    </SimpleShowLayout>
  );
};

export const RoomShow = () => {
  const controllerProps = useShowController();
  return (
    <ShowContextProvider value={controllerProps}>
      <ShowView title={""}>
        <TabbedShowLayout>
          <TabbedShowLayout.Tab label="日报">
            <ReferenceOneField
              reference="reports"
              target="roomId"
              filter={{ reportType: "daily" }}
            >
              <RoomReport />
            </ReferenceOneField>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="周报">
            <ReferenceOneField
              reference="reports"
              target="roomId"
              filter={{ reportType: "weekly" }}
            >
              <RoomReport />
            </ReferenceOneField>
          </TabbedShowLayout.Tab>
          <TabbedShowLayout.Tab label="月报">
            <ReferenceOneField
              reference="reports"
              target="roomId"
              filter={{ reportType: "monthly" }}
            >
              <RoomReport />
            </ReferenceOneField>
          </TabbedShowLayout.Tab>
        </TabbedShowLayout>
      </ShowView>
    </ShowContextProvider>
  );
};

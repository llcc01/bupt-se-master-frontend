import { Datagrid, DateField, List, NumberField, TextField } from "react-admin";

// export interface ControlLog {
//   actualTemp?: number;
//   duration?: number;
//   endTime?: Date;
//   isCompleted?: number;
//   logId: number;
//   mode?: string;
//   requestTime?: Date;
//   requestedFanSpeed?: string;
//   requestedTemp?: number;
//   responseTime?: Date;
//   roomId?: number;
// }

export const ControlLogList = () => (
  <List>
    <Datagrid>
      <NumberField source="logId" label="日志ID" />
      <NumberField source="roomId" label="房间ID" />
      <NumberField source="actualTemp" label="实际温度" />
      <NumberField source="duration" label="持续时间" />
      <DateField source="endTime" label="结束时间" />
      <TextField source="isCompleted" label="是否完成" />
      <NumberField source="mode" label="模式" />
      <DateField source="requestTime" label="请求时间" />
      <TextField source="requestedFanSpeed" label="请求风速" />
      <NumberField source="requestedTemp" label="请求温度" />
      <DateField source="responseTime" label="响应时间" />
    </Datagrid>
  </List>
);

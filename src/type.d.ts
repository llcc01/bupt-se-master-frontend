/**
 * Room
 */
export interface Room {
  costAccumulated?: number;
  currentTemperature?: number;
  energyConsumed?: number;
  fanSpeed?: string;
  lastUpdate?: Date;
  mode?: string;
  roomId: number;
  serviceStatus?: string;
  status?: string;
  targetTemperature?: number;
  temperatureThreshold?: number;
  unitId?: number;
}

/**
 * ControlLog
 */
export interface ControlLog {
  actualTemp?: number;
  duration?: number;
  endTime?: Date;
  isCompleted?: number;
  logId: number;
  mode?: string;
  requestTime?: Date;
  requestedFanSpeed?: string;
  requestedTemp?: number;
  responseTime?: Date;
  roomId?: number;
}

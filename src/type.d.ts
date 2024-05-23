/**
 * Room
 */
export interface Room {
  id: number;
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

export interface ControlLog2 {
  actualTemp?: number;
  cost?: number;
  endTime?: Date;
  logId: number;
  requestTime?: Date;
  requestedFanSpeed?: string;
}

/**
 * Report
 */
export interface Report {
  creator?: string;
  details?: Array<string>;
  generationDate?: Date;
  reportId: number;
  roomId?: number;
  totalCost?: number;
  totalEnergyConsumed?: number;
  type?: string;
}

/**
 * CentralUnit
 */
export interface CentralUnit {
  activeUnits?: number;
  capacity?: number;
  currentTemperature?: number;
  defaultTemperature?: number;
  frequency: number;
  maxTemperature?: number;
  minTemperature?: number;
  mode?: string;
  status?: string;
  unitId: number;
}

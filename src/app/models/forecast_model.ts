export interface ForecastData {
  Id: number;
  SKU: string;
  ForecastDate: string;
  ForecastedDemand: number;
  ConfidenceIntervalLow: number;
  ConfidenceIntervalHigh: number;
  ReorderPoint: number;
  ModelUsed: string;
  CreatedAt: string;
}
export interface MetaData{
  information: string;
  symbol: string;
  lastRefresh: string;
} 

export interface OhlcItem {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface VolumeItem {
  timestamp: number;
  volume: number;
}

export interface ChartData{
  metaData: MetaData;
  ohlcData: OhlcItem[];
  volumeData: VolumeItem[];
}
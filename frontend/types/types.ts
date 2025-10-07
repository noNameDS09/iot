// src/types/types.ts
export type Device = {
  id: string;
  name: string;
  status: 'Online' | 'Offline';
  description: string;
  serverName: string;
  virtualIp: string;
  ipAddress: string;
  liveData: {
    current: string;
    voltage: string;
  };
  chartData: number[];
};

export type Category = {
  id: string;
  name: string;
  deviceCount: number;
  icon: string; // Assuming we'd use an icon library or similar
};

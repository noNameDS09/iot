// components/ui/DeviceCard.tsx
import React from "react";
import { TouchableOpacity, Text, View, Switch } from "react-native";
import { useRouter } from "expo-router";
import { Device } from "../../types/types";

interface DeviceCardProps {
  device: Device;
  categoryId: string;
}

export default function DeviceCard({ device, categoryId }: DeviceCardProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white p-4 m-2 rounded-lg shadow-sm flex-row items-center justify-between"
      onPress={() => router.push(`/devices/${categoryId}/${device.id}`)}
    >
      <View>
        <Text className="text-lg font-bold">{device.name}</Text>
        <Text
          className={`text-sm ${device.status === "Online" ? "text-green-500" : "text-red-500"}`}
        >
          {device.status}
        </Text>
        <Text className="text-gray-500 text-xs mt-1">{device.description}</Text>
      </View>
      <Switch value={device.status === "Online"} />
    </TouchableOpacity>
  );
}

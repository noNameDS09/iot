import { View, Text, ScrollView, Dimensions } from 'react-native';
import { LineChart, PieChart } from 'react-native-chart-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const horizontalPadding = 16 * 2;

export default function DashboardScreen() {
  const insets = useSafeAreaInsets();

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const hours = Array.from({ length: 24 }, (_, i) => i);

  const generateUsageGrid = () => {
    return days.map(() =>
      hours.map(() => {
        const isActive = Math.random() > 0.6;
        const intensity = Math.floor(Math.random() * 3);
        return isActive ? intensity : null;
      })
    );
  };

  const usageGrid = generateUsageGrid();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: 'white',
        paddingTop: insets.top,
      }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
    >
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Analytics</Text>

      {/* Line Chart */}
      <View style={{ backgroundColor: '#f3f4f6', borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>
          Overall Energy Consumption (Last 7 Days)
        </Text>
        <LineChart
          data={{
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{ data: [270, 230, 280, 220, 240, 210, 360] }],
          }}
          width={screenWidth - horizontalPadding - 32}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: () => '#3b82f6',
            labelColor: () => '#000000',
            strokeWidth: 2,
            decimalPlaces: 0,
          }}
          bezier
          style={{ borderRadius: 12 }}
        />
      </View>

      {/* Pie Chart */}
      <View style={{ backgroundColor: '#f3f4f6', borderRadius: 16, padding: 16, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Consumption by Category</Text>
        <PieChart
          data={[
            { name: 'Lighting', population: 237, color: '#facc15', legendFontColor: '#000', legendFontSize: 14 },
            { name: 'Machinery', population: 305, color: '#22c55e', legendFontColor: '#000', legendFontSize: 14 },
            { name: 'HVAC', population: 209, color: '#ef4444', legendFontColor: '#000', legendFontSize: 14 },
            { name: 'Computers', population: 186, color: '#3b82f6', legendFontColor: '#000', legendFontSize: 14 },
            { name: 'Others', population: 73, color: '#a855f7', legendFontColor: '#000', legendFontSize: 14 },
          ]}
          width={screenWidth - horizontalPadding - 32}
          height={220}
          chartConfig={{
            color: () => '#000',
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      </View>

      {/* Heatmap */}
      <View style={{ backgroundColor: '#f3f4f6', borderRadius: 16, padding: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Peak Usage Hours</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={{ flexDirection: 'row', marginBottom: 8, marginLeft: 20 }}>
              {hours.map((hour) => (
                <Text
                  key={`hour-${hour}`}
                  style={{ width: 24, textAlign: 'center', fontSize: 12, color: '#6b7280' }}
                >
                  {hour.toString().padStart(2, '0')}
                </Text>
              ))}
            </View>

            {usageGrid.map((row, rowIndex) => (
              <View key={`row-${rowIndex}`} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                <Text style={{ width: 20, fontSize: 12, marginRight: 4 }}>{days[rowIndex]}</Text>
                {row.map((cell, colIndex) => {
                  let bgColor = '#e5e7eb';
                  if (cell === 1) bgColor = '#60a5fa';
                  if (cell === 2) bgColor = '#ef4444';

                  return (
                    <View
                      key={`cell-${rowIndex}-${colIndex}`}
                      style={{
                        width: 20,
                        height: 20,
                        marginRight: 4,
                        borderRadius: 4,
                        backgroundColor: bgColor,
                      }}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  );
}

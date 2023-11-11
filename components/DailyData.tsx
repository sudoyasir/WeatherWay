import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { NAV_BACKGROUND_COLOR } from "../constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Props
interface Props {
  dayData: string[];
  tempData: any;
}

// Screen height and Width
const { width } = Dimensions.get("window");

import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

const DailyData: React.FC<Props> = ({ dayData, tempData }) => {
  // Adding °C to the Y Axis
  const formatYAxisLabel = (label: string) => `${label} °C`;

  return (
    <View style={styles.main}>
      <LineChart
        data={{
          labels: dayData,
          datasets: [
            {
              data: tempData,
            },
          ],
        }}
        width={width - 40} // from react-native
        height={115}
        withInnerLines={false}
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: NAV_BACKGROUND_COLOR,
          backgroundGradientFrom: NAV_BACKGROUND_COLOR,
          backgroundGradientTo: NAV_BACKGROUND_COLOR,
          decimalPlaces: 1, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(230, 230, 230, ${opacity})`,
          style: {
            borderRadius: 25,
          },
          propsForDots: {
            r: "4",
            strokeWidth: "2",
            stroke: NAV_BACKGROUND_COLOR,
          },
        }}
        bezier
        style={{
          borderRadius: 15,
          alignSelf: "center",
          paddingBottom: 50,
        }}
        formatYLabel={formatYAxisLabel} // Use the custom formatting function
      />
    </View>
  );
};

export default DailyData;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    marginHorizontal: "auto",
  },
});

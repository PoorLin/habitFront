import { FC } from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';
import { HabitRecordProp } from "../model/habit";

interface ChartComponentProps {
    data: HabitRecordProp[]; // 定义 data 属性类型为 HabitRecordProp[]
  }

export const ChartComponent:FC<ChartComponentProps> =({data})=>{

    return(
            <div className="column is-12 mr-6">
        <VictoryChart
          // domainPadding will add space to each side of VictoryBar to
          // prevent it from overlapping the axis
          domainPadding={20}

        >
          <VictoryAxis
            // tickValues specifies both the number of ticks and where
            // they are placed on the axis
            tickValues={[1, 2, 3, 4]}
            tickFormat={["你的紀錄", "大家的紀錄"]}
          />
          <VictoryAxis
            dependentAxis
            // tickFormat specifies how ticks should be displayed
            tickFormat={(y) => (`${y*100}%`)}
          />
          <VictoryBar
            data={data}
            x="user"
            y="hr"
          />
        </VictoryChart>
      </div>
    )
}
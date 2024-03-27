import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';
import { HabitProp } from "../model/EditProp";
import { getUserHabitAPI, makeChartAPI } from "../api/habitAPI";
import Cookies from 'js-cookie';
import { HabitRecordProp, MakeChartResProp } from "../model/habit";
import { ChartComponent } from "./ChartComponent";


export const HabitRecord: FC = () => {
  const [select, setSelect] = useState<string>('')
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [isReturnData, setIsReturnData] = useState<boolean>(false)
  const [chartMy,setChartMy] = useState<HabitRecordProp>()
  const [chartAll,setChartAll] = useState<HabitRecordProp>()
  const handleOCSelect: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    setSelect(e.target.value)
    const habitName = e.target.value
    const userId = parseInt(Cookies.get("userId")!)
    const res = await makeChartAPI({habitName, userId });
    setIsSelect(true);
    if(res.returnCode === 200){
      console.log(res.data)
      const resData:MakeChartResProp=res.data!;
      if(resData.myAllSuccess === 0 || resData.myAll == 0){
        setChartMy({user:1,hr:0})
      }else{
        setChartMy({user:1,hr:resData.myAllSuccess/resData.myAll})
      }
      if(resData.myAllSuccess === 0 || resData.myAll === 0){
        setChartAll({user:2,hr:0})
      }else{
        setChartAll({user:2,hr:resData.allUserAllSuccess/resData.allUserAll})
      }

    }

  }
  const [habitArr, setHabitArr] = useState<HabitProp[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const userId = Cookies.get('userId')
      const res = await getUserHabitAPI(parseInt(userId!));
      setHabitArr(res.data);
    };
    fetchData();
  }, []);



  return (
    <div className="columns mt-6 is-multiline">

      <div className="column is-12">    <h1>習慣養成情形</h1></div>

      <div >
        {habitArr?.length! > 0 ? (

          <div className="select is-normal">
            <select value={select} onChange={handleOCSelect}>
         {   !isSelect && <option>請選擇欲察看的習慣圖表</option>}
              {habitArr.map(item => (
                <option value={item.habitName}>{item.habitName}</option>
              ))}

            </select>
          </div>

        ) : (
          <div><h1>您尚未建立新習慣</h1></div>

        )}
          
        




      </div>
      <div>
      {isSelect && <ChartComponent data={[chartMy!,chartAll!]}  />}
      </div>
  
    </div>


  )
}
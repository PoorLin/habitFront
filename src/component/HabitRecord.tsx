import { ChangeEventHandler, FC, useEffect, useState } from "react";
import { VictoryChart, VictoryAxis, VictoryBar } from 'victory';
import { HabitProp } from "../model/EditProp";
import { getUserHabitAPI } from "../api/habitAPI";
import Cookies from 'js-cookie';
import { HabitRecordProp, HabitSuccRate, MakeChartResProp } from "../model/habit";
import { ChartComponent } from "./ChartComponent";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { findSuccRateAPI, findSuccRateYMAPI, findSuccRateYearAPI, getHrExistYMAPI, getHrExistYearsAPI } from "../api/UserAPI";


export const HabitRecord: FC = () => {
  const [succCount, setSuccCount] = useState<number>()
  const [failCount, setFailCount] = useState<number>()
  const [nowSelected, setNowSelected] = useState<string>()
  const [existYear, setExistYear] = useState<number[]>()
  const [existYM, setExistYM] = useState<string[]>()

  const [nowSelectedYear, setNowSelectedYear] = useState<string>()
  const [nowSelectedYM, setNowSelectedYM] = useState<string>()
  const [isSelect, setIsSelect] = useState<boolean>(false)
  const [isReturnData, setIsReturnData] = useState<boolean>(false)
  const [chartMy, setChartMy] = useState<HabitRecordProp>()
  const [chartAll, setChartAll] = useState<HabitRecordProp>()

  const [selectedYear, setSelectedYear] = useState(null);

  const handleSelectYear: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    const userId = Cookies.get('userId')
    setNowSelectedYear(e.target.value);
    const res = (await findSuccRateYearAPI(userId, e.target.value)).data;
    res.map((item) => {
      if (item.is_success == 0) {
        setFailCount(item.succCount)
      } else {
        setSuccCount(item.succCount)
      }
    })

  }



  const handleSelectYM: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    const userId = Cookies.get('userId')
    setNowSelectedYM(e.target.value);
    const res = (await findSuccRateYMAPI(userId, e.target.value)).data;
    res.map((item) => {
      if (item.is_success == 0) {
        setFailCount(item.succCount)
      } else {
        setSuccCount(item.succCount)
      }
    })

  }


  const handleOCSelect: ChangeEventHandler<HTMLSelectElement> = async (e) => {
    const target = e.target.value;
    const userId = Cookies.get('userId');
    const token = Cookies.get('token');
    setNowSelected(target)
    if (target == '-3') {
      //選擇總表
      
      const res = await getUserHabitAPI({
        userId:parseInt(userId!),
        token:token!
      });
      const succRate = (await findSuccRateAPI(parseInt(userId!))).data;
      succRate.map((item) => {
        if (item.is_success == 0) {
          setFailCount(item.succCount)
        } else {
          setSuccCount(item.succCount)
        }
      })

    } else if (target == '-2') {
      //選擇年度報表
      const existYear = (await getHrExistYearsAPI(parseInt(userId!))).data;
      setExistYear(existYear);


    } else if (target == '-1') {
      //選擇月報表
      const existYM = (await getHrExistYMAPI(parseInt(userId!))).data;
      setExistYM(existYM);

    } else {

    }
    const habitName = target



    // const res = await makeChartAPI({habitName, userId });
    // setIsSelect(true);
    // if(res.returnCode === 200){

    //   const resData:MakeChartResProp=res.data!;
    //   if(resData.myAllSuccess === 0 || resData.myAll == 0){
    //     setChartMy({user:1,hr:0})
    //   }else{
    //     setChartMy({user:1,hr:resData.myAllSuccess/resData.myAll})
    //   }
    //   if(resData.myAllSuccess === 0 || resData.myAll === 0){
    //     setChartAll({user:2,hr:0})
    //   }else{
    //     setChartAll({user:2,hr:resData.allUserAllSuccess/resData.allUserAll})
    //   }

    // }

  }
  const [habitArr, setHabitArr] = useState<HabitProp[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const userId = Cookies.get('userId')
      const token = Cookies.get('token')
      const res = await getUserHabitAPI({
        userId:parseInt(userId!),
        token:token!
      });
      setHabitArr(res.data);
      const succRate = (await findSuccRateAPI(parseInt(userId!))).data;
      succRate.map((item) => {
        if (item.is_success == 0) {
          setFailCount(item.succCount)
        } else {
          setSuccCount(item.succCount)
        }
      })

    };
    fetchData();
  }, []);



  return (
    <div className="columns mt-6 is-multiline">

      <div className="column is-12">    <h1 className="slogan">習慣養成情形</h1></div>
      <h3 className="text-center">選擇報表種類</h3>
      <div >
        {habitArr?.length! > 0 ? (
          <div className=" record-container">
            <div className="">
              <select className="select fs-16" value={nowSelected} onChange={handleOCSelect}>
                <option value="-3">總體報表</option>
                <option value="-2">年度報表</option>
                <option value="-1">月報表</option>
                {/* {habitArr.map(item => (
                <option value={item.habitName}>{item.habitName}</option>
              ))} */}

              </select>



            </div>

            {
              nowSelected == "-2" ? (

                <div className="mg-4">
                   <h3 className="text-center">選擇年分</h3>
                  <select className="select fs-16" value={nowSelectedYear} onChange={handleSelectYear}>
                    {existYear?.map(item => (
                      <option key={item} value={item}>{item}</option>
                    ))}

                  </select>


                </div>)
                : nowSelected == "-1" ? (
                  <div className="mg-4">
                        <h3 className="text-center">選擇月份</h3>
                  <select className="select fs-16" value={nowSelectedYM}  onChange={handleSelectYM}>
                  {existYM?.map(item => (
                    <option key={item} value={item}>{item}</option>
                  ))}

                </select>
                </div>
                  )
                : (<></>)

            }



            <div className="col-2 mg-l1 card inline">
              <div className="text-center card-header">全部執行數</div>
              <div className="succCard card-content"> {succCount}次</div></div>

            <div className="col-2 mg-l1 card inline ">
              <div className="text-center card-header">未執行</div>
              <div className="succCard card-content">{failCount}次 </div></div>


            <div className="col-2 mg-l1 card inline">
              <div className="text-center card-header">執行率</div>
              <div className="succCard card-content"> {Math.floor(succCount! * 100 / (succCount! + failCount!))}%</div></div>


          </div>


        ) : (
          <div><h1>您尚未建立新習慣</h1></div>

        )}






      </div>
      <div>




        {/* {isSelect && <ChartComponent data={[chartMy!,chartAll!]}  />} */}
      </div>

    </div>


  )
}
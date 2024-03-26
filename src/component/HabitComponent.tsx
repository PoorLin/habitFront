import { faPlus, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react";
import { createHabitAPI, deleteUserHabit, getUserHabit, updateHabitAPI, updateHabitStatusAPI } from "../api/habitAPI";
import { Habit, HabitStatus, NewHabit } from "../model/habit";
import { EditHabit } from "./EditHabit";
import Cookies from 'js-cookie';
import { HabitProp } from "../model/EditProp";
import Swal from 'sweetalert2';
import { ERROR_Habit, ERROR_Habit_TYPE, INIT_TYPE } from "../const/commonConst";
import { showError, showErrorNoText, showSuccess } from "../utils/apiUtil";
import { it } from "node:test";

export const HabitComponent: FC = () => {
  const fetchData = async () => {
    const userId = Cookies.get('userId')
    const res = await getUserHabit(parseInt(userId!));
    setHabitArr(res.data);

  };
  const [habitArr, setHabitArr] = useState<HabitProp[]>([])
  useEffect(() => {
    fetchData();
  }, []);


  const [creating, setCreating] = useState<boolean>(false);
  const [hasChange, setHasChange] = useState<boolean>(false);
  const [editHabitName, setEditHabitName] = useState<string>();
  const [editHabitId, setEditHabitId] = useState<number>();
  const showCreate: MouseEventHandler<HTMLAnchorElement> = () => {
    setCreating(true);
  }

  const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value;
    console.log(newValue);
    // 在这里更新状态或执行其他逻辑
    setHasChange(!hasChange);
  };
  const handleCreateNewHabit = async (newHabit: NewHabit) => {
    console.log(newHabit)
    const userId = parseInt(Cookies.get('userId')!);
    if (newHabit.newHabitName == '') {
      showErrorNoText(ERROR_Habit)
    } else if (newHabit.newHabitType == INIT_TYPE) {
      showErrorNoText(ERROR_Habit_TYPE)
    }
    else {
      const setToHabit = await createHabitAPI({
        userId: userId,
        habitName: newHabit.newHabitName,
        type: newHabit.newHabitType

      });

      Swal.fire({
        title: '成功建立!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK',
      })
      setHabitArr([...habitArr, setToHabit.data])

    }



  }
  const handleOnCancel = () => {
    setCreating(false);
  }



  return (


    <>



      <h2 className="slogan">
        ~每天進步1%，一年後你將進步37倍~
      </h2>




     <div className="container">
      <div className="col-12">
      {habitArr?.length! > 0 && (<div>
        <table className="table">
          <thead>
            <tr>
              <th >名稱</th>
              <th >今日執行狀況</th>
              <th></th>
              <th >建立日期</th>
            </tr>
          </thead>
          <tbody>
            {habitArr.map(item => (

              <tr key={item.habitId}>
                <td >{item.habitName}</td>
                <td >
                  {item.type === 0 ? (<>
                    {/* 量化輸入值 區塊 */}
                    <label htmlFor="">{item.habitName} : </label>
                    <input type="text" name={`${item.habitId}`} value={item.status} onChange={handleChange}
                     onBlur={       async (e) => {
                          const status = parseInt(e.target.value);
                          if(status <0 || status> 21474830){
                            showErrorNoText('請輸入正常數字')
                          }else{

                            const habitId = parseInt(e.currentTarget.getAttribute('name')!)
                            const res = await updateHabitStatusAPI({ habitId, status });
                            console.log(res)
                            const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, status }]
                              setHabitArr(updateArr);
                              showSuccess('成功')
                            }

                          }

                       



                        } }
                    
                    />

                  </>) : (<>
                    {/* 非量化輸入值 區塊 */}

                    <label htmlFor=""> 未完成
                      <input type="radio" value={HabitStatus.UNDO} name={`${item.habitId}`} checked={item.status === HabitStatus.UNDO} onChange={
                        async (e) => {
                          const status = parseInt(e.target.value);
                          const habitId = parseInt(e.currentTarget.getAttribute('name')!)
                          const res = await updateHabitStatusAPI({ habitId, status });
                          console.log(res)
                          const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                          if (indexToUpdate !== -1) {
                            const target = habitArr[indexToUpdate];
                            habitArr.splice(indexToUpdate, 1);
                            const updateArr = [...habitArr, { ...target, status }]
                            setHabitArr(updateArr);
                            showSuccess('設定成功')
                          }



                        }} />
                    </label>

                    <label htmlFor=""> 已完成
                      <input type="radio" value={HabitStatus.DONE} name={`${item.habitId}`} checked={item.status === HabitStatus.DONE} onChange={
                        async (e) => {
                          const status = parseInt(e.target.value);
                          const habitId = parseInt(e.currentTarget.getAttribute('name')!)
                          const res = await updateHabitStatusAPI({ habitId, status });

                          console.log(res)
                          const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                          if (indexToUpdate !== -1) {
                            const target = habitArr[indexToUpdate];
                            habitArr.splice(indexToUpdate, 1);
                            const updateArr = [...habitArr, { ...target, status }]
                            setHabitArr(updateArr);
                            showSuccess('設定成功')
                          }




                        }} />
                    </label>

                  </>

                  )


                  }

                </td>
                <td className="">
                 <a className="edit">
                  <FontAwesomeIcon className="is-clickable" icon={fas.faEdit} data-id={item.habitId} data-name={item.habitName} data-t={item.type} data-s={item.status} onClick={(e) => {

                    const habitId = parseInt(e.currentTarget.getAttribute('data-id')!);
                    const beforehabitName = (e.currentTarget.getAttribute('data-name')!);
                    const beforehabitType = parseInt(e.currentTarget.getAttribute('data-t')!);
                    const beforehabitStatus = parseInt(e.currentTarget.getAttribute('data-s')!);
                        
                          console.log(beforehabitStatus)
                          console.log(item.status)
                    if(beforehabitType === 1 ){
                      Swal.fire({
                        title: '編輯習慣',
                        html:
                          `<div class='swal-update-habit'><label> 習慣名稱 :<label/> <input id="input1" type="text" value=${beforehabitName} class="swal2-input" placeholder="輸入密碼">` +           
                          `<label> 執行狀況 :<label/><br><label> 未完成 :<input name="input2" value='0' type="radio"  class="" ${beforehabitStatus === 0 ? 'checked' : ''}>`+
                          `<label> 已完成 :<input name="input2" type="radio"  class="" value='1' ${beforehabitStatus === 1 ? 'checked' : ''}>`+
                          `</div>`,
                        showCancelButton: true,
                        confirmButtonText: '送出',
                        cancelButtonText: '取消',
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                          const input1 = document.querySelector('#input1') as HTMLInputElement;
                          const input2 = document.querySelector('input[name="input2"]:checked') as HTMLInputElement;
                      
                          const habitName = input1.value;
                          const status = parseInt(input2.value);
                           console.log(status)
                
                          if (beforehabitName === habitName && status == beforehabitStatus) {
                            showSuccess('修改成功!')
                           }else{
                            const data = await updateHabitAPI({ habitId, habitName,status })
                            const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, habitName,status }]
                              setHabitArr(updateArr);
                            }
                            Swal.fire({
                              title: "修改成功!",
                              icon: "success"
                            });
                           }
                     
  

                        },
                   
                      })









                    }else{


                      Swal.fire({
                        title: '編輯習慣',
                        html:
                          `<div class='swal-update-habit'><label> 習慣名稱 :<label/> <input id="input1" type="text" value=${beforehabitName} class="swal2-input" >` +
                      
                          `<label> 執行狀況 :<label/><input id="input2" type="text" value=${beforehabitStatus} class="swal2-input"></div>`,
                        showCancelButton: true,
                        confirmButtonText: '送出',
                        cancelButtonText: '取消',
                        showLoaderOnConfirm: true,
                        preConfirm: async () => {
                          const input1 = document.querySelector('#input1') as HTMLInputElement;
                          const input2 = document.querySelector('#input2') as HTMLInputElement;
                      
                          const habitName = input1.value;
                          const status = parseInt(input2.value);
                          const data = await updateHabitAPI({ habitId, habitName,status })
                          if (beforehabitName === habitName) {
                            showSuccess('修改成功!')
                          } else {
                            const data = await updateHabitAPI({ habitId, habitName,status })
                            const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, habitName,status }]
                              setHabitArr(updateArr);
                            }
                            Swal.fire({
                              title: "修改成功!",
                              icon: "success"
                            });
  
                          }
  
  
                        },
               
                      })

                    }
                 








                  }}
                  
                  />

</a>
<a className="delete" >
                  <FontAwesomeIcon icon={fas.faTrash} 
                    onClick={async () => {

                      Swal.fire({
                        title: "你確定嗎?",
                        text: "刪除後不能復原!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "OK!"
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          await deleteUserHabit(item.habitId)
                          const indexToDelete = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);

                          if (indexToDelete !== -1) {
                            const updatedArr = [...habitArr];
                            updatedArr.splice(indexToDelete, 1);
                            setHabitArr(updatedArr);
                          }
                          showSuccess('刪除成功')
                        }
                      });
                    }
                    }
                  />
</a>

                </td>
                <td className="has-text-centered">{item.startDate.toString().substring(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
      </div>
</div>

      {
        creating && <div className="create-habit-container">
          <EditHabit onSave={handleCreateNewHabit} onCancel={handleOnCancel} />
        </div>

      }

      {
        !creating &&
        <div className="create-habit-container">
          <a onClick={showCreate}>養成新習慣 <FontAwesomeIcon icon={fas.faPlus} /></a>

        </div>
      }

    </>




  )
}
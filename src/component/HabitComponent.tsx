import { faPlus, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react";
import { createHabitAPI, deleteUserHabit, getUserHabit, updateHabitAPI, updateHabitStatusAPI } from "../api/habitAPI";
import { Habit, HabitStatus, NewHabit } from "../model/habit";
import { EditHabit } from "./EditHabit";
import Cookies from 'js-cookie';
import { HabitProp } from "../model/EditProp";
import Swal from 'sweetalert2';

export const HabitComponent: FC = () => {
  const [habitArr, setHabitArr] = useState<HabitProp[]>([])
  useEffect(() => {
    const fetchData = async () => {
      const userId = Cookies.get('userId')
      const res = await getUserHabit(parseInt(userId!));
      setHabitArr(res.data);
    };
    fetchData();
  }, []);


  const [creating, setCreating] = useState<boolean>(false);
  const [editHabitName, setEditHabitName] = useState<string>();
  const [editHabitId, setEditHabitId] = useState<number>();
  const showCreate: MouseEventHandler<HTMLAnchorElement> = () => {
    setCreating(true);
  }

  const handleCreateNewHabit = async (newHabitName: string) => {
    const userId = parseInt(Cookies.get('userId')!);

    Swal.fire({
      title: '建立成功!',
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'OK',
    }).then(async () => {
      const setToHabit = await createHabitAPI({
        userId: userId,
        habitName: newHabitName
      });
      const setToArr: HabitProp = setToHabit.data;
      setHabitArr([...habitArr, setToArr]);
      setCreating(false);

    });


  }
  const handleOnCancel = () => {
    setCreating(false);
  }



  return (


    <div >
       <div className="p-0 column is-12 ">
    <section className="section p-5">
  <h1 className="title ">您的習慣列表</h1>
  <h2 className="subtitle">
    每天進步1%，一年後你將進步37倍
  </h2>
</section>
    </div>
     


        {habitArr?.length! > 0 && (  <div>
          <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth mt-6">
            <thead>
              <tr>
                <th className="has-text-centered">名稱</th>
                <th className="has-text-centered">今日執行狀況</th>
                <th></th>
                <th className="has-text-centered">建立日期</th>
              </tr>
            </thead>
            <tbody>
              {habitArr.map(item => (

                <tr key={item.habitId}>
                  <td className="has-text-centered">{item.habitName}</td>
                  <td className="has-text-centered">
                    <label htmlFor=""> 尚未 
                    <input type="radio" value={HabitStatus.UNDO} name={`${item.habitId}`}  checked={item.status === HabitStatus.UNDO} onChange={
async (e)=>{
const status=parseInt(e.target.value);
const habitId = parseInt(e.currentTarget.getAttribute('name')!)
const res =await updateHabitStatusAPI({habitId,status});
if(res.returnCode === 200){

  const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, status }]
                              setHabitArr(updateArr);
                            }

  
}else{

}

                     } }/> 
                    </label>
                    <label htmlFor=""> 已完成 
                    <input type="radio" value={HabitStatus.DONE} name={`${item.habitId}`} checked={item.status === HabitStatus.DONE} onChange={
async (e)=>{
const status=parseInt(e.target.value);
const habitId = parseInt(e.currentTarget.getAttribute('name')!)
const res =await updateHabitStatusAPI({habitId,status});
if(res.returnCode === 200){

  const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, status }]
                              setHabitArr(updateArr);
                            }

  
}else{

}

                     } }/> 
                    </label>
                    <label htmlFor=""> 未完成
                    <input type="radio" value={HabitStatus.FAILED} name={`${item.habitId}`}  checked={item.status === HabitStatus.FAILED} onChange={
async (e)=>{
const status=parseInt(e.target.value);
const habitId = parseInt(e.currentTarget.getAttribute('name')!)
const res =await updateHabitStatusAPI({habitId,status});
if(res.returnCode === 200){

  const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, status }]
                              setHabitArr(updateArr);
                            }

  
}else{

}

                     } }/>
                    </label>
                    </td>
                  <td className="has-text-centered">

                    <FontAwesomeIcon className="is-clickable" icon={fas.faEdit} data-id={item.habitId} data-name={item.habitName} onClick={(e) => {

                      const habitId = parseInt(e.currentTarget.getAttribute('data-id')!)
                      const beforehabitName = (e.currentTarget.getAttribute('data-name')!)


                      Swal.fire({
                        title: "修改",
                        input: "text",
                        inputValue: beforehabitName!,
                        inputAttributes: {
                          autocapitalize: "off"
                        },
                        showCancelButton: true,
                        confirmButtonText: "送出",
                        cancelButtonText: "取消",
                        showLoaderOnConfirm: true,
                        preConfirm: async (habitName) => {
                          const data= await updateHabitAPI({ habitId, habitName })
                          if(beforehabitName === habitName ){

                          }else if(data.returnCode !== 200){
                            return Swal.showValidationMessage(`
                            已有相同名稱
                          `);
                          }else{
                            const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                            if (indexToUpdate !== -1) {
                              const target = habitArr[indexToUpdate];
                              habitArr.splice(indexToUpdate, 1);
                              const updateArr = [...habitArr, { ...target, habitName }]
                              setHabitArr(updateArr);
                            }
                            Swal.fire({
                              title: "修改成功!",
                              text: "Your Habit has been deleted.",
                              icon: "success"
                            });

                          }
                      

                        },
                        allowOutsideClick: () => !Swal.isLoading()
                      })








                    }}
                    />


                    <FontAwesomeIcon icon={fas.faTrash} className="ml-5 is-clickable"
                      onClick={async () => {

                        Swal.fire({
                          title: "你確定嗎?",
                          text: "刪除後不能復原紀錄!",
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
                            Swal.fire({
                              title: "刪除成功!",
                              text: "Your Habit has been deleted.",
                              icon: "success"
                            });
                          }
                        });
                      }
                      }
                    />

                  </td>
                  <td className="has-text-centered">{item.startDate.toString().substring(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}
      
      <div className="m-6">
        {
          creating && <div>
            <EditHabit onSave={handleCreateNewHabit} onCancel={handleOnCancel} />
          </div>

        }
      </div>
      {
        !creating &&
        <div className="m-6">
          <a onClick={showCreate}>養成新習慣 <FontAwesomeIcon icon={fas.faPlus} /></a>

        </div>
      }

    </div>




  )
}
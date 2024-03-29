import { faPlus, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { deleteUserHabitAPI, getUserHabitAPI, } from "../api/habitAPI";
import { HabitStatus } from "../model/habit";
import Cookies from 'js-cookie';
import { HabitProp } from "../model/EditProp";
import Swal from 'sweetalert2';
import { CREATE_HABIT_URL, HABIT_EDIT } from "../const/commonConst";
import { showErrorNoText, showSuccess } from "../utils/apiUtil";
import { useNavigate } from "react-router-dom";




export const HabitComponent: FC = () => {
  const navigate = useNavigate();

  const fetchData = async () => {
    const userId = Cookies.get('userId')
    const res = await getUserHabitAPI(parseInt(userId!));
    setHabitArr(res.data);

  };
  const [habitArr, setHabitArr] = useState<HabitProp[]>([])
  useEffect(() => {
    fetchData();
  }, []);



  return (

    <>

      <h2 className="slogan">

        ~每天進步1%，一年後你將進步37倍 😊~
      </h2>

      <div className="container">
        <div className="col-12">
          {habitArr?.length! > 0 ? (<div>
            <table className="table">
              <thead>
                <tr>
                  <th >名稱</th>
                  <th >最近的狀況</th>
                  <th>編輯</th>
                  <th >建立日期</th>
                </tr>
              </thead>
              <tbody>
                {habitArr.map(item => (

                  <tr key={item.habitId}>
                    <td >{item.habitName}</td>
                    <td >
                   



                    </td>
                    <td className="">
                      <a className="edit">
                        <FontAwesomeIcon icon={fas.faEdit} data-id={item.habitId} data-name={item.habitName} data-t={item.type} data-s={item.status} onClick={(e) => {
                          navigate(`${HABIT_EDIT}${item.habitId}`)

                          // const habitId = parseInt(e.currentTarget.getAttribute('data-id')!);
                          // const beforehabitName = (e.currentTarget.getAttribute('data-name')!);
                          // const beforehabitType = parseInt(e.currentTarget.getAttribute('data-t')!);
                          // const beforehabitStatus = parseInt(e.currentTarget.getAttribute('data-s')!);
                          // if (beforehabitType === 1) {
                          //   Swal.fire({
                          //     title: '編輯習慣',
                          //     html:
                          //       `<div class='swal-update-habit'><label> 習慣名稱 :<label/> <input id="input1" type="text" value=${beforehabitName} class="swal2-input" placeholder="輸入密碼">` +
                          //       `<label> 執行狀況 :<label/><br><label> 未完成 :<input name="input2" value='0' type="radio"  class="" ${beforehabitStatus === 0 ? 'checked' : ''}>` +
                          //       `<label> 已完成 :<input name="input2" type="radio"  class="" value='1' ${beforehabitStatus === 1 ? 'checked' : ''}>` +
                          //       `</div>`,
                          //     showCancelButton: true,
                          //     confirmButtonText: '送出',
                          //     cancelButtonText: '取消',
                          //     showLoaderOnConfirm: true,
                          //     preConfirm: async () => {
                          //       const input1 = document.querySelector('#input1') as HTMLInputElement;
                          //       const input2 = document.querySelector('input[name="input2"]:checked') as HTMLInputElement;

                          //       const habitName = input1.value;
                          //       const status = parseInt(input2.value);


                          //       if (beforehabitName === habitName && status == beforehabitStatus) {
                          //         showSuccess('修改成功!')
                          //       } else {
                          //         const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                          //         if (indexToUpdate !== -1) {
                          //           const target = habitArr[indexToUpdate];
                          //           habitArr.splice(indexToUpdate, 1);
                          //           const updateArr = [...habitArr, { ...target, habitName, status }]
                          //           console.log(updateArr)
                          //           setHabitArr(updateArr);
                          //         }
                          //         Swal.fire({
                          //           title: "修改成功!",
                          //           icon: "success"
                          //         });
                          //       }
                          //     },
                          //   })
                          // } else {


                          //   Swal.fire({
                          //     title: '編輯習慣',
                          //     html:
                          //       `<div class='swal-update-habit'><label> 習慣名稱 :<label/> <input id="input1" type="text" value=${beforehabitName} class="swal2-input" >` +

                          //       `<label> 執行狀況 :<label/><input id="input2" type="text" value=${beforehabitStatus} class="swal2-input"></div>`,
                          //     showCancelButton: true,
                          //     confirmButtonText: '送出',
                          //     cancelButtonText: '取消',
                          //     showLoaderOnConfirm: true,
                          //     preConfirm: async () => {
                          //       const input1 = document.querySelector('#input1') as HTMLInputElement;
                          //       const input2 = document.querySelector('#input2') as HTMLInputElement;
                          //       const habitName = input1.value;
                          //       const status = parseInt(input2.value);
                          //       console.log(status)

                          //       if (beforehabitName === habitName && status == beforehabitStatus) {
                          //         showSuccess('修改成功!')
                          //       } else {

                          //         await updateHabitAPI({ habitId, habitName, status })
                          //         const indexToUpdate = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                          //         console.log(indexToUpdate)
                          //         if (indexToUpdate !== -1) {
                          //           const target = habitArr[indexToUpdate];
                          //           habitArr.splice(indexToUpdate, 1);
                          //           console.log(habitArr)
                          //           const updateArr = [...habitArr, { ...target, habitName, status }]
                          //           console.log(updateArr)
                          //           setHabitArr(updateArr);
                          //         }
                          //         Swal.fire({
                          //           title: "修改成功!",
                          //           icon: "success"
                          //         });

                          //       }


                          //     },

                          //   })

                          // }









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
                                await deleteUserHabitAPI(item.habitId)
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
          ) : (<div>  開始您的第一個習慣😊，請點選右下角的按鈕 </div>)



          }
        </div>
      </div>
      <a className="create-btn" href={CREATE_HABIT_URL}><FontAwesomeIcon icon={fas.faPlus} /></a>
      {/* {
        creating && <div className="create-habit-container">
          <EditHabit onSave={handleCreateNewHabit} onCancel={handleOnCancel} />
        </div>

      }

      {
        !creating &&
        <div className="create-habit-container">
          <a onClick={showCreate}>養成新習慣 <FontAwesomeIcon icon={fas.faPlus} /></a>

        </div>
      } */}



    </>




  )
}



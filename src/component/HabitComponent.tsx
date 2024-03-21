import { faPlus, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react";
import { createHabitAPI, deleteUserHabit, getUserHabit } from "../api/habitAPI";
import { Habit, NewHabit } from "../model/habit";
import { EditHabit } from "./EditHabit";
import Cookies from 'js-cookie';
import { HabitProp } from "../model/EditProp";


export const HabitComponent: FC = () => {
    const [habitArr,setHabitArr] = useState<HabitProp[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const userId=Cookies.get('userId')
            const res=await getUserHabit(parseInt(userId!));
            setHabitArr(res.data);
        };
         fetchData();
      }, []);


    const [creating, setCreating] = useState<boolean>(false);
    const showCreate: MouseEventHandler<HTMLAnchorElement> = () => {
        setCreating(true);
    }
    
    const handleCreateNewHabit =async (newHabitName:string) =>{
        const userId=parseInt(Cookies.get('userId')!) ;
        const setToHabit=await createHabitAPI({
            userId:userId,
            habitName: newHabitName
        });
        const setToArr:HabitProp = setToHabit.data;
        setHabitArr([...habitArr,setToArr]);
        setCreating(false); 
    }
    const handleOnCancel = () =>{
     setCreating(false);
    }
    


    return (

         
            <div >
                <div>
            {habitArr?.length!>0 && (
        <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth mt-6">
          <thead>
            <tr>
              <th className="has-text-centered">名稱</th>
              <th className="has-text-centered">建立日期</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {habitArr.map(item => (

              <tr key={item.habitId}>
                <td className="has-text-centered">{item.habitName}</td>
                <td className="has-text-centered">{item.startDate.toString().substring(0, 10)}</td>
                <td className="has-text-centered"><FontAwesomeIcon icon={fas.faEdit} /><FontAwesomeIcon icon={fas.faTrash}  className="ml-5" 
                onClick={async()=>{await deleteUserHabit(item.habitId) 
                    const indexToDelete = habitArr.findIndex((insideitem) => insideitem.habitId === item.habitId);
                    
                    if (indexToDelete !== -1) {
                        const updatedArr = [...habitArr]; 
                        updatedArr.splice(indexToDelete, 1); 
                        setHabitArr(updatedArr); 
                      }
                }}
                /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
           </div>  
                <div className="m-6">
                {
                    creating && <div>
                       <EditHabit onSave={handleCreateNewHabit} onCancel={handleOnCancel}/>
                    </div>

                }
</div>
                {
                    !creating &&
 <div className="m-6">
 <a onClick={showCreate}>養成新習慣 <FontAwesomeIcon icon={fas.faPlus}  /></a>

</div>
                }
               
            </div>
   



    )
}
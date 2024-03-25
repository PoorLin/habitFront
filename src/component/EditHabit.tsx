import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react"
import { EditProp } from "../model/EditProp";
import { INIT_TYPE } from "../const/commonConst";



export const EditHabit:FC<EditProp> = (editProp) =>{

    const [newHabitName, setNewHabit] = useState<string>('');
    const [newHabitType, setNewHabitType] = useState<number>(INIT_TYPE);
    const handleNewHabitOnchange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setNewHabit(e.target.value);
    }
    const handleClickSave:MouseEventHandler<SVGSVGElement> = ()=>{
       editProp.onSave({newHabitName,newHabitType});
    }
    const handleOncancel:MouseEventHandler<SVGSVGElement> = ()=>{
        editProp.onCancel();
     }
    const handleTypeChange = (e) =>{
setNewHabitType(e.target.value);
    }
    return(
        <>
          <label htmlFor="">習慣名稱: </label>
                        <input type="text" onChange={handleNewHabitOnchange} value={newHabitName}/>
                  
                         <select name="" id="" value={newHabitType} onChange={handleTypeChange}>
                         <option   >請選擇類型</option>
                            <option value="0">可量化</option>
                            <option value="1">不可量化</option>
                         </select>
                        <a > <FontAwesomeIcon icon={fas.faFloppyDisk} onClick={handleClickSave}/></a>  <a><FontAwesomeIcon icon={fas.faTrash} onClick={handleOncancel} /></a>
        </>
    )
} 

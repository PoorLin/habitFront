import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react"
import { EditProp } from "../model/EditProp";
import { INIT_TYPE } from "../const/commonConst";
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Picker as Picker2} from 'emoji-mart'

export const EditHabit:FC<EditProp> = (editProp) =>{
    new Picker2({ data })
    const [newHabitName, setNewHabit] = useState<string>('');
    const [emToggle, setEmToggle] = useState<boolean>(false);
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
    const handleToggle = () =>{
        setEmToggle(!emToggle);
    }
    const selectEmo = (e) =>{
        setNewHabit(newHabitName+e.native);
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
<button onClick={handleToggle}>😊</button>
{ emToggle &&   <Picker data={data} onEmojiSelect={selectEmo} />}
 
        </>
    )
} 

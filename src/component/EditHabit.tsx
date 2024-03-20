import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react"
import { EditProp } from "../model/EditProp";

export const EditHabit:FC<EditProp> = (editProp) =>{
    const [newHabitName, setNewHabit] = useState<string>('');
    const handleNewHabitOnchange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setNewHabit(e.target.value);
    }
    const handleClickSave:MouseEventHandler<SVGSVGElement> = ()=>{
       editProp.onSave(newHabitName);
    }
    return(
        <>
          <label htmlFor="">習慣名稱: </label>
                        <input type="text" onChange={handleNewHabitOnchange} value={newHabitName}/>
                        <a > <FontAwesomeIcon icon={fas. faFloppyDisk} onClick={handleClickSave}/></a>  <a><FontAwesomeIcon icon={fas.faTrash} /></a>
        </>
    )
} 

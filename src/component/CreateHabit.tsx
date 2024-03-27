import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react"
import { fas } from "@fortawesome/free-solid-svg-icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Picker as Picker2} from 'emoji-mart'
import { init } from 'emoji-mart'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { INIT_TYPE, NUMBER_NOT_TYPE } from "../const/commonConst";
import { getTagsAPI } from "../api/habitAPI";
export const CreateHabit:FC = () =>{

    const getTags = async () =>{
            const tags=await getTagsAPI();
            console.log(tags)
    }
    useEffect(()=>{
        getTags();
    },[])

    const [newHabitName, setNewHabit] = useState<string>('');
    const [emToggle, setEmToggle] = useState<boolean>(false);
    const [newHabitType, setNewHabitType] = useState<number>(INIT_TYPE);
    const handleNewHabitOnchange:ChangeEventHandler<HTMLInputElement> = (e) =>{
        setNewHabit(e.target.value);
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
    <h2 className="slogan">
      
        建立新習慣
      </h2>
<label htmlFor="">習慣名稱: </label>
<div className="em-container">
{ emToggle &&   <Picker data={data} onEmojiSelect={selectEmo}  style={{ position: 'absolute', top: '-300px', left: '0' }}/>}
</div>
<div className="input-container" >
  <input type="text"  onChange={handleNewHabitOnchange} value={newHabitName}  placeholder="請輸入習慣名稱"/>
  <button onClick={handleToggle}>貼圖😊</button>
</div>


           
<label htmlFor="">習慣類型: </label>
                         <select name="" id="" value={newHabitType} onChange={handleTypeChange}>
                         <option  value="-1" >請選擇類型</option>
                            <option value="0">可量化</option>
                            <option value="1">不可量化</option>
                         </select>
                         {
newHabitType == 0 ? (<>
<label htmlFor="">習慣目標: </label>
<input type="text"  onChange={handleNewHabitOnchange} value={newHabitName}  placeholder="請輸入習慣名稱"/>
<label htmlFor="">選擇單位: </label>
<div className="col-2 inline">
    <button>公里</button>
 
</div>
<div className="col-2 inline">
    <button>公里</button>
 
</div>


</>) :(<></>)
                         }
                    


        </>
    )
}
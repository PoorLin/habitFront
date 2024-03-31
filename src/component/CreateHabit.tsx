import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react"
import { fas } from "@fortawesome/free-solid-svg-icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Picker as Picker2 } from 'emoji-mart'
import { init } from 'emoji-mart'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ERROR_Habit, ERROR_Habit_TARGET, ERROR_Habit_TYPE, INIT_TYPE, NUMBER_NOT_TYPE } from "../const/commonConst";
import { createHabitAPI, getTagsAPI } from "../api/habitAPI";
import { UnitType } from "../model/UnitType";
import { showError, showErrorNoText } from "../utils/apiUtil";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { NewHabit } from "../model/habit";
export const CreateHabit: FC = () => {
    const [unitArr, setUnitArr] = useState<UnitType[]>([]);
    const getTags = async () => {
        const tags = await getTagsAPI();
        setUnitArr(tags.data);

    }
    useEffect(() => {
        getTags();
    }, [])

    const [newHabitName, setNewHabit] = useState<string>('');
    const [habitTarget, setHabitTarget] = useState<number>();
    const [unitType, setUnitType] = useState<number>();
    const [emToggle, setEmToggle] = useState<boolean>(false);
    const [newHabitType, setNewHabitType] = useState<number>(INIT_TYPE);
    const handleNewHabitOnchange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewHabit(e.target.value);
    }

    const handleSelectTag = (e) => {
        setUnitType(e.target.value)
        let tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.classList.remove('selected');
            let selectedTag = document.querySelector('.tag[value="' + e.target.value + '"]');
            selectedTag!.classList.add('selected');
        });

    }

    const handleTypeChange = (e) => {
        setNewHabitType(e.target.value);
    }
    const handleToggle = () => {
        setEmToggle(!emToggle);
    }
    const selectEmo = (e) => {
        setNewHabit(newHabitName + e.native);
    }
    const handleHabitTarget = (e) => {
        if (isNaN(e.target.value)) {
            showErrorNoText('請輸入數字');
        } else {
            setHabitTarget(e.target.value)
        }

    }
    

    const handleCreateNewHabit = async () => {
        const userId = parseInt(Cookies.get('userId')!);
        if (newHabitName == '') {
          showErrorNoText(ERROR_Habit)
        } else if (newHabitType == INIT_TYPE) {
          showErrorNoText(ERROR_Habit_TYPE)
        }else if(habitTarget === 0){
            showErrorNoText(ERROR_Habit_TARGET)
        }
        else {
            await createHabitAPI({
            userId: userId,
            habitName: newHabitName,
            type: newHabitType,
            unitTypeId:unitType,
            habitTarget:habitTarget
    
          });
    
          Swal.fire({
            title: '成功建立!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
         
    
        }
    
       
    
      }

    return (
        <div className="container">
            <h2 className="slogan">

                建立新習慣
            </h2>
            <label htmlFor="">習慣名稱: </label>
            <div className="em-container">
                {emToggle && <Picker data={data} onEmojiSelect={selectEmo} style={{ position: 'absolute', top: '-300px', left: '0' }} />}
            </div>
            <div className="input-container" >
                <input type="text" onChange={handleNewHabitOnchange} value={newHabitName} placeholder="請輸入習慣名稱" />
                <button onClick={handleToggle}>貼圖😊</button>
            </div>



            <label htmlFor="">習慣類型: </label>
            <select className="select" name="" id="" value={newHabitType} onChange={handleTypeChange}>
                <option value="-1" >請選擇類型</option>
                <option value="0">可量化</option>
                <option value="1">不可量化</option>
            </select>
            {
                newHabitType == 0 ? (<>
                    <label htmlFor="">習慣目標: </label>
                    <input className="h-text" type="text" onChange={handleHabitTarget} value={habitTarget} placeholder="請輸入習慣名稱" />
                    <label htmlFor="">選擇單位: </label>
                    <div className="tag-container">
                        {
                            unitArr.map((item) => (
                                <button className="tag" key={item.unitTypeId} value={item.unitTypeId} onClick={handleSelectTag}>{item.unitTypeName}</button>


                            )
                            )

                        }



                    </div>


                </>) : (<></>)
            }
            <div className="ma">     <button className="button" onClick={handleCreateNewHabit}>建立習慣</button></div>



        </div>
    )
}
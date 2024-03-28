import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react"
import { fas } from "@fortawesome/free-solid-svg-icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Picker as Picker2 } from 'emoji-mart'
import { init } from 'emoji-mart'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ERROR_Habit, ERROR_Habit_TARGET, ERROR_Habit_TYPE, INIT_TYPE, NUMBER_NOT_TYPE } from "../const/commonConst";
import { createHabitAPI, getOneHabitAPI, getTagsAPI, updateHabitAPI } from "../api/habitAPI";
import { UnitType } from "../model/UnitType";
import { showError, showErrorNoText } from "../utils/apiUtil";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { EditHabitProp } from "../model/habit";
import { useParams } from "react-router-dom";
export const EditHabit: FC = () => {
    let { habitId } = useParams();
    const [unitArr, setUnitArr] = useState<UnitType[]>([]);
    const [habit, setHabit] = useState<EditHabitProp>();
    const getTags = async () => {
        const tags = await getTagsAPI();
        setUnitArr(tags.data);
        const oneHabit =await getOneHabitAPI(parseInt(habitId!));
        setHabit(oneHabit.data);
    }
    useEffect(() => {
        getTags();
    }, [])
    const [unitType, setUnitType] = useState<number>();
    const [emToggle, setEmToggle] = useState<boolean>(false);
    const handleHabitOnchange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const updateHabit = {...habit,habitName:e.target.value}
        setHabit(updateHabit);
      
    }

    const handleSelectTag = (e) => {
        const updateHabit = {...habit,unitTypeId:e.target.value}
        setHabit(updateHabit);
        console.log(updateHabit)
        let tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.classList.remove('selected');
            let selectedTag = document.querySelector('.tag[value="' + e.target.value + '"]');
            selectedTag!.classList.add('selected');
        });

    }

    const handleTypeChange = (e) => {
        const updateHabit = {...habit, type:e.target.value}
        setHabit(updateHabit);
    }
    const handleToggle = () => {
        setEmToggle(!emToggle);
    }
    const selectEmo = (e) => {
        const updateHabit = {...habit,habitName:habit?.habitName+ e.native}
        setHabit(updateHabit)
    }
    const handleHabitTarget = (e) => {
        if (isNaN(e.target.value)) {
            showErrorNoText('請輸入數字');
        } else {
           const updateHabit = {...habit, habitTarget:e.target.value}
           setHabit(updateHabit);
           console.log(updateHabit)

        }

    }


    const handleEditHabit = async () => {
        const userId = parseInt(Cookies.get('userId')!);
        if (habit?.habitName == '') {
          showErrorNoText(ERROR_Habit)
        } else if (habit?.type == INIT_TYPE) {
          showErrorNoText(ERROR_Habit_TYPE)
        }else if(habit?.habitTarget === 0){
            showErrorNoText(ERROR_Habit_TARGET)
        }
        else {
            console.log(habit)
            await updateHabitAPI(habit!);
    
          Swal.fire({
            title: '成功更改!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
          })
         
    
        }
    
       
    
      }

    return (
        <div className="container">
            <h2 className="slogan">

                編輯
            </h2>
            <label htmlFor="">習慣名稱: </label>
            <div className="em-container">
                {emToggle && <Picker data={data} onEmojiSelect={selectEmo} style={{ position: 'absolute', top: '-300px', left: '0' }} />}
            </div>
            <div className="input-container" >
                <input type="text" onChange={handleHabitOnchange} value={habit?.habitName} placeholder="請輸入習慣名稱" />
                <button onClick={handleToggle}>貼圖😊</button>
            </div>



            <label htmlFor="">習慣類型: </label>
            <select className="select" name="" id="" value={habit?.type} onChange={handleTypeChange}>
                <option value="-1" >請選擇類型</option>
                <option value="0" >可量化</option>
                <option value="1" >不可量化</option>
            </select>
            {
                habit?.type == 0 ? (<>
                    <label htmlFor="">目標: </label>
                    <input className="h-text" type="text" onChange={handleHabitTarget} value={habit.habitTarget} placeholder="請輸入目標" />
                    <label htmlFor="">選擇單位: </label>
                    <div className="tag-container">
                        {
                            unitArr.map((item) => (
                                <button className={`tag ${habit.unitTypeId===item.unitTypeId? 'selected' :'' }`} key={item.unitTypeId} value={item.unitTypeId} onClick={handleSelectTag}>{item.unitTypeName}</button>


                            )
                            )

                        }



                    </div>


                </>) : (<></>)
            }
            <div className="ma">     <button className="button" onClick={handleEditHabit}>送出</button></div>



        </div>
    )
}
import { ChangeEventHandler, FC, MouseEventHandler, useEffect, useState } from "react"
import { fas } from "@fortawesome/free-solid-svg-icons";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { Picker as Picker2 } from 'emoji-mart'
import { init } from 'emoji-mart'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ERROR_Habit, ERROR_Habit_TARGET, ERROR_Habit_TYPE, HABIT_URL, INIT_TYPE, NUMBER_NOT_TYPE } from "../const/commonConst";
import { createHabitAPI, getOneHabitAPI, getTagsAPI, updateHabitAPI } from "../api/habitAPI";
import { UnitType } from "../model/UnitType";
import { showError, showErrorNoText } from "../utils/apiUtil";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import { EditHabitProp } from "../model/habit";
import { useNavigate, useParams } from "react-router-dom";
export const EditHabit: FC = () => {
    const navigate = useNavigate();
    let { habitId } = useParams();
    const getTags = async () => {
        const tags = await getTagsAPI();
        setUnitArr(tags.data);
        const oneHabit:EditHabitProp =(await getOneHabitAPI(parseInt(habitId!))).data;
        setHabitName(oneHabit.habitName);
        setHabitTarget(oneHabit.habitTarget)
        setHabitType(oneHabit.type);
        setUnitType(oneHabit.unitTypeId);
    }
    useEffect(() => {
        getTags();
    }, [])
    const [unitArr, setUnitArr] = useState<UnitType[]>([]);
    const [habitName, setHabitName] = useState<string>();
    const [habitTarget, setHabitTarget] = useState<number>(0);
    const [unitType, setUnitType] = useState<number>();
    const [habitType, setHabitType] = useState<number>();
    const [emToggle, setEmToggle] = useState<boolean>(false);

 

    const handleHabitOnchange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setHabitName(e.target.value)
    }

    const handleSelectTag = (e) => {
        setUnitType(e.target.value);  
        let tags = document.querySelectorAll('.tag');
        tags.forEach(tag => {
            tag.classList.remove('selected');
            let selectedTag = document.querySelector('.tag[value="' + e.target.value + '"]');
            selectedTag!.classList.add('selected');
        });

    }

    const handleTypeChange = (e) => {
        console.log(typeof(e.target.value))
        setHabitType(e.target.value);
    }
    const handleToggle = () => {
        setEmToggle(!emToggle);
    }
    const selectEmo = (e) => {
       setHabitName(habitName+ e.native)
    }
    const handleHabitTarget = (e) => {
        if (isNaN(e.target.value)) {
            showErrorNoText('請輸入數字');
        } else {
            setHabitTarget(e.target.value)
        }

    }


    const handleEditHabit = async () => {
        if (habitName == '') {
          showErrorNoText(ERROR_Habit)
        } else if (habitType === INIT_TYPE) {
          showErrorNoText(ERROR_Habit_TYPE)
        }else if(habitTarget === 0){
            showErrorNoText(ERROR_Habit_TARGET)
        }
        else {
          
            await updateHabitAPI({habitId,habitName,habitTarget,type:habitType!,unitTypeId:unitType});
    
          Swal.fire({
            title: '成功更改!',
            icon: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then(()=>{
            navigate(HABIT_URL);
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
                <input type="text" onChange={handleHabitOnchange} value={habitName} placeholder="請輸入習慣名稱" />
                <button onClick={handleToggle}>貼圖😊</button>
            </div>



            <label htmlFor="">習慣類型: </label>
            <select className="select" name="" id="" value={habitType} onChange={handleTypeChange}>
                <option value="-1" >請選擇類型</option>
                <option value="0" >可量化</option>
                <option value="1" >不可量化</option>
            </select>
            {
                habitType == 0 ? (<>
                    <label htmlFor="">目標: </label>
                    <input className="h-text" type="text" onChange={handleHabitTarget} value={habitTarget} placeholder="請輸入目標" />
                    <label htmlFor="">選擇單位: </label>
                    <div className="tag-container">
                        {
                            unitArr.map((item) => (
                                <button className={`tag ${unitType===item.unitTypeId? 'selected' :'' }`} key={item.unitTypeId} value={item.unitTypeId} onClick={handleSelectTag}>{item.unitTypeName}</button>


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
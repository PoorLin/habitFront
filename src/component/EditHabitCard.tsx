import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, MouseEventHandler, useState } from "react"
import { EditProp } from "../model/EditProp";

export const EditHabitCard:FC = () =>{
  

    return(
        <>
          <label htmlFor="">習慣名稱: </label>
                        <input type="text"/>
                        <a > <FontAwesomeIcon icon={fas. faFloppyDisk} /></a>  <a><FontAwesomeIcon icon={fas.faTrash} /></a>
        </>
    )
} 

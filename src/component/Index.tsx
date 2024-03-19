import { FC, useState } from "react";
import { Nav } from "./Nav";
import 'bulma/css/bulma.css'
import { Habit } from "./Habit";
export const Index: FC = () => {

    return (
        <div>
            <Nav/>
            <div className="m-5">
           <Habit/>
            </div>
        </div>
    )
}
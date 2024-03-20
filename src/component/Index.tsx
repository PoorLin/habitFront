import { FC, useState } from "react";
import { Nav } from "./Nav";
import 'bulma/css/bulma.css'
import { HabitComponent } from "./HabitComponent";
export const Index: FC = () => {

    return (
        <div>
            <Nav/>
            <div className="m-5">
           <HabitComponent/>
            </div>
        </div>
    )
}
import { FC } from "react";
import { Outlet } from "react-router-dom";


export const HabitSideBar: FC = () => {
  
    return (
        <div className="columns">
            <div className="column is-2 ml-2">
                <aside className="menu ">
                    <p className="menu-label ">
                        Habit 
                    </p>
                    <ul className="menu-list">
                        <li><a href="/AH/habitHome/habit">Habit List</a></li>
                        <li><a href="/AH/habitHome/hr">Habit Record</a></li>
                    </ul>
               
               
                 
                 
                </aside>
                <div>

                </div>
            </div>
            <div className="column is-8">
            <Outlet />
        </div>

        </div>

    )
}
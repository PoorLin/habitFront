import { faPlus, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEventHandler, FC, useState } from "react";
import { createHabitAPI } from "../api/habitAPI";
import { Habit, NewHabit } from "../model/habit";
import { EditHabit } from "./EditHabit";

export const HabitComponent: FC = () => {


    const [creating, setCreating] = useState<boolean>(false);
    const showCreate: React.MouseEventHandler<SVGSVGElement> = () => {
        setCreating(true);
    }
    
    const handleCreateNewHabit = (newHabitName:string) =>{
        console.log(newHabitName)
        createHabitAPI({
            userId: 1,
            habitName: newHabitName
        });
        setCreating(false); 
    }
    


    return (
        <div className="columns">
            <div className="column is-2">
                <aside className="menu">
                    <p className="menu-label">
                        General
                    </p>
                    <ul className="menu-list">
                        <li><a>Dashboard</a></li>
                        <li><a>Customers</a></li>
                    </ul>
                    <p className="menu-label">
                        Administration
                    </p>
                    <ul className="menu-list">
                        <li><a>Team Settings</a></li>
                        <li><a>Invitations</a></li>
                        <li><a>Cloud Storage Environment Settings</a></li>
                        <li><a>Authentication</a></li>
                    </ul>
                    <p className="menu-label">
                        Transactions
                    </p>
                    <ul className="menu-list">
                        <li><a>Payments</a></li>
                        <li><a>Transfers</a></li>
                        <li><a>Balance</a></li>
                    </ul>
                </aside>
                <div>

                </div>
            </div>
            <div className="column is-8">

                {
                    creating && <div>
                       <EditHabit onSave={handleCreateNewHabit} />
                    </div>

                }

                {
                    !creating &&
 <div>
 <a > <FontAwesomeIcon icon={fas.faPlus} onClick={showCreate} /></a>

</div>
                }
               
            </div>
        </div>



    )
}
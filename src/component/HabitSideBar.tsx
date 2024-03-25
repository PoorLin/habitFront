import { FC, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";


export const HabitSideBar: FC = () => {
    const navigate = useNavigate();
    const [sideBarClass, setSideBarClass] = useState<string>('active');
    const [sideBar2Class, setSideBar2Class] = useState<string>('');
    const handleClickSidBar = (e) => {
        const target = e.currentTarget.getAttribute('data-id')
        if (target == 0) {
            setSideBarClass("active")
            setSideBar2Class("")
            navigate("/AH/habitHome/habit")
        } else if (target == 1) {
            setSideBarClass("")
            setSideBar2Class("active")
            navigate("/AH/habitHome/hr")
        }



    }
    return (
        <div className="sider-container ">
            <div className="col-12 breadcrumb bg-gray">
            <ol>
                <li><a >Home</a></li>
                <li>Form a Habit</li>
            </ol> 
            </div>
            <div className="col-2">
                {/* href="/AH/habitHome/habit" */}

                <ul className="sidebar">
                    <li><a className={sideBarClass} data-id={0} onClick={handleClickSidBar}>Habit List</a></li>
                    <li><a className={sideBar2Class} data-id={1} onClick={handleClickSidBar} >Habit Record</a></li>
                </ul>





                <div>

                </div>
            </div>
            <div className="col-9">
                <Outlet />
            </div>

        </div>

    )
}
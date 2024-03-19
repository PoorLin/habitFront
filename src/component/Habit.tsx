import { faPlus, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC, useState } from "react";

export const Habit: FC = () => {
    const [creating, setCreating] = useState<boolean>(false);
    const handCreate: React.MouseEventHandler<SVGSVGElement> = () => {
        setCreating(true);
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
                        <label htmlFor="">習慣名稱: </label>
                        <input type="text" />
                        <a > <FontAwesomeIcon icon={fas. faFloppyDisk} /></a>  <a><FontAwesomeIcon icon={fas.faTrash} /></a>
                    </div>

                }
                <div>
                    <a > <FontAwesomeIcon icon={fas.faPlus} onClick={handCreate} /></a>

                </div>
            </div>
        </div>



    )
}
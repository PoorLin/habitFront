import { FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Nav } from "./Nav"
import { HabitComponent } from "./HabitComponent"
import { CreateUser } from "./CreateUser"
import { Index } from "./Index"
import { EditHabitCard } from "./EditHabitCard"
import { Profile } from "./Profile"
import { HabitSideBar } from "./HabitSideBar"
import { HabitRecord } from "./HabitRecord"
import { CreateHabit } from "./CreateHabit"
import { EditHabit } from "./EditHabit"

export const Router: FC = () => {
    const router = createBrowserRouter([
        {
            path: "/AH", element: <Nav />, children: [

                {
                    path: 'habit', element: <HabitComponent />
                },
                {
                    path: 'hr', element: <HabitRecord />
                }, {
                    path: 'create', element: <CreateHabit />
                }, {
                    path: 'update/:habitId', element: <EditHabit/>
                }, {
                    path: '*', element: <h1>404</h1>
                }, {
                    path: 'createUser', element: <CreateUser />
                }, {
                    path: 'home', element: <Index />
                }, {
                    path: 'habitCard', element: <EditHabitCard />
                }, {
                    path: 'profile', element: <Profile />
                }


            ]
        }



    ])

    return (
        <RouterProvider router={router} />
    )
}
import { FC } from "react"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { Nav } from "./Nav"
import { HabitComponent } from "./HabitComponent"
import { CreateUser } from "./CreateUser"

export const Router: FC = () => {
    const router = createBrowserRouter([
        {
            path: "/", element: <Nav />, children: [
                {
                    path: 'habit', element: <HabitComponent />, children: [

                    ]
                },{
                    path: '*', element:<h1>404</h1>
                },{
                    path: 'createUser',element: <CreateUser/>
                }
                
            ]
        }



    ])

    return (
        <RouterProvider router={router} />
    )
}
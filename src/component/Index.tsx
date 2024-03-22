import { FC, useState } from "react";
import { Nav } from "./Nav";
import 'bulma/css/bulma.css'
import { HabitComponent } from "./HabitComponent";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import '../assets/style.css'
export const Index: FC = () => {



    return (
        <div>
          





<div className="bg-image">如果你每天進步１％，持續一年，你會進步３７倍；
相反地，如果你每天退步１％，持續一年，你會弱化到趨近於０。</div>


<div className="jacks-h1 m-6">相關影片</div>

<div className="columns ml-6">
    

    <div className="column is-6">
    
<div className="video-container">
<iframe width="560" height="315" src="https://www.youtube.com/embed/HU5wx6cp6kU?si=jmoohGZV25SWIECW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
</div>
    </div>
    <div className="column is-6">
    <div className="video-container">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/agGlJ7vg4qg?si=3QzD124hy7yYAb1c" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
    </div>

</div>
        </div>
    )
}
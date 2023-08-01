
import  React, { useState , useEffect } from 'react'


export const DateTime = () => {

    var [date,setDate] = useState(new Date());
    const weekday = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var currentTime = new Date();
    var dayName = weekday[currentTime.getDay()] + " - "; 

    
    useEffect(() => {
        var timer = setInterval(()=>setDate(new Date()), 1000 )
        return function cleanup() {
            clearInterval(timer)
        }
    
    });

    return(
        <div>
            <span className="time"> {dayName }</span>
            <span className="time"> {date.toLocaleTimeString()}</span>
        </div>
    )
}
export default DateTime

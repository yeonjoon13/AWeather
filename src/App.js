import React, {useState} from 'react'
import axios from 'axios'
import images from './images.js';
import SearchIcon from '@mui/icons-material/Search';
import broken_clouds_day from './assets/videos/broken_clouds_day.mp4';
import blossom from './assets/videos/blossom.mp4';
import broken_clouds_night from './assets/videos/broken_clouds_night.mp4'
import clearsky_night from './assets/videos/clearsky_night.mp4'
import few_clouds_afternoon from './assets/videos/few_clouds_afternoon.mp4'
import few_clouds_morning from './assets/videos/few_clouds_morning.mp4'
import mist from './assets/videos/mist.mp4'
import mist2 from './assets/videos/mist2.mp4'
import rain_morning from './assets/videos/rain_morning.mp4'
import rain_night from './assets/videos/rain_night.mp4'
import scattered_clouds_evening from './assets/videos/scattered_clouds_evening.mp4'
import scattered_clouds_morning from './assets/videos/scattered_clouds_morning.mp4'
import sunny_waves from './assets/videos/sunny_waves.mp4'
import thunderstorm_night from './assets/videos/thunderstorm_night.mp4'
import logo from './assets/Frame14.png'



function App() {
  const [data, setData] = useState({})
  const [data2, setData2] = useState({})
  const [data3, setData3] = useState({})
  const [location, setLocation] = useState('')
  const [lat, setLat] = useState('')
  const [lon, setLon] = useState('')
  const [background, setBackground] = useState(blossom)

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&&appid=07cf34b837da47fcea87a346e3a7b049`
  const hourlyURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=07cf34b837da47fcea87a346e3a7b049&units=imperial`
  const locationURL = `https://api.timezonedb.com/v2.1/get-time-zone?key=7USI9W7I28TK&format=json&by=position&lat=${lat}&lng=${lon}`

  const getValues = () => {
    if(lat !== '') {
      axios.get(locationURL).then((response2) => {
        setData2(response2.data);
      })
      
    };
  }

  React.useEffect(() => getValues(), );

  const searchLocation =  async (event) => {
    if (event.key === 'Enter') {
      try {
        setData({})
        setData2({})
        setData3({})
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
        document.querySelector("input").style.borderColor = "transparent";
        setLat(data.coord.lat);
        setLon(data.coord.lon);
        setLocation('')
        const response3 = await fetch(hourlyURL);
        const r3 = await response3.json();
        setData3(r3);
      } catch (error) {
        document.querySelector("input").style.borderColor = "red";
        console.error(error);
        return error;
      }

    }
  }
  

  function getLocation() {
      if (Object.keys(data2).length !== 0 && Object.keys(data).length !== 0 ) {
        if (data.weather[0].description === "few clouds") {
          if (parseInt(data2.formatted.substring(10,16)) > 17) {
            setBackground(few_clouds_afternoon);
          } else {
            setBackground(few_clouds_morning);
          }
        } else if (data.weather[0].description.includes("rain") || data.weather[0].description.includes("drizzle") ) {
          if (parseInt(data2.formatted.substring(10,16)) > 17) {
            setBackground(rain_night)
          } else {
            setBackground(rain_morning)
          }
        } else if (data.weather[0].description === "broken clouds") {
          if (parseInt(data2.formatted.substring(10,16)) > 17) {
            setBackground(broken_clouds_night)
          } else {
            setBackground(rain_night)
          }
        } else if (data.weather[0].description === "clear sky") {
          if (parseInt(data2.formatted.substring(10,16)) > 17) {
            setBackground(clearsky_night)
          } else {
            setBackground(sunny_waves)
          }
        } else if (data.weather[0].description === "mist") {
          if (parseInt(data2.formatted.substring(10,16)) > 17) {
            setBackground(mist2)
          } else {
            setBackground(mist)
            }  
          } else if (data.weather[0].description === "thunderstorm") {
              setBackground(thunderstorm_night)
          } else if (data.weather[0].description.includes("snow")) {
            if (parseInt(data2.formatted.substring(10,16)) > 17) {
              setBackground(rain_morning) //need snow
            } else {
              setBackground(rain_night) //need snow
            }
          }  else if (data.weather[0].description.includes("scattered clouds")) {
            if (parseInt(data2.formatted.substring(10,16)) > 17) {
              setBackground(scattered_clouds_evening) 
            } else {
              setBackground(scattered_clouds_morning) 
            }
          } else if (data.weather[0].description.includes("overcast clouds")) {
            if (parseInt(data2.formatted.substring(10,16)) > 17) {
              setBackground(few_clouds_afternoon)
            } else {
              setBackground(broken_clouds_day)
            } 
          }
      }
  }

  React.useEffect(() => getLocation(), );




  function UnixTime() {
    if (data2 !== null) {
      var timeStamp2 = data.main ? data.sys.sunrise :  null;
      let opts = {timeZone: data2.zoneName, hour12:true, timeStyle: 'short'};
      var sunrise = new Date(timeStamp2*1000).toLocaleString('en-CA', opts)
      if (timeStamp2 !== null) {
        return <p className="unix-time"> {sunrise}</p>
      }
    }
  }

  function UnixTime2() {
    if (data2 !== null) {
    var timeStamp3 = data.main ? data.sys.sunset : null;
    let opts = {timeZone: data2.zoneName, hour12:true, timeStyle: 'short'};
    var sunset = new Date(timeStamp3* 1000).toLocaleString('en-CA', opts)
    setLat('');
    setLon('');
    if (timeStamp3 !== null) {
      return <p className="unix-time"> {sunset}</p>
    }
    }
  }

  function Product() {
    let weatherIcon = data.weather ? data.weather[0].icon : null;
    let weatherIcon2 = weatherIcon + ".png";
    for (const key in images) {
      if (images[key] === weatherIcon2) {
        let val = images[key];
        return (
          <img src={require(`./assets/s/${val}`)} className="icon" alt="icon" width="50" height="50"/>
        );
      }
    }
  }
  

  function GetHourly0() {
    if (Object.keys(data3).length !== 0) {
      var str = ""
      if (parseInt(data3.list[0].dt_txt.substring(11,16)) < 12) {
        str += "AM"
      } else {
        str += "PM"
      }
      var iconn = data3.list[0].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[0].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[0].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }
  function GetHourly1() {
    if (Object.keys(data3).length !== 0) {
      var str = ""
      if (parseInt(data3.list[1].dt_txt.substring(11,16)) < 12) {
        str += "AM"
      } else {
        str += "PM"
      }
      var iconn = data3.list[1].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[1].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[1].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }
  function GetHourly2() {
    if (Object.keys(data3).length !== 0) {
      var str = ""
      if (parseInt(data3.list[2].dt_txt.substring(11,16)) < 12)  {
        str += "AM"
      } else {
        str += "PM"
      }
      var iconn = data3.list[2].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[2].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[2].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }
  function GetHourly3() {
    if (Object.keys(data3).length !== 0) {
      var str = ""
      if (parseInt(data3.list[3].dt_txt.substring(11,16)) < 12) {
        str += "AM"
      } else {
        str += "PM"
      }
      var iconn = data3.list[3].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[3].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[3].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }
  function GetHourly4() {
    if (Object.keys(data3).length !== 0) {
      var str = ""
      if (parseInt(data3.list[4].dt_txt.substring(11,16)) < 12) {
        str += "AM"
      } else {
        str += "PM"
      }
      var iconn = data3.list[4].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[4].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[4].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }
  function GetHourly5() {
    if (Object.keys(data3).length !== 0) {
      var str = ""
      if (parseInt(data3.list[5].dt_txt.substring(11,16)) < 12) {
        str += "AM"
      } else {
        str += "PM"
      }
      var iconn = data3.list[5].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[5].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[5].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }
  function GetHourly6() {
    if (Object.keys(data3).length !== 0) {
      var str = ''
      if (parseInt(data3.list[6].dt_txt.substring(11,16)) < 12) {
        str += 'AM'
      } else {
        str += 'PM'
      }
      var iconn = data3.list[6].weather[0].icon + ".png";
      for (const key in images) {
        if (images[key] === iconn) {
          return <li className="flex-item"> {data3.list[6].dt_txt.substring(11,16)} {str} <p><img src={require(`./assets/s/${images[key]}`)} className="item-icon" alt="icon" width="70" height="70"/></p><span className="caption">{data3.list[6].main.temp.toFixed()}°</span></li>;
        }
      }
    }
  }

  function GetCountry() {
    if (Object.keys(data2).length !== 0) {
      return <span className="time"> {data2.regionName}, {data2.countryName}</span>
    }
  }

  return (
    <div className="app">
      <div className="search">
        <input
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder='Search Location...'
        type="text" required/>
        <div className='searchIcon'><SearchIcon/></div>
      </div>
      <video loop autoPlay muted src={background} type="video/mp4"/>
      <img className="logo" src={logo} alt = "logo" width={200} height={40} />
      <div className="container">
        <div className="top">
            <h1 className="temp"> {data.main ? <h1>{data.main.temp.toFixed()}°</h1> : null}</h1>
            <div className="city-time">
              <h1 className="name">{data.name}</h1>
              <small >
                  {data.name !== undefined &&
                  <GetCountry/>
                }
              </small>
            </div>
            <div className="weather">
              <Product/>
            <span className="condition">{data.weather ? <h1>{data.weather[0].description}</h1> : null}</span>
            </div>
        </div>
        {data.name !== undefined && 
        <section className="box-wrapper">
            <div className="box3">
              <p>Today's Highlights </p>
              <div className="top-column">
                <div className="box4">
                    <h1>Sunrise & Sunset</h1>
                    <h2>Sunrise Sunset</h2>
                    <UnixTime/>
                    <UnixTime2/>
                  </div>
                  <div className="box9">
                    <h1>Low / High</h1>
                    <h2>Low &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; High </h2>
                      <p className="same-value">{data.main ? <p className='bold'>{data.main.temp_min.toFixed()}°</p> : null} </p>
                      <p className="same-value">{data.main ? <p className='bold'>{data.main.temp_max.toFixed()}°</p> : null}</p>
                  </div>
              </div>
              <div className="bottom-column">
                <div className="box5">
                  <h1>Humidity</h1>
                  <p className="box-value">{data.main ? <p className='bold'>{data.main.humidity}%</p> : null}</p>
                </div>
                <div className="box6">
                  <h1>Wind Speed</h1>
                  <p className="box-value">{data.wind ? <p className='bold'>{data.wind.speed.toFixed()} mph</p>: null}</p>
                </div>
                <div className="box7">
                  <h1>Visibility</h1>
                  <p className="box-value">{data.main ? <p className='bold'>{(data.visibility/1000).toFixed()} km</p> : null}</p>
                </div>
                <div className="box8">
                  <h1>Feels Like</h1>
                  <p className="box-value">{data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°</p> : null}</p>
                </div>
                </div>
            </div>
        </section> 
        }
        {data.name !== undefined && 
          <div className="bottom">
            <ul className="flex-container">
              <GetHourly0/>
              <GetHourly1/>
              <GetHourly2/>
              <GetHourly3/>
              <GetHourly4/>
              <GetHourly5/>
              <GetHourly6/>
            </ul>         
        </div>
        }
    
      </div>
    </div>
  );
}


export default App;

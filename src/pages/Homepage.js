import {Link} from "react-router-dom";
import React, {useState} from "react";

const Homepage = ({onUpdate}) => {

    const [coordinates, setCoordinates] = useState(null);

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
    };

    function success(pos) {
        let crd = pos.coords;
        setCoordinates(crd);
        onUpdate(crd);
    }

    function errors(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.permissions
                .query({name: "geolocation"})
                .then(function (result) {
                    if (result.state === "granted") {
                        navigator.geolocation.getCurrentPosition(success);
                    } else if (result.state === "prompt") {
                        navigator.geolocation.getCurrentPosition(success, errors, options);
                    } else if (result.state === "denied") {
                        console.log('denied access for get location');
                    }
                    result.onchange = function () {
                        console.log(result.state);
                    };
                });
        } else {
            console.log('geoLocation is not Available!');
        }
    }

    return (
        <div className={'app'}>
            <button className='btn' onClick={getLocation}>הצג מיקום</button>
            {coordinates && <>
            <div className = 'txt'>אתה נמצא ב- {coordinates.latitude} , {coordinates.longitude}</div>
            <Link className='btn' to={'/ResultPage'}>מצא אטרקציות בסביבתי</Link>
            </>
            }
        </div>
    );
}

export default Homepage;
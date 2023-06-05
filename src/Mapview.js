import { GoogleMap, useJsApiLoader, Marker} from '@react-google-maps/api';
import Geocode from 'react-geocode';
import './Mapview.css';
import { useSelector } from 'react-redux';
import { useState } from 'react';

Geocode.setApiKey('AIzaSyBLFqfIBT_rsFwo7FIVZ3SGGhhEkcm2Ocg');
Geocode.setLocationType("ROOFTOP");
var latv = 0;
var lngv = 0;
let pos = {};
let posstr;

const containerStyle = {
    width: '1865px',
    height: '969px'
  };

function Mapview() {
    const [latd, setLatd] = useState(0);
    const [lngd, setLngd] = useState(0);
    posstr = useSelector((state) => state.user.pos);
    Geocode.fromAddress(posstr).then(
        (response) => {
            const { lat, lng } = response.results[0].geometry.location;
            pos['lat'] = lat;
            pos['lng'] = lng;
            setLatd(lat);
            setLngd(lng);
        },
        (error) => {
            console.log(error);
        }
    );
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyBLFqfIBT_rsFwo7FIVZ3SGGhhEkcm2Ocg'
    })

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat: latv+pos['lat'], lng: lngv+pos['lng']}}
            zoom={16}
        >
            <Marker position={{lat: latv+pos['lat'], lng: lngv+pos['lng']}}/>
        </GoogleMap>
    ) : <></>
}

export default Mapview;
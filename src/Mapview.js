import { useNavigate } from 'react-router-dom';
import './Mapview.css';

const google = window.google

function Mapview () {

    const navigate = useNavigate();
    let map;

    function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
        });
        new google.maps.Marker({
            position: { lat: -34.397, lng: 150.644 },
            map,
            title: "신고발생위치",
        });
    }

    window.initMap = initMap;

    return (
        <div className="Map">
            <header className="Map-header">
                <div id='map'></div>
            </header>
        </div>
    );
}

export default Mapview;
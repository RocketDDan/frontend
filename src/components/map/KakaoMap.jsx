import { useEffect, useState } from "react";
import { SearchBar } from "../search_bar/SearchBar";


const KakaoMap = () => {

    const [lat, setLat] = useState(33.450701);
    const [lng, setLng] = useState(126.570667);
    const [address, setAddress] = useState("");
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    let map = null;
    let userMarker = null;

    const handleUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLng(position.coords.longitude);
                console.log("현재 위치: ", lat, lng);
            },
            (error) => {
                console.error("위치 정보를 가져오는 중 오류 발생:", error);
            }
        );
    }

    // 스크립트 로드
    const loadKakaoMapScript = () => {
        const kakaoScriptId = "kakao-map-script";
        if (document.getElementById(kakaoScriptId)) {
            setIsMapLoaded(true);
            return;
        }

        const script = document.createElement("script");
        script.id = kakaoScriptId;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAO_MAP_KEY}&autoload=false&libraries=services`;
        script.async = true;

        script.onload = () => {
            window.kakao.maps.load(() => {
                setIsMapLoaded(true);
            });
        };

        document.head.appendChild(script);
    }

    useEffect(() => {
        handleUserLocation();
        loadKakaoMapScript();
    }, []);

    const handleAddress = (val) => {
        setAddress(val);
    }

    const handleMarkerByAddress = () => {
        var geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체
        geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === window.kakao.maps.services.Status.OK) {
                setLat(result[0].y);
                setLng(result[0].x)
            }
        });
    }

    // 지도 렌더링은 map load 와 좌표 모두 준비된 이후
    useEffect(() => {
        if (!isMapLoaded) return;

        const container = document.getElementById("map");
        const options = {
            center: new window.kakao.maps.LatLng(lat, lng),
            level: 3,
        };
        map = new window.kakao.maps.Map(container, options); // 지도

        userMarker = new window.kakao.maps.Marker({ // 마커
            position: new window.kakao.maps.LatLng(lat, lng)
        });
        userMarker.setMap(map);
        userMarker.setDraggable(true); // 드래그 가능하도록

        window.kakao.maps.event.addListener(userMarker, 'click', function () { // 클릭 이벤트
            console.log("클릭");
        });
    }, [isMapLoaded, lat, lng]);


    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {/* <div style={{textAlign: "start"}}>위도</div> */}
                <SearchBar
                    placeholder="주소 검색"
                    value={address}
                    width="100%"
                    onChange={handleAddress}
                    onEnter={handleMarkerByAddress}
                    closeBtnVisible={true} />
            </div>
            <div
                id="map"
                style={{
                    width: "100%",
                    height: "400px",
                }}></div>
        </div>
    );
}

export default KakaoMap;
import { useEffect, useRef, useState } from "react";
import { SearchBar } from "../search_bar/SearchBar";


const KakaoMap = ({
    width = "400px",
    height = "500px",
    lat = 33.450701,
    lng = 126.570667,
    onLatLngChange,
    draggable = true,
    canSearchAddress = true,
    rounded = true,
    onMarkerClick
}) => {

    const [address, setAddress] = useState("");
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    let mapRef = useRef(null);
    let markerRef = useRef(null);

    // 유저 위치 가져오기
    const handleUserLocation = () => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                onLatLngChange?.(position.coords.latitude, position.coords.longitude);
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

    // 초기 렌더링에 사용자 위치 받아오고 카카오맵 로딩
    useEffect(() => {
        handleUserLocation();
        loadKakaoMapScript();
    }, []);

    // 주소 핸들링
    const handleAddress = (val) => {
        setAddress(val);
    }

    // 주소로 마커 옮기기 + lat, lng 변화
    const handleMarkerByAddress = () => {
        var geocoder = new window.kakao.maps.services.Geocoder(); // 주소-좌표 변환 객체
        geocoder.addressSearch(address, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === window.kakao.maps.services.Status.OK) {
                onLatLngChange?.(result[0].y, result[0].x);
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
        mapRef.current = new window.kakao.maps.Map(container, options);

        markerRef.current = new window.kakao.maps.Marker({ // 마커
            position: new window.kakao.maps.LatLng(lat, lng)
        });
        markerRef.current.setMap(mapRef.current);
        markerRef.current.setDraggable(true); // 드래그 가능하도록

        if (draggable) {
            window.kakao.maps.event.addListener(markerRef.current, 'dragend', function () { // dragend 이벤트
                const position = markerRef.current.getPosition();
                const newLat = position.getLat();
                const newLng = position.getLng();
                // console.log("마커 이동 위치:", newLat, newLng);
                onLatLngChange?.(newLat, newLng);
            });
        }

        window.kakao.maps.event.addListener(markerRef.current, 'click', function () { // 클릭 이벤트
            console.log("클릭");
            onMarkerClick?.();
        });
    }, [isMapLoaded]);

    // lat, lng 변경 시 마커만 이동
    useEffect(() => {
        if (!isMapLoaded || !markerRef.current) return;
        const newPosition = new window.kakao.maps.LatLng(lat, lng);
        markerRef.current.setPosition(newPosition);
        mapRef.current.setCenter(newPosition);
    }, [lat, lng, isMapLoaded]);

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {canSearchAddress &&
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    <SearchBar
                        placeholder="주소 검색"
                        value={address}
                        width="100%"
                        onChange={handleAddress}
                        onEnter={handleMarkerByAddress}
                        closeBtnVisible={true} />
                </div>
            }
            <div id="map" style={{ width, height, borderRadius: rounded ? "5%" : "0" }}></div>
        </div>
    );
}

export default KakaoMap;
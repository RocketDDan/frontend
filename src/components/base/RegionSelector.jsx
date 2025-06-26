import { useState, useEffect } from "react";
import style from "./RegionSelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { fetchRegionList, getAccessToken } from "../../api/external/region.api";

/**
 * 
 * @param {String} region - 선택된 지역
 * @param {Function} setRegion - 지역을 설정하는 함수 
 * @returns 
 */
const RegionSelector = ({ region, setRegion }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [cities, setCities] = useState([]);      // 시/도 목록
	const [districts, setDistricts] = useState([]); // 구/군 목록
	const [selectedCity, setSelectedCity] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);
	const [cd, setCd] = useState("11"); // 지역 코드, 기본 서울

	useEffect(() => {
		// 최초 시/도 목록 불러오기
		if (cities.length === 0) {
			fetchRegionList()
				.then(data => {
					const result = data?.result;
					if (Array.isArray(result)) {
						setCities(result);
						// cd가 "11"인 시/도를 기본 선택
						const defaultCity = result.find(city => city.cd === "11");
						if (defaultCity) setSelectedCity(defaultCity);
					} else {
						console.error("Invalid region list response:", data);
					}
				})
				.catch(err => {
					console.error("시/도 목록 조회 실패:", err);
				});
		}

		// 선택된 시/도에 따라 구/군 목록 불러오기
		const fetchDistricts = async () => {
			try {
				let data = await fetchRegionList(cd);
				// 만약 토큰이 만료되어 -401 에러가 발생하면 토큰 갱신 후 재시도
				if (data.errCd === -401) {
					await getAccessToken();
					data = await fetchRegionList(cd);
				}
				const result = data.result;
				setDistricts(result);
				// console.log('지역 목록 조회 성공:', result);
			} catch (err) {
				console.error('지역 목록 조회 실패:', err);
			}
		};

		fetchDistricts();
	}, [cd]);

	return (
		<div className={style.wrapper}>
			<button
				className={style.selectButton}
				onClick={() => setIsOpen(!isOpen)}
			>
				{region || "지역 선택"} <FontAwesomeIcon icon={faChevronDown} className={style.icon} />
			</button>

			{isOpen && (
				<div className={style.modal}>
					<div className={style.cityColumn}>
						{cities && cities.map(city => (
							<div
								key={city.cd}
								className={`${style.city} ${selectedCity && city.cd === selectedCity.cd ? style.activeCity : ""}`}
								onClick={() => {
									setSelectedCity(city);
									setSelectedDistrict(null);
									setCd(city.cd); // 선택한 시/도의 cd 저장
								}}
							>
								{city.addr_name}
							</div>
						))}
					</div>
					<div className={style.districtGrid}>
						{(districts || []).map(district => (
							<div
								key={district.cd}
								className={style.district}
								onClick={() => {
									setRegion(district.full_addr); // full_addr 저장
									setIsOpen(false);
								}}
							>
								{district.addr_name}
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default RegionSelector;
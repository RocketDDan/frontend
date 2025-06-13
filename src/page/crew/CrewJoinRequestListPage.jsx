import { use } from "react";
import styles from "./CrewJoinRequestListPage.module.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchCrewJoinRequestList } from "../../api/crewJoinRequest.api";

const CrewJoinRequestListPage = () => {
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [crewJoinRequestList, setCrewJoinRequestList] = useState([]); // 크루 가입 요청 목록 상태
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [page, setPage] = useState(1); // 페이지 상태
    const [perPage, setPerPage] = useState(10); // 페이지당 항목 수 상태
    const [order, setOrder] = useState("LATEST"); // 정렬 기준 상태
    const [status, setStatus] = useState("REQUEST"); // 상태 필터링 상태

    const params = {
        nickname: nickname,
        page: page,
        perPage: perPage,
        order: order,
        status: status
    }

    useEffect(() => {
        fetchCrewJoinRequestList(crewId, params)
        .then(data => {
            setCrewJoinRequestList(data);
        })
        .catch(error => {
            console.error("크루 가입 요청 목록 조회 실패: ", error);
        });
    }, [nickname, page, order, status, crewId])

    return (
        <div className={styles.pageWrapper}>
            <h1>크루 가입 신청 현황</h1>
            <p>크루 가입 요청 목록 페이지는 아직 구현되지 않았습니다.</p>
            <p>추후에 크루 가입 요청을 관리할 수 있는 기능이 추가될 예정입니다.</p>
        </div>
    );
}

export default CrewJoinRequestListPage;
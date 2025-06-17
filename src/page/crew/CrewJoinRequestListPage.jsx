import styles from "./CrewJoinRequestListPage.module.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchCrewJoinRequestList } from "../../api/crewJoinRequest.api";
import { sampleCrewJoinRequest } from "../../dto/crew.dto";
import {CrewMemberInfo} from "../../components/crew/CrewMemberInfo";
import {CrewHeader} from "../../components/crew/CrewHeader";
import {CheckModal} from "../../components/base/CheckModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { approveCrewJoinRequest, rejectCrewJoinRequest } from "../../api/crewJoinRequest.api"; // 크루 가입 요청 승인 API
import { SearchBar } from "../../components/search_bar/SearchBar";
import { BasicRadio } from "../../components/base/Radio"; // 라디오 버튼 컴포넌트
import commonStyles from "../../Common.module.css"; // 공통 스타일
import Pagenation from "../../components/base/Pagenation";

const CrewJoinRequestListPage = () => {
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [open, setOpen] = useState(false); // 모달 열림 상태
    const [modalTitle, setModalTitle] = useState(""); // 모달 제목 상태
    const [modalDescription, setModalDescription] = useState(""); // 모달 설명 상태
    const [useButton, setUseButton] = useState(true); // 모달 버튼 사용 여부 상태   
    const [modalWidth, setModalWidth] = useState("400px"); // 모달 가로 크기 상태
    const [onConfirm, setOnConfirm] = useState(() => () => {}); // 모달 확인 버튼 클릭 핸들러 상태

    const [crewJoinRequestList, setCrewJoinRequestList] = useState([]); // 크루 가입 요청 목록 상태
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [page, setPage] = useState(1); // 페이지 상태
    const [status, setStatus] = useState("REQUEST"); // 상태 필터링 상태
    const [isExistNextPage, setIsExistNextPage] = useState(false);

    // 가입 요청 상태 옵션 정의
    const statusOptions = [
        { value: "REQUEST", name: "요청 대기" },
        { value: "ACCEPT", name: "승인" },
        { value: "DENY", name: "거절" },
    ];

    // 리스트 헤더의 컬럼 정의
    const columns = [
        { label: "이름", width: "160px" },
        { label: "요청일", width: "160px" },
        { label: "요청 메세지", width: "420px" },
        { label: "관리", width: "140px" }
    ];

    const onClickAcceptBtn = (requestId) => {
        setModalTitle("크루 가입 승인");
        setModalDescription("크루 가입 요청을 승인하시겠습니까?");
        setUseButton(true); // 버튼 사용 여부 설정
        setOpen(true);
        setOnConfirm(() => () => approveRequest(requestId)); // 이렇게!
    }

    const onClickDenyBtn = (requestId) => {
        // 모달 제목과 설명 설정
        setModalTitle("크루 가입 거절");
        setModalDescription("크루 가입 요청을 거절하시겠습니까?");
        setUseButton(true); // 버튼 사용 여부 설정
        // 모달 열기
        setOpen(true);
        setOnConfirm(() => () => rejectRequest(requestId));
    }

    const onClickMessage = (e) => {
        // 요청 메세지 클릭 시 이벤트
        e.stopPropagation(); // 이벤트 전파 방지
        setModalTitle("크루 가입 요청 메세지");
        setModalDescription(e.target.innerText); // 메세지 내용 설정
        setUseButton(false); // 버튼 사용 여부 설정
        setModalWidth("500px"); // 모달 가로 크기 설정
        setOpen(true); // 메세지 모달 열기
    }

    const approveRequest = (requestId) => {
        // 크루 가입 요청 승인 API 호출
        approveCrewJoinRequest(crewId, requestId)
            .then(() => {
                setOpen(false);
                handleSearchBar(); // 요청 승인 후 목록 새로고침                
            })
    }

    const rejectRequest = (requestId) => {
        // 크루 가입 요청 거절 API 호출
        rejectCrewJoinRequest(crewId, requestId)
            .then(() => {
                setOpen(false);
                handleSearchBar(); // 요청 승인 후 목록 새로고침 
            })
    }

    const handleSearchBar = () => {
        const params = {
            nickname: nickname,
            page: page,
            perPage: 7,
            order: "LATEST", // 정렬 기준은 최신순으로 고정
            status: status
        }
        // 크루 가입 요청 목록을 가져오는 API 호출
        fetchCrewJoinRequestList(crewId, params)
        .then(data => {
            setCrewJoinRequestList(data.crewJoinRequestList);
            setIsExistNextPage(data.isExistNextPage);
        })
    }

    useEffect(() => {
        console.log("crewId", crewId);
        handleSearchBar();

    }, [page, status, crewId])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.header}>
                <div className={styles.searchHeader}>
                    <SearchBar 
                        width={300}
                        placeholder="닉네임을 입력해주세요."
                        value={nickname}
                        onChange={setNickname}
                        onEnter={handleSearchBar}
                    />
                    <div className={styles.radioWrapper}>
                        <BasicRadio
                            options={statusOptions}
                            name="status"
                            value={"REQUEST"}
                            onChange={setStatus}
                        />
                    </div>
                </div>
                <CrewHeader columns={columns}/>
            </div>

            { crewJoinRequestList.length > 0 && crewJoinRequestList.map((request, idx) => (
                <div className={styles.requestWrapper} key={idx}>
                    <CrewMemberInfo 
                        memberId={request.memberId}
                        nickname={request.nickname} 
                        profilePath={request.profilePath} 
                        date={request.requestDate} 
                    />
                    <span className={styles.messageWrapper} onClick={onClickMessage}>{request.requestMessage}</span>
                    { status === "REQUEST" && (
                        <div className={styles.buttonWrapper}>
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className={commonStyles.primaryCheck}
                                onClick={() => onClickAcceptBtn(request.crewJoinRequestId)}  
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                className={commonStyles.primaryCancel}
                                onClick={() => onClickDenyBtn(request.crewJoinRequestId)}
                            />
                        </div>
                    )}
                    { status === "ACCEPT" && (
                        <span>승인</span>
                    )}
                    { status === "DENY" && (
                        <span>거절</span>
                    )}
                </div>

            )) }
            { crewJoinRequestList.length === 0 && (
                <div className={styles.noRequests}>가입 신청이 없습니다.</div>
            )}
            {open && (
                <CheckModal 
                    title={modalTitle} 
                    description={modalDescription} 
                    onConfirm={onConfirm} 
                    onClose={() => {setOpen(false); setModalWidth("400px")}} // 모달 닫기 시 높이 초기화
                    useButton={useButton}
                    width={modalWidth}
                />
            )}
            <Pagenation page={page} isExistNextPage={isExistNextPage} setPage={setPage}/>
        </div>
    );
}

export default CrewJoinRequestListPage;
import styles from "./CrewJoinRequestListPage.module.css";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchCrewJoinRequestList } from "../../api/crewJoinRequest.api";
import { sampleCrewJoinRequest } from "../../dto/crew.dto";
import {CrewMemberInfo} from "../../components/crew/CrewMemberInfo";
import {CrewHeader} from "../../components/crew/CrewHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { approveCrewJoinRequest, rejectCrewJoinRequest } from "../../api/crewJoinRequest.api"; // 크루 가입 요청 승인 API
import { SearchBar } from "../../components/search_bar/SearchBar";
import { BasicSelect} from "../../components/base/Select";
import Pagination from "../../components/announcement/Pagination";
import Swal from "sweetalert2";

const CrewJoinRequestListPage = () => {
    const { crewId } = useParams(); // 여기서 crewId를 받아옴
    const [crewJoinRequestList, setCrewJoinRequestList] = useState([]); // 크루 가입 요청 목록 상태
    const [total, setTotal] = useState(0);
    const [nickname, setNickname] = useState(""); // 닉네임 상태
    const [page, setPage] = useState(1); // 페이지 상태
    const [status, setStatus] = useState("REQUEST"); // 상태 필터링 상태
    const perPage = 30;

    // 가입 요청 상태 옵션 정의
    const statusOptions = [
        { value: "REQUEST", label: "요청" },
        { value: "ACCEPT", label: "승인" },
        { value: "DENY", label: "거절" },
    ];

    // 리스트 헤더의 컬럼 정의
    const columns = [
        { label: "이름", width: "160px" },
        { label: "요청일", width: "160px" },
        { label: "요청 메세지", width: "420px" },
        { label: "관리", width: "140px" }
    ];

    const onClickAcceptBtn = (requestId) => {
        Swal.fire({
            title: "크루 가입 승인",
            text: "크루 가입 요청을 승인하시겠습니까?",
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "승인",
            cancelButtonText: "취소"
        }).then((result) => {
            if (result.isConfirmed) {
                approveRequest(requestId);
            }
        });
    };

    const onClickDenyBtn = (requestId) => {
        Swal.fire({
            title: "크루 가입 거절",
            text: "크루 가입 요청을 거절하시겠습니까?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "거절",
            cancelButtonText: "취소"
        }).then((result) => {
            if (result.isConfirmed) {
                rejectRequest(requestId);
            }
        });
    };

    const onClickMessage = (e) => {
        e.stopPropagation();
        Swal.fire({
            title: "크루 가입 요청 메세지",
            text: e.target.innerText.replace(/\n/g, "<br />"),
            icon: "info",
            confirmButtonText: "확인",
            width: 500
        });
    };

    const approveRequest = (requestId) => {
        // 크루 가입 요청 승인 API 호출
        approveCrewJoinRequest(crewId, requestId)
            .then(() => {
                handleSearchBar(); // 요청 승인 후 목록 새로고침                
            })
    }

    const rejectRequest = (requestId) => {
        // 크루 가입 요청 거절 API 호출
        rejectCrewJoinRequest(crewId, requestId)
            .then(() => {
                handleSearchBar(); // 요청 승인 후 목록 새로고침 
            })
    }

    const handleSearchBar = () => {
        const params = {
            nickname,
            page,
            perPage,
            order: "LATEST", // 정렬 기준은 최신순으로 고정
            status
        }
        // 크루 가입 요청 목록을 가져오는 API 호출
        fetchCrewJoinRequestList(crewId, params)
        .then(data => {
            setCrewJoinRequestList(data.crewJoinRequestList);
            setTotal(data.totalCount);
        })
    }

    useEffect(() => {
        // console.log("crewId", crewId);
        handleSearchBar();
    }, [page, status, crewId, nickname])

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.searchHeader}>
                <div className={styles.searchBar}>
                    <SearchBar 
                        width={"100%"}
                        placeholder="닉네임을 입력해주세요."
                        value={nickname}
                        onChange={(val) => {
                            setNickname(val);
                            // handleSearchBar();
                        }}
                        // onEnter={handleSearchBar}
                    />
                </div>

                <div className={styles.selector}>
                    <BasicSelect
                        width={"100%"}
                        options={statusOptions}
                        name="status"
                        value={status}
                        onChange={setStatus}
                    />
                </div>
            </div>

            <div className={styles.crewHeader}>
                <CrewHeader columns={columns}/>
            </div>

            <div style={{flex: 1}} className={styles.crewJoinRequestList}>
                { crewJoinRequestList.length > 0 && crewJoinRequestList.map((request, idx) => (
                <div className={styles.requestWrapper} key={idx}>
                    <CrewMemberInfo 
                        memberId={request.memberId}
                        nickname={request.nickname} 
                        profilePath={request.profilePath} 
                        date={request.requestDate.slice(0, 10)} 
                    />
                    <div className={styles.messageAndButtonWrapper}>
                        <span
                            className={styles.messageWrapper}
                            onClick={onClickMessage}
                        >
                            {request.requestMessage && request.requestMessage.length > 35
                                ? request.requestMessage.slice(0, 35) + "..."
                                : request.requestMessage}
                            {request.requestMessage == null && (
                                "메세지 없음"
                            )}
                        </span>
                        { status === "REQUEST" && (
                        <div className={styles.buttonWrapper}>
                            <FontAwesomeIcon 
                                icon={faCheck} 
                                className="primaryCheck"
                                onClick={() => onClickAcceptBtn(request.crewJoinRequestId)}  
                            />
                            <FontAwesomeIcon 
                                icon={faXmark} 
                                className="primaryCancel"
                                onClick={() => onClickDenyBtn(request.crewJoinRequestId)}
                            />
                        </div>
                        )}
                        { status === "ACCEPT" && (
                            <span style={{color: "#7CB2FC"}}>승인</span>
                        )}
                        { status === "DENY" && (
                            <span style={{color: "#FF7723"}}>거절</span>
                        )}
                    </div>
                </div>
                )) }
                { crewJoinRequestList.length === 0 && (
                    <div className={styles.noRequests}>이력이 없습니다.</div>
                )}
            </div>


            <Pagination page={page} total={total} limit={perPage} onPageChange={setPage}/>
        </div>
    );
}

export default CrewJoinRequestListPage;
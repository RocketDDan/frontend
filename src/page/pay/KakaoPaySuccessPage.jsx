import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { sendKakaoPayApprove } from "../../api/pay.api";

const KakaoPaySuccessPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const pgToken = params.get("pg_token");

        const partnerOrderId = localStorage.getItem("partner_order_id");
        console.log("partnerOrderId: ", partnerOrderId);

        sendKakaoPayApprove(pgToken, partnerOrderId)
            .then((res) => {
                console.log("결제 승인 성공", res.data);
                navigate("/feed/list");
            })
            .catch((err) => {
                console.error("결제 승인 실패", err);
            });
    }, []);

    return <div>결제 승인 중...</div>;
};

export default KakaoPaySuccessPage;
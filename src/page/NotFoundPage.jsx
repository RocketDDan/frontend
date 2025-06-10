import Swal from "sweetalert2";

import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [alertShown, setAlertShown] = useState(false);

    useEffect(() => {
        if (alertShown) return;
        let domain = "페이지";
        if (location.pathname.startsWith("/feed")) {
            domain = "피드";
        } else if (location.pathname.startsWith("/runner")) {
            domain = "러너";
        } else if (location.pathname.startsWith("/crew")) {
            domain = "크루";
        }
        let html = (domain === "페이지")
            ? `해당 페이지가 없습니다.
            `
            : `
            해당 ${domain}가 없습니다.<br/>
            ${domain} 아이디를 확인해 주세요.
            `
        if (!alertShown) {
            Swal.fire({
                icon: 'info',
                title: `죄송합니다.
                유효하지 않은 요청입니다.`,
                html: html,
                confirmButtonText: '이전 화면으로',
                confirmButtonColor: '#5164ED',
                allowOutsideClick: false,
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(-1);
                }
            });

            setAlertShown(true);
        }
    }, [location.pathname, alertShown, navigate]);

    return null;
};

export default NotFoundPage;
import footerStyle from './Footer.module.css'

const Footer = () => {
    return (
        <footer className={footerStyle.container}>
            <div>
                <strong>Protocol</strong> © 2025 All Rights Reserved
            </div>
            <div className={footerStyle.bottom}>
                러너스하이 | 대표자명: 정재영<br />
                서울 종로구 창경궁로 254 7층 | 고객센터: guseo001237@gmail.com
            </div>
        </footer>
    );
};

export default Footer;
import { useParams } from 'react-router-dom';


const MemberUpdatePage = () => {

    const { memberId } = useParams();
    return (
        <div>
            [관리자] 멤버 수정 (id:  {memberId})
        </div>
    )
}

export default MemberUpdatePage;
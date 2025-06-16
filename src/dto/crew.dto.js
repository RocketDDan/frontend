import crewSampleImage from '../assets/sample_images/crew_sample.png';

const sampleCrew = {
    "crewId": 1,
    "crewName": "🚀🚀로켓단🔥🔥",
    "crewAddress": "서울특별시 강남구 테헤란로 123",
    "crewRegion": "서울특별시 강남구",
    "profilePath": crewSampleImage,
    "totalMemberCnt": 10,
    "introduce": "시대의 주인공은 우리들! 우리는 천하무적! 로켓단! 누구냐고 물으....",
    "createdAt": "2025-06-10",
    "member": false,
    "leader": false,
    "hasRequestedJoin": false,
}

const sampleCrewList = {
    "crewId": 1,
    "crewName": "🚀🚀로켓단🔥🔥",
    "crewAddress": "서울특별시 강남구 테헤란로 123",
    "crewRegion": "서울특별시 강남구",
    "profilePath": crewSampleImage,
    "totalMemberCnt": 10,
    "introduce": "시대의 주인공은 우리들! 우리는 천하무적! 로켓단! 누구냐고 물으....",
    "createdAt": "2025-06-10"
}

const sampleCrewMember = {
    "memberId": 1,
    "nickname": "러닝러버",
    "email": "running@example.com",
    "profilePath": crewSampleImage,
    "registerDate": "2024-03-20 14:30:00",
    "leader": true
}

const sampleCrewJoinRequest = {
    "crewJoinRequestId": 1,
    "crewId": 1,
    "memberId": 2,
    "nickname": "러닝러버",
    "profilePath": crewSampleImage,
    "requestDate": "2024-03-20 14:30:00",
    "requestMessage": "안녕하세요! 크루 가입을 신청합니다. 함께 달리고 싶어요! 😊 저는 매사 열심히 참여하는 성격이구요, mbti ENFJ로 성격도 활발해요!",
    "status": "ACCEPT"
}

export {sampleCrew, sampleCrewList, sampleCrewMember, sampleCrewJoinRequest};
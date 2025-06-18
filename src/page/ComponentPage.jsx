import { TextArea, TextInput } from "../components/base/Input";
import { SearchBar } from "../components/search_bar/SearchBar";
import { BasicCheckbox } from "../components/base/Checkbox";
import { BasicRadio } from "../components/base/Radio";
import { BasicSelect } from "../components/base/Select";
import { ProfileImage } from "../components/profile/ProfileImage";
import { Button } from "../components/base/Button";
import { SquareFeed } from "../components/feed/SquareFeed";

import MetamongImage from "../assets/images/metamong.jpeg"
import { useState } from "react";
import { CheckModal } from "../components/base/CheckModal";
import { CrewMemberInfo } from "../components/crew/CrewMemberInfo";
import Pagenation from "../components/base/Pagenation";

const HomePage = () => {
    const [value1, setValue1] = useState(); // text input
    // const [value2, setValue2] = useState(); // text input with label
    const [value3, setValue3] = useState(); // textarea 
    // const [value4, setValue4] = useState(); // textarea with label
    const [value5, setValue5] = useState(); // searchbar
    const [value6, setValue6] = useState("value2"); // radio
    const [value7, setValue7] = useState();
    // const [value8, setValue8] = useState(); // password input with label
    const [modalOpen, setModalOpen] = useState(false);

    const handleInput1 = (val) => {
        setValue1(val);
        console.log("change: ", val)
    }
    // const handleInput2 = (val) => {
    //     setValue2(val);
    //     console.log("change: ", val)
    // }
    const handleInput3 = (val) => {
        setValue3(val);
        console.log("change: ", val)
    }
    // const handleInput4 = (val) => {
    //     setValue4(val);
    //     console.log("change: ", val)
    // }
    const handleInput5 = (val) => {
        setValue5(val);
        console.log("change: ", val)
    }
    const handleInput6 = (val) => {
        setValue6(val);
        console.log("change: ", val)
    }
    const handleInput7 = (val) => {
        setValue7(val);
        console.log("change: ", val)
    }
    // const handleInput8 = (val) => {
    //     setValue8(val);
    //     console.log("change: ", val)
    // }


    return (
        <div style={{ width: '100%' }}>
            <div style={{
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}>
                {/* INPUT */}
                <h2>Input 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1' }}>
                        <h4>Text Input</h4>
                        <TextInput
                            width={"100%"}
                            value={value1}
                            placeholder={"placeholder"}
                            onChange={handleInput1} />
                    </div>
                    
                    <div style={{ flex: '1' }}>
                        <h4>Text Area</h4>
                        <TextArea
                            width={"100%"}
                            value={value3}
                            placeholder={"placeholder"}
                            onChange={handleInput3} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* SearchBar */}
                <h2>검색창</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1' }}>
                        <h4>검색창</h4>
                        <SearchBar
                            width={"100%"}
                            value={value5}
                            placeholder={"placeholder"}
                            onChange={handleInput5} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* check box & radio */}
                <h2>Checkbox & Radio 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Checkbox 태그</h4>
                        <BasicCheckbox
                            content="체크"
                            onClick={(val) => { console.log("click: ", val) }} />
                    </div>
                    <div>
                        <h4>Radio 태그</h4>
                        <BasicRadio
                            name="옵션"
                            options={[
                                { value: "value1", name: "name1" },
                                { value: "value2", name: "name2" },
                                { value: "value3", name: "name3" },]}
                            value={value6}
                            onChange={handleInput6} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* select  */}
                <h2>Select 태그(150px)</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Select 태그</h4>
                        <BasicSelect
                            value={value7}
                            onChange={handleInput7}
                            options={[
                                { value: "orange", label: "오렌지" },
                                { value: "apple", label: "사과" },
                            ]}
                            width={"150px"} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 프로필 이미지 */}
                <h2>프로필 이미지 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1' }}>
                        <h4>Feed Profile Image</h4>
                        <ProfileImage size="30px" />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 버튼 */}
                <h2>button 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1' }}>
                        <h4>Primary Button</h4>
                        <p>width: 90px</p>
                        <Button
                            width="90px"
                            onClick={() => { console.log("click") }} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 피드 */}
                <h2>피드 태그</h2>
                <div>
                    <h4>사각 피드 (140px)</h4>
                    <SquareFeed url={MetamongImage} />
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 확인 모달창 */}
                <h2>확인 모달창</h2>
                <div>
                    <button onClick={() => setModalOpen(true)}> 모달 열기 </button>
                    {modalOpen && (
                        <CheckModal
                            title="제목"
                            description="하시겠습니까?"
                            onConfirm={() => setModalOpen(false)}
                            onClose={() => setModalOpen(false)} />
                    )}
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 멤버 프로필 목록용 카드*/}
                <h2>크루 멤버 정보</h2>
                <div>
                    <CrewMemberInfo profilePath={MetamongImage} nickname="닉네임" date="2025-06-14 11:11:11" />
                </div>

                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 페이지네이션 버튼 */}
                <h2>페이지네이션 버튼</h2>
                <div>
                    <Pagenation page={1} isExistNextPage={false} setPage={() => console.log('nextPage')} />
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

            </div>
        </div>
    )
}

export default HomePage;
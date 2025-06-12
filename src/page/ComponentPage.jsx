import { TextAreaWithLabel, TextInput, TextInputWithLabel } from "../components/base/Input";
import { SearchBar } from "../components/search_bar/SearchBar";
import { BasicCheckbox } from "../components/base/Checkbox";
import { BasicRadio } from "../components/base/Radio";
import { BasicSelect } from "../components/base/Select";
import { FeedProfileImage, CrewProfileImage, MemberProfileImage } from "../components/profile/ProfileImage";
import { PrimaryBigButton, PrimaryButton, SecondaryBigButton, SecondaryButton } from "../components/base/Button";
import { BasicTable } from "../components/base/Table";
import { SquareFeed } from "../components/feed/SquareFeed";

import MetamongImage from "../assets/images/metamong.jpeg"


const HomePage = () => {
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
                        placeholder={"placeholder"} 
                        onChange={(val) => { console.log("change: ", val) }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Text Input With Label</h4>
                        <TextInputWithLabel 
                        width={"100%"} 
                        placeholder={"placeholder"} 
                        onChange={(val) => { console.log("change: ", val) }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Text Area With Label</h4>
                        <TextAreaWithLabel 
                        width={"100%"} 
                        placeholder={"placeholder"} 
                        onChange={(val) => { console.log("change: ", val) }} />
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
                            placeholder={"placeholder"}
                            onChange={(val) => { console.log("change: ", val) }} />
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
                            defaultValue={"value2"}
                            onChange={(val) => { console.log("change: ", val) }} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* select  */}
                <h2>Select 태그(150px)</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Select 태그</h4>
                        <BasicSelect
                            defaultValue="apple"
                            onChange={(val) => { console.log("change: ", val) }}
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
                        <FeedProfileImage />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Crew Profile Image</h4>
                        <CrewProfileImage />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Member Profile Image</h4>
                        <MemberProfileImage />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 버튼 */}
                <h2>button 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1' }}>
                        <h4>Primary Button</h4>
                        <p>width: 90px</p>
                        <PrimaryButton width="90px" onClick={() => { console.log("click") }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Secondary Button</h4>
                        <p>width: 120px</p>
                        <SecondaryButton width="120px" onClick={() => { console.log("click") }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Primary Big Button</h4>
                        <p>width: 120px</p>
                        <PrimaryBigButton width="120px" onClick={() => { console.log("click") }} />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>Secondary Big Button</h4>
                        <p>width: 150px</p>
                        <SecondaryBigButton width="150px" onClick={() => { console.log("click") }} />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }} />

                {/* 테이블 */}
                <h2>table 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1' }}>
                        <h4>테이블</h4>
                        <p>헤더: 선 있음</p>
                        <p>바디: 선 있음 (마지막 행: 선 있음)</p>
                        <BasicTable
                            headerLine={true}
                            bodyLine={true}
                            headers={['컬럼1', '컬럼2', '컬럼3', '컬럼4']}
                            keys={['key1', 'key2', 'key3', 'key4']}
                            data={[
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                            ]}
                        />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>테이블</h4>
                        <p>헤더: 선 있음</p>
                        <p>바디: 선 있음 (마지막 행: 선 없음)</p>
                        <BasicTable
                            headerLine={true}
                            bodyLine={true}
                            bodyLastLine={false}
                            headers={['컬럼1', '컬럼2', '컬럼3', '컬럼4']}
                            keys={['key1', 'key2', 'key3', 'key4']}
                            data={[
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                            ]}
                        />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>테이블</h4>
                        <p>헤더: 선 있음</p>
                        <p>바디: 선 없음</p>
                        <BasicTable
                            headerLine={true}
                            bodyLine={false}
                            headers={['컬럼1', '컬럼2', '컬럼3', '컬럼4']}
                            keys={['key1', 'key2', 'key3', 'key4']}
                            data={[
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                            ]}
                        />
                    </div>
                    <div style={{ flex: '1' }}>
                        <h4>테이블</h4>
                        <p>헤더: 선 없음</p>
                        <p>바디: 선 없음</p>
                        <BasicTable
                            headerLine={false}
                            bodyLine={false}
                            headers={['컬럼1', '컬럼2', '컬럼3', '컬럼4']}
                            keys={['key1', 'key2', 'key3', 'key4']}
                            data={[
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                                { 'key1': '값1', 'key2': '값2', 'key3': '값3', 'key4': '값4' },
                            ]}
                        />
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
            </div>
        </div>
    )
}

export default HomePage;
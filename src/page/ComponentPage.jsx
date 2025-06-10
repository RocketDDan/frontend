import { TextAreaWithLabel, TextInput, TextInputWithLabel } from "../components/base/Input";
import { FeedProfileImage, CrewProfileImage, MemberProfileImage } from "../components/profile/ProfileImage";
import { PrimaryBigButton, PrimaryButton, SecondaryBigButton, SecondaryButton } from "../components/base/Button";
import { BasicTable, TableWithNoLine } from "../components/base/Table";
import { SquareFeed } from "../components/feed/SquareFeed";

import MetamongImage from "../assets/images/metamong.jpeg"
import Coffee from '../example/Coffee';
import Number from "../example/Number";

const HomePage = () => {
    return (
        <div>
            <div style={{
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}>
                {/* INPUT */}
                <h2>Input 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1'}}>
                        <h4>Text Input</h4>
                        <TextInput />
                    </div>
                    <div style={{ flex: '1'}}>
                        <h4>Text Input With Label</h4>
                        <TextInputWithLabel />
                    </div>
                    <div style={{ flex: '1'}}>
                        <h4>Text Area With Label</h4>
                        <TextAreaWithLabel />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }}/>
                {/* 프로필 이미지 */}
                <h2>프로필 이미지 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1'}}>
                        <h4>Feed Profile Image</h4>
                        <FeedProfileImage />
                    </div>
                    <div style={{ flex: '1'}}>
                        <h4>Crew Profile Image</h4>
                        <CrewProfileImage />
                    </div>
                    <div style={{ flex: '1'}}>
                        <h4>Member Profile Image</h4>
                        <MemberProfileImage />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }}/>
                {/* 버튼 */}
                <h2>button 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1'}}>
                        <h4>Primary Button (90px)</h4>
                        <PrimaryButton width="90px" />
                    </div>
                    <div style={{ flex: '1'}}>
                        <h4>Secondary Button (90px)</h4>
                        <SecondaryButton width="90px" />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1'}}>
                        <h4>Primary Big Button (120px)</h4>
                        <PrimaryBigButton width="120px" />
                    </div>
                    <div style={{ flex: '1'}}>
                        <h4>Secondary Big Button (120px)</h4>
                        <SecondaryBigButton width="120px" />
                    </div>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }}/>
                {/* 테이블 */}
                <h2>table 태그</h2>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div style={{ flex: '1'}}>
                        <h4>테이블</h4>
                        <BasicTable
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
                    <div style={{ flex: '1'}}>
                        <h4>선 없는 테이블</h4>
                        <TableWithNoLine
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
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }}/>
                {/* 피드 */}
                <h2>피드 태그</h2>
                <div>
                    <h4>사각 피드 (140px)</h4>
                    <SquareFeed url={MetamongImage} />
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #ccc", margin: "8px 0" }}/>
                {/* 예제 */}
                <Coffee />
                <Number />
            </div>
        </div>
    )
}

export default HomePage;
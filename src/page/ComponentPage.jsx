import { TextAreaWithLabel, TextInput, TextInputWithLabel } from "../components/base/Input";
import { FeedProfileImage, CrewProfileImage, MemberProfileImage } from "../components/profile/ProfileImage";
import { PrimaryBigButton, PrimaryButton, SecondaryBigButton, SecondaryButton } from "../components/base/Button";
import { BasicTable } from "../components/base/Table";
import { SquareFeed } from "../components/feed/SquareFeed";

import MetamongImage from "../assets/images/metamong.jpeg"
import Coffee from '../example/Coffee';
import Number from "../example/Number";

const HomePage = () => {
    return (
        <div>
            <h1>컴포넌트 확인</h1>
            <div style={{
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}>
                {/* INPUT */}
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Text Input</h4>
                        <TextInput />
                    </div>
                    <div>
                        <h4>Text Input With Label</h4>
                        <TextInputWithLabel />
                    </div>
                    <div>
                        <h4>Text Area With Label</h4>
                        <TextAreaWithLabel />
                    </div>
                </div>
                {/* 프로필 이미지 */}
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Feed Profile Image</h4>
                        <FeedProfileImage />
                    </div>
                    <div>
                        <h4>Crew Profile Image</h4>
                        <CrewProfileImage />
                    </div>
                    <div>
                        <h4>Member Profile Image</h4>
                        <MemberProfileImage />
                    </div>
                </div>
                {/* 버튼 */}
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Primary Button (90px)</h4>
                        <PrimaryButton width="90px" />
                    </div>
                    <div>
                        <h4>Secondary Button (90px)</h4>
                        <SecondaryButton width="90px" />
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'start', gap: '5rem' }}>
                    <div>
                        <h4>Primary Big Button (120px)</h4>
                        <PrimaryBigButton width="120px" />
                    </div>
                    <div>
                        <h4>Secondary Big Button (120px)</h4>
                        <SecondaryBigButton width="120px" />
                    </div>
                </div>
                {/* 테이블 */}
                <div>
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
                {/* 피드 */}
                <div>
                    <h4>사각 피드 (140px)</h4>
                    <SquareFeed url={MetamongImage} />
                </div>
            </div>
        </div>
    )
}

export default HomePage;
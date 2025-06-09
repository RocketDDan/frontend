import { PrimaryBigButton, PrimaryButton, SecondaryBigButton, SecondaryButton } from "../components/base/Button";
import { TextAreaWithLabel, TextInput, TextInputWithLabel } from "../components/base/Input";
import { FeedProfileImage, CrewProfileImage, MemberProfileImage } from "../components/profile/ProfileImage";

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
                <div>
                    <h4>Feed Profile Image</h4>
                    <FeedProfileImage/>
                </div>
                <div>
                    <h4>Crew Profile Image</h4>
                    <CrewProfileImage/>
                </div>
                <div>
                    <h4>Member Profile Image</h4>
                    <MemberProfileImage/>
                </div>
                <div>
                    <h4>Primary Button (90px)</h4>
                    <PrimaryButton width="90px"/>
                </div>
                <div>
                    <h4>Secondary Button (90px)</h4>
                    <SecondaryButton width="90px"/>
                </div>
                <div>
                    <h4>Primary Big Button (120px)</h4>
                    <PrimaryBigButton  width="120px"/>
                </div>
                <div>
                    <h4>Secondary Big Button (120px)</h4>
                    <SecondaryBigButton  width="120px"/>
                </div>
            </div>
        </div>
    )
}

export default HomePage;
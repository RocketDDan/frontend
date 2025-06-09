import { PrimaryButton } from "../components/base/Button";
import { TextInput, TextInputWithLabels } from "../components/base/Input";
import { FeedProfileImage, CrewProfileImage, MemberProfileImage } from "../components/profile/ProfileImage";

const HomePage = () => {
    return (
        <div>
            <h1>Component 테스트 페이지</h1>
            <div style={{
                textAlign: "start",
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem",
            }}>
                <div>
                    <h4>PrimaryButton</h4>
                    <PrimaryButton />
                </div>
                <div>
                    <h4>TextInput</h4>
                    <TextInput />
                </div>
                <div>
                    <h4>TextInputWithLabels</h4>
                    <TextInputWithLabels />
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
            </div>
        </div>
    )
}

export default HomePage;
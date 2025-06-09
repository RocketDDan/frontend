import { PrimaryButton } from "../components/base/Button";
import { TextInput, TextInputWithLabels } from "../components/base/Input";


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
            </div>
        </div>
    )
}

export default HomePage;
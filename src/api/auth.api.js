import Swal from "sweetalert2";
import apiClient from "./apiClient";

export const fetchUserInfo = async () => {
  try {
    const response = await apiClient.get("/members/personal-info");
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    throw error;
  }
};

export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await apiClient.get(
      `/members/nickname-check?nickname=${encodeURIComponent(nickname)}`
    );
    return response.data.duplicate;
  } catch (error) {
    console.error("닉네임 중복 확인 실패:", error);
    throw error;
  }
};

export const signUp = async (signUpData, profileImage) => {
  try {
    const multipartForm = new FormData();
    multipartForm.append(
      "signUp",
      new Blob([JSON.stringify(signUpData)], { type: "application/json" })
    );
    if (profileImage) multipartForm.append("profileImage", profileImage);

    await apiClient.post("/oauth2/signup", multipartForm, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("회원가입 실패:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    await apiClient.post("/auth/login", {
      email,
      password,
    });
  } catch (error) {
    if (error.status === 400) {
      console.error("로그인 실패 (400): ", error.response.data);
    } else if (error.status === 500) {
      console.error("로그인 실패 (500):", error);
    }
    Swal.fire({
      icon: "error",
      title: "로그인 실패",
      text: "다시 시도해주세요.",
      timer: 1500,
      showConfirmButton: false
    });
    throw error;
  }
};

import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";

function App() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<any>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("token response:", tokenResponse);
        setAccessToken(tokenResponse.access_token);

        const userInfoResponse = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${tokenResponse.access_token}`,
            },
          }
        );
        const userInfo = await userInfoResponse.json();
        setUserInfo(userInfo);
      } catch (error) {
        console.log("failed", error);
      }
    },
    onError: (error) => console.log("Login failed:", error),
  });

  const logout = async () => {
    if (accessToken) {
      try {
        await fetch(
          `https://oauth2.googleapis.com/revoke?token=${accessToken}`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        );
        console.log("logged out");
      } catch (error) {
        console.log("Failed to revoke token", error);
      }
    }
    setUserInfo(null);
  };

  useEffect(() => {
    if (userInfo) {
      console.log("User Info:", userInfo);
      console.log("Access Token:", accessToken);
    }
  }, [userInfo]);

  return (
    <section>
      <h1>Google OAuth</h1>
      <button onClick={() => login()}>Sign in with Google</button>
      <button onClick={() => logout()}>Sign out with Google</button>
      {userInfo && (
        <div>
          <p>
            <img src={userInfo.picture} alt="display picture" />
          </p>
          <p>{userInfo.name}</p>
        </div>
      )}
      {!userInfo && (
        <div>
          <p>No info yet</p>
        </div>
      )}
    </section>
  );
}

export default App;

import "./App.css";
import { useGoogleLogin } from "@react-oauth/google";
import { useState, useEffect } from "react";

function App() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [accessToken, setAccessToken] = useState<string | any>(null);
  const [securedData, setSecuredData] = useState<string | any>(null);

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        console.log("token response:", tokenResponse);
        
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
        setAccessToken(tokenResponse.access_token);
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

  const fetchSecuredData = async () => {
    if (accessToken) {
      try {
        const response = await fetch("http://localhost:8080/secured", {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        if (response.ok) {
          const data = await response.text();
          setSecuredData(data)
          console.log(data);
          
        } else {
          console.log('failed to get secured data');
        } 
      } catch (err) {
          console.log('error in getting sec data', err);
          
        }
    }
  };

  const fetchRegularData = async () => {

      try {
        const response = await fetch("http://localhost:8080");
        if (response.ok) {
          const data = await response.text();
          setSecuredData(data)
          console.log(data);
          console.log(securedData);
          
          
        } else {
          console.log('failed to get secured data');
        } 
      } catch (err) {
          console.log('error in getting sec data', err);
          
        }
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
      <p><button onClick={fetchSecuredData}>Get Secured Data</button></p>
      <p><button onClick={fetchRegularData}>Get Regular Data</button></p>
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

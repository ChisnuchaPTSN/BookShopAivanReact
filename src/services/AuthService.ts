import {api, handleApiError} from './configAxios';

// 📌 กำหนด interface ของข้อมูลที่จะได้รับจาก API (authentication response)
interface AuthResponse {
    error: boolean;
    message: string;
    userId: number;
    accessToken: string;
  }
  
  // 📌 กำหนด interface ของข้อมูลที่จะส่งไปยัง API 
  interface SignInCredentials {
    username: string;
    role:string;
    password: string;
  }
  

class AuthService {
  // 📌 method สำหรับ Login (singIn)
  static async signIn(credentials: SignInCredentials): Promise<AuthResponse> {
    try {

      // 📌 ส่งข้อมูลไปยัง API
      const response = await api.post<AuthResponse>(
        "/users/auth/signin/",
        credentials
      );

      // 📌 หาก login สำเร็จให้เก็บ token ใน local storage
      if ((!response.data.error) && response.data.accessToken) {
        localStorage.setItem("access_token", response.data.accessToken);
        localStorage.setItem(
          "email",
          JSON.stringify(credentials.username)
        );
      }

      // Test : สำหรับทดสอบการแสดง Loading
      //await new Promise(resolve => setTimeout(resolve, 5000));

      return response.data;

    } catch (error) {
      
      const apiErr = handleApiError(error)
        
      // 📌 หากเกิด error จากการเรียกใช้ API ให้แสดงข้อความของ error 
      throw apiErr

    }
  }

}

export default AuthService;

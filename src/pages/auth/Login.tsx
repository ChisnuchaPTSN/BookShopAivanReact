import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import AuthService from "../../services/AuthService";
import { useState } from "react";
import { AxiosError } from "axios";

// สร้าง interface สำหรับรับค่า email และ password
interface IFormInput {
  email: string;
  password: string;
}

function Login() {
  document.title = "Login";
  const [isLoading, setIsLoading] = useState(false);

  // Create useForm hook to handle form
  // สร้างตัวแปรสำหรับใช้งาน react-hook-form จาก useForm
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  // Handle form submit
  // สร้าง function สำหรับจัดการเมื่อมีการ submit form
  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    setIsLoading(true);

    try {
      const response = await AuthService.signIn({
        username: data.email,
        role: "admin",
        password: data.password,
      });

      if (!response.error) {
        let timerInterval: number;
        Swal.fire({
          title: "Login successful!",
          html: "Go to Home Page in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup()?.querySelector("b");
            if (timer) {
              timerInterval = setInterval(() => {
                timer.textContent = `${Swal.getTimerLeft()}`;
              }, 100);
            }
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
            localStorage.setItem("access_token", response.accessToken);
            localStorage.setItem("email", data.email);
            window.location.href = "/admin/home";
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "การยืนยันตัวตนล้มเหลว",
          text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง",
        });
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        // Check the status code
        if (error.response?.status === 401) {
          Swal.fire({
            icon: "error",
            title: "การยืนยันตัวตนล้มเหลว",
            text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง กรุณาตรวจสอบและลองใหม่อีกครั้ง",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "เข้าสู่ระบบไม่สำเร็จ",
            text: `เกิดข้อผิดพลาด: ${
              error.response?.status + " " + error.response?.statusText ||
              error.message
            }`,
          });
        }
      } else {
        // Handle non-Axios errors
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: `เกิดข้อผิดพลาดบางอย่าง: ${String(error)}`,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-black to-gray-500">
      <div className="w-full max-w-xs m-auto bg-gray-100 rounded p-5">
        {/* header */}
        <header className="mb-6">
          <div className="w-50 h-50 text-white p-6 bg-black rounded-full mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-40 h-40 text-white  mx-auto"
              viewBox="0 -960 960 960"
            >
              <path d="M560-564v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-600q-38 0-73 9.5T560-564Zm0 220v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-380q-38 0-73 9t-67 27Zm0-110v-68q33-14 67.5-21t72.5-7q26 0 51 4t49 10v64q-24-9-48.5-13.5T700-490q-38 0-73 9.5T560-454ZM260-320q47 0 91.5 10.5T440-278v-394q-41-24-87-36t-93-12q-36 0-71.5 7T120-692v396q35-12 69.5-18t70.5-6Zm260 42q44-21 88.5-31.5T700-320q36 0 70.5 6t69.5 18v-396q-33-14-68.5-21t-71.5-7q-47 0-93 12t-87 36v394Zm-40 118q-48-38-104-59t-116-21q-42 0-82.5 11T100-198q-21 11-40.5-1T40-234v-482q0-11 5.5-21T62-752q46-24 96-36t102-12q58 0 113.5 15T480-740q51-30 106.5-45T700-800q52 0 102 12t96 36q11 5 16.5 15t5.5 21v482q0 23-19.5 35t-40.5 1q-37-20-77.5-31T700-240q-60 0-116 21t-104 59ZM280-494Z" />
            </svg>
          </div>
          <div className="text-3xl font-bold w-full text-center my-5">
            ComSci Book Shop
          </div>
        </header>

        {/* form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* email */}
          <div>
            <label htmlFor="email">email</label>
            <input
              type="text"
              {...register("email", {
                required: true,
                minLength: 5,
                maxLength: 50,
                //pattern: /^\S+@\S+$/i
                pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              })}
            />
            {errors.email?.type === "required" && (
              <span className="text-red-500">กรุณากรอกอีเมล์ !</span>
            )}
            {errors.email?.type === "minLength" && (
              <span className="text-red-500">ความยาวไม่ต่ำกว่า 5 อักษร</span>
            )}
            {errors.email?.type === "maxLength" && (
              <span className="text-red-500">ความยาวไม่เกิน 20 อักษร</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-500">รูปแบบอีเมล์ไม่ถูกต้อง</span>
            )}
          </div>
          {/* password */}
          <div>
            <label htmlFor="password">password</label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
              })}
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">กรุณากรอกรหัสผ่าน !</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">ความยาวไม่ต่ำกว่า 6 อักษร</span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">ความยาวไม่เกิน 20 อักษร</span>
            )}
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 mb-6 rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex flex-row items-center justify-center">
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 me-3 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span>กำลังเข้าสู่ระบบ ... </span>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

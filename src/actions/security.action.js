import axios from "../helper/axios";
import { securityConstant } from "./constant";
import Swal from "sweetalert2";

const getAllQuestion = () => {
    return async (dispatch) => {
      dispatch({ type: securityConstant.GET_SECURITY_QUESTION_REQUEST });
      const res = await axios.get(`/api/security-question`);
      if (res.status === 200) {
        const securityQuestion = res.data;
        dispatch({
          type: securityConstant.GET_SECURITY_QUESTION_SUCCESS,
          payload: securityQuestion,
        });
      } else {
        dispatch({
          type: securityConstant.GET_SECURITY_QUESTION_FAILED,
          payload: { error: res.data.error },
        });
      }
    };
  };

  // export const ResetPassword = async (newPassword) => {
  //   const navigate = useNavigate()
  //   if (!newPassword.trim()) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Password Error",
  //       text: "Password cannot be empty.",
  //       customClass: {
  //         confirmButton: "swal-button-custom-color",
  //       },
  //     });
  //     return; // Don't proceed further
  //   }

  //   // Check if the new password meets the length requirement
  //   if (newPassword.length < 8) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Password Error",
  //       text: "Password must be at least 8 characters long.",
  //       customClass: {
  //         confirmButton: "swal-button-custom-color",
  //       },
  //     });
  //     return; // Don't proceed further
  //   }

  //   // Check if the new password is strong
  //   if (!isStrongPassword(newPassword)) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Password Error",
  //       text: "Password is not strong enough. It should contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
  //       customClass: {
  //         confirmButton: "swal-button-custom-color",
  //       },
  //     });
  //     return; // Don't proceed further
  //   }

  //   try {
  //     // Send the new password to the backend for updating
  //     await axios.post("http://192.168.100.5:2000/user/reset", {
  //       newPassword,
  //     }); // Replace with your API endpoint

  //     Swal.fire({
  //       icon: "success",
  //       title: "Success",
  //       text: "Password reset successful. You can now log in with your new password.",
  //       customClass: {
  //         confirmButton: "swal-button-custom-color",
  //       },
  //     });
  //     return navigate("/login");


  //   } catch (error) {
  //     console.error("Error resetting password:", error);
  //   }
  // };

  // // Function to check if a password is strong
  // function isStrongPassword(password) {
  //   // Check if the password contains at least one uppercase letter and at least one special character
  //   const uppercaseRegex = /[A-Z]/;
  //   const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/; // You can modify this to include the special characters you want

  //   return (
  //     uppercaseRegex.test(password) && specialCharacterRegex.test(password)
  //   );
  // }

  export {
    getAllQuestion
  }
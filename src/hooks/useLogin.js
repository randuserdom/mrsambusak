import { url } from "./const";

export function useLogin(email, password) {
  const [message, setMessage] = useState("");

  const login = async () => {
    try {
      const response = await axios.post(`${url}/login`, {
        email: email,
        password: password,
      });

      const data = await response;

      setMessage(data.message);

      if (response.status === 200) {
        localStorage.setItem("user", data.user);
        window.location = "/chat";
      }
    } catch (error) {
      setMessage(error.data.detail || "An error occurred during login.");
    }
  };

  return { message, login };
}

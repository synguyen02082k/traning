import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { CustomLottie } from "../component/dialog";
import { login } from "../services/api/user.api";
import loading from "../assets/lottei/loading.json";
import "./login.css";
import { useNavigate } from "react-router-dom";

type LoginFormInputs = {
  email: string;
  password: string;
};

function Login() {
  const { mutate, isLoading } = useMutation(login);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs, any>();

  const onSubmit = (value: LoginFormInputs) => {
    mutate(value, {
      onSuccess(data) {
        localStorage.setItem("user", JSON.stringify(data));
        localStorage.setItem("token", data.data.accessToken);
        navigate("/");
      },
      onError(error) {},
    });
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <span className="error-message">This field is required</span>
          )}
        </div>
        <button type="submit" className="submit-button">
          {isLoading ? (
            <CustomLottie color="red" animationData={loading} />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
}

export default Login;

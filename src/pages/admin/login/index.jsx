import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom/dist";
import endpoints from "../../../utils/api/enpoints.js";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPass, setShowPass] = React.useState(false);
  const [inputs, setInputs] = React.useState({
    username: {
      value: "",
      error: false,
    },
    password: {
      value: "",
      error: false,
    },
  });
  const [errMessage, setErrMessage] = React.useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: value,
        error: false,
      },
    }));
  };

  const validation = () => {
    const username = inputs.username.value;
    const password = inputs.password.value;

    if (username == "") {
      setInputs((prev) => ({
        ...prev,
        username: {
          ...prev.username,
          error: "Username tidak boleh kosong",
        },
      }));
      return false;
    }

    if (password == "") {
      setInputs((prev) => ({
        ...prev,
        password: {
          ...prev.password,
          error: "Password tidak boleh kosong",
        },
      }));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrMessage(false);
    if (validation()) {
      try {
        await axios.post(
          endpoints.LOGIN,
          {
            username: inputs.username.value,
            password: inputs.password.value,
          },
          { withCredentials: true }
        );

        navigate("/admin/input-data", { replace: true });
      } catch (error) {
        // console.log(error.response.data.message);
        setErrMessage(error.response.data.message);
      }
    }
  };

  return (
    <div className="min-h-screen w-screen bg-broken-white flex">
      <div className="bg-customBlue3 flex items-center justify-center flex-grow max-sm:hidden">
        <img src="/img/LOGO.png" alt="logo" className="w-full max-w-sm" />
      </div>
      <div className="flex items-center justify-center flex-auto px-8 py-10">
        <div className="bg-white px-8 py-10 rounded-2xl flex-auto max-w-md">
          <h1 className="text-3xl font-semibold mb-10">Log in</h1>

          {errMessage && (
            <div className="py-2 px-3 rounded-md bg-red-100 text-red-500 mb-4 flex items-center justify-between">
              <span>{errMessage}</span>
              <span
                className="text-black cursor-pointer hover:opacity-50"
                onClick={() => setErrMessage(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="group mb-4">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                className={`block w-full py-2 px-3 rounded-md border border-gray-300 focus:border-customBlue3 focus:ring-customBlue1 focus:ring-2 focus:ring-offset-1 focus:outline-none ${
                  inputs.username.error && "border-red-500"
                }`}
                onChange={handleChange}
                value={inputs.username.value}
                placeholder="Masukkan username"
              />
              {inputs.username.error && (
                <p className="text-red-500 text-xs">{inputs.username.error}</p>
              )}
            </div>
            <div className="group mb-4">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  id="password"
                  className="flex-1 w-full py-2 px-3 pe-10 rounded-md border border-gray-300 border-e-0 focus:border-customBlue3 focus:ring-customBlue1 focus:ring-2 focus:ring-offset-1 focus:outline-none"
                  onChange={handleChange}
                  value={inputs.password.value}
                  placeholder="Masukkan password"
                />
                <div
                  className="cursor-pointer absolute right-2 top-2"
                  onClick={() => setShowPass(!showPass)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    {!showPass ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                        />
                      </>
                    )}
                  </svg>
                </div>
              </div>
            </div>
            {/* <div className="text-end mb-8">
              <a href="#" className="text-sm text-customBlue3 underline">
                Forgot Password?
              </a>
            </div> */}
            <button
              type="submit"
              className="block py-2 px-12 rounded-lg font-medium text-white bg-customBlue3"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

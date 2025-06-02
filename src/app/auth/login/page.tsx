"use client";
import FormWrapper from "../../../components/form/form";
import {  useForm } from "react-hook-form";
import { Checkbox } from "../../../components/common/control/checkboxControl";
import { Label } from "../../../components/common/component/label";
import { useLoginStore } from "../../../store/login-store";
import { useState } from "react";
import AuthService from "../../../services/auth-service";
import { useCommonStore } from "../../../store/common-store";
import { useRouteControl } from "../../../hook/routeControl";
import { ROUTER } from "../../../const/routers";
import { useMasterDataStore } from "../../../store/master-data-store";
import { useAuthCookies } from "../../../hook/cookies";
import { useAuthStore } from "../../../store/auth-store";
import { Button } from "primereact/button";
import { InputTextControl } from "@/components/common/form/input-text";
import { LoginModel } from "@/model/account-model";

const Login = () => {
  const { mode } = useLoginStore();
  const [error, setError] = useState<string | null>(null);
  const { showSpinner, hideSpinner } = useCommonStore();
  const { redirectScreen } = useRouteControl();
  const { session } = useMasterDataStore();
  const { setAuthCookie, setAccountIdCookie } = useAuthCookies();
  const {} = useAuthStore();
  const methods = useForm<LoginModel>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = async (data: LoginModel) => {
    showSpinner();
    setError(null);
    try {
      const body: LoginModel = {
        email: data.email,
        password: data.password,
        rule_id: 2,
        rememberMe: data.rememberMe,
      };
      const response = await AuthService.login(body);
      if (response.status === 200) {
        setError("Login Success!");
        console.log("response.data:", response.data);

        useAuthStore.setState({ accountData: response.data });
        if (!session) {
          setAuthCookie({ token: "OOO" });
          if (response.data) {
            setAccountIdCookie(response.data.account_id);
          }
        }
        hideSpinner();
        redirectScreen(ROUTER.HOME);
      } else {
        setError("Server Error!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      hideSpinner();
    }
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit} className="login-form" methods={methods}>
        <div className="input-label-block">
          <div className="input-label">Email</div>
          <InputTextControl
            name="email"
            placeholder="Enter your email"
            required={true}
          />
        </div>
        <div className="input-label-block">
          <div className="input-label">Password</div>
          <InputTextControl
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
        </div>
        <div className="flex flex-row justify-between ssm-under:flex-col">
          <Checkbox
            controlProps={{
              name: "rememberMe",
            }}
            labelProps={{
              label: "Remember Me",
            }}
          />
          <Label
            label="Forgot Password?"
            labelClassName="label-link ssm-under:my-2 ssm-under:flex ssm-under:w-full ssm-under:justify-end"
          />
        </div>
        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
        </div>
        <Button
          type="submit"
          className="!w-full mt-4"
          label={`${mode === 1 ? "Login" : "Register"}`}
        />
      </FormWrapper>
    </>
  );
};

export default Login;

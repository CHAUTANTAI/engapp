"use client";
import { InputControl } from "../../../components/common/control/inputControl";
import FormWrapper from "../../../components/form/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema, AuthSchemaType } from "../../../schema/login-schema";
import { Checkbox } from "../../../components/common/control/checkboxControl";
import { Label } from "../../../components/common/component/label";
import { useLoginStore } from "../../../store/login-store";
import { Button } from "../../../components/common/button/button";
import { useState } from "react";
import AuthService from "../../../services/auth-service";
import { useCommonStore } from "../../../store/common-store";
import { useRouteControl } from "../../../hook/routeControl";
import { ROUTER } from "../../../const/routers";
import { useMasterDataStore } from "../../../store/master-data-store";
import { useAuthCookies } from "../../../hook/cookies";

const Login = () => {
  const { mode } = useLoginStore();
  const [error, setError] = useState<string | null>(null);
  const { showSpinner, hideSpinner } = useCommonStore();
  const { redirectScreen } = useRouteControl();
  const { session } = useMasterDataStore();
  const { setAuthCookie } = useAuthCookies();
  const methods = useForm({
    resolver: zodResolver(AuthSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit: SubmitHandler<AuthSchemaType> = async (
    data: AuthSchemaType
  ) => {
    showSpinner();
    setError(null);
    try {
      const body: AuthSchemaType = {
        email: data.email,
        password: data.password,
        rule_id: 2,
      };
      setTimeout(async () => {
        const response = await AuthService.login(body);
        if (response.status === 200) {
          setError("Login Success!");
          if (!session) {
            setAuthCookie({ token: "OOO" });
          }
          hideSpinner();
          redirectScreen(ROUTER.HOME);
        } else {
          hideSpinner();
          console.log("Server Error!");
        }
      }, 3000);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      // hideSpinner();
    }
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit} className="login-form" methods={methods}>
        <div className="input-label-block">
          <div className="input-label">Email</div>
          <InputControl
            name="email"
            className="input-styles"
            placeholder="Enter your email"
            required={true}
          />
        </div>
        <div className="input-label-block">
          <div className="input-label">Password</div>
          <InputControl
            name="password"
            type="password"
            className="input-styles"
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
          additionalClassName="!w-full mt-4"
          value={`${mode === 1 ? "Login" : "Register"}`}
          onClick={() => {}}
        />
      </FormWrapper>
    </>
  );
};

export default Login;

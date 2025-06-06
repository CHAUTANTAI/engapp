// src/app/auth/login/LoginForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { useLoginStore } from "@/store/login-store";
import { useCallback, useState } from "react";
import AuthService from "@/services/auth-service";
import { useAuthStore } from "@/store/auth-store";
import { LoginModel } from "@/model/account-model";
import { Button } from "primereact/button";
import { InputTextControl } from "@/components/common/form/input-text";
import { Checkbox } from "@/components/common/control/checkboxControl";
import { Label } from "@/components/common/component/label";
import Cookies from "js-cookie";
import FormWrapper from "@/components/form/form";
import { hashPassword } from "@/util/funs";

const LoginPage = () => {
  const { mode } = useLoginStore();
  const [error] = useState<string | null>(null);
  const methods = useForm<LoginModel>({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const onSubmit = useCallback(
    async (data: LoginModel) => {
      const hashedPassword = await hashPassword(data.password);
      if (hashedPassword) {
        const { data: sessionData } = await AuthService.login({
          email: data.email,
          password: hashedPassword,
          rememberMe: data.rememberMe,
          rule_id: data.rule_id,
        });
        if (sessionData) {
          sessionStorage.setItem(
            "session",
            JSON.stringify(sessionData.session)
          );
          Cookies.set("access_token", sessionData.access_token);
          useAuthStore.getState().setSession(sessionData.session);
          useAuthStore.getState().setAccessToken(sessionData.access_token);
        }
      }
    },
    []
  );

  return (
    <FormWrapper onSubmit={onSubmit} className="login-form" methods={methods}>
      <div className="input-label-block">
        <div className="input-label">Email</div>
        <InputTextControl
          name="email"
          placeholder="Enter your email"
          required
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
          controlProps={{ name: "rememberMe" }}
          labelProps={{ label: "Remember Me" }}
        />
        <Label
          label="Forgot Password?"
          labelClassName="label-link ssm-under:my-2 ssm-under:flex ssm-under:w-full ssm-under:justify-end"
        />
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <Button
        type="submit"
        className="!w-full mt-4"
        label={mode === 1 ? "Login" : "Register"}
      />
    </FormWrapper>
  );
};

export default LoginPage;

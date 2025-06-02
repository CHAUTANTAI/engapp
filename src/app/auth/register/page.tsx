"use client";
import { useForm } from "react-hook-form";
import { useLoginStore } from "../../../store/login-store";
import {} from "../../../components/common/control/input/inputControl";
import FormWrapper from "../../../components/form/form";
import { useState } from "react";
import AuthService from "../../../services/auth-service";
import { RegisterFormModel, RegisterReqModel } from "@/model/account-model";
import { InputTextControl } from "@/components/common/form/input-text";

const Register = () => {
  const { mode } = useLoginStore();
  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit = async (data: RegisterFormModel) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const body: RegisterReqModel = {
        email: data.email,
        password: data.password,
        rule_id: 2,
      };
      const response = await AuthService.createAccount(body);

      if (response.status === 201) {
        setSuccessMessage("Account created successfully!");
        methods.reset();
      } else {
        setError("Error creating account");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit} className="login-form" methods={methods}>
        <div className="input-label-block">
          <div className="input-label">Email</div>
          <InputTextControl
            name="email"
            className="input-styles"
            placeholder="Enter your email"
            required={true}
          />
        </div>
        <div className="input-label-block">
          <div className="input-label">Password</div>
          <InputTextControl
            name="password"
            type="password"
            className="input-styles"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="mt-4">
          {error && <p className="text-red-500">{error}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}
        </div>

        <input
          type="submit"
          className="button-styles !w-full mt-4"
          value={`${mode === 1 ? "Login" : "Register"}`}
          disabled={isLoading}
        />
      </FormWrapper>
    </>
  );
};

export default Register;

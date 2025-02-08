"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginStore } from "../../../store/login-store";
import { InputControl } from "../../../components/common/control/inputControl";
import FormWrapper from "../../../components/form/form";
import { AuthSchema, AuthSchemaType } from "../../../schema/login-schema";
import { useState } from "react";
import AuthService from "../../../services/auth-service";

const Register = () => {
  const { mode } = useLoginStore();
  const methods = useForm({
    resolver: zodResolver(AuthSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<AuthSchemaType> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const body: AuthSchemaType = {
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

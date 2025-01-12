"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginStore } from "../../../store/login-store";
import { Label } from "../../../components/common/component/label";
import { InputControl } from "../../../components/common/control/inputControl";
import FormWrapper from "../../../components/form/form";
import { loginSchema } from "../../../schema/login-schema";
import { Checkbox } from "../../../components/common/control/checkboxControl";

const Register = () => {
  const { mode } = useLoginStore();
  const methods = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      userName: "",
      password: "",
      rememberMe: true,
    },
  });

  // const onSubmit = (data: any) => {
  //   console.log(data);
  //   alert("SUBMIT:", data);
  // };
  
  return (
    <>
      <FormWrapper onSubmit={() => {}} className="login-form" methods={methods}>
        <div className="input-label-block">
          <div className="input-label">Username</div>
          <InputControl
            name="userName"
            className="input-styles"
            placeholder="Enter your name"
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
        <div className="flex flex-row justify-between">
          <Checkbox
            controlProps={{
              name: "rememberMe",
            }}
            labelProps={{
              label: "Remember Me",
            }}
          />
          <Label label="Forgot Password?" labelClassName="label-link" />
        </div>
        <input
          type="submit"
          className="button-styles !w-full mt-4"
          value={`${mode === 1 ? "Login" : "Register"}`}
        />
      </FormWrapper>
    </>
  );
};

export default Register;

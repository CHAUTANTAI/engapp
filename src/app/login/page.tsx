"use client";
import Image from "next/image";
import { InputControl } from "../../components/common/control/inputControl";
import FormWrapper from "../../components/form/form";
// import { useForm } from "react-hook-form";

const Login = () => {
  // const methods: UseFormReturn<any> = useForm({ defaultValues });

  return (
    <>
      <div className="flex flex-grow p-10 w-full h-full bg-[#ffffff] ssm-under:flex ssm-under:flex-col">
        <div className=" w-full mx-5 flex justify-center ssm-under:w-auto">
          <div className="rounded-3xl flex items-center justify-center">
            <Image
              src="/assets/img/logo.png"
              width={400}
              height={0}
              className="rounded-3xl shadow-custom w-full ssm-under:w-[250px] ssm-under: my-5"
              layout="intrinsic"
              alt={"Avatar"}
            />
          </div>
        </div>
        <div className="w-full">
          <FormWrapper onSubmit={() => {}} className="login-form">
            <div className="center-container">
              <div className="input-label-block">
                <div className="input-label">User name</div>
                <InputControl
                  name="username"
                  className="input-styles"
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-label-block">
                <div className="input-label">Password</div>
                <InputControl
                  name="password"
                  className="input-styles"
                  placeholder="Enter your password"
                />
              </div>
            </div>
          </FormWrapper>
        </div>
      </div>
    </>
  );
};

export default Login;

"use client";
import Image from "next/image";
import { Label } from "../../components/common/component/label";
import { useLoginStore } from "../../store/login-store";
import { redirect } from "next/navigation";
import { Button } from "../../components/common/button/button";

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { mode } = useLoginStore();
  return (
    <>
      <div className="flex p-10 w-full min-h-screen bg-[#ffffff] ssm-under:flex ssm-under:flex-col">
        <div className="w-1/2 flex items-center justify-center ssm-under:w-full">
          <div className="rounded-3xl flex items-center justify-center">
            <Image
              src="/assets/img/logo.png"
              width={400}
              height={0}
              className="rounded-3xl shadow-custom w-full ssm-under:w-[250px] ssm-under: my-5"
              alt={"Avatar"}
            />
          </div>
        </div>
        <div className="w-1/2 login-form-wrapper flex flex-col justify-center ssm-under:w-full">
          <div className="center-container">
            <Label
              label="Welcome to CTT ENG WEB"
              additionalClassName="text-center text-[1.5rem] font-bold "
            />
            <div className="w-full flex justify-center my-6">
              <div className="wrapper-button-group">
                <Button
                  type="button"
                  className={`${
                    mode === 1 ? "button-styles" : "button-blurred-styles"
                  }`}
                  value={"Login"}
                  onClick={() => {
                    useLoginStore.setState({ mode: 1 });
                    redirect("./login");
                  }}
                />
                <Button
                  type="button"
                  className={`${
                    mode === 2 ? "button-styles" : "button-blurred-styles"
                  }`}
                  value={"Register"}
                  onClick={() => {
                    useLoginStore.setState({ mode: 2 });
                    redirect("./register");
                  }}
                />
              </div>
            </div>
            <div className="mb-8">
              <Label
                label="Continue with the journey to conquer 990 TOEIC NOW!"
                additionalClassName="text-center text-[#5B5B5B]"
              />
            </div>
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginLayout;

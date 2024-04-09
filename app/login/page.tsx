import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignIn appearance={{ baseTheme: dark }} redirectUrl="/home" />
    </div>
  );
}

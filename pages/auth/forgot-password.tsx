import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { NextPage } from "next";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import Link from "next/link";
import AuthLayout from "../../components/Layouts/AuthLayout";
import MetaHeader from "../../lib/seo/MetaHeader";

const ForgotPassword: NextPage = () => {
  const supabase = useSupabaseClient();
  return (
    <AuthLayout>
      <MetaHeader title={"Forgot Password"} description={"Forgot password"} />
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          className: { loader: " animate-spin" },
        }}
        theme="dark"
        view={"forgotten_password"}
        providers={["discord"]}
        redirectTo={"/auth/login"}
        showLinks={false}
      />
      <div className="text-xs font-light text-neutral-500 pt-2 text-center my-4 space-y-2">
        <p>
          <Link href="/auth/login">
            <span className="font-medium text-center underline">
              Already have an account? Log In
            </span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

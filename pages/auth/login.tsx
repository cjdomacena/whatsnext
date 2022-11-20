import { useSupabaseClient } from "@supabase/auth-helpers-react";
import {
  AuthError,
  SignInWithPasswordCredentials,
} from "@supabase/supabase-js";
import { NextPage } from "next";
import Link from "next/link";
import router from "next/router";
import React, { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import FormHeader from "../../components/elements/forms/FormHeader";
import InputField from "../../components/elements/inputs/InputField";
import AuthLayout from "../../components/layouts/AuthLayout";
import MetaHeader from "../../lib/seo/MetaHeader";

const Login: NextPage = () => {
  const supabase = useSupabaseClient();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: SignInWithPasswordCredentials = {
      email: email,
      password: password,
    };
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword(data);
      if (error) {
        throw error;
      }
      setLoading(false);
      router.push("/");
    } catch (e) {
      if (e instanceof AuthError) {
        setErrorMessage(e.message);
        setPassword("");
      } else {
        alert(e);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <MetaHeader title={"Login"} description={"User authentication"} />
      <div className="w-full space-y-4">
        <FormHeader title="Welcome back!">
          {errorMessage ? (
            <span className="text-xs text-red-500 font-bold">
              {errorMessage}
            </span>
          ) : null}
        </FormHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1 text-neutral-300">
            <label htmlFor="email">
              <span className="text-sm text-neutral-400">Email</span>
            </label>

            <InputField
              type="email"
              setter={setEmail}
              value={email}
              id="email"
              placeholder="Enter email"
              disabled={loading}
              required
            />
          </div>
          <div className="space-y-1 text-neutral-300 relative">
            <label htmlFor="password">
              <span className="text-sm text-neutral-400">Password</span>
            </label>
            <InputField
              setter={setPassword}
              value={password}
              id="password"
              placeholder="Enter Password"
              isPassword
              type="password"
              minLength={6}
              disabled={loading}
              required
            />
          </div>
          <div className="space-y-2">
            <button
              className={`w-full px-6 py-3 text-sm  transition-colors rounded font-medium bg-amber-900/20 ring-1 ring-amber-900 text-amber-500 hover:bg-amber-900 flex items-center justify-center gap-2 disabled:bg-orange-900`}
              value={email}
              type={"submit"}
              disabled={loading}
            >
              Log In
              {loading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : null}
            </button>
            <button
              className="py-3 text-sm w-full text-neutral-400 font-medium bg-neutral-900 rounded hover:bg-neutral-800 transition-colors disabled:bg-neutral-800"
              type="button"
              disabled={loading}
              onClick={() => router.push("/")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <div className="text-xs font-light text-neutral-500 pt-2 text-center my-4 space-y-2">
        <p>
          <Link href="/auth/forgot-password">
            <span className="font-medium text-center underline block">
              Forgot Password?
            </span>
          </Link>
        </p>
        <p>
          <Link href="/auth/register">
            <span className="font-medium text-center underline">
              Don&apos;t Have an account? Register
            </span>
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;

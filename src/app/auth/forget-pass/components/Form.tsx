"use client";
import TextFormInput from "@/components/form/TextFormInput";
import { currentYear, developedByLink } from "@/states";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import * as yup from "yup";

const Form = () => {
  const forgotPassFormSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(forgotPassFormSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(() => {})} className="mt-sm-4 text-start">
        <TextFormInput
          name="email"
          containerClass="mb-3"
          label="Enter email id"
          type="email"
          control={control}
        />

        <div className="mb-3 text-center">
          <p>
            Back to <Link href="/auth/sign-in">Sign in</Link>
          </p>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </div>

        <div className="position-relative my-4">
          <hr />
          <p className="small position-absolute top-50 start-50 translate-middle bg-mode px-2">
            Or sign in with
          </p>
        </div>

        <div className="vstack gap-3">
          <button type="button" className="btn btn-light mb-0">
            <FcGoogle size={16} className="fab fa-fw me-2" />
            Continue with Google
          </button>
          <button type="button" className="btn btn-light mb-0">
            <FaFacebookF size={16} className="fab fa-fw text-facebook me-2" />
            Continue with Facebook
          </button>
        </div>

        <div className="text-primary-hover text-body mt-3 text-center">
          Copyrights ©{currentYear} Booking. Build by&nbsp;
          <Link href={developedByLink} target="_blank" className="text-body">
            StackBros
          </Link>
          .
        </div>
      </form>
    </>
  );
};

export default Form;

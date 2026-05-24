'use client'
import TextFormInput from "@/components/form/TextFormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const Form = () => {
  const subScribeSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(subScribeSchema),
  });

  return (
    <>
      <form onSubmit={handleSubmit(() => {})} className="mt-4">
        <h6>Notify me when the website is launched</h6>
        <Col md={9} className="mx-auto border rounded-2 p-2">
          <div className="input-group">
            <TextFormInput
              name="email"
              type="email"
              className="form-control border-0 me-1"
              placeholder="Enter your email"
              control={control}
              combinedInput
            />
            <button type="submit" className="btn btn-primary rounded-2 mb-0">
              Notify Me!
            </button>
          </div>
        </Col>
      </form>
    </>
  );
};

export default Form;

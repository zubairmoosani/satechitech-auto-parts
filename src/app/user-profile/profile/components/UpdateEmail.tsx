"use client";
import TextFormInput from "@/components/form/TextFormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Card, CardBody, CardHeader, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const UpdateEmail = () => {
  const emailSchema = yup.object({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Please enter your email"),
  });
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(emailSchema),
  });
  return (
    <Card className="border">
      <CardHeader className="border-bottom">
        <h4 className="card-header-title">Update email</h4>
        <p className="mb-0">
          Your current email address is
          <span className="text-primary">example@gmail.com</span>
        </p>
      </CardHeader>

      <CardBody>
        <Form onSubmit={handleSubmit(() => {})}>
          <TextFormInput
            name="email"
            label="Enter your new email id*"
            placeholder="Enter your email id"
            control={control}
          />
          <div className="text-end mt-3">
            <Button variant="primary" type="submit" className="mb-0">
              Save Email
            </Button>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default UpdateEmail;

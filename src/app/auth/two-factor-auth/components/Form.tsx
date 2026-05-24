"use client";
import { currentYear, developedByLink } from "@/states";
import Link from "next/link";
import { KeyboardEvent, useState } from "react";

type HandleInputChangeType = (
  id: OTPInputProps["id"],
  value: OTPInputProps["value"]
) => void;

type OTPInputProps = {
  id: string;
  previousId: string;
  nextId: string;
  value: string;
  onValueChange: HandleInputChangeType;
};

const OTPInput = ({
  id,
  previousId,
  nextId,
  value,
  onValueChange,
}: OTPInputProps) => {
  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const isNumberInput = Number(e.key) >= 0 && Number(e.key) <= 9;
    if (e.code === "Backspace" || e.code === "ArrowLeft") {
      const prev = document.getElementById(previousId);
      if (prev) prev.focus();
    } else if (isNumberInput) {
      const next = document.getElementById(nextId);
      if (next) next.focus();
    }
  };

  return (
    <input
      id={id}
      name={id}
      type="text"
      className="form-control text-center p-3"
      value={value}
      maxLength={1}
      onChange={(e) => onValueChange(id, e.target.value)}
      onKeyUp={handleKeyUp}
    />
  );
};

const Form = () => {
  const [inputValues, setInputValues] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });

  const handleInputChange: HandleInputChangeType = (inputId, value) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [inputId]: value,
    }));
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="mt-sm-4">
        <p className="mb-1">Enter the code we have sent you:</p>
        <div className="d-flex justify-content-between gap-1 gap-sm-3 mb-2">
          <OTPInput
            id="input1"
            previousId="input1"
            nextId="input2"
            value={inputValues.input1}
            onValueChange={handleInputChange}
          />

          <OTPInput
            id="input2"
            previousId="input1"
            nextId="input3"
            value={inputValues.input2}
            onValueChange={handleInputChange}
          />

          <OTPInput
            id="input3"
            previousId="input2"
            nextId="input4"
            value={inputValues.input3}
            onValueChange={handleInputChange}
          />

          <OTPInput
            id="input4"
            previousId="input3"
            nextId="input5"
            value={inputValues.input4}
            onValueChange={handleInputChange}
          />

          <OTPInput
            id="input5"
            previousId="input4"
            nextId="input5"
            value={inputValues.input5}
            onValueChange={handleInputChange}
          />
        </div>
        <div className="d-sm-flex justify-content-between small mb-4">
          <span>Don't get a code?</span>
          <Link
            href=""
            className="btn btn-sm btn-link p-0 text-decoration-underline mb-0"
          >
            Click to resend
          </Link>
        </div>
        <div>
          <button type="submit" className="btn btn-primary w-100 mb-0">
            Verify and Process
          </button>
        </div>
        <div className="text-primary-hover mt-3 text-center">
          
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

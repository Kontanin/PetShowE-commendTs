"use client"
// import { useFormStatus } from "next/hooks";
import { ComponentProps } from "react";
// import { useForm } from 'react-hook-form';
import {Button} from "@nextui-org/react";
type FormSubmitButtonProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubmitButtonProps) {
  // const { pending } = useFormStatus();

  return (


<Button   color="primary"  className={`btn-primary btn ${className}`}   type="submit"  >
{children}
</Button>
  );
}


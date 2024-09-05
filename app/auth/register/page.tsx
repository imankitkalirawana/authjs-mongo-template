'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Avatar,
  Button,
  Divider,
  Link,
  Input,
  Checkbox
} from '@nextui-org/react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';

export default function Register() {
  const [isVisible, setIsVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);
  const toggleConfirmVisibility = () => setIsConfirmVisible(!isConfirmVisible);

  const router = useRouter();

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      isChecked: false
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // call api /api/auth/register
      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          body: JSON.stringify(values)
        });
        if (res.ok) {
          await signIn('credentials', {
            email: values.email,
            password: values.password,
            redirect: true,
            callbackUrl: '/dashboard'
          });
        } else {
          const data = await res.json();
          toast.error(data.message);
          throw new Error(data.message);
        }
      } catch (e) {
        console.error(e);
      }
    }
  });

  return (
    <>
      <div className="mt-12 flex h-full w-full flex-col items-center justify-center">
        <div className="flex flex-col items-center pb-6">
          <Avatar src="/logo.svg" className="p-2" size="lg" />
          <p className="text-xl font-medium">Welcome</p>
          <p className="text-small text-default-500">
            Create your account to get started
          </p>
        </div>
        <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
          <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
            <Input
              label="Name"
              name="name"
              placeholder="Enter your name"
              type="text"
              variant="bordered"
              onChange={formik.handleChange}
              value={formik.values.name}
              isInvalid={
                formik.touched.name && formik.errors.name ? true : false
              }
              errorMessage={formik.errors.name}
            />
            <Input
              label="Email Address"
              name="email"
              placeholder="Enter your email"
              type="email"
              variant="bordered"
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={
                formik.touched.email && formik.errors.email ? true : false
              }
              errorMessage={formik.errors.email}
            />
            <Input
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  {isVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Password"
              name="password"
              placeholder="Enter your password"
              type={isVisible ? 'text' : 'password'}
              variant="bordered"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={
                formik.touched.password && formik.errors.password ? true : false
              }
              errorMessage={formik.errors.password}
            />
            <Input
              endContent={
                <button type="button" onClick={toggleConfirmVisibility}>
                  {isConfirmVisible ? (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-closed-linear"
                    />
                  ) : (
                    <Icon
                      className="pointer-events-none text-2xl text-default-400"
                      icon="solar:eye-bold"
                    />
                  )}
                </button>
              }
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              type={isConfirmVisible ? 'text' : 'password'}
              variant="bordered"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              isInvalid={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? true
                  : false
              }
              errorMessage={formik.errors.confirmPassword}
            />
            <Checkbox
              className="py-4"
              size="sm"
              isSelected={formik.values.isChecked}
              onChange={formik.handleChange}
              name="isChecked"
            >
              I agree with the&nbsp;
              <Link href="#" size="sm">
                Terms
              </Link>
              &nbsp; and&nbsp;
              <Link href="#" size="sm">
                Privacy Policy
              </Link>
            </Checkbox>
            <Button
              color="primary"
              type="submit"
              isLoading={formik.isSubmitting}
              isDisabled={!formik.isValid || !formik.values.isChecked}
            >
              Sign Up
            </Button>
          </form>
          <div className="flex items-center gap-4">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">OR</p>
            <Divider className="flex-1" />
          </div>
          <div className="flex flex-col gap-2">
            <Button
              startContent={<Icon icon="flat-color-icons:google" width={24} />}
              variant="bordered"
            >
              Continue with Google
            </Button>
            <Button
              startContent={
                <Icon
                  className="text-default-500"
                  icon="fe:github"
                  width={24}
                />
              }
              variant="bordered"
            >
              Continue with Github
            </Button>
          </div>
          <p className="text-center text-small">
            Already have an account?&nbsp;
            <Link href="/auth/login" size="sm">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

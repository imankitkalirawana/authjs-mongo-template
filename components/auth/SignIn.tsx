'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Avatar, Button, Divider, Input, Link } from '@nextui-org/react';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { signIn } from 'next-auth/react';
import { toast } from 'sonner';
import * as Yup from 'yup';

const SignIn = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      try {
        const res = await signIn('credentials', {
          email: values.email,
          password: values.password,
          redirect: true
        });
        if (res?.error) {
          toast.error(res?.error);
        }
      } catch (e) {
        console.error(e);
      }
    }
  });
  return (
    <div className="mt-12 flex h-full w-full flex-col items-center justify-center">
      <div className="flex flex-col items-center pb-6">
        <Avatar src="/logo.svg" className="p-2" size="lg" />
        <p className="text-xl font-medium">Welcome Back</p>
        <p className="text-small text-default-500">
          Log in to your account to continue
        </p>
      </div>
      <div className="mt-2 flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 py-6 shadow-small">
        <form className="flex flex-col gap-3" onSubmit={formik.handleSubmit}>
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
          <div className="flex items-center justify-between px-1 py-2">
            <Link className="text-default-500" href="#" size="sm">
              Forgot password?
            </Link>
          </div>
          <Button
            color="primary"
            type="submit"
            isLoading={formik.isSubmitting}
            isDisabled={!formik.isValid}
          >
            Log In
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
              <Icon className="text-default-500" icon="fe:github" width={24} />
            }
            variant="bordered"
          >
            Continue with Github
          </Button>
        </div>
        <p className="text-center text-small">
          Need to create an account?&nbsp;
          <Link href="/auth/register" size="sm">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

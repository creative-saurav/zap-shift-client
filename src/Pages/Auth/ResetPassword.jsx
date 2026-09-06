import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router';
import { confirmPasswordReset } from 'firebase/auth';
import { toast } from 'react-toastify';

import { auth } from '../../FirebaseInfo/FirebaseInfo';

const ResetPassword = () => {

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch
    } = useForm();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();

    const oobCode = searchParams.get('oobCode');

    const password = watch('password');

    const handleResetPassword = (data) => {

        if (!oobCode) {
            toast.error('Invalid or expired reset link.');
            return;
        }

        confirmPasswordReset(
            auth,
            oobCode,
            data.password
        )
            .then(() => {

                toast.success(
                    'Password reset successfully!'
                );

                setTimeout(() => {
                    navigate('/login');
                }, 1500);

            })
            .catch((error) => {

                console.log(error);

                if (
                    error.code === 'auth/expired-action-code'
                ) {
                    toast.error(
                        'This password reset link has expired.'
                    );
                }
                else if (
                    error.code === 'auth/invalid-action-code'
                ) {
                    toast.error(
                        'This password reset link is invalid.'
                    );
                }
                else if (
                    error.code === 'auth/weak-password'
                ) {
                    toast.error(
                        'Password is too weak.'
                    );
                }
                else {
                    toast.error(
                        'Password reset failed.'
                    );
                }

            });
    };

    return (
        <div>

            <div className="w-full max-w-md">

                {/* Heading */}
                <h1 className="text-5xl font-bold text-black">
                    Reset Password
                </h1>

                <p className="mt-2 text-gray-500">
                    Enter your new password below to reset your password.
                </p>

                {/* Form */}
                <form
                    className="mt-8 space-y-5"
                    onSubmit={handleSubmit(handleResetPassword)}
                >

                    {/* New Password */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-black">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="New Password"
                            {...register('password', {
                                required: 'Password is required',
                                minLength: {
                                    value: 6,
                                    message: 'Password must be at least 6 characters'
                                }
                            })}
                            className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                        />

                        {
                            errors.password && (
                                <p className="text-red-500 mt-1">
                                    {errors.password.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Confirm Password */}
                    <div>

                        <label className="block mb-2 text-sm font-medium text-black">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword', {
                                required: 'Please confirm your password',
                                validate: value =>
                                    value === password ||
                                    'Passwords do not match'
                            })}
                            className="w-full h-12 px-4 border border-gray-300 rounded-md outline-none focus:border-primary"
                        />

                        {
                            errors.confirmPassword && (
                                <p className="text-red-500 mt-1">
                                    {errors.confirmPassword.message}
                                </p>
                            )
                        }

                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        className="w-full h-12 rounded-md bg-primary text-black font-semibold hover:opacity-90 transition"
                    >
                        Password Reset
                    </button>

                </form>

            </div>

        </div>
    );
};

export default ResetPassword;
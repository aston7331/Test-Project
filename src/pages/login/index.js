import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';
import { loginUser } from '@/Services/user.service';

const Login = () => {
    const { auth, setAuth } = useAuth();
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, } = useForm({
        defaultValues: {
            email: '',
            password: '',
        }
    });

    const onSubmit = async (data) => {
        const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiSm9obiBEb2UiLCJpYXQiOjE1MTYyMzkwMjJ9.TGlNCKdEcfqBRt2OWKNgOHm8PIs1wU0K45Pg67n37B4";
        localStorage.setItem("access_token", access_token);
        const result = await loginUser(data);
        if (result.status) {
            const access_token = result?.data?.access_token;
            const refresh_token = result?.data?.refresh_token;
            localStorage.setItem("access_token", access_token);
            localStorage.setItem("refresh_token", refresh_token);
            toast.success("User login successfully");
            setAuth({ ...auth, isLoggedIn: true });
            router.push('/dashboard');
        } else {
            toast.error(result.error);
        }
    };


    useEffect(() => {
        if (auth?.isLoggedIn) {
            router.push('/');
        }
    }, [auth?.isLoggedIn]);


    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Enter your mail"
                                    {...register('email', { required: 'Email is required' })}
                                />
                                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="••••••••"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    {...register('password', { required: 'Password is required' })}
                                />
                                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                            </div>
                            <div className="flex items-center justify-between">
                                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                            </div>
                            <button type="submit" className="w-full text-black bg-gray-200 hover:bg-gray-400  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <a href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Login
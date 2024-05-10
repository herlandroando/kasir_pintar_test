import Layout from "@/Layouts/LoginLayout";
import { Head } from "@inertiajs/react";
import LoginForm from "./Components/LoginForm";
import Title from "@/Shared/Components/Typography/Title";
import React from "react";

export default function Index() {
    return (
        <Layout>
            <Head title="Login" />
            <div className="flex flex-col md:justify-center justify-start items-center lg:basis-2/6 md:basis-3/6 basis-1 md:order-2 order-2 text-center h-full md:px-7 px-8 py-10 gap-1">
                <div className="w-full text-gray-900 block md:hidden">
                    <p className="mb-3">Welcome to</p>
                    <Title>Expense Management Z</Title>
                    <p className="mt-3 italic">
                        An app at Z's office to help employees make expense
                        reimbursement requests.
                    </p>
                    <hr className="my-3"></hr>
                </div>
                <Title className="mb-1">Login</Title>
                <p className="mb-5">
                    Access our best features by logging in first.
                </p>
                <LoginForm></LoginForm>
            </div>
            <div className="relative md:block hidden lg:basis-4/6 md:basis-3/6 md:order-1 order-1 bg-black h-full shadow-gray-800 shadow-md">
                <img
                    src="/assets/images/background-login.jpg"
                    alt="background of login"
                    className="h-full w-full object-cover"
                />
                <div className="absolute top-0 w-full p-6 text-gray-900 backdrop-blur-md bg-white/20">
                    <p className="mb-3">Welcome to</p>
                    <h1 className="text-4xl font-bold ">
                        Expense Management Z
                    </h1>
                    <p className="mt-3 italic">
                        An app at Z's office to help employees make expense
                        reimbursement requests.
                    </p>
                </div>
                {/*<div className='absolute top-0 w-full h-full backdrop-blur-md bg-white/20'></div>*/}
            </div>
        </Layout>
    );
}

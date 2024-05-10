import { Button, IconButton, Input } from "@material-tailwind/react";
import TextHelp from "@/Shared/Components/Typography/TextHelp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "./loginSchema";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { router } from "@inertiajs/react";
import ErrorMessage from "../../../Shared/Components/Typography/ErrorMessage";
import toast from "react-hot-toast";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(loginSchema) });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isOnNavigate, setIsOnNavigate] = useState(false);

    function handlePasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function onSubmit(data) {
        router.post("/login", data, {
            onStart: () => {
                setIsOnNavigate(true);
            },
            onFinish: () => {
                setIsOnNavigate(false);
            },
            onSuccess: (page) => {
                toast.success("Login Succesfully!");
            },
            onError: (err) => {
                toast.error(err.auth);
            },
        });
    }

    return (
        <form
            className="flex flex-col gap-4 md:w-[80%] w-full"
            onSubmit={handleSubmit(onSubmit)}
        >
            <div>
                <Input
                    label="NIP"
                    error={errors.nip?.message}
                    {...register("nip")}
                />
                <ErrorMessage>{errors.nip?.message}</ErrorMessage>
            </div>
            <div>
                <div className="relative flex w-full">
                    <Input
                        type={isPasswordVisible ? "text" : "password"}
                        label="Password"
                        error={errors.password?.message}
                        {...register("password")}
                        className="pr-20"
                        containerProps={{
                            className: "min-w-0",
                        }}
                    />
                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-1 top-1 rounded text-gray-500"
                        onClick={handlePasswordVisible}
                    >
                        {!isPasswordVisible ? <Eye /> : <EyeOff />}
                    </IconButton>
                </div>
                <ErrorMessage>{errors.password?.message}</ErrorMessage>
            </div>
            <TextHelp className="text-left">
                No account access to log in? Contact the administrator in charge
                of handling about the account.
            </TextHelp>
            <Button disabled={isOnNavigate} type="submit">
                Login
            </Button>
        </form>
    );
}

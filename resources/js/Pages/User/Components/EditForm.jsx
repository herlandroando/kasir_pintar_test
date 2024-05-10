import {
    Button,
    IconButton,
    Input,
    Option,
    Select,
    Textarea,
    Typography,
} from "@material-tailwind/react";
import TextHelp from "@/Shared/Components/Typography/TextHelp";
import { Eye, EyeOff, TriangleAlert } from "lucide-react";
import { editUserSchema, editUserPasswordSchema } from "./editSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/Shared/Components/Typography/ErrorMessage";
import { useEffect, useState } from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function EditForm({ user }) {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register: registerUser,
        handleSubmit: handleSubmitUser,
        formState: { errors: errorUsers },
        watch,
        setValue,
        trigger,
        reset,
    } = useForm({ resolver: yupResolver(editUserSchema) });

    const {
        register: registerUserPassword,
        handleSubmit: handleSubmitUserPassword,
        formState: { errors: errorUserPassword },
    } = useForm({ resolver: yupResolver(editUserPasswordSchema) });

    useEffect(() => {
        reset({ name: user.name, role: user.role });
    }, []);

    function onSubmitUser(data) {
        router.put("/users/" + user.id + "", data, {
            onStart: () => setIsSubmitting(true),
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                toast.success("Success change data user!");
            },
            onError: (err) => {
                toast.success("There something error on input or NIP same.");
            },
        });
    }

    function onSubmitUserPassword(data) {
        router.put("/users/" + user.id + "/change-password", data, {
            onStart: () => setIsSubmitting(true),
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                toast.success("Success change password user!");
            },
            onError: (err) => {
                toast.success("There something error on input.");
            },
        });
    }

    function handlePasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    return (
        <div className="grid md:grid-cols-2 grid-cols-1 gap-3">
            <form
                onSubmit={handleSubmitUser(onSubmitUser)}
                className="flex flex-col gap-4 mt-3 p-3 border border-gray-400 rounded-md border-solid"
            >
                <div>
                    <Input disabled label="NIP" value={user.nip}></Input>
                </div>
                <div>
                    <Input
                        {...registerUser("name")}
                        label="Name"
                        error={!!errorUsers.name?.message}
                    ></Input>
                    <ErrorMessage>{errorUsers.name?.message}</ErrorMessage>
                </div>
                <div>
                    <Select
                        label="Role"
                        error={!!errorUsers.role?.message}
                        {...registerUser("role")}
                        onChange={(v) => {
                            setValue("role", v);
                            trigger("role");
                        }}
                        value={watch("role")}
                    >
                        <Option value="STAFF">Staff</Option>
                        <Option value="FINANCE">Finance</Option>
                    </Select>
                </div>

                <Button type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
            </form>
            <form
                onSubmit={handleSubmitUserPassword(onSubmitUserPassword)}
                className="flex flex-col gap-4 mt-3 p-3 border border-gray-400 rounded-md border-solid"
            >
                <div>
                    <div className="relative flex w-full">
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            label="Password"
                            error={!!errorUserPassword.password?.message}
                            {...registerUserPassword("password")}
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
                    <ErrorMessage>
                        {errorUserPassword.password?.message}
                    </ErrorMessage>
                </div>
                <div>
                    <div className="relative flex w-full">
                        <Input
                            type={isPasswordVisible ? "text" : "password"}
                            label="Confirm Password"
                            error={
                                !!errorUserPassword.password_confirmation
                                    ?.message
                            }
                            {...registerUserPassword("password_confirmation")}
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
                    <ErrorMessage>
                        {errorUserPassword.password_confirmation?.message}
                    </ErrorMessage>
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
            </form>
        </div>
    );
}

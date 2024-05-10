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
import createUserSchema from "./createSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorMessage from "@/Shared/Components/Typography/ErrorMessage";
import { useState } from "react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";

export default function CreateForm() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {
        register,
        setValue,
        trigger,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(createUserSchema) });

    function onSubmit(data) {
        router.post("/users", data, {
            onStart: () => setIsSubmitting(true),
            onFinish: () => setIsSubmitting(false),
            onSuccess: () => {
                toast.success("Success create user!");
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
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 mt-3 md:w-[50%] w-full"
        >
            <div>
                <Input
                    {...register("nip")}
                    label="NIP"
                    error={!!errors.nip?.message}
                ></Input>
                <ErrorMessage>{errors.nip?.message}</ErrorMessage>
                <TextHelp>The nip maximal 18 character numeric.</TextHelp>
            </div>
            <div>
                <Input
                    {...register("name")}
                    label="Name"
                    error={!!errors.name?.message}
                ></Input>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
            </div>
            <div>
                <Select
                    label="Role"
                    error={!!errors.role?.message}
                    {...register("role")}
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
            <div>
                <div className="relative flex w-full">
                    <Input
                        type={isPasswordVisible ? "text" : "password"}
                        label="Password"
                        error={!!errors.password?.message}
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
            <div>
                <div className="relative flex w-full">
                    <Input
                        type={isPasswordVisible ? "text" : "password"}
                        label="Confirm Password"
                        error={!!errors.password_confirmation?.message}
                        {...register("password_confirmation")}
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
                    {errors.password_confirmation?.message}
                </ErrorMessage>
            </div>
            <Button type="submit" disabled={isSubmitting}>
                Submit
            </Button>
        </form>
    );
}

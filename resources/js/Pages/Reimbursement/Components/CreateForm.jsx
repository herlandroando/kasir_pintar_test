import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import TextHelp from "../../../Shared/Components/Typography/TextHelp";
import { TriangleAlert } from "lucide-react";
import createReimbursementSchema from "./createSchema";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm as useFormInertia } from "@inertiajs/react";
import ErrorMessage from "../../../Shared/Components/Typography/ErrorMessage";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function CreateForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(createReimbursementSchema) });

    const [isOnSubmit, setIsOnSubmit] = useState(false);

    const { data, setData, post, progress } = useFormInertia({
        name: null,
        description: null,
        document: null,
    });

    useEffect(() => {
        if (isOnSubmit)
            post("/reimbursement", {
                onSuccess: () => {
                    toast.success("Success create request reimbursement!");
                },
                onError: (err) => {
                    toast.error("There something error on input.");
                },
                onFinish: () => {
                    setIsOnSubmit(false);
                },
            });
    }, [isOnSubmit]);

    function onSubmit(data) {
        setData({ ...data });
        setIsOnSubmit(true);
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-3 mt-3 md:w-[50%] w-full"
        >
            <div>
                <Input
                    {...register("name")}
                    label="Name"
                    error={!!errors.name?.message}
                ></Input>
                <ErrorMessage>{errors.name?.message}</ErrorMessage>
                <TextHelp>
                    The name is the subject for your reimbursement.
                </TextHelp>
            </div>
            <div>
                <Textarea
                    {...register("description")}
                    label="Description"
                    error={!!errors.description?.message}
                ></Textarea>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
            </div>
            <div>
                <Input
                    {...register("document")}
                    type="file"
                    accept=".jpg,.png,.jpeg,.pdf"
                    label="Supplementary Document"
                    error={!!errors.document?.message}
                ></Input>
                <ErrorMessage>{errors.document?.message}</ErrorMessage>
                <TextHelp>
                    Accepted documents are .jpg, .jpeg, .png, and .pdf. Must not
                    exceed 4MB.
                </TextHelp>
            </div>
            <div className="flex flex-row items-center text-orange-400 gap-2 my-2">
                <TriangleAlert size={26} />
                <Typography variant="small">
                    Your request for reimbursement may be rejected by the
                    director or finance if the documents or descriptions are not
                    filled out properly.
                    <span className="font-bold ml-1">
                        Please be cooperative.
                    </span>
                </Typography>
            </div>
            <Button type="submit" disabled={progress}>
                {progress ? `${progress.percentage}%` : "Submit"}
            </Button>
        </form>
    );
}

import {
    Button,
    Input,
    Textarea,
    Timeline,
    TimelineBody,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineItem,
    Typography,
} from "@material-tailwind/react";
import Layout from "../../Layouts/DefaultLayout";
import TitlePage from "../../Shared/Components/Layout/TitlePage";
import dayjs from "dayjs";
import { router, usePage } from "@inertiajs/react";
import TextHelp from "../../Shared/Components/Typography/TextHelp";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef } from "react";
import ErrorMessage from "../../Shared/Components/Typography/ErrorMessage";

function Show({ reimbursement }) {
    const firstCreatedAt = dayjs(reimbursement.created_at).format(
        "DD/MM/YYYY HH:mm"
    );
    const { user } = usePage().props;

    return (
        <>
            <TitlePage>Show Reimbursement</TitlePage>
            <div className="grid md:grid-cols-2 grid-cols-1 items-center gap-3">
                <div className=" p-3 border-solid border-gray-400 rounded-md border h-full md:order-1 order-2">
                    <Typography variant="h5">Log Activities</Typography>
                    <TimelineContainer
                        logs={reimbursement.reimbursement_logs ?? []}
                        firstCreatedAt={firstCreatedAt}
                    />
                </div>
                <div className=" p-3 border-solid border-gray-400 rounded-md border h-full md:order-2 order-1">
                    <Typography variant="h5">Properties</Typography>
                    <div className="flex flex-col gap-4 mt-5">
                        <Input
                            label="Name"
                            value={reimbursement.name}
                            readOnly
                        ></Input>
                        <Textarea
                            label="Description"
                            value={reimbursement.description}
                            readOnly
                        ></Textarea>
                        <div>
                            {reimbursement.reimbursement_file ? (
                                <>
                                    <Typography variant="paragraph">
                                        Document:
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            window.open(
                                                reimbursement.reimbursement_file
                                                    .url,
                                                "_blank"
                                            )
                                        }
                                    >
                                        Download
                                    </Button>
                                </>
                            ) : (
                                <Typography variant="p">
                                    Document not uploaded.
                                </Typography>
                            )}
                        </div>
                        {((user.role === "DIREKTUR" &&
                            reimbursement.status === "PENDING") ||
                            (user.role === "FINANCE" &&
                                reimbursement.status ===
                                    "DIRECTOR_APPROVED")) && (
                            <ApproveButton reimbursement={reimbursement} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

function ApproveButton({ reimbursement }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object({
                reason: yup.string().label("Reason").required().max(500),
            })
        ),
    });

    const buttonForm = useRef(null);

    function onSubmit(data) {
        router.post(
            "/reimbursement/" + reimbursement.id + "/status/declined",
            data
        );
    }

    function handleSubmitApproved() {
        router.post("/reimbursement/" + reimbursement.id + "/status/approved");
    }

    function handleSubmitDeclined() {
        buttonForm.current?.click();
    }

    return (
        <div className="flex flex-col gap-4">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography>This request needs to be followed up:</Typography>
                <div>
                    <Textarea
                        {...register("reason")}
                        error={errors.reason?.message}
                        label="Reason (Declined)"
                    ></Textarea>
                    <ErrorMessage>{errors.reason?.message}</ErrorMessage>
                    <TextHelp>
                        Fill this if you declined the request. Skip it if you
                        accept this request.
                    </TextHelp>
                </div>
                <button
                    ref={buttonForm}
                    className="hidden"
                    type="submit"
                ></button>
            </form>
            <div className="flex flex-row gap-2 ">
                <Button onClick={handleSubmitApproved} color="green">
                    Approve
                </Button>
                <Button onClick={handleSubmitDeclined} color="red">
                    Declined
                </Button>
            </div>
        </div>
    );
}

function TimelineContainer({ logs = [], firstCreatedAt = null }) {
    console.log(logs);
    function statusCheck(log) {
        if (log.description.includes("(::DRCT_APPR::)")) {
            return {
                title: "Director Approved",
                description: log.description.replace(
                    "(::DRCT_APPR::)",
                    "Director has approved your request. Waiting for finance department process your request."
                ),
            };
        }
        if (log.description.includes("(::FNC_APPR::)")) {
            return {
                title: "Finance Approved",
                description: log.description.replace(
                    "(::FNC_APPR::)",
                    "Finance departement has approved your request. Your money will be reimbursed in less than 7 working days. If it passes then try contacting the finance department."
                ),
            };
        }
        if (log.description.includes("(::DCLD::)")) {
            return {
                title: "Declined",
                description: log.description.replace(
                    "(::DCLD::)",
                    "The request for reimbursement was denied. Reason:"
                ),
            };
        }

        return {
            title: "Unknown",
            description: "Something wrong on this timeline. Contact admin.",
        };
    }

    return (
        <Timeline className="mt-5">
            <TimelineItem>
                {logs.length > 0 && <TimelineConnector />}
                <TimelineHeader className="h-3">
                    <TimelineIcon />
                    <Typography
                        variant="h6"
                        color="blue-gray"
                        className="leading-none"
                    >
                        Request Created
                    </Typography>
                </TimelineHeader>
                <TimelineBody className="pb-8">
                    <Typography
                        variant="small"
                        color="gray"
                        className="font-normal text-gray-600"
                    >
                        ({firstCreatedAt}) Your reimbursement request created
                        and waiting for directur approved.
                    </Typography>
                </TimelineBody>
            </TimelineItem>
            {logs.map((v, i) => {
                const { title, description } = statusCheck(v);
                const createdAt = dayjs(v.created_at).format(
                    "DD/MM/YYYY HH:mm"
                );
                return (
                    <TimelineItem key={i}>
                        {i !== logs.length - 1 && <TimelineConnector />}
                        <TimelineHeader className="h-3">
                            <TimelineIcon />
                            <Typography
                                variant="h6"
                                color="blue-gray"
                                className="leading-none"
                            >
                                {title}
                            </Typography>
                        </TimelineHeader>
                        <TimelineBody className="pb-8">
                            <Typography
                                variant="small"
                                color="gray"
                                className="font-normal text-gray-600"
                            >
                                {`(${createdAt}) `} {description}
                            </Typography>
                        </TimelineBody>
                    </TimelineItem>
                );
            })}
        </Timeline>
    );
}

Show.layout = (page) => <Layout>{page}</Layout>;

export default Show;

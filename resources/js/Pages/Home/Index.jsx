import Layout from "@/Layouts/DefaultLayout";
import { Head, usePage } from "@inertiajs/react";
import { Card, CardBody, Typography } from "@material-tailwind/react";
import DigitDashboard from "../../Shared/Components/Typography/DigitDashboard";
import { CircleUser } from "lucide-react";
import { useEffect } from "react";
import TitlePage from "../../Shared/Components/Layout/TitlePage";

function Index({ statistic }) {
    const { user } = usePage().props;

    const userStatistics = [
        {
            name: "user_total",
            labelTop: "Total Users",
            labelBottom: "All Role",
        },
        {
            name: "user_finance_total",
            labelTop: "Total Users",
            labelBottom: "Finance Role",
        },
        {
            name: "user_staff_total",
            labelTop: "Total Users",
            labelBottom: "Staff Role",
        },
    ];
    const reimbursementStatistics = [
        {
            name: "reimbursement_active",
            labelTop: "Reimbursement",
            labelBottom: "Active",
        },
        {
            name: "reimbursement_need_approve",
            labelTop: "Reimbursement",
            labelBottom: "Need Approved",
        },
        {
            name: "reimbursement_declined_week",
            labelTop: "Reimbursement",
            labelBottom: "Declined per Week",
        },
    ];
    return (
        <>
            <Head title="Home" />
            <TitlePage>Dashboard</TitlePage>
            {/* <div>{JSON.stringify(user)}</div> */}
            {/* <div className="flex flex-row gap-3"> */}
            <div className="border-gray-300 rounded-md border border-solid p-4">
                <Typography variant="h5">Statistic</Typography>
                {user.role === "DIREKTUR" && (
                    <div className="mt-3 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3 p-4 bg-gradient-to-br from-gray-200 to-gray-50 rounded-md">
                        {userStatistics.map((item) => (
                            <CardStatistic
                                key={item.name}
                                value={statistic[item.name]}
                                labelTop={item.labelTop}
                                labelBottom={item.labelBottom}
                                icon={CircleUser}
                            />
                        ))}
                    </div>
                )}
                <div className="mt-5 grid lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-3 p-4 bg-gradient-to-br from-gray-200 to-gray-50 rounded-md">
                    {reimbursementStatistics.map((item) => {
                        if (
                            item.name === "reimbursement_need_approve" &&
                            user.role === "STAFF"
                        ) {
                            return;
                        }
                        return (
                            <CardStatistic
                                key={item.name}
                                value={statistic[item.name]}
                                labelTop={item.labelTop}
                                labelBottom={item.labelBottom}
                                icon={CircleUser}
                            />
                        );
                    })}
                </div>
            </div>

            {/* </div> */}
        </>
    );
}

function CardStatistic({ value, labelTop, labelBottom, icon }) {
    const Icon = icon;
    return (
        <div className="flex flex-col gap-2 text-center justify-center items-center">
            <Typography variant="paragraph" className="font-bold">
                {labelTop}
            </Typography>
            <DigitDashboard>{value}</DigitDashboard>
            <Typography variant="small">{labelBottom}</Typography>
        </div>
    );
}

Index.layout = (page) => <Layout>{page}</Layout>;

export default Index;

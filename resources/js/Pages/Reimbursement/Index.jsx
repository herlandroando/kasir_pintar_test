import { Head, router, usePage } from "@inertiajs/react";
import Layout from "@/Layouts/DefaultLayout";
import TitlePage from "@/Shared/Components/Layout/TitlePage";
import {
    Button,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Typography,
} from "@material-tailwind/react";
import { Search } from "lucide-react";
import Table from "../../Shared/Components/Table";
import { optionTableReimbursement } from "./Components/OptionTable";
import { useEffect, useState } from "react";

function Index({ data, meta }) {
    const { user } = usePage().props;

    const [filter, setFilter] = useState({
        type: meta?.type ?? "all",
    });

    const types = [
        { name: "all", label: "All" },
        { name: "PENDING", label: "Pending" },
        { name: "DIRECTOR_APPROVED", label: "Director Approved" },
        { name: "FINANCE_APPROVED", label: "Finance Approved" },
        { name: "DECLINED", label: "Declined" },
    ];

    function handleTypeTab(name) {
        if (name !== "all") {
            setFilter({ type: name });
        } else {
            setFilter({});
        }
    }

    useEffect(() => {
        router.get(
            "/reimbursement",
            filter.type === "all" ? {} : { ...filter },
            { preserveState: true }
        );
    }, [filter]);

    return (
        <>
            <Head title="Reimbursement"></Head>
            <TitlePage>Reimbursement</TitlePage>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <Typography variant="h4">List</Typography>
                        <Typography variant="paragraph">
                            See information about reimbursement staff.
                        </Typography>
                    </div>
                    {user.role === "STAFF" && (
                        <div className="md:block hidden">
                            <Button
                                color="green"
                                onClick={() =>
                                    router.get("/reimbursement/create")
                                }
                            >
                                Add Request
                            </Button>
                        </div>
                    )}
                </div>
                <div>
                    <Tabs value={filter.type}>
                        <TabsHeader>
                            {types.map(({ name, label }) => (
                                <Tab
                                    key={name}
                                    value={name}
                                    onClick={() => handleTypeTab(name)}
                                >
                                    {label}
                                </Tab>
                            ))}
                        </TabsHeader>
                    </Tabs>
                </div>
                {user.role === "STAFF" && (
                    <Button
                        className="md:hidden block"
                        color="green"
                        onClick={() => router.get("/reimbursement/create")}
                    >
                        Add Request
                    </Button>
                )}

                <div>
                    <Table
                        data={data ?? []}
                        options={optionTableReimbursement}
                        meta={meta}
                        filter={filter}
                        urlIndex="/reimbursement"
                    ></Table>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <Layout>{page}</Layout>;

export default Index;

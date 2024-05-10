import { Head, router } from "@inertiajs/react";
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
import Table from "@/Shared/Components/Table";
import { useState } from "react";
import { optionTableUser } from "./Components/OptionTable";

function Index({ data, meta }) {
    return (
        <>
            <Head title="User Management"></Head>
            <TitlePage>User Management</TitlePage>
            <div className="flex flex-col gap-3">
                <div className="flex flex-row justify-between items-center">
                    <div>
                        <Typography variant="h4">List</Typography>
                        <Typography variant="paragraph">
                            See information about user that has been registered.
                        </Typography>
                    </div>
                    <div className="md:block hidden">
                        <Button
                            color="green"
                            onClick={() => router.get("/users/create")}
                        >
                            Add User
                        </Button>
                    </div>
                </div>
                <Button
                    className="md:hidden block"
                    color="green"
                    onClick={() => router.get("/users/create")}
                >
                    Add User
                </Button>

                <div>
                    <Table
                        data={data ?? []}
                        options={optionTableUser}
                        meta={meta}
                        urlIndex="/users"
                    ></Table>
                </div>
            </div>
        </>
    );
}

Index.layout = (page) => <Layout>{page}</Layout>;

export default Index;

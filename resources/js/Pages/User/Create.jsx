import { Typography } from "@material-tailwind/react";
import Layout from "../../Layouts/DefaultLayout";
import BackButton from "../../Shared/Components/Layout/BackButton";
import TitlePage from "../../Shared/Components/Layout/TitlePage";
import { TriangleAlert } from "lucide-react";
import CreateForm from "./Components/CreateForm";

function Create() {
    return (
        <>
            <TitlePage>Create User</TitlePage>
            <div className="flex flex-row justify-between items-center">
                <div className="md:w-[50%] w-full">
                    <Typography variant="paragraph">
                        Create a new user for staff or finance can access this
                        website.
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col">
                <CreateForm></CreateForm>
            </div>
        </>
    );
}

Create.layout = (page) => <Layout>{page}</Layout>;

export default Create;

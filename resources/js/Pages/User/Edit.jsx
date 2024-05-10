import { Typography } from "@material-tailwind/react";
import Layout from "../../Layouts/DefaultLayout";
import BackButton from "../../Shared/Components/Layout/BackButton";
import TitlePage from "../../Shared/Components/Layout/TitlePage";
import { TriangleAlert } from "lucide-react";
import EditForm from "./Components/EditForm";

function Edit({data}) {
    return (
        <>
            <TitlePage>Edit User</TitlePage>
            <div className="flex flex-row justify-between items-center">
                <div className="md:w-[50%] w-full">
                    <Typography variant="paragraph">
                        Edit a user data or change password.
                    </Typography>
                </div>
            </div>
            <div className="flex flex-col">
                <EditForm user={data}></EditForm>
            </div>
        </>
    );
}

Edit.layout = (page) => <Layout>{page}</Layout>;

export default Edit;

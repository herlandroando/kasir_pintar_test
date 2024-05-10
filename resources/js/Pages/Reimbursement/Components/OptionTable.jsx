import { router, usePage } from "@inertiajs/react";
import {
    Button,
    Chip,
    List,
    ListItem,
    Popover,
    PopoverContent,
    PopoverHandler,
} from "@material-tailwind/react";
import dayjs from "dayjs";

const status = {
    PENDING: <Chip color="orange" value="Pending"></Chip>,
    DIRECTOR_APPROVED: (
        <Chip color="blue-gray" value="Director Approved"></Chip>
    ),
    FINANCE_APPROVED: <Chip color="green" value="Finance Approved"></Chip>,
    DECLINED: <Chip color="red" value="Declined"></Chip>,
};

export const optionTableReimbursement = {
    column: [
        {
            name: "created_at",
            label: "Request At",
            rowTransform: (v) => {
                return dayjs(v).format("DD/MM/YYYY HH:mm");
            },
        },
        {
            name: "name",
            label: "Name",
        },
        {
            name: "user_name",
            label: "Request By",
        },
        {
            name: "status",
            className: "w-52",
            label: "Status",
            rowTransform: (v) => {
                return status[v];
            },
        },
        {
            label: "Action",
            isAction: true,
            rowTransform: (v, i) => {
                return <DropdownTable itemRow={i}></DropdownTable>;
            },
        },
    ],
};

function DropdownTable({ itemRow }) {
    const { user } = usePage().props;
    // console.log(itemRow);
    return (
        <Popover>
            <PopoverHandler>
                <Button variant="text">Action</Button>
            </PopoverHandler>
            <PopoverContent>
                <List>
                    <ListItem
                        onClick={() =>
                            router.get(
                                "/reimbursement/" + itemRow.id,
                                {},
                                { preserveState: true }
                            )
                        }
                    >
                        Show
                    </ListItem>
                    {user.role === "STAFF" && itemRow.status === "PENDING" && (
                        <ListItem className="text-red-400">Delete</ListItem>
                    )}
                </List>
            </PopoverContent>
        </Popover>
    );
}

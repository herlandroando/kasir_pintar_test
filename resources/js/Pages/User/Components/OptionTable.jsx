import { router, usePage } from "@inertiajs/react";
import {
    Button,
    Chip,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    List,
    ListItem,
    Popover,
    PopoverContent,
    PopoverHandler,
} from "@material-tailwind/react";
import dayjs from "dayjs";
import { useState } from "react";
import toast from "react-hot-toast";

export const optionTableUser = {
    column: [
        {
            name: "nip",
            label: "NIP",
        },
        {
            name: "name",
            label: "Name",
        },
        {
            name: "role",
            label: "Role",
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
    const [open, setOpen] = useState(false);

    function handleOpen() {
        setOpen(!open);
    }

    function handleDelete() {
        router.delete("/users/" + itemRow.id, {
            onSuccess: () => {
                toast.success("Success delete user!");
            },
            onError: (err) => {
                toast.success("There something error on server.");
            },
        });
    }
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
                                "/users/" + itemRow.id,
                                {},
                                { preserveState: true }
                            )
                        }
                    >
                        Edit
                    </ListItem>
                    <ListItem onClick={handleOpen} className="text-red-500">
                        Delete
                        <Dialog open={open} handler={handleOpen}>
                            <DialogHeader>Warning!</DialogHeader>
                            <DialogBody>
                                Are you sure to delete this user?
                            </DialogBody>
                            <DialogFooter>
                                <Button
                                    variant="text"
                                    color="red"
                                    onClick={handleOpen}
                                    className="mr-1"
                                >
                                    <span>Cancel</span>
                                </Button>
                                <Button
                                    variant="gradient"
                                    color="green"
                                    onClick={handleDelete}
                                >
                                    <span>Confirm</span>
                                </Button>
                            </DialogFooter>
                        </Dialog>
                    </ListItem>
                </List>
            </PopoverContent>
        </Popover>
    );
}

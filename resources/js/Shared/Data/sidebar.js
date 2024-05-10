import { router } from "@inertiajs/react";
import { BadgeDollarSign, Home, UserRoundCog } from "lucide-react";

const sidebarData = [
    {
        name: "home",
        label: "Home",
        Icon: Home,
        role: [],
        url: "/",
    },
    {
        name: "reimbursement",
        label: "Reimbursement",
        Icon: BadgeDollarSign,
        role: [],
        url: "/reimbursement",
    },
    {
        name: "users",
        label: "Users",
        Icon: UserRoundCog,
        role: ["DIREKTUR"],
        url: "/users",

    },
];

export default sidebarData

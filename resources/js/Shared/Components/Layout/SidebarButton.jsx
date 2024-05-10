import { Button } from "@material-tailwind/react";
import classNames from "classnames";
import { TrafficCone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function SidebarButton({
    label = "",
    labelVisible = false,
    isActive = false,
    icon = null,
    disabled = false,
    className = "",
    onClick = () => {},
}) {
    return (
        <Button
            onClick={onClick}
            variant={isActive ? "filled" : "text"}
            className="inline-block p-3 w-auto max-h-[48px] text-left"
            disabled={disabled}
        >
            <div className="overflow-hidden text-nowrap ">
                {icon(isActive)}
                <span
                    className={
                        classNames({
                            "opacity-0": !labelVisible,
                            "opacity-100 ml-3": labelVisible,
                        }) + " inline-block transition-all duration-500"
                    }
                >
                    {label}
                </span>
            </div>
        </Button>
    );
}

import classNames from "classnames";
import { CircleAlert } from "lucide-react";

export default function ErrorMessage({ children, className = "" }) {
    const isChildrenAvailable = !!children;
    return (
        <div
            className={
                classNames({ hidden: !isChildrenAvailable }) +
                " w-full text-start text-red-400 flex flex-row items-center gap-1 mt-1"
            }
        >
            <CircleAlert size={16} strokeWidth={1.8}/>
            <small className={className}>{children}</small>
        </div>
    );
}

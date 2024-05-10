export default function TextHelp({ children, className }) {
    return <small className={"text-gray-500 " + className}>{children}</small>;
}

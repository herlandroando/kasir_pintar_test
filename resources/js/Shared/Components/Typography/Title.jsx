export default function Title({ children, className }) {
    return (
        <h1 className={"md:text-2xl text-xl font-bold " + className}>
            {children}
        </h1>
    );
}

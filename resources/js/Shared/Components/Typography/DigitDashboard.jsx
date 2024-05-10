export default function DigitDashboard({ children, className }) {
    return (
        <p
            className={
                "md:text-4xl text-3xl font-extrabold " + className
            }
        >
            {children}
        </p>
    );
}

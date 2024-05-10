export default function LoginLayout({ children }) {

    return (
        <main className="relative h-screen w-screen">
            <div className="flex md:flex-row flex-col h-full">{children}</div>
        </main>
    )
}

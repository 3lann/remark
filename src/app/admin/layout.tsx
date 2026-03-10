export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <style>{`
                header { display: none !important; }
                [style*="z-index"][style*="999"] { display: none !important; }
                div[class*="fixed"][class*="z-[999"] { display: none !important; }
            `}</style>
            {children}
        </>
    );
}

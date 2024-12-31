import './globals.css';
import { AuthContextProvider } from '@/context/AuthContext';
import { TelegramAuthContextProvider } from '@/context/TelegramAuthContext';
import '../flow-config';
import DesktopNav from '@/components/navbar/DesktopNav';
import Navigation from '@/components/navbar/mobileNav';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body suppressHydrationWarning={true}>
                <AuthContextProvider>
                    <TelegramAuthContextProvider>
                        <DesktopNav />
                            <main className="container mx-auto px-4 py-6 pb-24 md:pb-6">{children}</main>
                        <Navigation />
                    </TelegramAuthContextProvider>
                </AuthContextProvider>
            </body>
        </html>
    );
}
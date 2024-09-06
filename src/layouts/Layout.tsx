import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import DocumentArea from './DocumentArea';
import SideDrawer from './Sidedrawer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <main className="flex-1 bg-gray-50">
                {/* Toolbar */}
                <Toolbar openDrawer={() => setDrawerOpen(true)} />

                {/* Document Area */}
                <DocumentArea>
                    {children}
                </DocumentArea>
            </main>

            {/* Side Drawer */}
            <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <p>Drawer Content Goes Here</p>
            </SideDrawer>
        </div>
    );
};

export default Layout;

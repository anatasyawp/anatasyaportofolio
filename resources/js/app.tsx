import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import Home from './Pages/Home';

const appName = import.meta.env.VITE_APP_NAME || "Tasya's Portfolio";

const pages: Record<string, any> = {
    Home,
};

createInertiaApp({
    title: (title) => `${title} — ${appName}`,
    resolve: (name) => {
        if (pages[name]) {
            return pages[name];
        }
        const globPages = import.meta.glob('./Pages/**/*.tsx', { eager: true });
        return globPages[`./Pages/${name}.tsx`];
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: {
        color: '#6366f1',
        showSpinner: true,
    },
});

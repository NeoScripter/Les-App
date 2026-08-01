import { routes } from '@/app/lib/routes';
import { QueryClient, QueryClientProvider } from '@tanstack/preact-query';
import { ErrorBoundary, LocationProvider, Route, Router } from 'preact-iso';
import './lib/styles.css';
const queryClient = new QueryClient();

if (!('anchorName' in document.documentElement.style)) {
    import('@oddbird/css-anchor-positioning/fn').then((module) => {
        module.default();
    });
}

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <LocationProvider>
                <ErrorBoundary>
                    <Router>
                        {routes.map((route, idx) => (
                            <Route
                                key={idx}
                                path={route.path}
                                component={route.component}
                            />
                        ))}
                    </Router>
                </ErrorBoundary>
            </LocationProvider>
        </QueryClientProvider>
    );
}

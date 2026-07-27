import { QueryClient, QueryClientProvider } from '@tanstack/preact-query';
import { ErrorBoundary, LocationProvider, Route, Router } from 'preact-iso';
import './assets/styles.css';
import { routes } from './data/routes';
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
                        {routes.map((route) => (
                            <Route
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

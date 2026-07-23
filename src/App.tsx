import { QueryClient, QueryClientProvider } from '@tanstack/preact-query';
import { ErrorBoundary, LocationProvider, Route, Router } from 'preact-iso';
import './assets/styles.css';
import { baseUrl } from './data/constants';
import { routes } from './data/routes';
import { setApiHost } from './services/api/apiPostResult';
const queryClient = new QueryClient();

export function App() {
    setApiHost(baseUrl);

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

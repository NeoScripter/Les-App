import { ErrorBoundary, LocationProvider, Route, Router } from 'preact-iso';
import './assets/styles.css';
import { routes } from './data/routes';

export function App() {
    return (
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
    );
}

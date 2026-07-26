import type { ApiRequestError } from '@/lib/apiPostOrFail';
import { Component } from 'preact';

export default class ErrorBoundary extends Component {
    state: { error: ApiRequestError | null } = { error: null };

    static getDerivedStateFromError(error: ApiRequestError) {
        return { error };
    }

    render() {
        if (this.state.error) {
            return (
                <div className="p-1">
                    <p className="text-red-500">Ошибка загрузки данных: {this.state.error.message}</p>
                </div>
            );
        }

        return this.props.children;
    }
}

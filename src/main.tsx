import { App } from './app/App';
import { render } from 'preact';

if (typeof window !== 'undefined') {
    render(<App />, document.getElementById('app')!);
}

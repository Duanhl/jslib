import {createRoot} from 'react-dom/client';
import App from './Application';
import './Theme.css';

const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(<App />);
}



import { createRoot } from 'react-dom/client';
import App from './views/App';

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App />);

document.__isRootWindow = true;

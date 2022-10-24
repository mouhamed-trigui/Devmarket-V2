import { loadAnnouncements } from './methodes/announcements';
import { loadStore, loadTimeTable } from './methodes/local-trade';
import { loadTicket } from './methodes/ticket';
import { mock } from './mock';
const NX_REACT_APP_MOCK_API = true;
if (NX_REACT_APP_MOCK_API === true) {
    console.log('NX_REACT_APP_MOCK_API', NX_REACT_APP_MOCK_API);
    loadAnnouncements();
    loadStore();
    loadTimeTable();
    loadTicket();
} else {
    mock.restore();
}

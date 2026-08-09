/* ═══════════════════════════════════════════════════════════
   Campus UNIVERSITY — HOSTEL MANAGEMENT SYSTEM
   script.js  |  HMS v3.1 — No-Login Demo Ready
   ═══════════════════════════════════════════════════════════ */
'use strict';

/* ──────────────── DATA ──────────────── */

const MESS_MENU = {
    0: {
        breakfast: [{ n: 'Pancakes with Maple Syrup', t: ['veg'] }, { n: 'Belgian Waffles', t: ['veg'] }, { n: 'Fresh Fruit Salad', t: ['vegan', 'gf'] }, { n: 'Scrambled Eggs', t: ['gf'] }, { n: 'Orange Juice & Coffee', t: ['vegan'] }],
        lunch: [{ n: 'Roast Chicken', t: ['gf', 'halal'] }, { n: 'Mashed Potatoes', t: ['veg', 'gf'] }, { n: 'Steamed Vegetables', t: ['vegan', 'gf'] }, { n: 'Garden Salad', t: ['vegan', 'gf'] }, { n: 'Lemon Tart', t: ['veg'] }],
        dinner: [{ n: 'BBQ Pulled Pork Sliders', t: ['halal'] }, { n: 'Corn on the Cob', t: ['veg', 'gf'] }, { n: 'Coleslaw', t: ['veg'] }, { n: 'Baked Beans', t: ['veg'] }, { n: 'Banana Pudding', t: ['veg'] }]
    },
    1: {
        breakfast: [{ n: 'Avocado Toast', t: ['vegan'] }, { n: 'Hard-Boiled Eggs', t: ['veg', 'gf'] }, { n: 'Greek Yogurt Parfait', t: ['veg'] }, { n: 'Granola & Berries', t: ['veg'] }, { n: 'Cold Brew Coffee', t: ['vegan'] }],
        lunch: [{ n: 'Grilled Salmon', t: ['gf', 'halal'] }, { n: 'Brown Rice Pilaf', t: ['vegan', 'gf'] }, { n: 'Roasted Broccoli', t: ['vegan', 'gf'] }, { n: 'Caesar Salad', t: ['veg'] }, { n: 'Chocolate Mousse', t: ['veg'] }],
        dinner: [{ n: 'Chicken Tikka Masala', t: ['halal'] }, { n: 'Garlic Naan', t: ['veg'] }, { n: 'Basmati Rice', t: ['vegan', 'gf'] }, { n: 'Cucumber Raita', t: ['veg', 'gf'] }, { n: 'Gulab Jamun', t: ['veg'] }]
    },
    2: {
        breakfast: [{ n: 'Omelette Station', t: ['veg', 'gf'] }, { n: 'Sausage Links', t: ['halal'] }, { n: 'Hash Browns', t: ['veg', 'gf'] }, { n: 'Fresh Pastries', t: ['veg'] }, { n: 'Assorted Juices', t: ['vegan', 'gf'] }],
        lunch: [{ n: 'Pasta Primavera', t: ['veg'] }, { n: 'Garlic Ciabatta', t: ['veg'] }, { n: 'Caesar Salad', t: ['veg'] }, { n: 'Minestrone Soup', t: ['vegan'] }, { n: 'Tiramisu', t: ['veg'] }],
        dinner: [{ n: 'Beef Stir-Fry', t: ['halal'] }, { n: 'Steamed Jasmine Rice', t: ['vegan', 'gf'] }, { n: 'Bok Choy', t: ['vegan', 'gf'] }, { n: 'Miso Soup', t: ['vegan'] }, { n: 'Mango Sorbet', t: ['vegan', 'gf'] }]
    },
    3: {
        breakfast: [{ n: 'Smoothie Bowls', t: ['vegan', 'gf'] }, { n: 'Chia Pudding', t: ['vegan', 'gf'] }, { n: 'Whole-Grain Toast', t: ['veg'] }, { n: 'Peanut Butter & Jam', t: ['veg'] }, { n: 'Cold Brew Coffee', t: ['vegan'] }],
        lunch: [{ n: 'Fish Tacos', t: ['halal'] }, { n: 'Black Bean Rice', t: ['vegan', 'gf'] }, { n: 'Pico de Gallo', t: ['vegan', 'gf'] }, { n: 'Street Corn', t: ['veg'] }, { n: 'Churros', t: ['veg'] }],
        dinner: [{ n: 'Lamb Rogan Josh', t: ['halal', 'gf'] }, { n: 'Paratha', t: ['veg'] }, { n: 'Dal Tadka', t: ['veg', 'gf'] }, { n: 'Basmati Rice', t: ['vegan', 'gf'] }, { n: 'Kheer', t: ['veg', 'gf'] }]
    },
    4: {
        breakfast: [{ n: 'French Toast', t: ['veg'] }, { n: 'Bacon Strips', t: ['halal'] }, { n: 'Fresh Melon', t: ['vegan', 'gf'] }, { n: 'Yogurt Bar', t: ['veg', 'gf'] }, { n: 'Herbal Tea', t: ['vegan'] }],
        lunch: [{ n: 'Vegetable Biryani', t: ['vegan', 'gf'] }, { n: 'Paneer Butter Masala', t: ['veg', 'gf'] }, { n: 'Raita', t: ['veg', 'gf'] }, { n: 'Papadum', t: ['vegan', 'gf'] }, { n: 'Kheer', t: ['veg', 'gf'] }],
        dinner: [{ n: 'Grilled Shrimp', t: ['gf', 'halal'] }, { n: 'Lemon Orzo', t: ['veg'] }, { n: 'Asparagus', t: ['vegan', 'gf'] }, { n: 'Tomato Bisque', t: ['veg'] }, { n: 'Panna Cotta', t: ['veg', 'gf'] }]
    },
    5: {
        breakfast: [{ n: 'Bagels & Cream Cheese', t: ['veg'] }, { n: 'Smoked Salmon', t: ['gf'] }, { n: 'Capers & Red Onion', t: ['veg', 'gf'] }, { n: 'Fruit Platter', t: ['vegan', 'gf'] }, { n: 'Cold Press Juice', t: ['vegan', 'gf'] }],
        lunch: [{ n: 'Lobster Roll', t: ['halal'] }, { n: 'Clam Chowder', t: [] }, { n: 'Coleslaw', t: ['veg'] }, { n: 'Sweet Potato Fries', t: ['vegan', 'gf'] }, { n: 'New England Pie', t: ['veg'] }],
        dinner: [{ n: 'Margherita Pizza', t: ['veg'] }, { n: 'Bruschetta', t: ['veg'] }, { n: 'Caesar Salad', t: ['veg'] }, { n: 'Minestrone Soup', t: ['vegan'] }, { n: 'Cannoli', t: ['veg'] }]
    },
    6: {
        breakfast: [{ n: 'Full English Breakfast', t: ['halal'] }, { n: 'Baked Beans', t: ['vegan'] }, { n: 'Grilled Tomato', t: ['vegan', 'gf'] }, { n: 'Toast & Marmalade', t: ['veg'] }, { n: 'English Breakfast Tea', t: ['vegan'] }],
        lunch: [{ n: 'Butter Chicken', t: ['halal', 'gf'] }, { n: 'Dal Makhani', t: ['veg', 'gf'] }, { n: 'Garlic Naan', t: ['veg'] }, { n: 'Jeera Rice', t: ['vegan', 'gf'] }, { n: 'Gulab Jamun', t: ['veg'] }],
        dinner: [{ n: 'Surf & Turf', t: ['gf', 'halal'] }, { n: 'Lobster Bisque', t: [] }, { n: 'Asparagus', t: ['vegan', 'gf'] }, { n: 'Duchess Potatoes', t: ['veg', 'gf'] }, { n: 'Creme Brulee', t: ['veg', 'gf'] }]
    }
};

const NOTICES_DATA = [
    { id: 1, title: 'Mandatory Fire Drill — March 20', cat: 'urgent', house: 'All Houses', date: 'Mar 18, 2026', content: 'A mandatory fire drill will be conducted on Thursday, March 20 at 10:00 AM. All residents must evacuate immediately when the alarm sounds and assemble at the designated muster points on the main lawn. Attendance will be recorded by house proctors.' },
    { id: 2, title: 'Scheduled Wi-Fi Maintenance Tonight', cat: 'maintenance', house: 'All Houses', date: 'Mar 17, 2026', content: 'The IT department will be conducting maintenance on the residential Wi-Fi network from 2:00 AM to 4:00 AM on March 19. Please save all work before 2 AM. Wired ethernet connections in study rooms will remain active throughout the maintenance window.' },
    { id: 3, title: 'Spring Fest Room Decoration Contest', cat: 'events', house: 'All Houses', date: 'Mar 15, 2026', content: 'Registration is now open for the annual Spring Fest Room Decoration Contest! This year\'s theme is "Crimson Bloom." Judging will be conducted on April 5. First prize includes a $200 Campus Co-op voucher. Sign up at the house office by March 28.' },
    { id: 4, title: 'New Laundry Machines Installed', cat: 'maintenance', house: 'Adams House', date: 'Mar 14, 2026', content: 'Three new high-capacity LG washing machines have been installed on the 2nd floor laundry room. These machines support quick wash (30 min), delicate, and heavy-duty cycles. Please report any operational issues to maintenance@Campus.edu.' },
    { id: 5, title: 'Updated Quiet Hours Policy — Effective March 15', cat: 'policy', house: 'All Houses', date: 'Mar 10, 2026', content: 'Effective March 15, quiet hours will begin at 10:00 PM on weekdays and 11:00 PM on weekends. Violations will result in a formal warning. Three warnings lead to a formal conduct review. Please be respectful of neighbors preparing for end-of-semester exams.' },
    { id: 6, title: 'Dining Hall Extended Hours — Finals Week', cat: 'events', house: 'All Houses', date: 'Mar 8, 2026', content: 'During finals week (April 28 – May 8), all Campus dining halls will extend hours to midnight. A late-night snack station with coffee, tea, and light snacks will be available 10 PM – midnight. No meal swipe required for the late-night station.' }
];

let COMPLAINTS_DATA = [
    { id: 'C-001', subject: 'Broken Heating Vent — Room 204', category: 'maintenance', priority: 'high', status: 'progress', location: 'Room 204', date: 'Mar 16, 2026', time: '2 days ago', desc: 'The heating vent in my room has been making loud rattling noises and is not distributing heat evenly. The right side of the room is significantly colder.' },
    { id: 'C-002', subject: 'Flickering Lights in Hallway', category: 'electrical', priority: 'medium', status: 'open', location: '2nd Floor Hallway', date: 'Mar 17, 2026', time: '1 day ago', desc: 'The fluorescent lights in the 2nd floor north wing hallway have been flickering intermittently since last week, particularly near the stairwell.' },
    { id: 'C-003', subject: 'Clogged Drain — Shared Bathroom', category: 'plumbing', priority: 'urgent', status: 'open', location: 'Room 204-206 Shared Bath', date: 'Mar 18, 2026', time: '3 hours ago', desc: 'The shower drain in the shared bathroom between rooms 204 and 206 is completely clogged. Water backs up within 1 minute of showering.' },
    { id: 'C-004', subject: 'Common Room TV Remote Missing', category: 'maintenance', priority: 'low', status: 'resolved', location: '2nd Floor Common Room', date: 'Mar 10, 2026', time: '8 days ago', desc: 'The TV remote for the 2nd floor common room has been missing for two weeks. A new remote was provided by the house team.' },
    { id: 'C-005', subject: 'Lobby Door Lock Malfunctioning', category: 'security', priority: 'high', status: 'resolved', location: 'Main Lobby', date: 'Mar 5, 2026', time: '13 days ago', desc: 'The electromagnetic lock on the main lobby door was not latching properly. Fixed by the security team the following morning.' },
    { id: 'C-006', subject: 'Noise Complaint — Room 312', category: 'noise', priority: 'medium', status: 'open', location: '3rd Floor', date: 'Mar 3, 2026', time: '15 days ago', desc: 'Persistent loud music from Room 312 after quiet hours on multiple nights.' },
    { id: 'C-007', subject: 'Refrigerator Not Cooling — 3rd Floor', category: 'maintenance', priority: 'high', status: 'resolved', location: '3rd Floor Kitchenette', date: 'Feb 28, 2026', time: '18 days ago', desc: 'The shared refrigerator on the 3rd floor stopped cooling properly. Repaired and back in service.' },
    { id: 'C-008', subject: 'Pest Sighting Near Trash Room', category: 'cleanliness', priority: 'medium', status: 'resolved', location: 'Basement', date: 'Feb 20, 2026', time: '26 days ago', desc: 'A mouse was spotted near the trash compactor room. Pest control conducted treatment and sealed entry points.' }
];

const RESIDENTS_DATA = [
    { id: '2023048271', name: 'John Doe', room: '204', house: 'Adams', program: 'Computer Science', status: 'active' },
    { id: '2023012841', name: 'Emily Chen', room: '205', house: 'Adams', program: 'Biology', status: 'active' },
    { id: '2022098312', name: 'Marcus Williams', room: '308', house: 'Adams', program: 'Economics', status: 'active' },
    { id: '2023071294', name: 'Priya Sharma', room: '112', house: 'Cabot', program: 'Mathematics', status: 'active' },
    { id: '2022045671', name: 'Alex Thompson', room: '217', house: 'Dunster', program: 'Law', status: 'active' },
    { id: '2023088921', name: 'Sofia Reyes', room: '103', house: 'Eliot', program: 'Political Science', status: 'active' },
    { id: '2022033210', name: 'Liam OBrien', room: '301', house: 'Adams', program: 'History', status: 'pending' },
    { id: '2021099012', name: 'Naomi Jackson', room: '224', house: 'Cabot', program: 'Chemistry', status: 'active' },
    { id: '2023055891', name: 'James Park', room: '118', house: 'Dunster', program: 'Architecture', status: 'active' },
    { id: '2022071245', name: 'Aarav Patel', room: '209', house: 'Adams', program: 'Electrical Engineering', status: 'active' }
];

let MY_BOOKINGS = [
    { machine: 'Machine 2', floor: '2nd Floor', date: 'Mar 19, 2026', time: '3:00 PM – 4:00 PM', type: 'Regular Wash', status: 'upcoming' },
    { machine: 'Machine 1', floor: '2nd Floor', date: 'Mar 12, 2026', time: '9:00 AM – 10:00 AM', type: 'Delicate', status: 'done' },
    { machine: 'Machine 3', floor: '2nd Floor', date: 'Mar 5, 2026', time: '7:00 PM – 8:00 PM', type: 'Heavy Duty', status: 'done' }
];

const LAUNDRY_SLOTS = [
    { time: '7:00 – 8:00 AM', machine: 'M1', status: 'past' }, { time: '7:00 – 8:00 AM', machine: 'M2', status: 'past' },
    { time: '8:00 – 9:00 AM', machine: 'M1', status: 'past' }, { time: '8:00 – 9:00 AM', machine: 'M2', status: 'booked' },
    { time: '9:00 – 10:00 AM', machine: 'M1', status: 'past' }, { time: '9:00 – 10:00 AM', machine: 'M2', status: 'past' },
    { time: '10:00 – 11:00 AM', machine: 'M1', status: 'booked' }, { time: '10:00 – 11:00 AM', machine: 'M2', status: 'free' },
    { time: '11:00 – 12:00 PM', machine: 'M1', status: 'free' }, { time: '11:00 – 12:00 PM', machine: 'M2', status: 'booked' },
    { time: '2:00 – 3:00 PM', machine: 'M1', status: 'mine-slot' }, { time: '2:00 – 3:00 PM', machine: 'M2', status: 'free' },
    { time: '3:00 – 4:00 PM', machine: 'M1', status: 'free' }, { time: '3:00 – 4:00 PM', machine: 'M2', status: 'free' },
    { time: '4:00 – 5:00 PM', machine: 'M1', status: 'booked' }, { time: '4:00 – 5:00 PM', machine: 'M2', status: 'free' },
    { time: '6:00 – 7:00 PM', machine: 'M1', status: 'free' }, { time: '6:00 – 7:00 PM', machine: 'M2', status: 'booked' }
];

/* Build room grid data */
const ROOMS_DATA = [];
const roomTypes = ['Single', 'Double', 'Double', 'Double', 'Triple'];
const roomStates = ['available', 'occupied', 'occupied', 'occupied', 'reserved'];
for (let n = 101; n <= 350; n++) {
    const floor = Math.floor(n / 100);
    if (floor > 3) continue;
    const type = roomTypes[Math.floor(seededRand(n) * roomTypes.length)];
    const status = n === 204 ? 'mine' : roomStates[Math.floor(seededRand(n + 7) * roomStates.length)];
    ROOMS_DATA.push({ num: String(n), floor, type, status });
}
function seededRand(seed) {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
}

let selectedStar = 0;
let profileEditing = false;

/* ──────────────── INIT ──────────────── */
document.addEventListener('DOMContentLoaded', () => {
    setDateInfo();
    initSidebar();
    initNavigation();
    renderRoomGrid();
    renderComplaints();
    renderNotices();
    renderMyLaundry();
    renderLaundrySlots();
    renderAdminResidents();
    renderMessForDay(new Date().getDay());
    setActiveDayTab(new Date().getDay());
    setMinLaundryDate();
    initStarRating();
    initDayTabs();
    initNoticeFilters();
    initGlobalSearch();
    showToast('Welcome to Campus HMS! Explore all features freely.', 'success');
});

/* ──────────────── DATE ──────────────── */
function setDateInfo() {
    const now = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const shortM = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const h = now.getHours();
    const greet = h < 12 ? 'Good Morning,' : h < 17 ? 'Good Afternoon,' : 'Good Evening,';
    setText('greetingMsg', greet);
    setText('heroDayNum', now.getDate());
    setText('heroMonth', months[now.getMonth()]);
    setText('heroYear', now.getFullYear());
    setText('todayDate', days[now.getDay()] + ', ' + shortM[now.getMonth()] + ' ' + now.getDate());
}

/* ──────────────── NAV ──────────────── */
function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            navigateTo(item.dataset.section);
        });
    });
}

function navigateTo(name) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    var sec = document.getElementById('section-' + name);
    if (sec) sec.classList.add('active');

    document.querySelectorAll('.nav-item').forEach(n => {
        n.classList.toggle('active', n.dataset.section === name);
    });

    var labels = { dashboard: 'Dashboard', rooms: 'Room Allocation', complaints: 'Complaint Tracking', mess: 'Mess Menu', laundry: 'Laundry Booking', notices: 'Notices', profile: 'My Profile', admin: 'Admin Panel' };
    setText('breadcrumbSection', labels[name] || name);

    if (window.innerWidth <= 900) closeSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ──────────────── SIDEBAR ──────────────── */
function initSidebar() {
    document.getElementById('hamburger').addEventListener('click', openSidebar);
    document.getElementById('sidebarClose').addEventListener('click', closeSidebar);
    document.getElementById('overlay').addEventListener('click', closeSidebar);
}
function openSidebar() { document.getElementById('sidebar').classList.add('open'); document.getElementById('overlay').classList.add('visible'); }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('overlay').classList.remove('visible'); }

/* ──────────────── ROOM GRID ──────────────── */
function renderRoomGrid(filter) {
    filter = filter || {};
    var grid = document.getElementById('roomGrid');
    if (!grid) return;
    var rooms = ROOMS_DATA.slice();
    if (filter.floor) rooms = rooms.filter(function (r) { return r.floor == filter.floor; });
    if (filter.type) rooms = rooms.filter(function (r) { return r.type.toLowerCase() === filter.type; });

    grid.innerHTML = rooms.map(function (r) {
        var label = r.status === 'mine' ? 'My Room' : cap(r.status);
        return '<div class="room-cell ' + r.status + '" onclick="openRoomDetail(\'' + r.num + '\',\'' + r.type + '\',\'' + r.status + '\',' + r.floor + ')">' +
            '<span class="room-status-dot"></span>' +
            '<div class="room-cell-num">' + r.num + '</div>' +
            '<div class="room-cell-type">' + r.type + '</div>' +
            '<div class="room-cell-type" style="font-size:.67rem;margin-top:3px;opacity:.75">' + label + '</div>' +
            '</div>';
    }).join('');
}

function filterRooms() {
    var floor = document.getElementById('floorFilter').value;
    var type = document.getElementById('typeFilter').value;
    renderRoomGrid({ floor: floor || null, type: type || null });
    showToast('Filter applied.', 'info');
}

function openRoomDetail(num, type, status, floor) {
    if (status === 'occupied') { showToast('This room is currently occupied.', 'warn'); return; }
    document.getElementById('rdmTitle').textContent = 'Room ' + num + ' — Details';

    var amenities = {
        Single: ['Private Bathroom', 'Work Desk', 'Wardrobe', 'Wi-Fi & Ethernet', 'Air Conditioning'],
        Double: ['Shared Bath (x2)', '2 Work Desks', '2 Wardrobes', 'Wi-Fi & Ethernet', 'Air Conditioning'],
        Triple: ['Shared Bath (x3)', '3 Work Desks', '3 Wardrobes', 'Wi-Fi & Ethernet', 'Ceiling Fan']
    };
    var list = (amenities[type] || amenities.Double).map(function (a) {
        return '<li style="display:flex;align-items:center;gap:8px;font-size:.84rem;color:var(--text-secondary);padding:4px 0"><i class="fa fa-check-circle" style="color:var(--green)"></i>' + a + '</li>';
    }).join('');

    document.getElementById('rdmBody').innerHTML =
        '<div style="display:grid;gap:18px">' +
        '<div style="display:flex;gap:14px;flex-wrap:wrap">' +
        '<div class="cs-item" style="flex:1;min-width:80px"><div class="cs-num" style="color:var(--crimson)">' + num + '</div><div>Room No.</div></div>' +
        '<div class="cs-item" style="flex:1;min-width:80px"><div class="cs-num" style="color:var(--teal)">' + floor + '</div><div>Floor</div></div>' +
        '<div class="cs-item" style="flex:1;min-width:80px"><div class="cs-num" style="color:var(--amber);font-size:1.1rem">' + type + '</div><div>Type</div></div>' +
        '<div class="cs-item" style="flex:1;min-width:80px"><div class="cs-num" style="color:var(--green);font-size:1.1rem">' + cap(status) + '</div><div>Status</div></div>' +
        '</div>' +
        '<div><div class="section-subheading" style="margin-top:0;margin-bottom:10px">Room Amenities</div><ul style="list-style:none">' + list + '</ul></div>' +
        '<div style="background:var(--crimson-light);border:1px solid var(--crimson);border-radius:var(--radius);padding:16px 20px;font-size:.83rem;color:var(--crimson-dark)">' +
        '<strong>Room Transfer Policy:</strong> Room change requests are subject to availability and approval by Residential Life staff. Processing time is 5–10 business days.' +
        '</div></div>';

    document.getElementById('rdmRequestBtn').onclick = function () {
        closeModal('roomDetailModal');
        document.getElementById('reqRoomNo').value = num;
        var f = document.getElementById('roomRequestForm');
        f.style.display = 'block';
        f.scrollIntoView({ behavior: 'smooth' });
    };

    if (status === 'mine') {
        document.getElementById('rdmRequestBtn').textContent = 'This Is My Room';
        document.getElementById('rdmRequestBtn').disabled = true;
    } else {
        document.getElementById('rdmRequestBtn').innerHTML = '<i class="fa fa-exchange-alt"></i> Request This Room';
        document.getElementById('rdmRequestBtn').disabled = false;
    }
    openModal('roomDetailModal');
}

function submitRoomRequest() {
    var room = document.getElementById('reqRoomNo').value;
    if (!room) { showToast('Please select a room from the grid above.', 'error'); return; }
    document.getElementById('roomRequestForm').style.display = 'none';
    document.getElementById('reqComments').value = '';
    showToast('Room change request for Room ' + room + ' submitted! Reference #RCR-' + randId(), 'success');
}

/* ──────────────── COMPLAINTS ──────────────── */
function renderComplaints(filter) {
    filter = filter || { status: 'all', category: 'all' };
    var list = document.getElementById('complaintList');
    if (!list) return;

    var data = COMPLAINTS_DATA.slice();
    if (filter.status !== 'all') data = data.filter(function (c) { return c.status === filter.status; });
    if (filter.category !== 'all') data = data.filter(function (c) { return c.category === filter.category; });

    var icons = { maintenance: 'fa-wrench', electrical: 'fa-bolt', plumbing: 'fa-faucet', cleanliness: 'fa-broom', security: 'fa-lock', noise: 'fa-volume-up', other: 'fa-question-circle' };
    var catLbl = { maintenance: 'Maintenance', electrical: 'Electrical', plumbing: 'Plumbing', cleanliness: 'Cleanliness', security: 'Security', noise: 'Noise', other: 'Other' };

    if (data.length === 0) {
        list.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--text-muted)"><i class="fa fa-inbox" style="font-size:2.2rem;margin-bottom:12px;display:block;opacity:.4"></i><p>No complaints found for this filter.</p></div>';
    } else {
        list.innerHTML = data.map(function (c) {
            var progHtml = progressBar(c.status);
            var canWithdraw = c.status === 'open' ? '<button class="btn-icon danger" title="Withdraw" onclick="withdrawComplaint(\'' + c.id + '\')"><i class="fa fa-trash"></i></button>' : '';
            var canFollow = c.status !== 'resolved' ? '<button class="btn-icon edit" title="Follow Up" onclick="followUpComplaint(\'' + c.id + '\')"><i class="fa fa-comment"></i></button>' : '';
            return '<div class="complaint-card">' +
                '<div class="cc-icon priority-' + c.priority + '"><i class="fa ' + (icons[c.category] || 'fa-question-circle') + '"></i></div>' +
                '<div class="cc-body">' +
                '<div class="cc-top">' +
                '<div class="cc-subject">' + c.subject + '</div>' +
                '<span class="cc-badge ' + c.status + '">' + fmtStatus(c.status) + '</span>' +
                '<span class="cc-badge" style="background:var(--bg);color:var(--text-muted);border:1px solid var(--border)">#' + c.id + '</span>' +
                '</div>' +
                '<div class="cc-meta">' +
                '<span><i class="fa fa-tag"></i> ' + (catLbl[c.category] || cap(c.category)) + '</span>' +
                '<span><i class="fa fa-exclamation-triangle"></i> ' + cap(c.priority) + '</span>' +
                '<span><i class="fa fa-map-marker-alt"></i> ' + c.location + '</span>' +
                '<span><i class="fa fa-clock"></i> ' + c.time + '</span>' +
                '</div>' +
                '<div class="cc-desc">' + c.desc + '</div>' +
                progHtml +
                '</div>' +
                '<div class="cc-actions">' + canFollow + canWithdraw + '</div>' +
                '</div>';
        }).join('');
    }

    updateComplaintCounts();
}

function progressBar(status) {
    var steps = ['Submitted', 'Acknowledged', 'In Progress', 'Resolved'];
    var filled = status === 'open' ? 1 : status === 'progress' ? 2 : 3;
    var bars = steps.map(function (s, i) {
        var col = i < filled ? 'var(--crimson)' : 'var(--border)';
        var lbl = (i === 0 || i === steps.length - 1) ? '<div style="font-size:.62rem;color:' + (i < filled ? 'var(--crimson)' : 'var(--text-muted)') + ';white-space:nowrap">' + s + '</div>' : '';
        return '<div style="flex:1;display:flex;flex-direction:column;gap:3px"><div style="height:4px;background:' + col + ';border-radius:2px"></div>' + lbl + '</div>';
    }).join('');
    return '<div style="display:flex;gap:3px;margin-top:11px;align-items:flex-start">' + bars + '</div>';
}

function updateComplaintCounts() {
    var open = COMPLAINTS_DATA.filter(function (c) { return c.status === 'open'; }).length;
    var progress = COMPLAINTS_DATA.filter(function (c) { return c.status === 'progress'; }).length;
    var resolved = COMPLAINTS_DATA.filter(function (c) { return c.status === 'resolved'; }).length;
    setText('csOpen', open);
    setText('csProgress', progress);
    setText('csResolved', resolved);
    setText('csTotal', COMPLAINTS_DATA.length);
    setText('openComplaintsCount', open);
}

function filterComplaints() {
    var status = document.getElementById('complaintStatusFilter').value;
    var cat = document.getElementById('complaintCatFilter').value;
    renderComplaints({ status: status, category: cat });
}

function openComplaintModal() { openModal('complaintModal'); }

function submitComplaint() {
    var subject = document.getElementById('cmpSubject').value.trim();
    var category = document.getElementById('cmpCategory').value;
    var priority = document.getElementById('cmpPriority').value;
    var desc = document.getElementById('cmpDesc').value.trim();
    var location = document.getElementById('cmpLocation').value.trim();

    if (!subject) { showToast('Please enter a subject for your complaint.', 'error'); return; }
    if (!desc) { showToast('Please provide a detailed description.', 'error'); return; }

    var newId = 'C-00' + (COMPLAINTS_DATA.length + 1);
    COMPLAINTS_DATA.unshift({
        id: newId, subject: subject, category: category, priority: priority,
        status: 'open', location: location || 'Room 204',
        date: 'Mar 18, 2026', time: 'Just now', desc: desc
    });

    closeModal('complaintModal');
    renderComplaints();
    showToast('Complaint ' + newId + ' submitted successfully!', 'success');
    document.getElementById('cmpSubject').value = '';
    document.getElementById('cmpDesc').value = '';
    document.getElementById('cmpLocation').value = '';
}

function followUpComplaint(id) { showToast('Follow-up message sent for ' + id + '.', 'info'); }

function withdrawComplaint(id) {
    var idx = COMPLAINTS_DATA.findIndex(function (c) { return c.id === id; });
    if (idx !== -1) {
        COMPLAINTS_DATA.splice(idx, 1);
        renderComplaints();
        showToast('Complaint ' + id + ' withdrawn.', 'warn');
    }
}

/* ──────────────── MESS MENU ──────────────── */
function initDayTabs() {
    document.getElementById('dayTabs').addEventListener('click', function (e) {
        var tab = e.target.closest('.day-tab');
        if (!tab) return;
        setActiveDayTab(parseInt(tab.dataset.day));
        renderMessForDay(parseInt(tab.dataset.day));
    });
}

function setActiveDayTab(dayIdx) {
    var today = new Date().getDay();
    document.querySelectorAll('.day-tab').forEach(function (t) {
        t.classList.remove('active', 'today-marker');
        if (parseInt(t.dataset.day) === dayIdx) t.classList.add('active');
        if (parseInt(t.dataset.day) === today) t.classList.add('today-marker');
    });
}

function renderMessForDay(dayIdx) {
    var menu = MESS_MENU[dayIdx];
    var container = document.getElementById('messDayContent');
    if (!container || !menu) return;

    var meals = [
        { key: 'breakfast', label: 'Breakfast', time: '7:00 – 10:00 AM', icon: 'fa-sun', bg: '#fff7ed', color: '#ea580c' },
        { key: 'lunch', label: 'Lunch', time: '12:00 – 2:30 PM', icon: 'fa-cloud-sun', bg: '#fffbeb', color: '#d97706' },
        { key: 'dinner', label: 'Dinner', time: '6:00 – 8:30 PM', icon: 'fa-moon', bg: '#eff6ff', color: '#2563eb' }
    ];

    var tagLbl = { veg: 'Veg', vegan: 'Vegan', gf: 'GF', halal: 'Halal' };

    container.innerHTML = meals.map(function (m) {
        var items = (menu[m.key] || []).map(function (item) {
            var tags = (item.t || []).map(function (t) {
                return '<span class="food-tag tag-' + t + '">' + tagLbl[t] + '</span>';
            }).join('');
            return '<li class="meal-item">' +
                '<div><div class="meal-item-name">' + item.n + '</div>' +
                (tags ? '<div class="meal-item-tags">' + tags + '</div>' : '') +
                '</div></li>';
        }).join('');
        return '<div class="meal-card">' +
            '<div class="meal-card-header">' +
            '<div class="meal-type-icon" style="background:' + m.bg + ';color:' + m.color + '"><i class="fa ' + m.icon + '"></i></div>' +
            '<div><div class="meal-type-title">' + m.label + '</div><div class="meal-time"><i class="fa fa-clock" style="margin-right:4px"></i>' + m.time + '</div></div>' +
            '</div>' +
            '<ul class="meal-items">' + items + '</ul>' +
            '</div>';
    }).join('');
}

/* ──────────────── MESS FEEDBACK ──────────────── */
function initStarRating() {
    var stars = document.querySelectorAll('#mealStars i');
    stars.forEach(function (star) {
        star.addEventListener('mouseenter', function () {
            var n = parseInt(star.dataset.star);
            stars.forEach(function (s, i) { s.classList.toggle('active', i < n); });
        });
        star.addEventListener('click', function () {
            selectedStar = parseInt(star.dataset.star);
            stars.forEach(function (s, i) { s.classList.toggle('active', i < selectedStar); });
        });
    });
    document.getElementById('mealStars').addEventListener('mouseleave', function () {
        stars.forEach(function (s, i) { s.classList.toggle('active', i < selectedStar); });
    });
}

function submitMessFeedback() {
    if (!selectedStar) { showToast('Please select a star rating first.', 'warn'); return; }
    document.getElementById('messFeedback').value = '';
    selectedStar = 0;
    document.querySelectorAll('#mealStars i').forEach(function (s) { s.classList.remove('active'); });
    showToast('Thank you for your dining feedback!', 'success');
}

/* ──────────────── NOTICES ──────────────── */
function renderNotices(catFilter) {
    catFilter = catFilter || 'all';
    var board = document.getElementById('noticeBoard');
    if (!board) return;
    var data = catFilter === 'all' ? NOTICES_DATA : NOTICES_DATA.filter(function (n) { return n.cat === catFilter; });

    var iconMap = { urgent: 'fa-exclamation-triangle', maintenance: 'fa-tools', events: 'fa-calendar-alt', policy: 'fa-file-alt' };
    var iconClass = { urgent: 'urgent-icon', maintenance: 'maintenance-icon', events: 'events-icon', policy: 'policy-icon' };
    var catLabel = { urgent: 'Urgent', maintenance: 'Maintenance', events: 'Event', policy: 'Policy' };

    board.innerHTML = data.map(function (n) {
        return '<div class="notice-item ' + n.cat + '">' +
            '<div class="ni-icon ' + (iconClass[n.cat] || 'events-icon') + '"><i class="fa ' + (iconMap[n.cat] || 'fa-bell') + '"></i></div>' +
            '<div class="ni-body">' +
            '<div class="ni-top">' +
            '<div class="ni-title">' + n.title + '</div>' +
            '<span class="ni-badge ' + n.cat + '">' + (catLabel[n.cat] || n.cat) + '</span>' +
            '<span class="ni-date"><i class="fa fa-calendar-alt" style="margin-right:3px"></i>' + n.date + '</span>' +
            '</div>' +
            '<div class="ni-content">' + n.content + '</div>' +
            '<div class="ni-house"><i class="fa fa-home" style="margin-right:4px"></i>' + n.house + '</div>' +
            '</div></div>';
    }).join('');
}

function initNoticeFilters() {
    document.getElementById('noticeFilterTabs').addEventListener('click', function (e) {
        var btn = e.target.closest('.nft');
        if (!btn) return;
        document.querySelectorAll('.nft').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        renderNotices(btn.dataset.cat);
    });
}

/* ──────────────── LAUNDRY ──────────────── */
function renderMyLaundry() {
    var list = document.getElementById('myLaundryBookings');
    if (!list) return;
    if (MY_BOOKINGS.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted);font-size:.85rem;padding:12px 0">No bookings yet. Book a slot below!</p>';
        return;
    }
    list.innerHTML = MY_BOOKINGS.map(function (b, i) {
        var cancelBtn = b.status === 'upcoming'
            ? '<button class="btn-icon danger" title="Cancel" onclick="cancelLaundry(' + i + ')"><i class="fa fa-times"></i></button>' : '';
        return '<div class="laundry-booking-item">' +
            '<div class="lb-icon"><i class="fa fa-tshirt"></i></div>' +
            '<div class="lb-info"><div class="lb-title">' + b.machine + ' · ' + b.time + '</div>' +
            '<div class="lb-sub"><i class="fa fa-calendar-alt" style="margin-right:4px"></i>' + b.date + ' &nbsp;·&nbsp; ' + b.type + '</div></div>' +
            '<span class="lb-status ' + b.status + '">' + cap(b.status) + '</span>' +
            cancelBtn +
            '</div>';
    }).join('');
}

function renderLaundrySlots() {
    var grid = document.getElementById('laundrySlotGrid');
    if (!grid) return;
    var labels = { free: 'Available', booked: 'Booked', 'mine-slot': 'My Slot', past: 'Past' };
    grid.innerHTML = LAUNDRY_SLOTS.map(function (slot) {
        var clickable = slot.status === 'free' ? ' onclick="quickBookSlot(\'' + slot.time + '\',\'' + slot.machine + '\')"' : '';
        return '<div class="laundry-slot ' + slot.status + '"' + clickable + '>' +
            '<div class="slot-time">' + slot.time + '</div>' +
            '<div class="slot-machine">Machine ' + slot.machine.replace('M', '') + '</div>' +
            '<span class="slot-badge">' + (labels[slot.status] || slot.status) + '</span>' +
            '</div>';
    }).join('');
}

function quickBookSlot(time, machine) {
    var sel = document.getElementById('laundryTime');
    for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.indexOf(time.split(' – ')[0]) !== -1) { sel.selectedIndex = i; break; }
    }
    var mSel = document.getElementById('laundryMachine');
    for (var j = 0; j < mSel.options.length; j++) {
        if (mSel.options[j].value === machine) { mSel.selectedIndex = j; break; }
    }
    document.getElementById('laundryDate').focus();
    showToast('Slot pre-selected: ' + time + ' — Machine ' + machine.replace('M', '') + '. Pick a date to confirm.', 'info');
}

function bookLaundry() {
    var dateVal = document.getElementById('laundryDate').value;
    var mOpts = document.getElementById('laundryMachine');
    var machine = mOpts.options[mOpts.selectedIndex].text.split('—')[0].trim();
    var type = document.getElementById('laundryWashType').value;
    var timeOpts = document.getElementById('laundryTime');
    var time = timeOpts.options[timeOpts.selectedIndex].text;

    if (!dateVal) { showToast('Please select a date first.', 'error'); return; }

    var formatted = fmtDate(dateVal);
    MY_BOOKINGS.unshift({ machine: machine, floor: '2nd Floor', date: formatted, time: time, type: type, status: 'upcoming' });
    renderMyLaundry();
    document.getElementById('laundryDate').value = '';
    showToast('Laundry slot booked! ' + machine + ' on ' + formatted + ' · ' + time, 'success');
}

function cancelLaundry(idx) {
    MY_BOOKINGS.splice(idx, 1);
    renderMyLaundry();
    showToast('Laundry booking cancelled.', 'warn');
}

function setMinLaundryDate() {
    var d = new Date();
    var yyyy = d.getFullYear();
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var dd = String(d.getDate()).padStart(2, '0');
    var inp = document.getElementById('laundryDate');
    if (inp) inp.min = yyyy + '-' + mm + '-' + dd;
}

/* ──────────────── ADMIN RESIDENTS ──────────────── */
function renderAdminResidents() {
    var tbody = document.getElementById('residentTableBody');
    if (!tbody) return;
    tbody.innerHTML = RESIDENTS_DATA.map(function (r) {
        return '<tr>' +
            '<td><code style="font-family:\'DM Mono\',monospace;font-size:.78rem;color:var(--text-muted)">' + r.id + '</code></td>' +
            '<td style="font-weight:600;color:var(--text-primary)">' + r.name + '</td>' +
            '<td>' + r.room + '</td>' +
            '<td>' + r.house + '</td>' +
            '<td>' + r.program + '</td>' +
            '<td><span class="table-status ' + r.status + '">' + cap(r.status) + '</span></td>' +
            '<td><div style="display:flex;gap:6px">' +
            '<button class="btn-icon edit" title="Edit" onclick="showToast(\'Editing ' + r.name + '…\',\'info\')"><i class="fa fa-edit"></i></button>' +
            '<button class="btn-icon danger" title="Remove" onclick="showToast(\'Action requires admin confirmation.\',\'warn\')"><i class="fa fa-user-times"></i></button>' +
            '</div></td>' +
            '</tr>';
    }).join('');
}

/* ──────────────── PROFILE ──────────────── */
function toggleProfileEdit() {
    profileEditing = !profileEditing;
    document.querySelectorAll('.profile-field').forEach(function (f) { f.disabled = !profileEditing; });
    document.getElementById('profileActions').style.display = profileEditing ? 'flex' : 'none';
    document.getElementById('editProfileBtn').innerHTML = profileEditing ? '<i class="fa fa-times"></i> Cancel' : '<i class="fa fa-edit"></i> Edit';
}

function saveProfile() {
    var first = document.getElementById('pfFirstName').value.trim();
    var last = document.getElementById('pfLastName').value.trim();
    if (!first || !last) { showToast('Name fields cannot be empty.', 'error'); return; }
    toggleProfileEdit();
    showToast('Profile updated successfully!', 'success');
}

function cancelProfileEdit() {
    document.getElementById('pfFirstName').value = 'John';
    document.getElementById('pfLastName').value = 'Doe';
    document.getElementById('pfEmail').value = 'jdoe@college.Campus.edu';
    document.getElementById('pfPhone').value = '+1 (617) 495-0001';
    toggleProfileEdit();
}

function handleAvatarUpload(event) {
    var file = event.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (e) {
        var src = e.target.result;
        document.getElementById('profileAvatarBig').innerHTML = '<img src="' + src + '" alt="avatar"/>';
        document.getElementById('sidebarAvatar').innerHTML = '<img src="' + src + '"/>';
        document.getElementById('topbarAvatar').innerHTML = '<img src="' + src + '"/>';
        showToast('Profile photo updated!', 'success');
    };
    reader.readAsDataURL(file);
}

/* ──────────────── ADMIN: POST NOTICE ──────────────── */
function openNoticeModal() { openModal('noticeModal'); }

function postNotice() {
    var title = document.getElementById('noticeTitle').value.trim();
    var cat = document.getElementById('noticeCat').value;
    var content = document.getElementById('noticeContent').value.trim();
    var house = document.getElementById('noticeHouse').value;

    if (!title) { showToast('Please enter a notice title.', 'error'); return; }
    if (!content) { showToast('Please enter the notice content.', 'error'); return; }

    NOTICES_DATA.unshift({ id: NOTICES_DATA.length + 1, title: title, cat: cat, house: house, content: content, date: 'Mar 18, 2026' });
    closeModal('noticeModal');
    renderNotices();
    document.getElementById('noticeTitle').value = '';
    document.getElementById('noticeContent').value = '';

    var badge = document.getElementById('noticeBadge');
    if (badge) badge.textContent = parseInt(badge.textContent || 0) + 1;
    showToast('Notice posted to all residents!', 'success');
}

/* ──────────────── SEARCH ──────────────── */
function initGlobalSearch() {
    document.getElementById('globalSearch').addEventListener('keydown', function (e) {
        if (e.key !== 'Enter') return;
        var q = this.value.toLowerCase().trim();
        if (!q) return;
        var map = { room: 'rooms', laundry: 'laundry', wash: 'laundry', complaint: 'complaints', complaint: 'complaints', mess: 'mess', food: 'mess', menu: 'mess', notice: 'notices', announcement: 'notices', profile: 'profile', admin: 'admin', resident: 'admin' };
        for (var kw in map) {
            if (q.includes(kw)) { navigateTo(map[kw]); showToast('Navigated to ' + map[kw] + '.', 'info'); break; }
        }
        this.value = '';
    });
}

/* ──────────────── MODALS ──────────────── */
function openModal(id) {
    document.getElementById(id).classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeModal(id) {
    document.getElementById(id).classList.remove('open');
    document.body.style.overflow = '';
}
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach(function (m) {
            m.classList.remove('open');
            document.body.style.overflow = '';
        });
    }
});
// Close modal on backdrop click
document.querySelectorAll && document.addEventListener('click', function (e) {
    if (e.target.classList.contains('modal-backdrop')) closeModal(e.target.id);
});

/* ──────────────── TOAST ──────────────── */
function showToast(msg, type) {
    type = type || 'success';
    var icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warn: 'fa-exclamation-triangle' };
    var container = document.getElementById('toastContainer');
    var toast = document.createElement('div');
    toast.className = 'toast ' + type;
    toast.innerHTML = '<i class="fa ' + (icons[type] || icons.info) + '"></i><span class="toast-msg">' + msg + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
        toast.style.animation = 'toastOut .28s ease forwards';
        setTimeout(function () { if (toast.parentNode) toast.parentNode.removeChild(toast); }, 300);
    }, 3600);
}

/* ──────────────── UTILS ──────────────── */
function cap(str) { return str ? str.charAt(0).toUpperCase() + str.slice(1) : ''; }
function setText(id, val) { var el = document.getElementById(id); if (el) el.textContent = val; }
function fmtStatus(s) { return s === 'open' ? 'Open' : s === 'progress' ? 'In Progress' : 'Resolved'; }
function randId() { return Math.floor(1000 + Math.random() * 9000); }
function fmtDate(dateStr) {
    var parts = dateStr.split('-');
    var d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    var ms = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return ms[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}

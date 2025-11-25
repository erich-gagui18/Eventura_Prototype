// Sample data for the caterers 
const catererData = [
    {
        name: "Lipa's Best Events Catering",
        specialty: "A blend of traditional Batangueño recipes and modern cuisine.",
        location: "Lipa City",
        tags: ["Wedding", "Corporate", "Lechon", "Buffet"],
        rating: 4.8
    },
    {
        name: "Taal Heritage Kitchen",
        specialty: "Specializing in authentic regional dishes like Bulalo and Sinaing na Tulingan.",
        location: "Taal",
        tags: ["Birthday", "Traditional", "Filipino", "Intimate"],
        rating: 4.5
    },
    {
        name: "Batangas City Catering Pros",
        specialty: "High-volume, professional service perfect for large conferences and galas.",
        location: "Batangas City",
        tags: ["Corporate", "Large Scale", "Modern", "Quick Service"],
        rating: 4.7
    },
    {
        name: "San Juan Sunset Suppers",
        specialty: "Coastal-inspired menus featuring fresh seafood and local produce.",
        location: "San Juan",
        tags: ["Beach Events", "Seafood", "Casual", "Outdoor"],
        rating: 4.6
    },
    {
        name: "Mataasnakahoy Family Feasts",
        specialty: "Affordable and generous packages for family reunions and baptisms.",
        location: "Mataasnakahoy",
        tags: ["Affordable", "Family", "Reunion", "Baptism"],
        rating: 4.2
    }
];

const catererListContainer = document.getElementById('caterer-list-container');
const searchInput = document.getElementById('searchInput');

// Create HTML for caterer card
function createCatererCard(caterer) {
    const tagsHtml = caterer.tags.map(tag => `<span class="caterer-tag">${tag}</span>`).join('');
    
    // FIX: Escape single quotes in the name so "Lipa's" doesn't break the alert button
    const safeName = caterer.name.replace(/'/g, "\\'");

    return `
        <div class="caterer-card">
            <h3>${caterer.name}</h3>
            <p><strong>Location:</strong> ${caterer.location}</p>
            <p>${caterer.specialty}</p>
            <p><strong style="color:#BFA588">Rating:</strong> ${caterer.rating} / 5</p>
            <div class="caterer-tags">${tagsHtml}</div>
            <button class="view-menu-btn" onclick="alert('Viewing menu for ${safeName}')">View Menu & Packages</button>
        </div>
    `;
}

// Filter and display
function displayCaterers(filterQuery = '') {
    const query = filterQuery.toLowerCase().trim();

    const filteredCaterers = catererData.filter(caterer => {
        const matchesName = caterer.name.toLowerCase().includes(query);
        const matchesSpecialty = caterer.specialty.toLowerCase().includes(query);
        const matchesLocation = caterer.location.toLowerCase().includes(query);
        const matchesTag = caterer.tags.some(tag => tag.toLowerCase().includes(query));
        return matchesName || matchesSpecialty || matchesLocation || matchesTag;
    });

    const caterersHtml = filteredCaterers.map(createCatererCard).join('');
    
    if (filteredCaterers.length > 0) {
        catererListContainer.innerHTML = caterersHtml;
    } else {
        catererListContainer.innerHTML = `<p style="text-align: center; grid-column: 1 / -1; color: #888;">No caterers found matching "${filterQuery}". Try a different keyword!</p>`;
    }
}

// Listeners
if (searchInput) {
    searchInput.addEventListener('keyup', (e) => {
        displayCaterers(e.target.value);
    });
}

function openBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.add('show');
}

function closeBookingModal() {
    const modal = document.getElementById('bookingModal');
    if (modal) modal.classList.remove('show');
}

function submitBooking() {
    const name = document.getElementById('name').value;
    if (!name) {
        alert('Please fill in at least your name!');
        return;
    }
    alert('Thank you, ' + name + '! Your booking request is received.');
    closeBookingModal();
}

function showEventDetail(title, image, description) {
    document.getElementById('eventDetailTitle').textContent = title + ' Catering';
    document.getElementById('eventDetailImage').src = image;
    document.getElementById('eventDetailDescription').textContent = description;
    const modal = document.getElementById('eventDetailModal');
    if (modal) modal.classList.add('show');
}

function closeEventDetail() {
    const modal = document.getElementById('eventDetailModal');
    if (modal) modal.classList.remove('show');
}

function bookFromEventDetail() {
    closeEventDetail();
    openBookingModal();
}

// Close modal on outside click
window.addEventListener('click', function(e) {
    const bookingModal = document.getElementById('bookingModal');
    const eventModal = document.getElementById('eventDetailModal');
    if (bookingModal && e.target === bookingModal) closeBookingModal();
    if (eventModal && e.target === eventModal) closeEventDetail();
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayCaterers();
});
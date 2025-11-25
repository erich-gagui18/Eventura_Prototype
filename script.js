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

// Reference to the main caterer list container
const catererListContainer = document.getElementById('caterer-list-container');
const searchInput = document.getElementById('searchInput');

// ----------------------------------------------------
// CORE FUNCTIONALITY: DYNAMIC CATERER LIST & FILTERING
// ----------------------------------------------------

// 1. Function to create the HTML string for one caterer card
function createCatererCard(caterer) {
    const tagsHtml = caterer.tags.map(tag => `<span class="caterer-tag">${tag}</span>`).join('');
    
    return `
        <div class="caterer-card">
            <h3>${caterer.name}</h3>
            <p><strong>Location:</strong> ${caterer.location}</p>
            <p>${caterer.specialty}</p>
            <p><strong>Rating:</strong> ${caterer.rating} / 5</p>
            <div class="caterer-tags">${tagsHtml}</div>
            <button class="view-menu-btn" onclick="alert('Viewing menu for ${caterer.name}')">View Menu & Packages</button>
        </div>
    `;
}

// 2. Function to filter the data and display the results
function displayCaterers(filterQuery = '') {
    const query = filterQuery.toLowerCase().trim();

    const filteredCaterers = catererData.filter(caterer => {
        // Check if the caterer name, specialty, location, or any tag includes the query
        const matchesName = caterer.name.toLowerCase().includes(query);
        const matchesSpecialty = caterer.specialty.toLowerCase().includes(query);
        const matchesLocation = caterer.location.toLowerCase().includes(query);
        const matchesTag = caterer.tags.some(tag => tag.toLowerCase().includes(query));

        return matchesName || matchesSpecialty || matchesLocation || matchesTag;
    });

    // Generate HTML for the filtered list
    const caterersHtml = filteredCaterers.map(createCatererCard).join('');
    
    if (filteredCaterers.length > 0) {
        catererListContainer.innerHTML = caterersHtml;
    } else {
        catererListContainer.innerHTML = `<p style="text-align: center; grid-column: 1 / -1; color: #888;">No caterers found matching "${filterQuery}". Try a different keyword!</p>`;
    }
}

// 3. Event listener for live filtering in the search box
// This is more effective than the 'handleSearch' function for the caterer list.
searchInput.addEventListener('keyup', (e) => {
    displayCaterers(e.target.value);
});


// ----------------------------------------------------
// EXISTING FUNCTIONS: MODAL & SEARCH PLACEHOLDER
// ----------------------------------------------------

// Placeholder function for the search button click (since keyup handles the list)
function handleSearch() {
    const query = searchInput.value.trim();
    if (query && catererData.length === 0) {
        alert('Searching the site for: ' + query);
    }
    // If caterers are loaded, the keyup event handles the live filtering.
}

searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        // On enter, simply ensure the filtering has run
        displayCaterers(searchInput.value);
    }
});

function openBookingModal() {
    document.getElementById('bookingModal').classList.add('show');
}

function closeBookingModal() {
    document.getElementById('bookingModal').classList.remove('show');
}

function submitBooking() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventType = document.getElementById('eventType').value;
    const eventDate = document.getElementById('eventDate').value;
    const guests = document.getElementById('guests').value;
    const details = document.getElementById('details').value;

    if (!name || !email || !phone || !eventDate || !guests) {
        alert('Please fill in all required fields!');
        return;
    }

    console.log('Booking Details:', {
        name, email, phone, eventType, eventDate, guests, details
    });

    alert('Thank you for your booking request! We will contact you soon.');
    closeBookingModal();

    // Reset the form fields
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('eventDate').value = '';
    document.getElementById('guests').value = '';
    document.getElementById('details').value = '';
}

function showEventDetail(title, image, description) {
    document.getElementById('eventDetailTitle').textContent = title + ' Catering';
    document.getElementById('eventDetailImage').src = image;
    document.getElementById('eventDetailDescription').textContent = description;
    document.getElementById('eventDetailModal').classList.add('show');
}

function closeEventDetail() {
    document.getElementById('eventDetailModal').classList.remove('show');
}

function bookFromEventDetail() {
    closeEventDetail();
    openBookingModal();
}

window.addEventListener('click', function(e) {
    const bookingModal = document.getElementById('bookingModal');
    const eventModal = document.getElementById('eventDetailModal');
    
    if (e.target === bookingModal) {
        closeBookingModal();
    }
    if (e.target === eventModal) {
        closeEventDetail();
    }
});

// Run this function immediately when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', displayCaterers);
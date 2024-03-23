document.addEventListener('DOMContentLoaded', function() {
    // Check if password is stored in localStorage
    const password = localStorage.getItem('password');
    if (!password) {
        // Redirect to previous page if password is not found
        window.history.back();
    } else {
        // Send password to the server to get tickets
        fetch('https://aptapi.joshnewman6.com/apt/allTickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password: password })
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Failed to get tickets');
            }
        })
        .then(data => {
            // Sort tickets alphabetically by name
            data.sort((a, b) => a.name.localeCompare(b.name));
            
            // Display tickets in dot points in the <p> with id "allTickets"
            const allTicketsElement = document.getElementById('allTickets');
            data.forEach(ticket => {
                // Add strikethrough style if ticket is scanned
                const nameStyle = ticket.scanned ? 'text-decoration: line-through;' : '';
                allTicketsElement.innerHTML += `<p class="nomargin" style="${nameStyle}">- ${ticket.name} (${ticket.code})</p>`;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while retrieving tickets. Please check your password.');
        });
    }
});

function revalidateTicket() {
    const password = localStorage.getItem('password');

    if (!password) {
        alert("Please enter the password first.");
        return;
    }

    const ticketId = prompt("Enter the ticket ID you want to revalidate (the ID is the thing in brackets in the list below)");

    if (!ticketId) {
        return;
    }

    fetch('https://aptapi.joshnewman6.com/apt/revalidateTicket', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: ticketId, password: password })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .then(data => {
        if (data.message) {
            alert(data.message);
            window.location.reload();
        } else {
            throw new Error('Invalid response from server.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred while revalidating the ticket.');
    });
}
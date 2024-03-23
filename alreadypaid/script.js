function showCodeInput() {
    const userInput = prompt('Please enter the code you want to redeem');
    if (userInput) {
        localStorage.removeItem('code');
        window.location.href = `../ticket/?code=${encodeURIComponent(userInput)}`;
    }
}

function resendEmail() {
    const email = prompt('Please enter the email you used to pay');
    if (!email) {
        return;
    }

    fetch('https://aptapi.joshnewman6.com/apt/resendEmail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    .then(response => {
        if (response.ok) {
            alert('Success. Please check your inbox and spam folder.');
        } else {
            response.json()
                .then(data => {
                    if (data && data.error) {
                        alert('Error: ' + data.error);
                    } else {
                        alert('Error: Failed to recover ticket. Please try again later and check your inbox and spam folder for your original email.');
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Error: Failed to recover ticket. Please try again later and check your inbox and spam folder for your original email.');
                });
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Error: Failed to recover ticket. Please try again later and check your inbox and spam folder for your original email.');
    });
}

function redirectToTicketPage() {
    window.location.href = '../ticket/';
}

document.getElementById('topseperator').style.display = 'none';

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    let codeParam = urlParams.get('code');

    function getNameFromServer(code) {
        fetch('https://aptapi.joshnewman6.com/apt/getName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: code })
        })
        .then(response => response.json())
        .then(data => {
            if (data && data.name) {
                let firstName;
                if (data.name.includes(' ')) {
                    firstName = data.name.split(' ')[0];
                } else {
                    firstName = data.name;
                }
                document.getElementById('topseperator').style.display = 'block';
                document.getElementById('foundticketmessage').textContent = `Hi ${firstName}, click the button below to view your ticket`;
            } else {
                console.error('Name not found in response.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function getCodeFromLocalStorage() {
        return localStorage.getItem('code');
    }

    if (codeParam) {
        getNameFromServer(codeParam);
    } else {
        codeParam = getCodeFromLocalStorage();
        if (codeParam) {
            getNameFromServer(codeParam);
        } else {
            console.error('No code found in local storage or URL parameters.');
            document.getElementById("topseperator").style.display = "none";
        }
    }
};
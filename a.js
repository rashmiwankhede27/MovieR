document.addEventListener('DOMContentLoaded', function() {
    const app = document.getElementById('app');
    const registerForm = document.getElementById('register-form');
    const movieSelection = document.getElementById('movie-selection');
    const seatSelection = document.getElementById('seat-selection');
    const bookingConfirmation = document.getElementById('booking-confirmation');
    const billingSection = document.getElementById('billing-section');
    const movieList = document.getElementById('movie-list');
    const seatMap = document.getElementById('seat-map');
    const bookingDetails = document.getElementById('booking-details');

    let selectedMovieId = null;
    let selectedSeats = [];

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        // Simulate registration process
        // Normally would send data to backend and handle response
        showMovieSelection();
    });

    function showMovieSelection() {
        registerForm.classList.add('hidden');
        movieSelection.classList.remove('hidden');

        // Simulated movie list data (would come from backend)
        const movies = [
            { id: 1, title: 'Movie 1', genre: 'Action', showtimes: ['12:00 PM', '3:00 PM', '6:00 PM'] },
            { id: 2, title: 'Movie 2', genre: 'Comedy', showtimes: ['1:00 PM', '4:00 PM', '7:00 PM'] },
            { id: 3, title: 'Movie 3', genre: 'Drama', showtimes: ['2:00 PM', '5:00 PM', '8:00 PM'] }
        ];

        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie-item');
            movieElement.innerHTML = `
                <h3>${movie.title}</h3>
                <p>Genre: ${movie.genre}</p>
                <p>Showtimes: ${movie.showtimes.join(', ')}</p>
                <button class="button select-movie" data-movie-id="${movie.id}">Select Movie</button>
            `;
            movieList.appendChild(movieElement);
        });

        // Add event listener to select movie button
        movieList.addEventListener('click', function(event) {
            if (event.target.classList.contains('select-movie')) {
                const movieId = event.target.dataset.movieId;
                selectedMovieId = movieId;
                showSeatSelection(selectedMovieId);
            }
        });
    }

    function showSeatSelection(movieId) {
        movieSelection.classList.add('hidden');
        seatSelection.classList.remove('hidden');

        // Clear previous seat map
        seatMap.innerHTML = '';

        // Simulated seat map (would come from backend)
        const rows = 5;
        const cols = 10;
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                const seat = document.createElement('div');
                seat.classList.add('seat');
                seat.textContent = `${String.fromCharCode(65 + i)}${j + 1}`;
                seatMap.appendChild(seat);

                seat.addEventListener('click', function() {
                    if (seat.classList.contains('selected')) {
                        seat.classList.remove('selected');
                        const index = selectedSeats.indexOf(seat.textContent);
                        if (index !== -1) {
                            selectedSeats.splice(index, 1);
                        }
                    } else {
                        seat.classList.add('selected');
                        selectedSeats.push(seat.textContent);
                    }
                });
            }
            seatMap.appendChild(document.createElement('br'));
        }

        // confirm seats button
        document.getElementById('confirm-seats').addEventListener('click', function() {
            if (selectedSeats.length > 0) {
                const selectedSeatsString = selectedSeats.join(', ');
                showBillingSection(selectedSeatsString);
            } else {
                alert('Please select at least one seat.');
            }
        });

        // Show selected movie 
        const selectedMovieTitle = movies.find(movie => movie.id === parseInt(movieId)).title;
        document.getElementById('selected-movie-title').textContent = selectedMovieTitle;
    }

    function showBillingSection(selectedSeats) {
        seatSelection.classList.add('hidden');
        billingSection.classList.remove('hidden');

        
        const seatPrice = 10; // 
        const totalPrice = selectedSeats.split(',').length * seatPrice;
        const taxRate = 0.1; // 
        const taxAmount = totalPrice * taxRate;
        const finalPrice = totalPrice + taxAmount;

        // Display billing information
        const billingDetails = document.getElementById('billing-details');
        billingDetails.innerHTML = `
            <p><strong>Selected Seats:</strong> ${selectedSeats}</p>
            <p><strong>Subtotal:</strong> Rs${totalPrice.toFixed(2)}</p>
            <p><strong>Tax (10%):</strong> Rs${taxAmount.toFixed(2)}</p>
            <p><strong>Total:</strong> Rs${finalPrice.toFixed(2)}</p>
        `;

   
        document.getElementById('pay-button').addEventListener('click', function() {
            alert('Payment successful! Your booking is confirmed.');
            showBookingConfirmation(selectedSeats);
        });
    }

    function showBookingConfirmation(selectedSeats) {
        billingSection.classList.add('hidden');
        bookingConfirmation.classList.remove('hidden');

        
        const movieTitle = 'Selected Movie'; 
        const showtime = 'Selected Showtime'; 

        bookingDetails.innerHTML = `
            <p><strong>Movie:</strong> ${movieTitle}</p>
            <p><strong>Seats:</strong> ${selectedSeats}</p>
            <p><strong>Showtime:</strong> ${showtime}</p>
        `;
    }
});

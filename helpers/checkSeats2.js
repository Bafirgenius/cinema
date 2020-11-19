function checkSeats2(customerMovies, MovieId) {
    let availableSeats =   ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];

    for (let i = 0; i < customerMovies.length; i++) {
        let customer = customerMovies[i];
            if (customer.MovieId === MovieId) {
                for (let j = 0; j < availableSeats.length; j++) {
                    if (customerMovies[i].seat === availableSeats[j]) {
                        availableSeats.splice(j, 1);
                    }
                }
            }
        
    }   
    return availableSeats;                   
}

module.exports = checkSeats2;
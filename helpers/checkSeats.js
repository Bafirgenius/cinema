function checkSeats(customers) {
    let availableSeats =   ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9", "A10"];

    for (let i = 0; i < customers.length; i++) {
        let customer = customers[i];
        for (let j = 0; j < availableSeats.length; j++) {
            if (customer.seat === availableSeats[j]) {
                availableSeats.splice(j, 1);
            }
        }
    }   
    return availableSeats;                   
}

module.exports = checkSeats;
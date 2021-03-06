const fs = require('fs');
const crypto = require('crypto');

const jsonData = JSON.parse(fs.readFileSync('./data.json'));

const raffleHash = crypto.createHash('sha256').update(jsonData.block).digest('hex');
const raffleNumber = parseInt(raffleHash.slice(0, 7), 16);

console.log('Block hash:', jsonData.block);
console.log('Raffle hash:', raffleHash);
console.log('Raffle Number:', raffleNumber, '\n');

function playerClosestNumber(player, tickets, number) {
    let closestNumber = 0;

    for (let i = 1; i <= tickets; i++) {
        let playerTicketHash = crypto.createHash('sha256').update(player + '-' + i).digest('hex');
        let playerTicket = parseInt(playerTicketHash.slice(0, 7), 16);

        if (Math.abs(number - playerTicket) < Math.abs(number - closestNumber)) {
            closestNumber = playerTicket;
        }
    }

    return closestNumber;
}

let results = [];

for (player of jsonData.players) {
    results.push(
        {
            "user": player[0],
            "points": player[1],
            "closest_ticket": playerClosestNumber(player[0], player[1], raffleNumber)
        }
    );
}

console.table(results);
const fs = require('fs');
const crypto = require('crypto');

const rawData = fs.readFileSync('./data.json');
const jsonData = JSON.parse(rawData);

const blockHash = crypto.createHash('sha256').update(jsonData.block).digest('hex');
const winningNumber = parseInt(blockHash.slice(0, 7), 16);

console.log('Winning number: ' + winningNumber + '\n');

for (player of jsonData.players) {
    let closestNumber = 0;

    for (let i = 1; i <= player[1]; i++) {
        let playerTicketHash = crypto.createHash('sha256').update(player[0] + '-' + i).digest('hex');
        let playerTicket = parseInt(playerTicketHash.slice(0, 7), 16);

        if (Math.abs(winningNumber - playerTicket) < Math.abs(winningNumber - closestNumber)) {
            closestNumber = playerTicket;
        }
    }

    console.log(player[0] + ': ' + closestNumber);
}
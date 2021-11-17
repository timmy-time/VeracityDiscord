const { Client } = require("discord.js");
const { readdirSync } = require("fs");
var AsciiTable = require('ascii-table')

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
    var table = new AsciiTable(`Events`).setHeading('Event', 'Status')
    const files = readdirSync("./events/").filter((files) => files.endsWith(".js"));
    num = 0;
    for (const file of files) {
        const events = require(`../events/${file}`);
        client.on(file.split(".")[0], events.bind(null, client));
        table.addRow(file.split(".")[0], '✔️')
        num++;

    }
    table.setTitle(`Event (${num})`)
    console.log(table.toString())
}
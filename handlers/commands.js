const { readdirSync } = require("fs");
const { Client } = require("discord.js");
var AsciiTable = require('ascii-table')

/**
 * 
 * @param {Client} client 
 */

module.exports = async (client) => {
    var table = new AsciiTable(`Commands`).setHeading('Command', 'Category', 'Status')
    readdirSync("./commands/").forEach((dir) => {
        const commandFiles = readdirSync(`./commands/${dir}/`).filter((files) => files.endsWith(".js"));
        client.commandcategories.set(dir, dir);

        for (const file of commandFiles) {
            const command = require(`../commands/${dir}/${file}`);
            client.commands.set(command.name, command);
            table.addRow(command.name, dir, '✔️')
            //table.addRow(command.name, dir, '✖️')
        }
    });
    table.setTitle(`Commands (${client.commands.size})`)
    console.log(table.toString())
}
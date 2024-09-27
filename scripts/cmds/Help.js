const fs = require('fs');
const path = require('path');
module.exports = {
  config: {
    name: "help",
    version: "1.0",
    author: "UPoL🐔",
    countDown: 5,
    role: 0, 
    shortDescription: {
      en: "view command information"
    },
    longDescription: {
      en: "View the list of available commands in the bot or details of a specific command"
    },
    category: "utility",
    guide: {
      en: "Use: {p}help or {p}help [command name]"
    }
  },
  langs: {
    en: {
      commandListHeader: "⎾︽ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐢𝐞𝐬 ︽⏋",
      commandInfoHeader: "⟡︽ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 𝐈𝐧𝐟𝐨 ︽⟡",
      noCommandFound: "⟡︽ 𝐍𝐨 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐟𝐨𝐮𝐧𝐝 𝐟𝐨𝐫 %1 ︽⟡",
      usage: "𝐔𝐬𝐚𝐠𝐞: .help [command name]",
      categoryHeader: "⦚︽ %1 ⦚︽",
      commandDetails: "⟡︽ 𝐍𝐚𝐦𝐞: %1\n⟡︽ 𝐀𝐮𝐭𝐡𝐨𝐫: %2\n⟡︽ 𝐑𝐨𝐥𝐞: %3\n⟡︽ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧: %4\n⟡︽ 𝐆𝐮𝐢𝐝𝐞: %5\n⟡︽ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧: %6",
      roleNames: ["User", "Admin", "Bot Owner"]
    }
  },
  onStart: async function ({ message, args, globalData, getLang }) {
    const commands = globalData.commands;
    const lang = getLang();
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = commands[commandName];
      if (!command) {
        return message.reply(lang.noCommandFound.replace('%1', commandName));
      }
      const roleNames = lang.roleNames;
      const commandInfo = lang.commandDetails
        .replace('%1', command.config.name)
        .replace('%2', command.config.author || "Unknown")
        .replace('%3', roleNames[command.config.role] || "Unknown")
        .replace('%4', command.config.description[lang] || "No description")
        .replace('%5', command.config.guide[lang] || "No guide")
        .replace('%6', command.config.version || "1.0");
      return message.reply(lang.commandInfoHeader + "\n\n" + commandInfo);
    }
    const categories = {};
    for (const commandName in commands) {
      const command = commands[commandName];
      const category = command.config.category || "uncategorized";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(command.config.name);
    }
    let response = lang.commandListHeader + "\n\n";
    for (const category in categories) {
      const categoryText = lang.categoryHeader.replace('%1', category.toUpperCase());
      const commandNames = categories[category].join(', ');
      response += `${categoryText}\n${commandNames}\n\n`;
    }
    return message.reply(response);
  }
};

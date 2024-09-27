const fs = require('fs');
const path = require('path');
const axios = require('axios');
const warJsonPath = path.join(__dirname, 'atck.json');

function readWarJson() {
  try {
    const jsonData = fs.readFileSync(warJsonPath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading war JSON:', error);
    return { uids: [] };
  }
}

function writeWarJson(data) {
  try {
    fs.writeFileSync(warJsonPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Error writing to war JSON:', error);
  }
}

let t = [];
const warData = readWarJson();
if (warData.uids) {
  t = warData.uids;
}

const permissions = ["61557094816783"]; // Add your UID here

module.exports = {
  config: {
    name: "attack",
    aliases: [],
    version: "1.0",
    author: "yourmom",
    countDown: 5,
    role: 0,
    shortDescription: "",
    longDescription: "Launch attack of roasts on someone",
    category: "fun",
    guide: {
      vi: "",
      en: "{p}",
    },
  },

  onStart: async function ({ api, event, args }) {
    const subCommand = args[0];
    const userId = event.senderID.toString();

    if (!permissions.includes(userId)) {
      await api.sendMessage(
        { body: "You do not have permission to use this command.", attachment: null, mentions: [] },
        event.threadID,
        event.messageID
      );
      return;
    }

    if (subCommand === "on") {
      const uidToAdd = args[1]?.toString();
      if (uidToAdd) {
        if (!t.includes(uidToAdd)) {
          t.push(uidToAdd);
          writeWarJson({ uids: t });
          await api.sendMessage({ body: `User ${uidToAdd} added to the list. 😈`, attachment: null, mentions: [] }, event.threadID, event.messageID);
        } else {
          await api.sendMessage({ body: `User ${uidToAdd} is already in the list.`, attachment: null, mentions: [] }, event.threadID, event.messageID);
        }
      } else {
        await api.sendMessage({ body: "Please provide a UID to add.", attachment: null, mentions: [] }, event.threadID, event.messageID);
      }
    } else if (subCommand === "off") {
      const uidToRemove = args[1]?.toString();
      if (uidToRemove) {
        if (t.includes(uidToRemove)) {
          t = t.filter(uid => uid !== uidToRemove);
          writeWarJson({ uids: t });
          await api.sendMessage({ body: `User ${uidToRemove} removed from the list. 😈`, attachment: null, mentions: [] }, event.threadID, event.messageID);
        } else {
          await api.sendMessage({ body: `User ${uidToRemove} is not in the list.`, attachment: null, mentions: [] }, event.threadID, event.messageID);
        }
      } else {
        await api.sendMessage({ body: "Please provide a UID to remove.", attachment: null, mentions: [] }, event.threadID, event.messageID);
      }
    } else {
      await api.sendMessage({ body: "Invalid command. Use 'on' or 'off'.", attachment: null, mentions: [] }, event.threadID, event.messageID);
    }
  },

  onChat: async function ({ api, event }) {
    const s = event.senderID.toString();
    if (t.includes(s)) {
      try {
        const response = await axios.get("https://evilinsult.com/generate_insult.php?lang=en&type=json");
        const insult = response.data.insult;
        await api.sendMessage({ body: insult, attachment: null, mentions: [] }, event.threadID, event.messageID);
      } catch (error) {
        console.error('Error fetching insult:', error);
        await api.sendMessage({ body: "Error fetching insult!", attachment: null, mentions: [] }, event.threadID, event.messageID);
      }
    }
  },
};

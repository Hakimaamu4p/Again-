const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "system",
    aliases: ["sys"],
    role: 0,
    author: "UPoL",
    category: "SysTeM",
    shortDescription: {
      en: "",
    },
    longDescription: {
      en: "",
    },
    guide: {
      en: "{pn} [ uptime | ping | all | date | day | time | calc | details | list ]" 
      + "\n\n{pn} --u\n{pn} --p\n{pn} --a\n{pn} --d\n{pn} --da\n{pn} --t\n{pn} --c\n{pn} --de\n{pn} --l"
    }
  },

    onStart: async function ({ api, event, args, message, usersData, threadsData }) {
      const { threadID, messageID } = event;
      const { commands } = global.client;
       if (args[0] == "--u") {
         const uptime = process.uptime();
         const days = Math.floor(uptime / (60 * 60 * 24));
         const hours = Math.floor((uptime % (60 * 60 * 24) / (60 * 60)));
         const minutes = Math.floor((uptime % (60 * 60)) / 60);
         const seconds = Math.floor(uptime % 60);
         const miliSeconds = Math.floor(uptime % 1000);

         const UPoL = `UPTIME bot 😺\n\nDAYS: ${days}\nHOURS: ${hours}\nMINUTES: ${minutes}\nSECONDS: ${seconds}\nMILISECONDS: ${miliSeconds}`;
         message.reply(UPoL);
       } else if (args[0] == "--p") {
         const timeStart = Date.now();
         await message.reply("testing......");
         const ping = Date.now() - timeStart;
         let pingStatus = " 🟢 | Very Good ";
    if (ping > 200) {
      pingStatus = " 🌸 | Good..";
    }
    if (ping > 500) {
      pingStatus = " ✅ | Medium..!!";
    }
    if (ping > 800) {
      pingStatus = " ⚠ | Not Good-";
    }
    if (ping > 1000) {
      pingStatus = " 👀 | Net slow.....";
    }
    if (ping > 1200) {
      pingStatus = " 🚫 | Oho Net Issue.";
    }
    if (ping > 1500) {
      pingStatus = " ⚠ | Bad.!";
    }
    if (ping > 1800) {
      pingStatus = " ❌ | Very Bad..";
    }
    if (ping > 2000) {
      pingStatus = " 💀 | Fully Dead.";
    }
         message.reply(`Bot Ping: ${ping}\nStatus: ${pingStatus}`);
       } else if (args[0] == "--a") {
         const totalThreads = await threadsData.getAll();
         const totalUsers = await usersData.getAll();
         const usersCount = totalUsers.length;
         const threadsCount = totalThreads.length;
         const name = "MeGu AI";
         const UPoL = `The name of this bot is: ${name}\n\nTotal Users: ${usersCount} users\nTotal threads: ${threadsCount} threads`;
         message.reply(UPoL);
       } else if (args[0] == "--d") {
         const date = new Date();
         const day = date.getDate();
         const month = date.getMonth() + 1;
         const year = date.getFullYear();

         const UPoL = `Today's date is: ${day} / ${month} / ${year}`;
         message.reply(UPoL);
       } else if (args[0] == "--t") {
         const getTime = moment.tz("Asia/Dhaka").format("hh:mm:ss A");

         const UPoL = `Current time is: ${getTime}`;
         message.reply(UPoL);
       } else if (args[0] == "--da") {
         const day = moment().format("dddd");

         const UPoL = `Today's day is: ${day}`;
         message.reply(UPoL);
       } else if (args[0] == "--c") {
         const upol = args.slice(1).join(" ");
         if (!upol) return message.reply("Ahhh 😾, Put a calculation to me.");
         try {
           const UPoL = eval(upol);
           message.reply(`${upol}   =    ${UPoL}`);
         } catch (error) {
           message.reply("Uhh 😿, I can't calculate that.");
         }
       } else if (args[0] == "--de") {
         const name = "M E G U   A I";
         const author = "U P O L";
         const fbLink = `https://www.facebook.com/chikaupol007`;
         const rls = "SINGLE";

         const UPoL = `====== MEGU DETAILS ======\n\nBot Name: ${name}\nBot Admin: ${author}\n\n----- FB LINK -----\n${fbLink}\n\n_____ OTHERS INFO _____\nRelationship: ${rls}`;
         message.reply(UPoL);
       } else if (args[0] == "--l") {
         message.reply("======_MEGU BOT STATUS_======\n\n1. uptime\n2. ping\n3. all\n4. date\n5. time\n6. day\n7. calc\n8. details\n9. list");
       } else {
         message.reply("✨ SYSTEM STATUS ✨\n\n*sys --u\n*sys --p\n*sys --a\n*sys --d\n*sys --da\n*sys --t\n*sys --c\n*sys --de\n*sys --l");
       }
    }
};

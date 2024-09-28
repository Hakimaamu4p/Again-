module.exports = {
    config: {
       name: 'ping',
       version: '5.8',
       role: 0,
       category: 'SySteM',
       longDescription: 'Show the bot ping or status',
       author: 'UPoL',
       guide: {
         en: '{p}{n}'
        },
    },
    onStart: async function ({ api, event, message }) {
         const timeStart = Date.now();
         await message.reply('Loading....!');
         const ping = Date.now() - timeStart;
         let pingStatus = " 🟢 | Very Good ";
    if (ping > 200) {
      pingStatus = '🫠 | Good..';
    }
    if (ping > 500) {
      pingStatus = '✅ | Medium..!!';
    }
    if (ping > 1000) {
      pingStatus = '👀 | Net slow...';
    }
    if (ping > 1500) {
      pingStatus = '⚠ | Bad.!';
    }
         message.reply(`===== HEAVEN STATUS =====\n\nPong: ${ping}\nStatus: ${pingStatus}`);
     }
  };

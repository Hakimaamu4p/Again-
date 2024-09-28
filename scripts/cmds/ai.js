const axios = require('axios');
const UPoLPrefix = [
  'heaven',
  'ai',
  '-ai',
  'hi',
  'ask'
]; 

  module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'UPoL 🌸',
    shortDescription: '',
    longDescription: '',
  },
  
  onStart: async function () {},
  onChat: async function ({ message, event, args, api, threadID, messageID }) {
      
      const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!ahprefix) {
        return; 
      } 
      
     const upol = event.body.substring(ahprefix.length).trim();
   if (!upol) {
        await message.reply('🧘‍♀️𝐇𝐞𝐚𝐯𝐞𝐧 🧘‍♀️ 𝐢𝐬 𝐦𝐲 𝐍𝐚𝐦𝐞 bae😁');
        return;
      }
      
      const apply = ['Awww🥹, maybe you need my help', 'How can i help you?', 'How can i assist you today?', 'How can i help you?🙂'];
      
     const randomapply = apply[Math.floor(Math.random() * apply.length)];

     
      if (args[0] === 'hi') {
          message.reply(`${randomapply}`);
          return;
      }
      
    const encodedPrompt = encodeURIComponent(args.join(" "));
  
    const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodedPrompt}`);
   
    await message.reply('heavening..');
 
     const UPoL = response.data.answer; 

      const upolres = `𝙃𝙀𝘼𝙑𝙀𝙉'𝙎 𝘽𝙊𝙏 |🧘‍♀𝙃𝙀𝘼𝙑𝙀𝙉🧘‍♀𝙄𝙎 𝙏𝙃𝙀 𝘽𝙊𝙎𝙎\n━━━━🧘‍♀༺༻🧘‍♀━━━━\n\n\n${UPoL}`;
      
        message.reply(upolres);
  }
};

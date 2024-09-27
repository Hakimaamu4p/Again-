const axios = require('axios');

const Prefixes = [
  '/ai',
  'ai',
  'heaven',
  'bot',
  'heaven'
];

module.exports = {
  config: {
    name: "ask",
    version: 1.0,
    author: "OtinXSandip",
    longDescription: "AI",
    category: "ai",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("🎧𝐇𝐄𝐀𝐕𝐄𝐍🎧\n ℰ⍲‿⍲ℰ........? 𝐚𝐬𝐤 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧 𝐝𝐚𝐰𝐠😇.");
        return;
      }


      const response = await axios.get(`https://sandipbaruwal.onrender.com/gemini?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply({ body: `🧘𝐇𝐄𝐀𝐕𝐄𝐍 𝐈𝐒 𝐌𝐘 𝐁𝐎𝐒𝐒 🧘
______________________________  
${answer}
ℰ⋆‿⋆ℰ 🤸𝐇𝐄𝐀𝐕𝐄𝐍 𝐌𝐀𝐃𝐄🤸`,
});

   } catch (error) {
      console.error("Error:", error.message);
    }
  }
};

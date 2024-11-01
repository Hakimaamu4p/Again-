module.exports={config:{name:"xl",version:"1.0",author:"Team Calyx",countDown:10,role:0,longDescription:{en:"Generate an image from text using SDXL."},category:"image",guide:{en:"{pn} prompt [--ar=<ratio>]"}},onStart:async function({message:e,api:t,args:a,event:n}){let r=a.join(" ");if(!r)return e.reply(`😖 Please enter a text prompt



Example: 

${global.GoatBot.config.prefix}xl a cat or,

${global.GoatBot.config.prefix}xl a cat --ar=2:3`);let o="1:1",s=a.findIndex(e=>e.startsWith("--ar="));-1!==s&&(o=a[s].split("=")[1],a.splice(s,1)),t.setMessageReaction("⏳",n.messageID,()=>{},!0);let i=new Date().getTime();e.reply("✅ Generating your image, please wait...",async(r,s)=>{try{let g=a.join(" "),l=`&ratio=${o}`,m=`gen?prompt=${encodeURIComponent(g)}${l}`,p=`https://team-calyx.onrender.com/${m}`,c=await global.utils.getStreamFromURL(p),y=new Date().getTime();e.reply({body:`Here is your XL model 🖼️

Time taken: ${(y-i)/1e3} seconds`,attachment:c}),e.unsend(s.messageID),t.setMessageReaction("✅",n.messageID,()=>{},!0)}catch(x){console.error(x),e.reply("\uD83D\uDE14 Something went wrong, please try again later."),x.response&&403===x.response.status&&t.setMessageReaction("❌",n.messageID,()=>{},!0)}})}};

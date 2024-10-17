module.exports = {
    config: {
        name: "fbst",
        version: "1.0",
        author: "Marjhxn",
        shortDescription: {
            en: "Pay the Fee"
        },
        longDescription: {
            en: "Pay the Fee"
        },
        category: "utility",
        guide: {
            en: "{prefix}fbst <uid> <amount>"
        }
    },

    onStart: async function ({ args, message, api }) {
        if (args.length !== 2) {
            return message.reply("Invalid command usage. Please use it like this: `-fbst <uid> <amount>`");
        }

        const [uid, amount] = args;
        const charge = Math.ceil(amount / 1000) * 15; // Calculate the charge amount
        const boostOrderMessage = `𝗕𝗼𝗼𝘀𝘁 𝗢𝗿𝗱𝗲𝗿\n\n𝖫𝗂𝗇𝗄: https://www.facebook.com/${uid}\n𝖰𝗎𝖺𝗇𝗍𝗂𝗍𝗒: ${amount}\n𝖢𝗁𝖺𝗋𝗀𝖾: ₱${charge}`;

        try {
            // Send the boost order message to the admin
            // Replace "ADMIN_USER_ID" with the actual user ID of the admin
            const adminUserID = "100043265301021";
            await api.sendMessage({ body: boostOrderMessage }, adminUserID);

            // Reply to the user
            await message.reply("𝗣𝗮𝘆𝗺𝗲𝗻𝘁 𝗥𝗲𝗾𝘂𝗶𝗿𝗲𝗱: (₱15/1kffs)\n𝖰𝗎𝖺𝗇𝗍𝗂𝗍𝗒: " + amount + "\n𝖢𝗁𝖺𝗋𝗀𝖾: ₱" + charge + "\n\n𝗣𝗮𝘆𝗺𝗲𝗻𝘁 𝗠𝗲𝘁𝗵𝗼𝗱𝘀: Gcash/Paymaya\n\nPay Here: 09683353794\n\n𝗦𝘁𝗮𝘁𝘂𝘀: Pending");

            return;
        } catch (error) {
            console.error("Error sending boost order message:", error);
            return message.reply("An error occurred while processing your request.");
        }
    }
};

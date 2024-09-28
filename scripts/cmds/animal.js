const axios = require('axios');

module.exports = {
    config: {
        name: "animal",
        aliases: ['animalinfo', 'animal-info'],
        author: "Hassan",
        version: "1.0",
        shortDescription: "Get information about an animal",
        longDescription: "Fetch detailed information about an animal using the Animals API.",
        category: "utility",
        guide: {
            vi: "Sử dụng: !animal <tên động vật>\nVí dụ: !animal Cape Lion",
            en: "Usage: !animal <animal name>\nExample: !animal Cape Lion"
        }
    },

    onStart: async function ({ args, message, getLang }) {
        try {
            const animalName = args.join(' ').trim();
            if (!animalName) {
                return message.reply("Please provide an animal name.");
            }

            const url = `https://hassan40u-animals-api.onrender.com/animal-info?name=${encodeURIComponent(animalName)}`;


            const response = await axios.get(url);

            if (response.data && response.data.length > 0) {
                const animal = response.data[0];
                const { name, taxonomy, locations, characteristics } = animal;

                let animalInfo = `📚 Information about "${name}":\n\n`;

                animalInfo += `**Taxonomy**:\n`;
                for (const [key, value] of Object.entries(taxonomy)) {
                    animalInfo += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
                }

                animalInfo += `\n**Locations**: ${locations.join(', ')}\n\n`;

                animalInfo += `**Characteristics**:\n`;
                for (const [key, value] of Object.entries(characteristics)) {
                    animalInfo += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`;
                }

                return message.reply(animalInfo);
            } else {
                return message.reply("Sorry, no information was found for the given animal name.");
            }
        } catch (error) {
            console.error(error);
            return message.reply("Sorry, there was an error fetching animal information.");
        }
    }
};

module.exports = {
config: {
name: "bet",
author: "@Shady Tarek",
category: "game"
},



onStart: async ({ message, usersData, threadsData, args , event}) => {
    if (isNaN(args[0]) || args[0] < 0 || args[0].includes(".")) {
        return message.reply("Please enter a number greater than 0.");
    }

    const a = parseInt(args[0], 10);
    const c = Math.random() < 0.5 ? "win" : "lose";

    if (c === "win") {
        const b = a * 2;
await usersData.addMoney(event.senderID,b)
        return message.reply(`Congratulations! You won ${b}.`);
    } else {
await usersData.subtractMoney(event.senderID,a)
        return message.reply(`Sorry, you lost ${a}.`);
    }
}
};

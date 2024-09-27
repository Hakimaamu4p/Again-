module.exports = {
  config: {
    name: "heavengc",
    author: "UPoL",
    role: 0,
    shortDescription: {
      en: "",
    },
    longDescription: {
      en: "",
    },
    category: "supportbox",
    guide: {
      en: "",
    },
  },
  onStart: async function ({ api, args, message, event }) {
    const BoxID = "7542944265717365";

    const threadID = event.threadID;
    const userID = event.senderID;
    const threadInfo = await api.getThreadInfo(BoxID);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      api.sendMessage(
        "⚠️ Alert ⚠️\nYou already added in the heavengc box. Please check you spam box to find the support box.", threadID );
    } else {
      api.addUserToGroup(userID, BoxID, (err) => {
        if (err) {
          console.error("🔴 Server error for:", err);
          api.sendMessage("⚠️ Support Box Alert ⚠️\n Maybe your account has been strong that's why i can't add you in support box.", threadID );
        } else {
          api.sendMessage(
            "✅ Successfully added in the heavengc box.", threadID );
        }
      });
    }
  },
};

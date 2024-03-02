// Import the required libraries
const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');

// Read the bot token from a file
const token = fs.readFileSync('token.txt', 'utf8');

// Create a new bot instance
const bot = new TelegramBot(token, {polling: true});

// Define a map to store the custom tags and their users
const tags = new Map();

// Handle the /start command
bot.onText(/\/start/, (msg) => {
  // Send a welcome message
  bot.sendMessage(msg.chat.id, 'Hello, I am a user tag bot. I can help you ping specific users in your group with a simple tag. To create a tag, use the /tag command followed by the tag name and the user ids. To ping a tag, just send a message with the tag name preceded by @. For example, @everyone will ping all the users in the group.');
});

// Handle the /tag command
bot.onText(/\/tag (\w+) (.+)/, (msg, match) => {
  // Check if the sender is an admin
  bot.getChatMember(msg.chat.id, msg.from.id).then((member) => {
    if (member.status === 'creator' || member.status === 'administrator') {
      // Extract the tag name and the user ids
      const tagName = match[1];
      const userIds = match[2].split(' ');
      // Check if the tag name is valid
      if (/^\w+$/.test(tagName)) {
        // Check if the user ids are valid
        if (userIds.every((id) => /^\d+$/.test(id))) {
          // Create or update the tag
          tags.set(tagName, userIds);
          // Send a confirmation message
          bot.sendMessage(msg.chat.id, `The tag ${tagName} has been created or updated with ${userIds.length} users.`);
        } else {
          // Send an error message
          bot.sendMessage(msg.chat.id, 'Invalid user ids. Please use only numbers separated by spaces.');
        }
      } else {
        // Send an error message
        bot.sendMessage(msg.chat.id, 'Invalid tag name. Please use only letters, numbers, and underscores.');
      }
    } else {
      // Send an error message
      bot.sendMessage(msg.chat.id, 'You are not an admin. Only admins can create or update tags.');
    }
  });
});

// Handle any other message
bot.on('message', (msg) => {
  // Check if the message contains a tag
  const tagMatch = msg.text.match(/@(\w+)/);
  if (tagMatch) {
    // Extract the tag name
    const tagName = tagMatch[1];
    // Check if the tag exists
    if (tags.has(tagName)) {
      // Get the user ids for the tag
      const userIds = tags.get(tagName);
      // Create a message with the user mentions
      let message = '';
      for (const id of userIds) {
        message += `user `;
      }
      // Send the message with the user mentions
      bot.sendMessage(msg.chat.id, message, {parse_mode: 'Markdown'});
    } else {
      // Send an error message
      bot.sendMessage(msg.chat.id, `The tag ${tagName} does not exist. Please use the /tag command to create it first.`);
    }
  }
});

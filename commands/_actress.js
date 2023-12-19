/*CMD
  command: /actress
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

const updatedPhotoLinks = [
  "https://t.me/ActressChannelBackup/449",
  "https://t.me/ActressChannelBackup/450",
  "https://t.me/ActressChannelBackup/451",
  "https://t.me/ActressChannelBackup/452",
  "https://t.me/ActressChannelBackup/453",
  "https://t.me/ActressChannelBackup/454",
  "https://t.me/ActressChannelBackup/455",
  "https://t.me/ActressChannelBackup/456",
  "https://t.me/ActressChannelBackup/457", // More Link Here By @Privates_RoBot
];
const randomPhotoIndex = Math.floor(Math.random() * updatedPhotoLinks.length);

const button = [
  [
    {
      text: "❤️ Generate Actress Pics",
      callback_data: "/actress",
    },
  ],
];

Api.editMessageMedia({
  chat_id: "@HGK_TEAM",//Your Channel Here 
  message_id: "1204",//Your Message I'd Here
  media: {
    type: "photo",
    media: updatedPhotoLinks[randomPhotoIndex],
    caption: "Powered By King Of Hgk",
  },
  parse_mode: "markdown",
  disable_web_page_preview: false,
  reply_markup: { inline_keyboard: button },
});

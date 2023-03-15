const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Привет! Чтобы получить имя пользователя, отправьте мне его id.');
});

bot.on('text', async (ctx) => {
  const userId = ctx.message.text;
  try {
    const {username, ...user} = await bot.telegram.getChat(userId);
    
    username ? ctx.reply(`Ник пользователя с id ${userId}: @${username}`) : ctx.reply(`Ник у пользователя не установлен`);
    ctx.reply(stringify(user), {parse_mode: "Markdown"});
  } catch (error) {
    console.error(error);
    ctx.reply(`Не удалось получить имя пользователя с id ${userId}.`);
  }
});

bot.launch();

function stringify (record) {
  let res = ''
  for (key in record) {
    res += `**${key}**: ${record[key]}\n`
  }
    
  return res;
}

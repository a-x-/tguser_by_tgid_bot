const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) => {
  ctx.reply('Привет! Чтобы получить имя пользователя, отправьте мне его id.');
});

bot.on('text', async (ctx) => {
  const userId = ctx.message.text;
  try {
    const {username, photo, ...user} = await bot.telegram.getChat(userId);

    username ? ctx.reply(`Ник пользователя с id ${userId}: @${username}`) : ctx.reply(`Ник у пользователя не установлен`);
    ctx.reply(stringify(user), {parse_mode: "HTML"});
    //const photoObj = await bot.telegram.getFileLink(photo.small_file_id);
    //ctx.replyWithPhoto(photoObj.href);
  } catch (error) {
    console.error(error);
    ctx.reply(`Не удалось получить имя пользователя с id ${userId}.`);
  }
});

bot.launch();

function stringify (record) {
  let res = ''
  for (key in record) {
    res += `<b>${key}</b>: ${record[key]}\n`
  }

  return res;
}

const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const text = require('./const');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(`Hello, ${ctx.message.from.first_name ? ctx.message.from.first_name : 'unknown name'} `)
);
bot.help((ctx) => ctx.reply(text.commands));
bot.command('course', async (ctx) => {
  try {
    await ctx.replyWithHTML(
      '<b>Курсы</b>',
      Markup.inlineKeyboard([
        [
          Markup.button.callback('Редакторы', 'btn_1'),
          Markup.button.callback('Обзоры', 'btn_2'),
          Markup.button.callback('JS', 'btn_3'),
        ],
        [Markup.button.callback('HTML', 'btn_4 ')],
      ])
    );
  } catch (error) {
    console.log(error);
  }
});

const addActionBot = (name, src, text) => {
  bot.action(name, async (ctx) => {
    try {
      if (src !== false) {
        await ctx.replyWithPhoto({
          source: src,
        });
      }
      await ctx.replyWithHTML(text, {
        disable_web_page_preview: true,
      });
    } catch (error) {
      console.log(error);
    }
  });
};

addActionBot('btn_1', './img/1.jpg', text.text1);
addActionBot('btn_2', './img/2.jpg', text.text2);
addActionBot('btn_3', false, text.text3);

bot.launch();

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

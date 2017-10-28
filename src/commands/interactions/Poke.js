const BaseCommand = require('nagato/lib/Abstracts/BaseCommand')
const { getImage } = require('./')

module.exports = class Poke extends BaseCommand {
  // noinspection JSMethodCanBeStatic
  /**
   * @returns {string}
   */
  get category() {
    return 'interactions'
  }

  /**
   * @returns {string}
   */
  get name() {
    return 'poke'
  }

  /**
   * @returns {string}
   */
  get help() {
    const [description, example, usage] = this.bot._m(
      `help.${this.name}.description`,
      `help.${this.name}.examples`,
      `help.${this.name}.usage`,
    )

    return this.bot.helpCreator(this, description, usage, example)
  }

  /**
   * @param {Message} msg
   * @param {string} args
   * @returns {Promise.<void>}
   */
  async process(msg, args) {
    const poke = await getImage('poke', this.bot)

    if (!poke) {
      return this.execute(msg, this.bot._('c.poke.error.retrieval'))
    } else if (args) {
      const user = this.bot.getUser(msg, args)

      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.poke.other', {
              userA: user.username,
              userB: msg.author.username,
            }),
            url: poke,
          },
          color: 0xFFA500,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: poke,
          },
        },
      })
    } else {
      return this.execute(msg, {
        embed: {
          author: {
            name: this.bot._('c.poke.self', {
              user: msg.author.username,
            }),
            url: poke,
          },
          color: 0xFFA500,
          footer: {
            text: this.bot._('label.weebsh_footer'),
          },
          image: {
            url: poke,
          },
        },
      })
    }
  }
}

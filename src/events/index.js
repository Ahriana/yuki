const axios = require('axios');

/**
 * @param {string} content
 * @param {Guild} guild
 * @param {Member} member
 * @param {string} channelID
 * @returns {string}
 */
function formatGreeting(content, guild, member, channelID) {
  return content
    .replace(/\[GuildName]/g, guild.name)
    .replace(/\[ChannelName]/g, guild.channels.get(channelID).name)
    .replace(/\[ChannelMention]/g, guild.channels.get(channelID).mention)
    .replace(/\[UserName]/g, member.user.username)
    .replace(/\[UserMention]/g, member.user.mention);
}

/**
 *
 * @param {Yuki} bot
 */
async function postGuildCount(bot) {
  if (bot.apiKeys.carbonitex) {
    await submit(
      bot.raven,
      'https://www.carbonitex.net/discord/data/botdata.php',
      {
        'Content-Type': 'application/json',
      },
      {
        key: bot.apiKeys.carbonitex,
        server_count: bot.guilds.size,
      },
    );
  }

  if (bot.apiKeys.botspw) {
    await submit(
      bot.raven,
      `https://bots.discord.pw/api/bots/${bot.user.id}/stats`,
      {
        Authorization: bot.apiKeys.botspw,
        'Content-Type': 'application/json',
      },
      {
        server_count: bot.guilds.size,
      },
    );
  }

  if (bot.apiKeys.discordbotsorg) {
    await submit(
      bot.raven,
      `https://discordbots.org/api/bots/${bot.user.id}/stats`,
      {
        Authorization: bot.apiKeys.discordbotsorg,
        'Content-Type': 'application/json',
      },
      {
        server_count: bot.guilds.size,
      },
    );
  }
}

/**
 *
 * @param {Raven} raven
 * @param {string} url
 * @param {string} auth
 * @param {number} guilds
 */
async function submit(raven, url, headers, data) {
  try {
    await axios({
      method: 'post',
      headers,
      data,
      url,
    });
  } catch (e) {
    if (!e.response) {
      return;
    } else if ([502, 504].includes(e.response.status)) {
      return;
    }

    raven.captureException('guildcount: ', e);
  }
}

async function guildPatronCheck(guild, yukiGuild, roleIds) {
  let someoneHasRole = guild.members.values().some(member => {
    let yukiMember = yukiGuild.members.get(member.id);

    if (!yukiMember) {
      return false;
    }

    for (let roleId of roleIds) {
      if (yukiMember.roles.includes(roleId)) {
        return true;
      }
    }
  });

  if (!someoneHasRole) {
    await guild.leave();
  }
}

module.exports = {
  formatGreeting,
  guildPatronCheck,
  postGuildCount,
};

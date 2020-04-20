const Discord = require(`discord.js`)
const client = new Discord.Client()
client.login(process.env.TOKEN)
var que = [];
var partstart= []
client.on('message', message => {
 if(partstart)
 {
   if(message.content.toLowerCase() == '!part')
   {
    if(que.indexOf(message.author.username) > -1) return message.reply('You are already in the queue!')
    else
    {
      que.push(message.author.username)
      message.reply(`user ${message.author.username} Has been added to the list!`)
    }
   }
   if(message.content.toLowerCase() == '!quit') 
   {
     if(que.indexOf(message.author.username) === -1) return message.reply('You are not in the queue!')
     else 
     {
       que.splice(que.indexOf(message.author.username), 1)
      message.reply(`${message.author.username} Has quit`)
     }    
   }
   if(message.content.toLowerCase() == '!queue')
   {
     let pn = que[0]
     let nxt = que[1]
     let list = new Discord.MessageEmbed()
     let q = ''
     for (let i = 0; i < que.length; i++) 
     { 
      q+= i + ' ' + que[i] + ' ' + '\n'
     }
     list.setTitle(`Preforming now : ${pn}`)
     list.setDescription(`Next Preformer ${nxt}`)
     list.setColor(`RANDOM`)
     list.addField(`Participants : `, `**:** ${q}`)
     if(que.length == 0) return message.channel.send('Queue is empty!')
     message.channel.send(list)
   }
 }
})

client.on(`ready`, () =>
{
   client.user.setActivity(`Serving | Egyptian community`)
})
client.on(`guildMemberAdd`, member => {
     const embed = new Discord.MessageEmbed()
     .setColor(`RANDOM`)
     .setTitle(`Welcome to the server ${member.user.tag}`)
     .setDescription(`Make sure you check #server-rules and enjoy!`)
     .setTimestamp()
     .setThumbnail(member.user.displayAvatarURL)
     .setFooter(`Was serving | ${member.user.tag}`)

     let channel = member.guild.systemChannel
     channel.send(embed)
     let role = member.guild.roles.cache.find(r => r.name === `[ Members ]`)
     member.roles.add(role)
})

function CoinFlip() {
  return (Math.floor(Math.random() *2 ) == 0)?  `Heads`:`Tails`
}
client.on('message', message => {
  if(message.content.toLowerCase() == `!flip`) return message.reply(` It landed on ${CoinFlip()}!`)
  
})
//timer..
let timer = '';
let clock = setInterval(() => {
     timer--;
}, 1000);
client.on('message', message => {
     if(message.content.toLowerCase() == '!tr 90')
     {
     message.channel.send(`Timer has been set to 90s`)
        timer = 90;
        clock = setInterval(() => {
          console.log(timer);
             if(timer == 60) return message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 45) return message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 30) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 15) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 5) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 0){

              message.channel.send({embed: {
               color: `RANDOM`,
               description: "TIME"
             }});

             clearInterval(clock)
            }
        }, 1000);
     }
     if(message.content.toLowerCase() == '!tr 60')
     {
     message.channel.send(`Timer has been set to 60s`)
        timer = 60;
        clock = setInterval(() => {
          console.log(timer);
             if(timer == 45) return message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 30) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 15) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 5) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 0){

              message.channel.send({embed: {
               color: `RANDOM`,
               description: "TIME"
             }});

             clearInterval(clock)
            }
        }, 1000);
     }
     if(message.content.toLowerCase() == '!tr 45')
     {
     message.channel.send(`Timer has been set to 45s`)
        timer = 45;
        clock = setInterval(() => {
          console.log(timer);
             if(timer == 30) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 15) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 5) message.channel.send({embed: {
               color: `RANDOM`,
               description: `${timer}s left`
             }});
             if(timer == 0){

              message.channel.send({embed: {
               color: `RANDOM`,
               description: "TIME"
             }});

             clearInterval(clock)
            }
        }, 1000);
     }
})

client.on('message', message => {

  if(message.author.bot) return
  if (message.content.toLowerCase().startsWith("!purge")) {
      const args = message.content.slice(1).split(" ").slice(1);
      if (!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.reply('Sorry u have no permission!');
      if (isNaN(args[0])) return message.channel.send("Please Provide a number of messages to delete");
      if (!parseInt(args[0]) > 100) return message.reply("Please Provide A number between 1-100");
      message.channel.bulkDelete(parseInt(args[0]))
          .then(messages => message.channel.send(`Deleted \`${messages.size}/${args[0]}\` Messages!`))
          .then(msg => msg.delete(5000))
  }
  if(message.content.startsWith('!addtoall'))
  {
  if(!message.member.hasPermission(['ADMINISTRATOR', 'MANAGE_ROLES'])) return message.reply('You cant do that!')
  let args = message.content.split(` `).splice(1)
  console.log(args)
  let role = message.guild.roles.cache.find(r=> r.name === args.join(' '))
  setInterval(() => {
     message.guild.members.cache.filter(m => !m.user.bot || !m.roles.cache.has(role)).forEach(m => m.roles.add(role))
    if(message.guild.members.cache.has(role)) return
  }, 3000);
  message.reply(`The role ${role} was added to all the members!`)
  }
})

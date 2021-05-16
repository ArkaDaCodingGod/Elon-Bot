const Discord = require("discord.js");
const config = require("./config.json");
const client = new Discord.Client();
const ms = require('ms');
require('dotenv').config();

const prefix = "E!"

client.once('ready', () => {
	console.log('Ready!');
    client.user.setPresence({
        status: 'online',
        activity: {
            type: 'WATCHING',
            name: 'The Muskets!',
        },
    });
});
client.on('guildMemberAdd' , member => {
    const welcomeChannel = bot.channels.cache.find(channel => channel.name === ':hugging:-welcome-:hugging:');
    if (!welcomeChannel) {
        console.log("Make A Welcome Channel!")
    }
})
client.on("message" , function(message){
    const exampleEmbed = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setTitle('Help!')
	.setAuthor('Lost Bot', 'https://cdn.discordapp.com/avatars/828865079487365203/721be8eb9dd34a8b75be38c726c6d5d9.png?size=128', 'https://google.com')
	.setDescription('Categories : \n Admin \n Fun \n Info \n About')
	.setThumbnail('https://images-ext-1.discordapp.net/external/OlSnJhaEvwpdoaDAUBJZM_Bom0RWO2NQUfxNSt1Qf6o/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/820935083791089685/2e50c55ce0a76b4434a6a0f231dc5739.png')
	.addFields(
		{ name: 'Usage : ', value: 'E!help[option] eg : E!help[fun]' },
		{ name: '\u200B', value: '\u200B' },
	)
	.setImage('https://images-ext-1.discordapp.net/external/OlSnJhaEvwpdoaDAUBJZM_Bom0RWO2NQUfxNSt1Qf6o/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/820935083791089685/2e50c55ce0a76b4434a6a0f231dc5739.png')
	.setTimestamp()
	.setFooter('Made By : Epic Bots ', 'https://api.freelogodesign.org/files/ccce58c7f48a4ce1af8649e5397b1414/thumb/logo_200x200.png?v=637565929700000000');
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
     if(command === "help") {
        message.reply(exampleEmbed);
    }
    //Help Commands :)
    else if(command === "help[fun]") {
        message.reply("Under Dev ! Please Wait")
    }
    else if (command === "help[admin]"){
        const adminEmbed = new Discord.MessageEmbed()
            .setColor('000000')
            .setTitle('Admin Commands')
            .setAuthor('Elon' , 'https://images-ext-1.discordapp.net/external/OlSnJhaEvwpdoaDAUBJZM_Bom0RWO2NQUfxNSt1Qf6o/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/820935083791089685/2e50c55ce0a76b4434a6a0f231dc5739.png')
            .setThumbnail('https://images-ext-1.discordapp.net/external/OlSnJhaEvwpdoaDAUBJZM_Bom0RWO2NQUfxNSt1Qf6o/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/820935083791089685/2e50c55ce0a76b4434a6a0f231dc5739.png')
            .addFields(
                { name : 'Admin Commands : ', value : ' ' },
                { name : '\u200B', value : '\u200B'},
                { name : 'E!kick : ' , value : 'Kick User , Usage E!kick @user', inline : true},
                { name : 'E!ban : ' , value : 'Ban User , Usage E!ban @user', inline : true},
                { name : 'E!pardon : ' , value : 'pardon User , Usage E!pardon @user', inline : true},
                { name : 'E!mute : ' , value : 'mute user , Note That This Command Is Temporarily Disabled! ', inline : true},
            )
            
        message.reply()
    }
    //Mod COmmands!
    else if(command === "ban") {
        if (message.member.hasPermission('BAN_MEMBERS')) {
            const userBan = message.mentions.users.first()

            if (userBan) {
                var member = message.guild.member(userBan);
                if (member) {
                    member.ban({
                        reason: 'You Broke The Rules!'
                    }).then(() => {
                        message.reply(`${userBan.tag} was Banned From The Server`)
                    })
                } else {
                    message.reply("That User Is Not In The Server!")
                }
            } else {
                message.reply("You Need To State A User To")
            }
        }
        else {
            message.reply('You Do Not Have The Permision To Ban That User! ')
        }
    } 
    else if(command === "kick") {
        if (message.member.hasPermission('KICK_MEMBERS')) {
            const userKick = message.mentions.users.first()
            if (userKick) {
                var member = message.guild.member(userKick);
                if (member) {
                    member.kick('You Were Kicked For Breaking The Rules!').then(() => {
                        message.reply(`Kicked User ${userKick}!`);
                    }).catch(err => {
                     message.reply("I was unable to kick that user")
                        console.log(err)
                    })
                } else {
                    message.reply("That Member is not in this server!")
                }
            }else {
                message.reply("You need To State The Person You Want To Kick!")
            }
        }
        else {
            message.reply("You Do Not Have The Perms To ")
        }
    }
    else if(command === "pardon") {
        const userPardon = message.mentions.users.first()
        if (userPardon) {
            var member = message.guild.member(userPardon);
            if (member) {
                member.unban().then(() => {
                    message.reply(`Unbanned User ${userPardon}!`);
                }).catch(err => {
                    message.reply("I was unable to unban The User!")
                    console.log(err)
                })
            } else {
                message("Uhhhhhhhhhhh Something Happened? Idk What To Write Here")
            }
        } else {
            message.reply("Please State The Person You Want To Unban!")
        }
    }
    //LevelingUpPartOfTheELon Bot
})
client.login(config.BOT_TOKEN);
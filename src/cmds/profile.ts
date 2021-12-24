import FluorineClient from '@classes/Client';
import canvas from 'canvas';
import { Message, MessageAttachment } from 'discord.js';
export async function run(
    client: FluorineClient,
    message: Message,
    args: string[]
) {
    if (args[0] === 'set') {
        message.reply('not yet');
    }
    canvas.registerFont(`${__dirname}/../../assets/Poppins-Light.ttf`, {
        family: 'Poppins',
        weight: 'light'
    });
    canvas.registerFont(`${__dirname}/../../assets/Poppins-Regular.ttf`, {
        family: 'Poppins',
        weight: 'normal'
    });
    canvas.registerFont(`${__dirname}/../../assets/Poppins-Medium.ttf`, {
        family: 'Poppins',
        weight: 'bold'
    });
    const image = await canvas.loadImage(
        `${__dirname}/../../assets/template.png`
    );
    const avatar = await canvas.loadImage(
        message.author.displayAvatarURL({ format: 'png' })
    );
    const canva = canvas.createCanvas(image.width, image.height);
    const ctx = canva.getContext('2d');
    ctx.drawImage(image, 0, 0);
    ctx.font = 'bold 55px "Poppins"';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(message.author.tag, 170, 83);
    ctx.arc(85, 62, 55, 0, Math.PI * 2, true);
    ctx.clip();
    ctx.drawImage(avatar, 30, 7, 110, 110);
    const attachment = new MessageAttachment(canva.toBuffer(), 'profile.png');
    message.reply({ files: [attachment] });
}
export const help = {
    name: 'profile',
    description: 'Profile użytkownika',
    aliases: [],
    category: 'fun'
};

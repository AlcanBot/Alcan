import FluorineClient from '@classes/Client';
import { CommandInteraction } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';
import { Category } from 'types/applicationCommand';
export async function run(
    client: FluorineClient,
    interaction: CommandInteraction
) {
    const args = interaction.options.getString('start');
    if (args.length > 65) {
        interaction.reply({
            content: client.language.get(interaction.locale, 'AI_TOO_LONG'),
            ephemeral: true
        });
    }
    if (
        client.ai.queue.filter(q => q.object.user.id === interaction.user.id)
            .length !== 0
    ) {
        interaction.reply({
            content: client.language.get(interaction.locale, 'AI_LIMIT'),
            ephemeral: true
        });
    }
    interaction.deferReply();
    const argsbase = Buffer.from(args, 'utf8')
        .toString('base64')
        .replaceAll('/', '_')
        .replaceAll('+', '-');
    client.ai.getAI(interaction, argsbase);
}
export const data = new SlashCommandBuilder()
    .setName('ai')
    .setDescription('Make AI complete your sentence')
    .addStringOption(option =>
        option
            .setName('start')
            .setDescription('Start of the sentence')
            .setRequired(true)
    );
export const category: Category = 'fun';

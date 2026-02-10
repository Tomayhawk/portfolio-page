import { ProjectSection, CodeSnippet } from '../../../components/common/CommonUI.tsx';

export default function Project1() {
    return (
      <>
          <ProjectSection>
              <p>This project demonstrates a Python backend implementation that connects to a Discord Bot API. It showcases specific features of this project, separate from the generic template.</p>
              <p>Additional context about the project can go here. The styling is now handled by the parent template, keeping this file clean and focused purely on content.</p>
          </ProjectSection>

          <ProjectSection title="Implementation Details">
             <p>The following snippet shows the core bot connection logic.</p>
             <CodeSnippet language="python" code={`import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.command()
async def ping(ctx):
    await ctx.send('Pong!')`} />
          </ProjectSection>
      </>
    );
}

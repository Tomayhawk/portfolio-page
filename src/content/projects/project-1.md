This project demonstrates a Python backend implementation that connects to a Discord Bot API.

## Implementation Details

The following snippet shows the core bot connection logic.

```python
import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.command()
async def ping(ctx):
    await ctx.send('Pong!')
```

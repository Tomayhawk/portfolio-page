export default function Project1({ meta }) {
    return (
      <div className="max-w-4xl animate-fadeIn">
        <div className="h-48 w-full bg-gradient-to-r from-blue-500 to-violet-600 rounded-xl mb-8 flex items-end p-6">
            <h1 className="text-4xl font-extrabold text-white tracking-tight drop-shadow-md">{meta.title}</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
                <section>
                    <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">Overview</h2>
                    <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                        This is a page for Project 1. It showcases specific features of this specific project. 
                        It uses Python for the backend and connects to a Discord Bot API.
                        Will update this later.
                    </p>
                </section>
                <section>
                    <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2">Code Snippet</h2>
                    <pre className="bg-zinc-100 dark:bg-[#18181b] p-4 rounded-lg text-sm font-mono overflow-x-auto border border-zinc-200 dark:border-zinc-800">
{`import discord
from discord.ext import commands

bot = commands.Bot(command_prefix='!')

@bot.command()
async def ping(ctx):
    await ctx.send('Pong!')`}
                    </pre>
                </section>
            </div>
            
            <div className="space-y-6">
                <div className="bg-zinc-100 dark:bg-[#18181b] p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <h3 className="font-bold text-sm text-zinc-500 uppercase mb-3">Project Metadata</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-zinc-500">Status</span>
                            <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500">Version</span>
                            <span>v1.0.4</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-zinc-500">License</span>
                            <span>MIT</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-sm text-zinc-500 uppercase mb-3">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {meta.tags.map(t => (
                            <span key={t} className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200 text-xs rounded font-medium">{t}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
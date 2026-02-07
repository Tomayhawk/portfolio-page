export default function Project1() {
    return (
      <div className="space-y-8">
          <section>
              <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-zinc-800 dark:text-zinc-200">Overview</h2>
              <p className="leading-relaxed">
                  This project demonstrates a local voice assistant implementation. It uses Python for the backend processing and specific libraries for wake-word detection. 
                  The goal was to create an offline-first assistant that doesn't rely on cloud APIs for basic system control.
              </p>
          </section>

          <section>
              <h2 className="text-xl font-bold mb-3 border-b border-zinc-200 dark:border-zinc-800 pb-2 text-zinc-800 dark:text-zinc-200">Implementation Details</h2>
              <p className="mb-4">
                  The core loop handles audio stream input and processes it through a custom-trained model.
              </p>
              <pre className="bg-zinc-100 dark:bg-[#18181b] p-4 rounded-lg text-sm font-mono overflow-x-auto border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
{`import speech_recognition as sr

def listen():
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        audio = r.listen(source)
    return audio`}
              </pre>
          </section>
      </div>
    );
}

## 💡 Overview

This project is a modular Python-based toolchain designed to migrate Spotify playlists into a local library of high-quality media files. It solves the problem of archiving streaming music by bridging the gap between Spotify metadata (exported via CSV) and YouTube's vast media library.

The system operates in three distinct stages—**Matching, Downloading, and Converting**—ensuring accuracy through duration checks and efficiency through incremental file handling.

## 🛠️ Tech Stack

* **Language:** Python 3.10+
* **Libraries:** `pandas`, `yt-dlp`
* **External Tools:** FFmpeg (for media conversion/extraction)
* **Data Format:** CSV (Input/Output)

## ✨ Key Features

* **Intelligent Matching:** Uses a "fuzzy match" algorithm that compares track duration with a configurable tolerance (e.g., ±5 seconds) to ensure the YouTube video matches the specific Spotify recording.
* **Incremental Processing:** All scripts include "skip logic." If a song is already matched or a file is already downloaded, the script skips it. This prevents redundant API calls and bandwidth usage.
* **Multi-Format Support:** Capable of downloading direct Audio (MP3) or Video (MP4) depending on the user's archival needs.
* **High-Fidelity Conversion:** Includes a dedicated post-processor that uses FFmpeg to extract 320kbps MP3 audio from high-quality video sources.
* **Anti-Bot Protection:** Implements sleep timers and browser cookie injection (`firefox`) to bypass YouTube's automated bot detection and sign-in walls.

## 🚀 How It Works

The workflow is broken down into three sequential scripts to allow for manual review at each stage.

### Stage 1: The Matcher (`1_match_youtube.py`)
This script ingests a `spotify_playlist.csv` containing Artist, Title, and Duration. It searches YouTube via `yt-dlp` and returns the top 3 results.
* **Logic:** It calculates the absolute difference between the Spotify track length and the YouTube video length.
* **Result:** It appends the best matching URL to the CSV only if it falls within the safety tolerance, tagging it as "Exact" or "Diff".

### Stage 2: The Downloader (`2_download_video.py`)
Reads the `matched_playlist.csv` and initiates downloads using `yt-dlp`.
* **Configuration:** Configured to pull `bestvideo+bestaudio` and merge them into an MP4 container.
* **Sanitization:** Filenames are automatically scrubbed of illegal characters (e.g., `|`, `/`, `?`) to prevent file system errors.

### Stage 3: The Converter (`3_audio_extractor.py`)
A batch processor that iterates through the downloaded video folder.
* **Processing:** Calls `ffmpeg` via Python's `subprocess` module.
* **Command:** `ffmpeg -i input.mp4 -vn -acodec libmp3lame -b:a 320k output.mp3`
* **Outcome:** Produces a clean, metadata-friendly folder of MP3s ready for import into local music players (e.g., Plex, Jellyfin, iTunes).

> **Note:** This project requires a `cookies.txt` file exported from a valid browser session. Without this, YouTube may block the automated requests or age-restrict certain content.

## 💻 Code Highlight: Smart Duration Matching

One of the biggest challenges with YouTube-to-MP3 is downloading "Music Videos" (which often have long intros) instead of the official audio. This snippet ensures we get the correct version:

```python
# Iterates through top results to find the best duration match
for entry in result['entries']:
    vid_duration = entry.get('duration', 0)
    diff = abs(vid_duration - target_duration)

    # 1. Exact Match: Within tolerance (e.g. 5 seconds)
    if diff <= TOLERANCE_SECONDS:
        return entry['webpage_url'], "Match (Exact)"
    
    # 2. Fallback: Track the closest one just in case
    if diff < closest_diff:
        closest_diff = diff
        best_url = entry['webpage_url']
```

## 🧠 Challenges & Learnings

* **YouTube Rate Limiting:** Initially, the script would get IP-banned after ~50 tracks. I solved this by implementing `time.sleep()` intervals and exporting cookies from a real browser session to authenticate requests.
* **FFmpeg Integration:** Handling the subprocess calls for FFmpeg required careful error management to ensure the script didn't crash if a single file was corrupt.
* **Data Persistence:** Using `pandas` to save the CSV every 5 iterations ensured that a crash didn't result in lost progress (a "checkpoint" system).

## 🔮 Future Improvements
* **Metadata Tagging:** Integrate `mutagen` to automatically tag the resulting MP3s with Album Art and Artist info from the original Spotify CSV.
* **GUI:** Build a simple Tkinter or PyQt interface to allow users to select input files without editing the code.

## 📦 Installation & Usage

1. **Install Dependencies:**
```Bash
pip install pandas yt-dlp
# Ensure FFmpeg is installed and added to your system PATH
```
2. **Prepare Data:** Place your `spotify_playlist.csv` in the project root.
3. **Run Pipeline:**
```Bash
python 1_match_youtube.py
python 2_download_video.py
python 3_audio_extractor.py
```

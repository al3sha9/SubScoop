"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import axios from "axios";


export default function GetData() {
  const [url, setUrl] = useState("");
  const [transcript, setTranscript] = useState<string[] | null>(null);
  const [transcriptionAsText, setTranscriptionAsText] = useState<string | null>(
    null
  );
  const [thumbnail, setThumbnail] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string | null>(null);
  const [channelName, setChannelName] = useState<string | null>(null);
  const [views, setViews] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function extractVideoId(url: string): string | null {
    const regex = /(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTranscript(null);
    setTranscriptionAsText(null);
    setThumbnail(null);
    setVideoTitle(null);
    setChannelName(null);
    setViews(null);
    setError(null);
    setLoading(true);
    
    const videoId = extractVideoId(url);
    if (!videoId) {
      setError("Please enter a valid YouTube video URL.");
      setLoading(false);
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_RAPID_API_KEY;
    const apiHost = process.env.NEXT_PUBLIC_RAPID_API_HOST;
    
    if (!apiKey || !apiHost) {
      setError("API configuration is missing. Please check your environment variables.");
      setLoading(false);
      return;
    }

    const options = {
      method: "GET",
      url: "https://youtube-transcriptor.p.rapidapi.com/transcript",
      params: {
        video_id: videoId,
        lang: "en",
      },
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost,
      },
    };
    
    
    try {
      const response = await axios.request(options);
      const dataArray = response.data;
      if (Array.isArray(dataArray) && dataArray.length > 0) {
        const item = dataArray[0];
        setVideoTitle(item.title || null);
        setChannelName(item.channelName || item.channel || null);
        setViews(item.views || null);
        if (
          item.thumbnails &&
          Array.isArray(item.thumbnails) &&
          item.thumbnails.length > 0
        ) {
          setThumbnail(item.thumbnails[item.thumbnails.length - 1].url);
        } else {
          setThumbnail(null);
        }
        if (item.transcriptionAsText) {
          setTranscriptionAsText(item.transcriptionAsText);
          setTranscript(item.transcriptionAsText.split("\n"));
        } else if (
          Array.isArray(item.transcription) &&
          item.transcription.length > 0
        ) {
          const lines = item.transcription.map((seg: any) => seg.subtitle);
          setTranscript(lines);
          setTranscriptionAsText(lines.join("\n"));
        } else {
          setError("No transcript found for this video.");
        }
      } else {
        setError("Unexpected API response format.");
      }
    } catch (err: any) {
      console.error('API Error:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers
      });
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch transcript"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleDownload() {
    if (!transcriptionAsText) return;
    const blob = new Blob([transcriptionAsText], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = videoTitle + ".txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  return (
    <div className="mx-auto md:px-4 py-8 space-y-6">
      <div>
        <form
          className="flex max-w-4xl mx-auto flex-col space-y-4 md:flex-row space-x-2"
          onSubmit={handleSubmit}
        >
          <Input
            type="text"
            placeholder="Enter the YouTube video URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "Loading..." : "Get Transcript"}
          </Button>
        </form>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-between smd:pace-x-2">
        <div className="md:w-2/3">
          {Array.isArray(transcript) && (
            <div className="p-4  md:space-y-2 text-sm">
              {transcript.map((line, idx) => (
                <p key={idx} className="leading-relaxed">
                  {line.split(".").map((sentence, sIdx) => (
                    <span key={sIdx}>
                      {sentence}
                      {sIdx < line.split(".").length - 1 ? ".\n" : ""}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          )}
          {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
        <div className="md:w-1/3 flex flex-col items-center md:space-y-4">
          <div className={`p-3 rounded ${(videoTitle || thumbnail || transcript) ? 'bg-[#191919]' : 'bg-transparent'}`}>
            {(videoTitle || channelName || views) && (
              <span className="my-2 text-xl">{videoTitle}</span>
            )}
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Video thumbnail"
                className="rounded shadow nd:max-w-full mb-2"
              />
            )}
            {transcriptionAsText && (
              <Button onClick={handleDownload} className="w-full" variant="outline">
                Download Transcript
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

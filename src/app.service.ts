import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Wilson!</title>
    <style>
      :root {
        --bg: radial-gradient(1200px 800px at 50% 0%, #e8f0ff, #f7f9ff 35%, #ffffff 70%);
        --fg: #0f172a;
        --muted: #475569;
        --card: #ffffffcc;
        --ring: #93c5fd;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --bg: radial-gradient(1000px 700px at 50% -10%, #0b1220, #0a0f1a 40%, #05070d 75%);
          --fg: #e5e7eb;
          --muted: #94a3b8;
          --card: #0b1220cc;
          --ring: #60a5fa;
        }
      }

      html, body { height: 100%; }
      body {
        margin: 0;
        font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, "Apple Color Emoji", "Segoe UI Emoji";
        color: var(--fg);
        background: var(--bg);
        display: grid;
        place-items: center;
      }

      .card {
        display: grid;
        gap: .5rem;
        place-items: center;
        background: var(--card);
        backdrop-filter: blur(6px);
        -webkit-backdrop-filter: blur(6px);
        padding: 2.25rem 2.75rem;
        border-radius: 1.25rem;
        box-shadow: 0 20px 60px rgba(0,0,0,.15), inset 0 1px 0 rgba(255,255,255,.2);
        border: 1px solid rgba(148,163,184,.25);
        animation: pop .6s cubic-bezier(.2,.7,.3,1.2) 1;
      }

      .emoji {
        font-size: 10rem;
        line-height: 1;
        filter: drop-shadow(0 6px 10px rgba(0,0,0,.15));
        animation: float 3s ease-in-out infinite;
      }

      h1 { 
        font-size: clamp(1.5rem, 2.8vw + .6rem, 2.25rem);
        letter-spacing: .02em;
        text-align: center;
      }

      p {
        margin: 0;
        font-size: 1rem;
        color: var(--muted);
        text-align: center;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-6px); }
      }
      @keyframes pop {
        0% { transform: scale(.98); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      .ring {
        position: relative;
      }
      .ring::after {
        content: "";
        position: absolute;
        inset: -6px;
        border-radius: 1.35rem;
        pointer-events: none;
        box-shadow: 0 0 0 6px color-mix(in oklab, var(--ring) 35%, transparent);
        opacity: .65;
        filter: blur(10px);
      }
    </style>
  </head>
  <body>
    <main class="card ring" role="main" aria-labelledby="wilson-title">
      <div class="emoji" aria-hidden="true">🏐</div>
      <h1 id="wilson-title">Wilson!</h1>
    </main>
  </body>
</html>`;
  }
}

"use client";

import { useState } from "react";
import { MessageCircle, Heart, Send, Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  name: string;
  color: string;
  time: string;
  body: string;
  likes: number;
}

const SEED: Comment[] = [
  {
    id: "c1",
    name: "Nikhil",
    color: "#22D3EE",
    time: "2 days ago",
    body: "This actually worked on the first try. The identity-lock line is the key — thanks for explaining the why, not just the what.",
    likes: 12,
  },
  {
    id: "c2",
    name: "Meera",
    color: "#818CF8",
    time: "1 day ago",
    body: "Been struggling with prompts for weeks. Saved this one. More prompt breakdowns please!",
    likes: 7,
  },
];

function initials(name: string) {
  return name.slice(0, 2).toUpperCase();
}

export function CommentSection() {
  const [comments, setComments] = useState<Comment[]>(SEED);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "sent" | "error">("idle");
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot trap
    if (body.trim().length < 3) {
      setStatus("error");
      return;
    }
    // Optimistic add. Server moderation (pending → approved) lands with the
    // Supabase API; comments will then post to /api/comments for review.
    const newComment: Comment = {
      id: `c${Date.now()}`,
      name: name.trim() || "Guest",
      color: "#38BDF8",
      time: "Just now",
      body: body.trim(),
      likes: 0,
    };
    setComments((c) => [newComment, ...c]);
    setName("");
    setBody("");
    setStatus("sent");
    setTimeout(() => setStatus("idle"), 3500);
  };

  const toggleLike = (id: string) => {
    setLiked((l) => ({ ...l, [id]: !l[id] }));
    setComments((cs) =>
      cs.map((c) =>
        c.id === id ? { ...c, likes: c.likes + (liked[id] ? -1 : 1) } : c,
      ),
    );
  };

  return (
    <section
      aria-labelledby="comments-heading"
      className="mt-12 border-t border-border pt-10"
    >
      <h2
        id="comments-heading"
        className="flex items-center gap-2 font-display text-xl font-semibold text-foreground"
      >
        <MessageCircle className="h-5 w-5 text-brand-sky" aria-hidden="true" />
        Comments
        <span className="text-base font-normal text-faint">
          ({comments.length})
        </span>
      </h2>

      <form onSubmit={submit} className="mt-6" noValidate>
        {/* honeypot: hidden from humans, tempting to bots */}
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          className="absolute left-[-9999px] h-0 w-0 opacity-0"
          aria-hidden="true"
        />

        <div className="mb-3">
          <label htmlFor="c-name" className="sr-only">
            Your name (optional)
          </label>
          <input
            id="c-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            autoComplete="name"
            className="h-11 w-full max-w-xs rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>

        <label htmlFor="c-body" className="sr-only">
          Add a comment
        </label>
        <textarea
          id="c-body"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          placeholder="Share your thoughts…"
          rows={3}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? "c-error" : undefined}
          className="w-full resize-y rounded-lg border border-input bg-background px-3.5 py-3 text-sm leading-relaxed text-foreground placeholder:text-faint focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
        />

        <div className="mt-2 flex items-center justify-between gap-3">
          <div aria-live="polite" className="min-h-[20px] text-xs">
            {status === "error" && (
              <span id="c-error" role="alert" className="inline-flex items-center gap-1 text-error">
                <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Please write at least a few words.
              </span>
            )}
            {status === "sent" && (
              <span className="inline-flex items-center gap-1 text-success">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                Posted — thanks for joining in!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex h-10 shrink-0 items-center gap-2 rounded-lg bg-brand-gradient px-4 text-sm font-medium text-primary-foreground transition-[filter] hover:brightness-110 [touch-action:manipulation]"
          >
            <Send className="h-4 w-4" aria-hidden="true" />
            Post comment
          </button>
        </div>
      </form>

      <ul className="mt-8 space-y-6">
        {comments.map((c) => (
          <li key={c.id} className="flex gap-3">
            <span
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-medium text-background"
              style={{ backgroundColor: c.color }}
              aria-hidden="true"
            >
              {initials(c.name)}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {c.name}
                </span>
                <span className="text-xs text-faint">{c.time}</span>
              </div>
              <p className="mt-1 text-[15px] leading-relaxed text-muted-foreground">
                {c.body}
              </p>
              <button
                type="button"
                onClick={() => toggleLike(c.id)}
                aria-pressed={!!liked[c.id]}
                aria-label={`Like comment by ${c.name}`}
                className={cn(
                  "mt-2 inline-flex items-center gap-1.5 text-xs transition-colors",
                  liked[c.id]
                    ? "text-error"
                    : "text-faint hover:text-foreground",
                )}
              >
                <Heart
                  className={cn("h-3.5 w-3.5", liked[c.id] && "fill-current")}
                  aria-hidden="true"
                />
                <span className="tabular-nums">{c.likes}</span>
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-xs text-faint">
        Comments are moderated before appearing publicly. Be kind and stay on topic.
      </p>
    </section>
  );
}

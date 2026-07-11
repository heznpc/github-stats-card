// Generated from ../../src/endpoints/catalog.js by scripts/sync-catalog.mjs.
// Run `npm run sync:catalog --workspace profilekit-mcp` after catalog changes.

export interface CardEntry {
  description: string;
  required: string[];
  common_params: string[];
}

export const CATALOG: Record<string, CardEntry> = {
  "stats": {
    "description": "GitHub stats — commits, PRs, issues, stars, repos",
    "required": [
      "username"
    ],
    "common_params": [
      "theme",
      "hide",
      "layout",
      "hide_border",
      "font",
      "theme_url",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "languages": {
    "description": "Top languages with bars or donut",
    "required": [
      "username"
    ],
    "common_params": [
      "theme",
      "langs_count",
      "hide",
      "layout",
      "hide_border",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "reviews": {
    "description": "Code review stats",
    "required": [
      "username"
    ],
    "common_params": [
      "theme",
      "hide_border",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "pin": {
    "description": "Repository pin card",
    "required": [
      "username",
      "repo"
    ],
    "common_params": [
      "theme",
      "description",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "leetcode": {
    "description": "LeetCode stats",
    "required": [
      "username"
    ],
    "common_params": [
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "social": {
    "description": "Social links card",
    "required": [],
    "common_params": [
      "github",
      "linkedin",
      "x",
      "email",
      "website",
      "youtube",
      "layout",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "quote": {
    "description": "Random or daily dev quote",
    "required": [],
    "common_params": [
      "daily",
      "width",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "hero": {
    "description": "Wide hero banner with animated background",
    "required": [],
    "common_params": [
      "name",
      "subtitle",
      "bg",
      "theme",
      "color",
      "width",
      "height",
      "align",
      "font",
      "theme_url",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "section": {
    "description": "Section header with underline animation",
    "required": [
      "title"
    ],
    "common_params": [
      "subtitle",
      "align",
      "icon",
      "color",
      "width",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "divider": {
    "description": "Decorative divider (line/wave/dots/dashed/gradient/double)",
    "required": [],
    "common_params": [
      "style",
      "color",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "now": {
    "description": "'Currently' status card with coding/building/learning/reading/listening/watching/playing rows",
    "required": [],
    "common_params": [
      "coding",
      "building",
      "learning",
      "reading",
      "listening",
      "watching",
      "playing",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "timeline": {
    "description": "Vertical timeline. items=when;title;desc|...",
    "required": [
      "items"
    ],
    "common_params": [
      "theme",
      "width",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "tags": {
    "description": "Tag cloud / skill pills. tags=React,TypeScript,Go:00add8",
    "required": [
      "tags"
    ],
    "common_params": [
      "theme",
      "width",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "toc": {
    "description": "Table of contents. items=text;anchor|...",
    "required": [
      "items"
    ],
    "common_params": [
      "theme",
      "width",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "posts": {
    "description": "Latest posts from devto/medium/rss (hashnode source retired 2026-05 — use rss against your Hashnode blog's /rss feed)",
    "required": [
      "source"
    ],
    "common_params": [
      "username",
      "url",
      "count",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "typing": {
    "description": "Typewriter text. lines=first,second,third",
    "required": [
      "lines"
    ],
    "common_params": [
      "font",
      "size",
      "weight",
      "color",
      "speed",
      "pause",
      "cursor",
      "align",
      "width",
      "height",
      "frame",
      "theme",
      "theme_url",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "wave": {
    "description": "Layered animated sin waves",
    "required": [],
    "common_params": [
      "text",
      "color",
      "waves",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "terminal": {
    "description": "Terminal window with auto-typing commands. commands=cmd1,cmd2",
    "required": [
      "commands"
    ],
    "common_params": [
      "prompt",
      "window_title",
      "speed",
      "pause",
      "color",
      "width",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "neon": {
    "description": "Neon glow with flicker",
    "required": [],
    "common_params": [
      "text",
      "color",
      "size",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "glitch": {
    "description": "RGB-split glitch text",
    "required": [],
    "common_params": [
      "text",
      "color",
      "size",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "matrix": {
    "description": "Matrix code rain",
    "required": [],
    "common_params": [
      "text",
      "color",
      "density",
      "speed",
      "seed",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "snake": {
    "description": "Standalone snake eating a contribution grid (animated, no GitHub data)",
    "required": [],
    "common_params": [
      "color",
      "empty_color",
      "cols",
      "rows",
      "cell_size",
      "cell_gap",
      "duration",
      "seed",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "equalizer": {
    "description": "Audio EQ bars",
    "required": [],
    "common_params": [
      "bars",
      "label",
      "color",
      "width",
      "height",
      "seed",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "heartbeat": {
    "description": "EKG heartbeat line",
    "required": [],
    "common_params": [
      "text",
      "bpm",
      "color",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "constellation": {
    "description": "Twinkling stars + connections",
    "required": [],
    "common_params": [
      "text",
      "color",
      "density",
      "seed",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "radar": {
    "description": "Rotating radar sweep with blips",
    "required": [],
    "common_params": [
      "text",
      "color",
      "blips",
      "speed",
      "seed",
      "width",
      "height",
      "theme",
      "theme_url",
      "font",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "stack": {
    "description": "Compose multiple cards into one vertical SVG. cards=hero,section,divider,now",
    "required": [
      "cards"
    ],
    "common_params": [
      "gap",
      "theme",
      "font",
      "theme_url",
      "bg_color",
      "text_color",
      "title_color",
      "icon_color",
      "border_color",
      "accent_color",
      "hide_border",
      "hide_title",
      "hide_bar",
      "border_radius",
      "card_width"
    ]
  },
  "health": {
    "description": "Service health check (diagnostics, version)",
    "required": [],
    "common_params": []
  }
};

export const THEMES: string[] = [
  "dark",
  "dark_dimmed",
  "light",
  "tokyo_night",
  "nord",
  "gruvbox_dark",
  "catppuccin_mocha",
  "catppuccin_latte",
  "dracula",
  "monokai",
  "one_dark",
  "kanagawa",
  "synthwave",
  "solarized_dark",
  "solarized_light",
  "rose_pine",
  "rose_pine_dawn"
];

import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "DC Rainbow Sangha",
  DESCRIPTION: "Welcome to the Rainbow Sangha.",
  AUTHOR: "The Rainbow Bridge",
}

// Resources Page
export const RESOURCES: Page = {
  TITLE: "Resources",
  DESCRIPTION: "All of the resources we have to share with you.",
}

// Forum Page
export const FORUM: Page = {
  TITLE: "Forum",
  DESCRIPTION: "For community discourse.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all resources by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  { 
    TEXT: "Resources", 
    HREF: "/resources", 
  },
  { 
    TEXT: "Forum", 
    HREF: "/forum", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "admin@rainbowsangha.org",
    HREF: "mailto:admin@rainbowsangha.org",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "the-rainbow-bridge",
    HREF: "https://github.com/the-rainbow-bridge/"
  },
]
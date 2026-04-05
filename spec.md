# Happy Birthday Samir!

## Current State
Full-featured chaotic birthday website with:
- Announcement strip
- Hero section with Samir's photo, confetti, floating emojis, party horn, meme stickers, glow, prank button
- Roast section
- Achievements section
- Legend section
- DON'T CLICK THIS surprise section
- Final message with balloons/fireworks
- Footer

## Requested Changes (Diff)

### Add
- New `ElectionHeroSection` component inserted right after the announcement strip (before the existing hero)
- Bold headline: "VOTE FOR SAMIR 🗳️🔥" — dramatic election poster style, tilted, with WebkitTextStroke
- Subtitle: "Future Minister of Fun & Chill Affairs 😂"
- Fake slogan banner: "Sabka Vikas, Samir ke Snacks 🍕" — styled like an Indian political party tagline
- "Birthday Candidate 🎂" badge/symbol pinned over the image area
- Cake icon 🎂 near the image
- Confetti + balloons + political flag emojis (🎈🎏🎌🗳️) in the background
- Crowd cheer text: animated "SAMIR! SAMIR! SAMIR!" repeating marquee strip at the bottom
- Speech bubble near image: "Aaj cake free hai 😎"
- Dramatic sepia/contrast lighting filter on the image via CSS (election poster look)
- Keep existing SamirHeroSection below it

### Modify
- App render order: AnnouncementStrip → ElectionHeroSection (new) → SamirHeroSection (existing) → rest

### Remove
- Nothing removed

## Implementation Plan
1. Write ElectionHeroSection component in App.tsx
2. Add political flag + confetti background elements
3. Add tilted rotating badge "Birthday Candidate 🎂"
4. Style dramatic election-poster lighting on the existing Samir image (sepia+contrast+brightness)
5. Add speech bubble "Aaj cake free hai 😎"
6. Add scrolling crowd cheer marquee "SAMIR! SAMIR! SAMIR!"
7. Mount ElectionHeroSection in render tree between AnnouncementStrip and SamirHeroSection
8. Add required CSS keyframes/animations to index.css if needed

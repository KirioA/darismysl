# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
B2B buyers in Belarus who order New Year gifts in bulk:
- HR and office managers: gifts for employees.
- Trade unions (профсоюзы): sweet gifts for employees' children.
- Marketing and sales teams: gifts for clients and partners.
- Small business owners: they decide themselves and order smaller batches.

Their job is to get the right number of gift sets, on budget, delivered by a fixed date before New Year, with proper paperwork.

## Product Purpose
ДариСмысл (ООО «ДариСмысл», Minsk) assembles gift sets to order and sells them wholesale. It buys sweets, packaging and fillers itself, assembles the sets and ships them across Belarus. The site exists to turn a visitor into a qualified request (quantity, budget, date). Success means a request arrives in Telegram with enough detail to quote.

## Positioning
- Any composition built for the task, not a fixed catalog.
- The full cycle in-house: purchasing, assembly, packing, shipping, with no middlemen.
- Fast quoting and assembly. No published numbers yet.
- Works with companies: contract, bank transfer, closing documents.
- Can print the customer's logo on the packaging.

## Capabilities and Constraints
- Next.js 15 app router, React 19, TypeScript. Static landing page plus /privacy and /consent legal pages.
- The lead form must send to a Telegram bot through a server route. It must keep the Belarus personal-data consent flow (Law No. 99-Z) and its two required consents, including the cross-border transfer consent.
- Company details live in app/company.ts, the single source of truth.
- The minimum order and "price from" exist but must NOT be published yet. Keep them as empty config values that render only when set.
- Delivery across Belarus. Kids' sweet gifts are offered.

## Brand Commitments
- Name ДариСмысл, slogan «Дарим смысл. Собираем праздник.» Russian-language site.
- Existing assets: the knitted pink mascot video with eye-tracking scrub (public/footer-scrub.mp4, app/gaze-frames.json) and the logo (public/logo.svg). The redesign may re-stage them.

## Evidence on Hand
- No client list, reviews, case studies, photos of real sets or price list. Never fabricate any of them.
- Real facts: legal entity, УНП 193961427, address, phone +375 44 590-05-78.

## Product Principles
1. A request in under a minute: ask for quantity, budget and date, and nothing more.
2. Show how it works instead of claiming it.
3. Honest specifics over festive noise.
4. Paperwork confidence for B2B buyers.

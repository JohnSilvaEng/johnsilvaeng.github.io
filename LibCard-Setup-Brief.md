# LibCard Setup Brief for Code

I want to create a personal digital business card using the open-source LibCard project:

https://github.com/crs48/LIBCard

I already have an existing GitHub Pages portfolio at:

https://johnsilvaeng.github.io/

IMPORTANT:
Do not modify, overwrite, move, reconfigure, or otherwise change my existing portfolio repository. It may be inspected as a visual/design reference only.

I want LibCard initially set up as a completely separate local project and GitHub repository called:

card

It is intended eventually to be published at:

https://johnsilvaeng.github.io/card/

Please proceed carefully and incrementally.

1. Inspect the current LibCard repository, its documentation, configuration schema, build process, GitHub Pages deployment method, and supported functionality before making any assumptions.

2. Create or clone LibCard into an appropriate new local development directory. Keep it completely separate from my existing portfolio repository.

3. Inspect `libcard.config.yaml`, `libcard.schema.json`, and any relevant documentation. Then tell me exactly what personal/business information, links, photographs, branding assets, or other information you need from me.

4. Do not invent any of my information. In particular, do not guess:
   - email addresses;
   - phone numbers;
   - company details;
   - job title;
   - LinkedIn or other social URLs;
   - photographs;
   - contact information;
   - branding information.

   Ask me for anything that cannot be established reliably.

5. Configure the project for its intended GitHub Pages location:

   https://johnsilvaeng.github.io/card/

   Pay particular attention to the correct GitHub Pages base path `/card/`.

6. Configure the card so that, where supported by LibCard:
   - it works particularly well on iPhone and other mobile devices;
   - QR sharing is enabled;
   - visitors can save my details as a standard vCard/contact;
   - business-card/presentation mode is enabled;
   - the QR code is easy to present to someone in person;
   - no unnecessary analytics, telemetry, tracking, cookies, or third-party services are enabled.

7. Preserve LibCard's architecture and open-source structure. Do not unnecessarily rewrite or replace the application merely to customise its appearance.

8. Use my existing portfolio at:

   https://johnsilvaeng.github.io/

   as the visual/design reference for the card.

   The goal is for `/card/` to feel like a deliberately designed extension of the same personal identity rather than a generic LibCard installation.

   Inspect the portfolio's visual language, including where relevant:
   - typography;
   - spacing;
   - colour palette;
   - borders;
   - cards/panels;
   - buttons;
   - icon treatment;
   - overall visual hierarchy;
   - restrained engineering/professional aesthetic.

   Reproduce that visual language using LibCard's supported theming/customisation mechanisms wherever practical.

   IMPORTANT: The portfolio repository itself is READ-ONLY for this task. Do not change it.

9. Build and test the LibCard project locally before publishing anything.

10. Verify specifically:
    - production build succeeds;
    - local preview works;
    - GitHub Pages `/card/` base path is correct;
    - CSS/assets resolve correctly from `/card/`;
    - there are no broken internal links;
    - external links work;
    - QR functionality works;
    - vCard generation works;
    - generated contact information is correct;
    - mobile layout works;
    - presentation/business-card mode works;
    - there are no obvious console/build errors;
    - no unexpected analytics or tracking requests are present.

11. Where practical, distinguish between:
    - upstream LibCard files;
    - configuration changes;
    - custom theme/branding changes.

    Keep customisation maintainable so that future LibCard updates are not unnecessarily difficult to incorporate.

12. STOP before:
    - creating a remote GitHub repository;
    - pushing anything to GitHub;
    - enabling GitHub Pages;
    - publishing the card publicly;
    - modifying my existing portfolio.

Before proceeding to publication, give me a concise report containing:

- the local project location;
- the LibCard version/commit used;
- files added or modified;
- configuration choices made;
- any custom visual changes;
- build/test results;
- QR and vCard verification results;
- any limitations or unresolved issues;
- the intended GitHub repository name;
- the intended public URL.

Also show me how to preview the finished card locally.

Do not publish anything until I explicitly approve publication.

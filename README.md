# AquaOps Mockups (static, Vercel-ready)

Interactive HTML mockups, all text in English. Sample data only. Not production code.

- index.html: hub
- planning-calculator.html: Commodity Planning Calculator (#baselines, #calculator, #baseline)
- harvest-economics.html: Harvest Unit Economics & Margin Realization (#list, #record, #show, #economics)
- feed-simulation.html: Feed Simulation Planning (#plans, #plan); opened from the calculator with ?d=<plan data>
- cage-reservations.html: Alert Center, Stocking Setup and Grading Transfer cage checks (#alert-center, #stocking, #transfer)

Base: layout follows DESIGN.md at master 7084747a (23 Nov 2026), not changed.
Data shape checked against staging 8ca8552c (23 Nov 2026). Staging is not a base branch; each page footer lists the feature branches it needs.
CSS copied from the repo: public/assets/vendor/css/core.css, theme-default.css, public/assets/css/demo.css, public/css/aquaops-theme.css, Boxicons.
Shared shell: assets/mock/shell.js (sidebar, navbar, "View as" role switch, IDR format).

Run locally: open index.html, or `npx serve .`
Deploy: `npx vercel --prod` from this folder, or drag the folder into vercel.com/new.

# TexCycle AI — Research Portfolio Website (R26-IT-081)

## Run locally
Open `index.html` in a browser, or from this folder run `python3 -m http.server 8000` and visit http://localhost:8000.

## Structure
index.html, domain.html, components.html, milestones.html, documents.html, presentations.html, about.html, contact.html
css/style.css · js/main.js (navigation, footer, data lists, form) · assets/{images,icons,documents,presentations}/

## Fill in real content (nothing is invented)
Yellow "To be added" boxes mark content that must come from official documents, code or reports. Search for `class="todo"` in the HTML files.
- **Documents:** copy the file to `assets/documents/`, then set `data-file="assets/documents/name.pdf"` on its card in documents.html.
- **Presentations:** same, in `assets/presentations/` and presentations.html.
- **Milestones:** edit the cards in milestones.html.
- **Architecture diagram:** save as `assets/images/architecture.png` — it appears automatically. Screenshots: `assets/images/member1-screenshot.png` … `member4-screenshot.png`.
- **Contact email:** set `groupEmail` in `CONFIG`. The form never claims a message was sent.
- **Team/supervisors:** edit about.html.

## Upload checklist
1. Every file under 20 MB; images compressed (JPG/WebP/PNG-optimised).
2. All `todo` boxes resolved or removed.
3. Click every nav link and document button; confirm each opens a real file.
4. Test at desktop, tablet and phone widths, and with keyboard only (Tab, Enter, Esc).
5. Check the browser console for errors.
6. Upload the whole folder keeping relative paths; open index.html on the host.

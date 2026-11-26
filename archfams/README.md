# ArchFams Building Construction — Website

Homepage for archfams.com, built from the ArchFams design system (ArchFams Blue #1B5375, Steel, Charcoal and Mist; IvyOra Display titles, IvyOra Text body, Montserrat labels).

| Part | File |
| --- | --- |
| Homepage | `index.html` |
| Styles (all colours, type and spacing are tokens at the top) | `assets/css/archfams.css` |
| Menu, process steps, enquiry form | `assets/js/archfams.js` |
| Logos and team illustration | `images/brand/` |
| Project photos | `images/projects/` |

## Before launch

- **Photos:** add the best drone or finished-building photo as `images/projects/hero.jpg` (it fills the hero automatically). Replace the three `[Project name]` cards in `index.html` with real projects and photos.
- **Social links:** swap the Instagram, YouTube and TikTok links in the footer for the real profiles.
- **IvyOra fonts:** add archfams.com to an Adobe Fonts web project and paste its stylesheet link where `index.html` says. Until then titles use Playfair Display.

## Hosting and forms

Hosted on **Namecheap shared hosting** (cPanel), so it can run PHP.

- `api/contact.php` handles the enquiry form. Each enquiry is emailed to info@archfams.com and saved to `private/enquiries.csv` (blocked from the web by `.htaccess`), with a spam trap and a 5-per-hour limit per visitor. If the handler can't be reached, the form opens WhatsApp with the message filled in.
- `.github/workflows/deploy-namecheap.yml` uploads the site over FTPS on every push to `main`, once the `FTP_SERVER`, `FTP_USERNAME` and `FTP_PASSWORD` repository secrets are set.
- Add `SMTP_USER` (a Private Email mailbox such as info@archfams.com) and `SMTP_PASSWORD` secrets so form emails go through Private Email and don't land in spam.

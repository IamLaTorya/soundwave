# Production Smoke Test

> **You fill this in on Day 5, against your LIVE urls.**

Frontend URL: ______________________________________________

API URL: ___________________________________________________

Date run: ____________

| # | Check | Pass |
|---|---|---|
| 1 | `/health` returns `{"status":"ok"}` | |
| 2 | Live site loads over https | |
| 3 | Albums appear | |
| 4 | Network tab → requests go to the API URL, not localhost | |
| 5 | Create an album (appears, no refresh) | |
| 6 | Edit an album (change sticks) | |
| 7 | Search filters the list | |
| 8 | Delete removes the row | |
| 9 | Empty form shows the server's message | |
| 10 | F5 on any view → no 404 | |
| 11 | GitHub repo searched for secrets → zero results | |
| 12 | Browser console → no red errors | |
| 13 | Site opens on your phone | |

## The ephemeral disk check

| # | Check | What happened |
|---|---|---|
| 14 | Add an album, then redeploy, then reload | |

_Explain in one sentence why this happens, and what fixes it:_

# API Test Results

> **You fill this in during Lab 1 (Day 1) and re-run it on Day 4.**
> Record what you ACTUALLY got, not what you expected. If they differ,
> that is a finding, not a mistake to hide.

Date run: ____________     Storage layer: ☐ in-memory  ☐ file

## The 8-step protocol

| # | Request | Expected | Got | Pass |
|---|---|---|---|---|
| 1 | GET /api/albums | 200 + array (count: ___) | | |
| 2 | POST valid body | 201 + object with id | | |
| 3 | GET /api/albums | 200, count +1 | | |
| 4 | GET /api/albums/{id} | 200 + that album | | |
| 5 | PATCH {"year":2001} | 200, title unchanged | | |
| 6 | DELETE /api/albums/{id} | 204, empty body | | |
| 7 | GET /api/albums/{id} | 404 | | |
| 8 | POST {} | 400 + readable message | | |

## Edge cases

| # | Request | Expected | Got | Pass |
|---|---|---|---|---|
| 9 | GET ?artist=Nirvana | 200 + filtered array | | |
| 10 | GET ?artist=Nobody | 200 + `[]` (NOT 404) | | |
| 11 | GET /api/nonsense | 404 + JSON (not HTML) | | |
| 12 | POST {"year":"1991"} | 400 (string, not number) | | |

## Notes

_Anything surprising:_

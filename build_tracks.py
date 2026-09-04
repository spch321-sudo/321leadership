#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build 關鍵詞軌跡 (keyword tracks) — where core 321 terms appear across the 55 chapters,
with a short surrounding snippet, for the 工具 tab's 關鍵詞軌跡 feature."""
import json, re

ZH = json.load(open('/tmp/work/app321/data/data.zh.json', encoding='utf-8'))

KEYWORDS = ["無己", "謙卑", "順服", "屬神體系", "讓耶穌作王", "920", "235", "反敗為勝", "捨己"]

def strip_tags(html):
    return re.sub(r'<[^>]+>', '', html)

def snippet(text, idx, kw, width=42):
    start = max(0, idx - width)
    end = min(len(text), idx + len(kw) + width)
    s = text[start:end]
    if start > 0:
        s = "…" + s
    if end < len(text):
        s = s + "…"
    return s

tracks = {kw: [] for kw in KEYWORDS}

chapter_ids = sorted(ZH['chapters'].keys(), key=lambda c: int(c[2:]))
for cid in chapter_ids:
    ch = ZH['chapters'][cid]
    full_text = strip_tags(ch['intro'])
    for s in ch['sections']:
        full_text += " " + strip_tags(s['html'])
    for kw in KEYWORDS:
        for m in re.finditer(re.escape(kw), full_text):
            tracks[kw].append({
                "chId": cid,
                "chNum": ch['number'],
                "chTitle": ch['title'],
                "partNo": ch['partNo'],
                "snippet": snippet(full_text, m.start(), kw),
            })

# trim to at most first 2 occurrences per chapter per keyword to keep the index readable
trimmed = {}
for kw, occ in tracks.items():
    seen = {}
    out = []
    for o in occ:
        seen.setdefault(o['chId'], 0)
        if seen[o['chId']] < 2:
            out.append(o)
            seen[o['chId']] += 1
    trimmed[kw] = out

summary = {kw: {"totalOccurrences": len(tracks[kw]), "chaptersSpanned": len(set(o['chId'] for o in tracks[kw]))} for kw in KEYWORDS}
print(json.dumps(summary, ensure_ascii=False, indent=2))

json.dump({"keywords": KEYWORDS, "tracks": trimmed}, open('/tmp/work/app321/data/tracks.json', 'w', encoding='utf-8'), ensure_ascii=False)
print("written tracks.json")

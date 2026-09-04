#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Parse deeper_raw.json (439 想更深 items across 55 chapters) and match each
item's 插入位置 label to a chapter section (h2 heading), producing:
  - deeperBank: {id: {q,a,refs,tier,pos}}
  - per-chapter anchor map: {chId: {sectionNo|'intro': [id,...]}}
Writes /tmp/work/app321/data/deeperBank.zh.json and deeper_anchors.json
"""
import json, re, unicodedata

RAW = json.load(open("/tmp/work/app321/scripts/deeper_raw.json", encoding="utf-8"))
ZH = json.load(open("/tmp/work/app321/data/data.zh.json", encoding="utf-8"))

NUM_ZH = ["一","二","三","四","五","六","七","八","九","十"]

def norm(s):
    if not s:
        return ""
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r'[「」『』"\'　\s、，,。.—－\-–:：]', '', s)
    return s

def strip_heading_prefix(h):
    m = re.match(r'^[一二三四五六七八九十]+[、\.]?(.*)$', h)
    return m.group(1) if m else h

def find_chapter_id_by_index(part, idx_in_part):
    """chapters ordered by part*5 offset; idx_in_part is 0-based within the 5 chapters of that part"""
    chnum = (part - 1) * 5 + idx_in_part + 1
    return "ch%02d" % chnum

def match_section(chdata, pos_text):
    """Return section 'no' (int) or 'intro' best matching pos_text."""
    pos = pos_text.replace("插入位置｜", "").replace("插入位置:", "").strip()
    sections = chdata["sections"]

    # 1) quoted text match
    quotes = re.findall(r'「(.*?)」', pos)
    if quotes:
        q = norm(quotes[0])
        best = None
        for s in sections:
            title = norm(strip_heading_prefix(s["heading"]))
            if q and (q in title or title in q):
                best = s["no"]
                break
        if best:
            return best

    # 2) explicit leading Chinese numeral matching a numWord (e.g. "六「活出321」之後" or "六、...")
    m = re.match(r'^([一二三四五六七八九十])[、「]', pos)
    if m:
        for s in sections:
            if s["numWord"] == m.group(1):
                return s["no"]

    # 3) "第X段/題/項" ordinal -> maps to the Nth section in order (only for early free-narrative chapters
    #    where "第一段".."第四段" line up 1:1 with sections 1..4)
    m2 = re.match(r'^第([一二三四五六七八九十])段', pos)
    if m2:
        n = NUM_ZH.index(m2.group(1)) + 1
        if n <= len(sections):
            return sections[n-1]["no"]

    # 4) keyword shortcuts
    kw_map = [
        ("開場", 0),  # before section 1 -> intro anchor handled by caller as 'intro'
        ("三個基礎", 0),
        ("華人處境", 5),
        ("活出321", 6),
        ("三項修正", 6),
        ("四種心", 7),
        ("三個真實", 8),
        ("本週操練", 9),
        ("本週操練與宣告", 9),
        ("小組討論", 10),
    ]
    for kw, secno in kw_map:
        if kw in pos:
            return "intro" if secno == 0 else secno

    return None  # unmatched -> fallback later

deeperBank = {}
anchors = {}  # chId -> {sectionNo(str)|'intro': [id,...]}
unmatched = []

for c in RAW:
    part = c["part"]
    # figure out which of the 5 chapters in this part (order preserved in file)
    pass

# We need index within part; recompute by grouping
by_part = {}
for c in RAW:
    by_part.setdefault(c["part"], []).append(c)

for part, chs in by_part.items():
    for idx, c in enumerate(chs):
        chid = find_chapter_id_by_index(part, idx)
        chdata = ZH["chapters"].get(chid)
        if not chdata:
            print("WARN: no chapter data for", chid)
            continue
        anchors.setdefault(chid, {})
        for i, it in enumerate(c["items"], start=1):
            item_id = "d%s_%02d" % (chid.replace("ch", ""), i)
            sec = match_section(chdata, it["pos"])
            if sec is None:
                unmatched.append((chid, it["pos"]))
                sec = 9  # fallback: attach near 本週操練與宣告 (safe, always exists)
            key = "intro" if sec == "intro" else str(sec)
            anchors[chid].setdefault(key, []).append(item_id)
            deeperBank[item_id] = {
                "q": it["q"],
                "a": it["a"],
                "refs": it["refs"],
                "tier": it["tier"],
                "pos": it["pos"],
            }

print("total deeperBank items:", len(deeperBank))
print("unmatched:", len(unmatched))
for u in unmatched[:30]:
    print("  ", u)

json.dump(deeperBank, open("/tmp/work/app321/data/deeperBank.zh.json", "w", encoding="utf-8"), ensure_ascii=False)
json.dump(anchors, open("/tmp/work/app321/data/deeper_anchors.json", "w", encoding="utf-8"), ensure_ascii=False)
print("written.")

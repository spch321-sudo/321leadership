#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Curate 領導迷思破解 myth-busting cards from the deeperBank — select items
that read as standalone, broadly-applicable misconceptions (favoring core-theology
sections 2/3/6 over illustration-tied sections), spread across all 11 parts."""
import json, re

bank = json.load(open('/tmp/work/app321/data/deeperBank.zh.json', encoding='utf-8'))
anchors = json.load(open('/tmp/work/app321/data/deeper_anchors.json', encoding='utf-8'))
ZH = json.load(open('/tmp/work/app321/data/data.zh.json', encoding='utf-8'))

id2ch = {}
for cid, secmap in anchors.items():
    for sec, ids in secmap.items():
        for i in ids:
            id2ch[i] = (cid, sec)

MYTH_PATTERN = re.compile(r'(是不是|豈不是|會不會|難道|算不算|不就是|不是應該|是否)')
PREFERRED_SECTIONS = {"2", "3", "6"}

def score(iid, it):
    cid, sec = id2ch.get(iid, (None, None))
    s = 0
    if MYTH_PATTERN.search(it['q']):
        s += 3
    if sec in PREFERRED_SECTIONS:
        s += 2
    if it['tier'] == 'A':
        s += 1
    s += max(0, 30 - len(it['q'])) * 0.01  # mild preference for a punchier, shorter question
    return s

by_part = {p: [] for p in range(1, 12)}
for iid, it in bank.items():
    cid, sec = id2ch.get(iid, (None, None))
    if not cid:
        continue
    part = ZH['chapters'][cid]['partNo']
    by_part[part].append((score(iid, it), iid, cid))

myths = []
for part in range(1, 12):
    cands = sorted(by_part[part], key=lambda x: -x[0])[:3]
    for sc, iid, cid in cands:
        it = bank[iid]
        ch = ZH['chapters'][cid]
        myths.append({
            "id": "myth_" + iid,
            "sourceId": iid,
            "chId": cid,
            "chTitle": ch['title'],
            "partNo": part,
            "myth": it['q'],
            "truth": it['a'],
            "refs": it['refs'],
            "tier": it['tier'],
        })

print("total myth cards:", len(myths))
json.dump({"cards": myths}, open('/tmp/work/app321/data/myths.json', 'w', encoding='utf-8'), ensure_ascii=False)
for m in myths[:5]:
    print(m['partNo'], m['chId'], '|', m['myth'][:50])

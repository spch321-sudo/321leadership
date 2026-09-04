#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Merge deeperBank + anchors into data.zh.json / data.zs.json / data.en.json."""
import json

anchors = json.load(open('/tmp/work/app321/data/deeper_anchors.json', encoding='utf-8'))
bank_zh = json.load(open('/tmp/work/app321/data/deeperBank.zh.json', encoding='utf-8'))
bank_zs = json.load(open('/tmp/work/app321/data/deeperBank.zs.json', encoding='utf-8'))

for lang, bank in [('zh', bank_zh), ('zs', bank_zs), ('en', {})]:
    fp = '/tmp/work/app321/data/data.%s.json' % lang
    d = json.load(open(fp, encoding='utf-8'))
    d['deeperBank'] = bank
    for cid, secmap in anchors.items():
        if cid in d['chapters']:
            d['chapters'][cid]['deeper'] = secmap
    json.dump(d, open(fp, 'w', encoding='utf-8'), ensure_ascii=False)
    total_ids = sum(len(v) for v in anchors.values())
    have = sum(1 for cid, secmap in anchors.items() for ids in secmap.values() for i in ids if i in bank)
    print(lang, '-> anchors attached:', total_ids, '| content available:', have)

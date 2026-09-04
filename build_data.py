#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build data.zh.json / data.zs.json / data.en.json for 321領導力 App
from the already-curated webreader/data.json (55 chapters x 3 languages)."""
import json, re, os

SRC = "/tmp/work/webreader/data.json"
OUT_DIR = "/tmp/work/app321/data"

LANG_MAP = {
    "zh": "zh-TW",
    "zs": "zh-CN",
    "en": "en",
}

PART_TITLES = {
    "zh": {
        1: "第一部　僕人領導的根基", 2: "第二部　異象與教會增長", 3: "第三部　危機領導與衝突智慧",
        4: "第四部　教會文化與團隊合一", 5: "第五部　門徒訓練與領袖培育", 6: "第六部　靈性更新與屬靈健康",
        7: "第七部　溝通與教會關係管理", 8: "第八部　財務管理與資源治理", 9: "第九部　科技與教會的現代化",
        10: "第十部　家庭事工與婚姻輔導", 11: "第十一部　全球宣教與教會使命",
    },
}

NUM_ZH = ["一","二","三","四","五","六","七","八","九","十"]

def split_sections(html):
    """Split a chapter's html into: intro (before first h2) + list of {no, num, title, html}."""
    parts = re.split(r'(<h2>.*?</h2>)', html, flags=re.S)
    intro = parts[0].strip()
    sections = []
    i = 1
    while i < len(parts):
        h2 = parts[i]
        m = re.match(r'<h2>(.*?)</h2>', h2, re.S)
        heading = m.group(1).strip() if m else ""
        body = parts[i+1].strip() if i+1 < len(parts) else ""
        # heading like "一、誰都不肯彎腰的那一夜" or "Section One — ..."
        num_word = None
        mm = re.match(r'^([一二三四五六七八九十])[、\.]', heading)
        if mm:
            num_word = mm.group(1)
        sections.append({
            "no": len(sections) + 1,
            "numWord": num_word,
            "heading": heading,
            "html": body,
        })
        i += 2
    return intro, sections

def main():
    d = json.load(open(SRC, encoding="utf-8"))
    os.makedirs(OUT_DIR, exist_ok=True)

    for lang, srckey in LANG_MAP.items():
        block = d[srckey]
        chapters_out = {}
        for cid, ch in block["chapters"].items():
            intro, sections = split_sections(ch["html"])
            part_no = None
            m = re.search(r'\d+', cid)
            chnum = int(m.group()) if m else None
            part_no = ((chnum - 1) // 5) + 1 if chnum else None
            chapters_out[cid] = {
                "id": cid,
                "number": chnum,
                "num": ch.get("num"),
                "numFull": ch.get("num_full"),
                "title": ch.get("title"),
                "partNo": part_no,
                "partTitle": ch.get("part_title"),
                "intro": intro,
                "sections": sections,
                "deeper": {},  # filled later: sectionNo(str) -> [deeperItemId,...], "intro"-> [...]
            }
        parts_meta = []
        for p in d.get("parts_meta", []):
            parts_meta.append(p)

        out = {
            "lang": lang,
            "bookTitle": {
                "zh": "《321建造 教會領導力》",
                "zs": "《321建造 教会领导力》",
                "en": "Building on 321: Church Leadership",
            }[lang],
            "appName": "321領導力" if lang == "zh" else ("321领导力" if lang == "zs" else "321 Leadership"),
            "partsMeta": parts_meta,
            "chapters": chapters_out,
            "deeperBank": {},   # filled later
            "lexicon": {},      # filled later
        }
        fp = os.path.join(OUT_DIR, "data.%s.json" % lang)
        json.dump(out, open(fp, "w", encoding="utf-8"), ensure_ascii=False)
        print(fp, "chapters:", len(chapters_out))

if __name__ == "__main__":
    main()

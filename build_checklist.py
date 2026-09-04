#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Build 教導誠信檢核 (teaching-integrity checklist) — one fixed template
(reused every chapter, since all 55 chapters share the same 10-section architecture)
plus a per-chapter context object so each checklist item can reference the chapter's
own heading/verse, for small-group leaders and preachers to self-check before teaching."""
import json

ZH = json.load(open('/tmp/work/app321/data/data.zh.json', encoding='utf-8'))

TEMPLATE = [
    {
        "id": "c1", "group": "忠於經文",
        "text": "本課引用的每一節經文，我都查考過上下文，確認沒有斷章取義或過度引申。",
    },
    {
        "id": "c2", "group": "忠於經文",
        "text": "「這一課最難的一段」（warn box）我沒有輕輕帶過，也沒有為了安慰人而把它的警語淡化。",
    },
    {
        "id": "c3", "group": "忠於經文",
        "text": "四心診斷（驕傲／恐懼／羞恥／受傷）引用的經文，我核對過是回應那一種心，不是隨意套用金句。",
    },
    {
        "id": "c4", "group": "321術語的使用",
        "text": "我講「無己」時，清楚說明這不是自我否定或心理學上的自我消失，而是讓耶穌作王的生命位置調整。",
    },
    {
        "id": "c5", "group": "321術語的使用",
        "text": "我講「宣告」時，沒有把它講成一種自我暗示或正向思考技巧，而是回應已經成就的真理、憑信心說出。",
    },
    {
        "id": "c6", "group": "321術語的使用",
        "text": "「三個核心的深度開展」中若使用了本課的「想更深？」問答，我核對過每一則的A／B／C層級，沒有把B、C層級的應用性推論當作聖經明文教導來教。",
    },
    {
        "id": "c7", "group": "見證與分享",
        "text": "「三個真實的例子」若替換成本地／本會的真實見證，當事人已同意公開分享，且沒有渲染誇大。",
    },
    {
        "id": "c8", "group": "見證與分享",
        "text": "分享見證或帶「四心」討論時，我預備好在有人觸碰到傷口或眼淚時，先停下陪伴，不急著給答案或引導向下一題。",
    },
    {
        "id": "c9", "group": "小組帶領",
        "text": "十五題討論我依「★★★優先」把關時間，寧可少講幾題，也確保有走到第三化（轉化成為生活），沒有讓討論停在觀念層次。",
    },
    {
        "id": "c10", "group": "小組帶領",
        "text": "標【必做】的繁殖任務，我在聚會中清楚交代，並在下次聚會追蹤是否完成，沒有讓它變成走過場的口號。",
    },
    {
        "id": "c11", "group": "整體誠信",
        "text": "整堂課下來，我引導組員／會眾的焦點回到耶穌，而不是停留在321自身的術語或我個人的教導權威上。",
    },
]

per_chapter = {}
for cid, ch in ZH['chapters'].items():
    headings = [s['heading'] for s in ch['sections']]
    per_chapter[cid] = {
        "chId": cid, "chTitle": ch['title'], "partTitle": ch['partTitle'],
        "sectionHeadings": headings,
    }

json.dump({"template": TEMPLATE, "chapters": per_chapter},
          open('/tmp/work/app321/data/checklist.json', 'w', encoding='utf-8'), ensure_ascii=False)
print("checklist items:", len(TEMPLATE), "| chapters:", len(per_chapter))

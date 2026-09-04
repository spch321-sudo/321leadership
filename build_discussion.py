#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Extract the '十、小組討論分享：三個化' section of every chapter into structured
phase/question data for the 提詞機／小組全螢幕帶領模式 tool."""
import json, re

def strip_tags(s):
    return re.sub(r'<[^>]+>', '', s).strip()

def parse_priority(span_html):
    m = re.search(r'class="s(\d)"', span_html)
    return int(m.group(1)) if m else 1

def parse_section10(html):
    # split into blocks by top-level tags in order
    blocks = re.findall(r'<(h3|p)([^>]*)>(.*?)</\1>', html, re.S)
    phases = []
    cur = None
    cur_h4 = None
    lead_notes = []
    for tag, attrs, content in blocks:
        cls = ""
        m = re.search(r'class="([^"]+)"', attrs)
        if m:
            cls = m.group(1)
        content = content.strip()
        if tag == "h3":
            cur = {"title": strip_tags(content), "notes": [], "questions": []}
            phases.append(cur)
            cur_h4 = None
            continue
        if tag == "p":
            if cls == "note":
                text = strip_tags(content)
                if cur is None:
                    lead_notes.append(text)
                else:
                    cur["notes"].append(text)
            elif cls == "h4":
                cur_h4 = strip_tags(content)
            elif cls == "q":
                # e.g. '15. <span class="s3">★★★</span><span class="must">【必做】</span>'  followed possibly by text, or text may be in a following <p> without class (the "繁殖任務" body)
                mm = re.match(r'^(\d+)\.\s*(<span[^>]*>.*?</span>)(<span class="must">.*?</span>)?\s*(.*)$', content, re.S)
                if mm:
                    no = int(mm.group(1))
                    priority = parse_priority(mm.group(2))
                    must = bool(mm.group(3))
                    text = strip_tags(mm.group(4))
                    if cur is not None:
                        cur["questions"].append({
                            "no": no, "priority": priority, "must": must,
                            "h4": cur_h4, "text": text,
                        })
                else:
                    # fallback: no leading number pattern matched
                    pass
            else:
                # unclassed <p> right after a 'must' question header = its body text (繁殖任務 details)
                text = strip_tags(content)
                if cur is not None and cur["questions"] and text:
                    last = cur["questions"][-1]
                    if last.get("must") and not last["text"]:
                        last["text"] = text
                    elif last.get("must"):
                        last["text"] = (last["text"] + " " + text).strip()
    return lead_notes, phases

ZH = json.load(open('/tmp/work/app321/data/data.zh.json', encoding='utf-8'))
out = {}
total_q = 0
for cid, ch in ZH['chapters'].items():
    s10 = next((s for s in ch['sections'] if s['heading'].startswith('十')), None)
    if not s10:
        print("WARN: no section 十 for", cid)
        continue
    lead_notes, phases = parse_section10(s10['html'])
    qcount = sum(len(p['questions']) for p in phases)
    total_q += qcount
    out[cid] = {"leadNotes": lead_notes, "phases": phases}

print("chapters parsed:", len(out), "| total questions extracted:", total_q, "(expect 55*15=825)")
json.dump(out, open('/tmp/work/app321/data/discussion.json', 'w', encoding='utf-8'), ensure_ascii=False)

# spot check
print(json.dumps(out['ch23'], ensure_ascii=False, indent=1)[:1500])

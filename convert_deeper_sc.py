#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import uno, json

localContext = uno.getComponentContext()
resolver = localContext.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver', localContext)
ctx = resolver.resolve('uno:socket,host=localhost,port=2002;urp;StarOffice.ComponentContext')
smgr = ctx.ServiceManager
tc = smgr.createInstanceWithContext('com.sun.star.i18n.TextConversion', ctx)
from com.sun.star.lang import Locale
loc = Locale('zh', 'TW', '')

PLACEHOLDER = '\x01ZHE1\x01'
PAD = '\x02\x02\x02\x02'

def convert(text):
    if not text:
        return text
    protected = text.replace('祂', PLACEHOLDER) + PAD
    out = tc.getConversion(protected, 0, len(protected), loc, 3, 1)
    out = out.split('\x02')[0]
    out = out.replace(PLACEHOLDER, '祂')
    return out

bank = json.load(open('/tmp/work/app321/data/deeperBank.zh.json', encoding='utf-8'))
out = {}
for k, it in bank.items():
    q2 = convert(it['q'])
    a2 = convert(it['a'])
    refs2 = convert(it['refs'])
    assert len(q2) == len(it['q']), f'{k} q length mismatch'
    assert len(a2) == len(it['a']), f'{k} a length mismatch'
    out[k] = {
        'q': q2, 'a': a2, 'refs': refs2, 'tier': it['tier'], 'pos': convert(it['pos']),
    }

json.dump(out, open('/tmp/work/app321/data/deeperBank.zs.json', 'w', encoding='utf-8'), ensure_ascii=False)
print('converted', len(out), 'items to SC, length-verified.')

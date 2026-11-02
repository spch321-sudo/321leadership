/* 321領導力 · 一起共讀（帶領者開房間，加入者的畫面跟著翻到同一頁、同一捲動位置）
   連線：peerjs.min.js（相容 PeerJS 介面的精簡層，走 Cloudflare Worker 中繼站，各 App 房間互不相通）。
   只同步「在哪個畫面」「捲到哪」「點了哪一句」；個人資料、學習紀錄、授權狀態絕不傳送，每個人保留自己的語言與授權。
   ES5。 */
(function () {
  'use strict';
  var A = {
    pfx: 'ls321-',
    nm: { zh: '321領導力', zs: '321领导力', en: '321 Leadership' },
    vars: '--crb:var(--accent,#0D3988);--crc:var(--surface,#fff);--cri:var(--ink,#222);--crl:var(--border,#ddd);--crm:var(--ink-soft,#666);--crg:var(--gold,#A9762F)',
    lang: function () { try { return window.L321.state.lang; } catch (e) { return 'zh'; } },
    ready: function () {
      try { var s = window.L321.state; return !!(s && s.data && s.data[s.lang]) && !document.getElementById('boot'); } catch (e) { return false; }
    },
    /* 只同步：今日、課程目錄、章節閱讀、工具目錄、旅程地圖／迷思／關鍵詞軌跡；
       不同步：陪讀（小智對話）、我的、教導誠信檢核（個人勾選）、提詞機全螢幕、各種浮層 */
    page: function () {
      if (document.querySelector('.gxsmask.on,#gxuBox.on,#gxuPanel.on,#k3mSheet.on,.hlsheet-mask')) return null;
      var pr = document.getElementById('prompter'); if (pr && !pr.hidden) return null;
      var p = (location.hash || '#/today').replace(/^#\//, '').split('/').filter(Boolean);
      if (!p.length) p = ['today'];
      if (p[0] === 'today' && p.length === 1) return { h: 'today' };
      if (p[0] === 'course' && p.length === 1) return { h: 'course' };
      if (p[0] === 'course' && p.length === 2) return { h: 'course/' + p[1] };
      if (p[0] === 'tools' && p.length === 1) return { h: 'tools' };
      if (p[0] === 'tools' && p.length === 2 && (p[1] === 'journey' || p[1] === 'myths' || p[1] === 'tracks')) return { h: 'tools/' + p[1] };
      return null;
    },
    key: function (p) { return p.h; },
    go: function (p) {
      var m = /^course\/(.+)$/.exec(p.h);
      if (m) { try { var s = window.L321.state; if (!s.data[s.lang].chapters[m[1]]) return false; } catch (e) { return false; } }
      var want = '#/' + p.h;
      if (location.hash !== want) location.hash = want;
      else if (typeof window.L321_render === 'function') window.L321_render();
    },
    /* 點句：章節文字的 .sent（data-sec／data-pidx／data-idx）；不同語言的句數不同時按比例對應 */
    ptOf: function (t) {
      var n = t; while (n && n !== document && !(n.className && String(n.className).indexOf('sent') >= 0 && n.getAttribute && n.getAttribute('data-sec'))) n = n.parentNode;
      if (!n || n === document || !document.querySelector('.reader') || !document.querySelector('.reader').contains(n)) return null;
      var sec = n.getAttribute('data-sec'), pi = n.getAttribute('data-pidx');
      return { s: sec, p: +pi, i: +n.getAttribute('data-idx'), k: document.querySelectorAll('.reader .sent[data-sec="' + sec + '"][data-pidx="' + pi + '"]').length };
    },
    ptFind: function (d) {
      var l = document.querySelectorAll('.reader .sent[data-sec="' + String(d.s).replace(/"/g, '') + '"][data-pidx="' + (+d.p) + '"]');
      if (!l.length) return null;
      var e = (l.length === d.k) ? l[Math.min(d.i, l.length - 1)] : l[Math.min(l.length - 1, Math.round(d.k > 1 ? d.i / (d.k - 1) * (l.length - 1) : 0))];
      return (e && e.offsetParent !== null) ? e : null;
    },
    mountTop: function (b) {
      var h = document.querySelector('header.topbar'); if (!h) return false;
      h.insertBefore(b, document.getElementById('langswitch') || null);
    },
    /* 主內容容器 #view 每次換畫面都會整個重畫（childList） */
    hook: function (cb) {
      var v = document.getElementById('view'); if (!v || !window.MutationObserver) return;
      var t = null;
      new MutationObserver(function () { clearTimeout(t); t = setTimeout(cb, 150); }).observe(v, { childList: true });
    }
};

  var PFX = A.pfx, SKEY = 'cr_' + PFX, FOLLOW_COOL = 8000;
  var VQ = ''; try { var cs0 = document.currentScript; var mv = cs0 && /[?&]v=([^&]+)/.exec(cs0.src); VQ = mv ? mv[1] : ''; } catch (e0) { }
  var PEER_JS = ['peerjs.min.js' + (VQ ? '?v=' + VQ : '')];
  var QR_JS = ['https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js', 'https://unpkg.com/qrcode-generator@1.4.4/qrcode.js', 'https://cdnjs.cloudflare.com/ajax/libs/qrcode-generator/1.4.4/qrcode.min.js'];

  var TX = {
    zh: { title: '一起共讀', desc: '開一個共讀房間，把共讀碼或連結傳給弟兄姊妹。他們打開後，畫面會跟著你翻到同一頁、同一個位置；你捲動或點一句，大家的畫面也跟著動。個人資料不會被分享。', host: '開共讀房間（我來帶領）', join: '加入', codePH: '輸入 6 位數共讀碼', orJoin: '或加入別人的共讀', asScr: '作為投影螢幕（大字、無按鈕）', code: '共讀碼', people: '已有 {0} 人加入', waiting: '等待弟兄姊妹加入…', invite: '傳送邀請', copyLink: '複製連結', copied: '已複製', scrT: '🖥 投影螢幕', scrD: '在連接投影機或電視的電腦／平板瀏覽器打開投影連結，畫面會變成大字、沒有按鈕、自動跟著你翻頁。', scrB: '複製投影連結', end: '結束共讀', leave: '離開共讀', close: '關閉', inviteMsg: '📡 一起來共讀《{2}》！\n點連結加入：{0}\n或打開 App 按右上角「📡」輸入共讀碼：{1}', following: '跟著帶領共讀', paused: '你自己捲動了 · 點這裡回到帶領者', free: '你在自己瀏覽 · 點這裡回到帶領者', noSync: '帶領者在其他頁面（此頁不同步）', noAuth: '這一頁需要你自己的授權，未開通所以不跟隨', connecting: '連線中…', hostChip: '共讀 {0} · {1} 人', hostNp: '此頁不同步', ended: '共讀已結束', joined: '已加入共讀，畫面會跟著帶領者', loadErr: '共讀功能載入失敗，請確認網路後再試', badCode: '請輸入 6 位數共讀碼', notFound: '找不到這個共讀房間，請確認共讀碼，或請帶領者重新開房間', followOnly: '你正在跟著共讀', back2: '回到帶領者', tip: '提示：帶領者請保持 App 開著、螢幕不要關，大家才會一直同步。', qrTip: '用手機相機掃描加入', joinedOne: '有一位弟兄姊妹加入共讀', hostLeft: '帶領者暫時離線，正在重新連線…' },
    zs: { title: '一起共读', desc: '开一个共读房间，把共读码或链接传给弟兄姊妹。他们打开后，画面会跟着你翻到同一页、同一个位置；你滚动或点一句，大家的画面也跟着动。个人资料不会被分享。', host: '开共读房间（我来带领）', join: '加入', codePH: '输入 6 位数共读码', orJoin: '或加入别人的共读', asScr: '作为投影荧幕（大字、无按钮）', code: '共读码', people: '已有 {0} 人加入', waiting: '等待弟兄姊妹加入…', invite: '发送邀请', copyLink: '复制链接', copied: '已复制', scrT: '🖥 投影荧幕', scrD: '在连接投影机或电视的电脑／平板浏览器打开投影链接，画面会变成大字、没有按钮、自动跟着你翻页。', scrB: '复制投影链接', end: '结束共读', leave: '离开共读', close: '关闭', inviteMsg: '📡 一起来共读《{2}》！\n点链接加入：{0}\n或打开 App 按右上角「📡」输入共读码：{1}', following: '跟着带领共读', paused: '你自己滚动了 · 点这里回到带领者', free: '你在自己浏览 · 点这里回到带领者', noSync: '带领者在其他页面（此页不同步）', noAuth: '这一页需要你自己的授权，未开通所以不跟随', connecting: '连线中…', hostChip: '共读 {0} · {1} 人', hostNp: '此页不同步', ended: '共读已结束', joined: '已加入共读，画面会跟着带领者', loadErr: '共读功能载入失败，请确认网络后再试', badCode: '请输入 6 位数共读码', notFound: '找不到这个共读房间，请确认共读码，或请带领者重新开房间', followOnly: '你正在跟着共读', back2: '回到带领者', tip: '提示：带领者请保持 App 开着、屏幕不要关，大家才会一直同步。', qrTip: '用手机相机扫描加入', joinedOne: '有一位弟兄姊妹加入共读', hostLeft: '带领者暂时离线，正在重新连线…' },
    en: { title: 'Read together', desc: 'Open a reading room and send the room code or link to others. When they open it, their screens follow you to the same page and position; when you scroll or tap a sentence, theirs moves too. Personal data is never shared.', host: 'Open a room (I’ll lead)', join: 'Join', codePH: 'Enter the 6-digit room code', orJoin: 'Or join someone else’s room', asScr: 'Join as a projector screen (big text, no buttons)', code: 'Room code', people: '{0} joined', waiting: 'Waiting for others to join…', invite: 'Send invite', copyLink: 'Copy link', copied: 'Copied', scrT: '🖥 Projector screen', scrD: 'Open the projector link in the browser of the computer or tablet connected to the projector or TV: it becomes a big-text screen with no buttons that follows you page by page.', scrB: 'Copy projector link', end: 'End session', leave: 'Leave', close: 'Close', inviteMsg: '📡 Come read “{2}” together!\nTap to join: {0}\nOr open the app, tap “📡” at the top right and enter code {1}', following: 'Following the leader', paused: 'You scrolled · tap to return to the leader', free: 'You’re browsing on your own · tap to return to the leader', noSync: 'The leader is on another page (not synced)', noAuth: 'This page needs your own access, which is not unlocked, so it is not followed', connecting: 'Connecting…', hostChip: 'Room {0} · {1}', hostNp: 'This page is not synced', ended: 'Reading session ended', joined: 'Joined — your screen will follow the leader', loadErr: 'Could not load reading-together. Check your connection and try again.', badCode: 'Please enter the 6-digit room code', notFound: 'Room not found. Check the code, or ask the leader to open a new room.', followOnly: 'You are following', back2: 'Back to leader', tip: 'Tip: the leader should keep the app open with the screen on so everyone stays in sync.', qrTip: 'Scan with a phone camera to join', joinedOne: 'Someone joined the room', hostLeft: 'The leader is offline for a moment — reconnecting…' }
  };
  function LG() { var l = 'zh'; try { l = A.lang() || 'zh'; } catch (e) { } return TX[l] ? l : 'zh'; }
  function X(k) {
    var l = LG(), s = (TX[l] && TX[l][k]) || TX.zh[k] || k;
    for (var i = 1; i < arguments.length; i++) s = s.split('{' + (i - 1) + '}').join(arguments[i]);
    return s;
  }
  function appName() { return (A.nm && (A.nm[LG()] || A.nm.zh)) || ''; }
  function E(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function ss(k, v) { try { if (v === undefined) return JSON.parse(sessionStorage.getItem(k) || 'null'); if (v === null) sessionStorage.removeItem(k); else sessionStorage.setItem(k, JSON.stringify(v)); } catch (e) { } return null; }
  function $id(i) { return document.getElementById(i); }

  /* ---------- 網址參數：?join=碼[&screen=1] ---------- */
  var URLJ = null;
  (function () {
    try {
      var q = location.search || '', mj = /[?&]join=(\d{6})(?!\d)/.exec(q), sc = /[?&]screen=1(?!\d)/.test(q);
      if (sc) window.CR_SCREEN = true;
      if (mj) {
        URLJ = { c: mj[1], s: sc ? 1 : 0 };
        var kept = [], parts = q.replace(/^\?/, '').split('&');
        for (var i = 0; i < parts.length; i++) if (parts[i] && !/^(join|screen)=/.test(parts[i])) kept.push(parts[i]);
        try { history.replaceState(null, '', location.pathname + (kept.length ? '?' + kept.join('&') : '') + location.hash); } catch (e1) { }
      }
    } catch (e) { }
  })();

  /* ---------- 小工具 ---------- */
  function toast(m) {
    try {
      var o = document.querySelector('.crtoast'); if (o && o.parentNode) o.parentNode.removeChild(o);
      var d = document.createElement('div'); d.className = 'crtoast'; d.textContent = m; document.body.appendChild(d);
      setTimeout(function () { if (d.parentNode) d.parentNode.removeChild(d); }, 2400);
    } catch (e) { }
  }
  function copyText(t, ok) {
    function done() { toast(ok || X('copied')); }
    function fb() { try { var a = document.createElement('textarea'); a.value = t; a.style.position = 'fixed'; a.style.opacity = '0'; document.body.appendChild(a); a.select(); document.execCommand('copy'); document.body.removeChild(a); done(); } catch (e) { try { window.prompt('', t); } catch (e2) { } } }
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(done, fb); else fb(); } catch (e) { fb(); }
  }
  function shareText(t) {
    try { if (navigator.share) { navigator.share({ text: t })['catch'](function () { }); return; } } catch (e) { }
    copyText(t);
  }
  function appUrl() { return location.origin + location.pathname; }
  var loaded = {};
  function loadJs(urls, test, cb) {
    if (test()) { cb(true); return; } var i = 0;
    (function nx() {
      if (i >= urls.length) { cb(false); return; } var u = urls[i++];
      if (loaded[u]) { setTimeout(function () { cb(test()); }, 0); return; }
      var s = document.createElement('script'); s.src = u; s.async = true;
      s.onload = function () { loaded[u] = 1; if (test()) cb(true); else nx(); }; s.onerror = function () { nx(); };
      document.head.appendChild(s);
    })();
  }
  function maxScroll() { var d = document.documentElement; return Math.max(0, Math.max(d.scrollHeight, document.body ? document.body.scrollHeight : 0) - (window.innerHeight || d.clientHeight || 600)); }
  function scrollTo_(top, smooth) {
    try { if (smooth) window.scrollTo({ top: top, behavior: 'smooth' }); else window.scrollTo(0, top); } catch (e) { window.scrollTo(0, top); }
  }

  /* ---------- CSS ---------- */
  (function () {
    var st = document.createElement('style'); st.id = 'crcss';
    st.textContent =
      ':root{' + A.vars + '}' +
      '.crTop{flex:none;border:0;border-radius:99px;background:rgba(127,127,127,.18);color:inherit;font-size:16px;line-height:1;padding:6px 9px;margin:0 2px;cursor:pointer;position:relative}' +
      '.crTop.on{background:var(--crg);color:#fff}' +
      '.crchip{position:fixed;right:10px;top:calc(60px + env(safe-area-inset-top));z-index:1000001;border:0;border-radius:999px;padding:7px 14px 7px 10px;font:inherit;font-size:13px;background:var(--crb);color:#fff;box-shadow:0 6px 18px rgba(0,0,0,.25);max-width:80vw;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;cursor:pointer}' +
      '.crchip .dot{display:inline-block;width:8px;height:8px;border-radius:50%;background:#5BD38A;margin-right:6px;vertical-align:1px;animation:crpulse 1.6s infinite}' +
      '.crchip.wait .dot{background:#F2C14E}.crchip.off{background:var(--crg)}.crchip.off .dot{background:#fff;animation:none}' +
      '@keyframes crpulse{0%,100%{opacity:1}50%{opacity:.35}}' +
      '.crmask{position:fixed;left:0;right:0;top:0;bottom:0;background:rgba(0,0,0,.42);z-index:1000002;display:flex;align-items:flex-end}' +
      '.crsheet{background:var(--crc);color:var(--cri);width:100%;max-width:560px;margin:0 auto;max-height:88vh;overflow-y:auto;border-radius:20px 20px 0 0;padding:18px 18px calc(18px + env(safe-area-inset-bottom));box-sizing:border-box;font-size:15px;line-height:1.6}' +
      '.crsheet *{box-sizing:border-box}' +
      '.cr-h{font-weight:700;font-size:17px;margin-bottom:10px}' +
      '.cr-k{font-size:13px;color:var(--crm);text-align:center;margin-top:6px}' +
      '.cr-code{font-size:36px;font-weight:800;letter-spacing:.12em;text-align:center;color:var(--crb);margin:2px 0 8px;font-variant-numeric:tabular-nums}' +
      '.cr-qr{display:flex;justify-content:center;margin:4px 0;min-height:0}.cr-qr img{width:176px;height:176px;image-rendering:pixelated;background:#fff;border-radius:10px;padding:4px}' +
      '.cr-s{font-size:12.5px;color:var(--crm);text-align:center;line-height:1.55}' +
      '.cr-count{text-align:center;font-weight:700;margin:10px 0 4px}' +
      '.cr-acts{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:10px}' +
      '.cr-btn{font:inherit;font-size:15px;border:1px solid var(--crl);background:var(--crc);color:var(--cri);border-radius:12px;padding:9px 14px;cursor:pointer}' +
      '.cr-btn.pri{background:var(--crb);color:#fff;border-color:var(--crb)}.cr-btn.blk{display:block;width:100%;margin-top:8px}' +
      '.cr-join{display:flex;gap:8px;margin-top:6px}.cr-join input[type=tel]{flex:1;min-width:0;font:inherit;font-size:18px;letter-spacing:.1em;padding:10px 12px;border:1px solid var(--crl);border-radius:12px;background:var(--crc);color:var(--cri);text-align:center}' +
      '.cr-chk{display:flex;gap:8px;align-items:center;font-size:13.5px;color:var(--crm);margin-top:8px}' +
      '.cr-scr{margin-top:12px;padding-top:10px;border-top:1px dashed var(--crl);text-align:left}.cr-scr b{font-size:14px}' +
      '.cr-pt{outline:3px solid var(--crg);outline-offset:1px;border-radius:4px;background:rgba(201,150,43,.2);animation:crpt 1.3s ease-in-out 3}' +
      '@keyframes crpt{0%,100%{background:rgba(201,150,43,.2)}50%{background:rgba(201,150,43,.45)}}' +
      '.crtoast{position:fixed;left:50%;bottom:calc(92px + env(safe-area-inset-bottom));transform:translateX(-50%);background:rgba(20,24,30,.92);color:#fff;padding:9px 16px;border-radius:99px;font-size:14px;z-index:1000003;max-width:86vw;text-align:center;pointer-events:none}';
    (document.head || document.documentElement).appendChild(st);
  })();

  /* ---------- 狀態 ---------- */
  var C = { role: '', code: '', peer: null, conns: [], host: null, last: null, retry: 0, rt: null, manualAt: 0, status: '', want: null, hostKey: '', free: false, hostNp: false, denied: false, pend: false, justNav: false, pt: null, lastKey: '', ptSeen: '', ptEl: null, lastRx: 0, first: false, misses: 0, tries: 0, scr: false };
  function joinUrl(code) { return appUrl() + '?join=' + code; }
  function newCode() { var c = ''; for (var i = 0; i < 6; i++) c += Math.floor(Math.random() * 10); return c.charAt(0) === '0' ? '1' + c.slice(1) : c; }
  function live() { var o = []; for (var i = 0; i < C.conns.length; i++) if (C.conns[i].open) o.push(C.conns[i]); return o; }

  /* ---------- 帶領者 ---------- */
  function mk() {
    var pg = null; try { pg = A.page(); } catch (e) { }
    var o = { ts: Date.now() };
    if (!pg) { o.np = 1; C.lastKey = ''; return o; }
    var k = A.key(pg); if (k !== C.lastKey) { C.lastKey = k; C.pt = null; }
    o.pg = pg; var mx = maxScroll(), y = window.pageYOffset || 0;
    o.f = mx > 0 && y > 12 ? Math.round(Math.min(1, y / mx) * 1000) / 1000 : 0;
    if (C.pt) o.pt = C.pt;
    return o;
  }
  function snap() {
    if (C.role !== 'host') return; var m = mk(); m.t = 'st'; C.last = m;
    var cs = live(); for (var i = 0; i < cs.length; i++) try { cs[i].send(m); } catch (e) { }
    chip();
  }
  function host(code, quiet) {
    loadJs(PEER_JS, function () { return !!window.Peer; }, function (ok) {
      if (!ok) { toast(X('loadErr')); return; }
      teardown(); C.role = 'host'; C.code = code || newCode(); C.status = 'connecting'; ss(SKEY, { r: 'host', c: C.code }); chip(); paintTop();
      var p = C.peer = new Peer(PFX + C.code, { debug: 0 });
      p.on('open', function () { C.retry = 0; C.status = 'ok'; chip(); if (!quiet) sheet(); snap(); });
      p.on('connection', function (c) {
        C.conns.push(c);
        c.on('open', function () { chip(); toast(X('joinedOne')); paintCount(); if (C.last) try { c.send(C.last); } catch (e) { } });
        c.on('close', function () { drop(c); }); c.on('error', function () { drop(c); });
      });
      p.on('disconnected', function () { if (C.role === 'host' && !p.destroyed) setTimeout(function () { try { p.reconnect(); } catch (e) { } }, 1500); });
      p.on('error', function (e) {
        if (C.role !== 'host') return;
        if (e && e.type === 'unavailable-id') { if (C.retry++ < 25) { C.status = 'connecting'; chip(); clearTimeout(C.rt); C.rt = setTimeout(function () { host(C.code, true); }, 3000); } else { toast(X('loadErr')); end(); } return; }
        if (e && (e.type === 'network' || e.type === 'server-error' || e.type === 'socket-error' || e.type === 'socket-closed')) { clearTimeout(C.rt); C.rt = setTimeout(function () { if (C.role === 'host') host(C.code, true); }, 4000); }
      });
    });
  }
  function drop(c) { var o = []; for (var i = 0; i < C.conns.length; i++) if (C.conns[i] !== c) o.push(C.conns[i]); C.conns = o; chip(); paintCount(); }

  var scT = null;
  window.addEventListener('scroll', function () {
    if (C.role !== 'host' || scT) return;
    scT = setTimeout(function () { scT = null; snap(); }, 220);
  }, { passive: true });
  document.addEventListener('toggle', function () { if (C.role === 'host') { clearTimeout(C.tg); C.tg = setTimeout(snap, 150); } }, true);
  document.addEventListener('click', function (e) {
    if (C.role !== 'host' || !A.ptOf) return;
    var d = null; try { d = A.ptOf(e.target); } catch (x) { }
    if (d) { C.pt = d; setTimeout(snap, 30); }
  }, true);

  /* ---------- 跟隨者 ---------- */
  function userMove() { if (C.role === 'follow') { C.manualAt = Date.now(); chip(); } }
  window.addEventListener('touchmove', userMove, { passive: true });
  window.addEventListener('wheel', userMove, { passive: true });
  document.addEventListener('keydown', function (e) { var k = e.keyCode; if (k === 32 || (k >= 33 && k <= 40)) userMove(); }, false);

  function join(code, scr) {
    code = String(code || '').replace(/\D/g, ''); if (code.length !== 6) { toast(X('badCode')); return; }
    if (scr) window.CR_SCREEN = true;
    loadJs(PEER_JS, function () { return !!window.Peer; }, function (ok) {
      if (!ok) { toast(X('loadErr')); return; }
      teardown(); C.role = 'follow'; C.code = code; C.status = 'connecting'; C.first = true; C.misses = 0; C.hostKey = ''; C.free = false; C.denied = false;
      ss(SKEY, { r: 'follow', c: code, s: window.CR_SCREEN ? 1 : 0 }); chip(); paintTop(); closeSheet();
      var p = C.peer = new Peer({ debug: 0 });
      p.on('open', function () { dial(); });
      p.on('disconnected', function () { if (C.role === 'follow' && !p.destroyed) setTimeout(function () { try { p.reconnect(); } catch (e) { } }, 1500); });
      p.on('error', function (e) {
        if (C.role !== 'follow') return;
        if (e && e.type === 'peer-unavailable') { C.misses++; if (C.first && C.misses >= 3) { toast(X('notFound')); leave(true); return; } C.status = 'connecting'; chip(); redial(4000); return; }
        redial(4000);
      });
    });
  }
  function redial(ms) { clearTimeout(C.rt); C.rt = setTimeout(function () { if (C.role === 'follow') dial(); }, ms || 3000); }
  function dial() {
    var p = C.peer; if (!p || p.destroyed || C.role !== 'follow') return;
    if (p.disconnected) { try { p.reconnect(); } catch (e) { } redial(3000); return; }
    try { if (C.host) C.host.close(); } catch (e) { }
    var c = C.host = p.connect(PFX + C.code, { reliable: true });
    var to = setTimeout(function () { if (!c.open && C.role === 'follow' && C.host === c) { try { c.close(); } catch (e) { } redial(1000); } }, 12000);
    c.on('open', function () { clearTimeout(to); C.misses = 0; C.lastRx = Date.now(); C.status = 'ok'; if (C.first) { C.first = false; toast(X('joined')); } chip(); });
    c.on('data', function (m) { C.lastRx = Date.now(); if (C.status !== 'ok') { C.status = 'ok'; chip(); } if (!m) return; if (m.t === 'st') onSt(m); else if (m.t === 'end') leave(); });
    c.on('close', function () { clearTimeout(to); if (C.role === 'follow' && C.host === c) { C.status = 'lost'; chip(); redial(2500); } });
    c.on('error', function () { });
  }
  function onSt(m) {
    C.want = m; C.tries = 0;
    if (!m.pg) { C.hostNp = true; C.hostKey = ''; chip(); return; }
    C.hostNp = false;
    var k = A.key(m.pg), nav = (k !== C.hostKey); C.hostKey = k;
    if (nav) { C.free = false; C.denied = false; }
    apply(nav, false);
  }
  /* nav：帶領者剛換頁（一定跟過去）；force：按了「回到帶領者」 */
  function apply(nav, force) {
    var m = C.want; if (C.role !== 'follow' || !m) return;
    if (!m.pg) { C.hostNp = true; chip(); return; }
    var ready = false; try { ready = A.ready(); } catch (e) { }
    if (!ready) { if (nav) C.pend = true; if (C.tries++ < 60) { clearTimeout(C.rdy); C.rdy = setTimeout(function () { apply(false, false); }, 700); } return; }
    if (C.pend) { nav = true; C.pend = false; }
    var cur = null; try { cur = A.page(); } catch (e2) { }
    var ck = cur ? A.key(cur) : null, wk = A.key(m.pg);
    if (ck !== wk) {
      if (!(nav || force)) { if (!C.free) { C.free = true; chip(); } return; }
      C.free = false; C.denied = false;
      try { if (A.stop) A.stop(); } catch (e3) { }
      var r; try { r = A.go(m.pg); } catch (e4) { r = false; }
      if (r === false) { C.denied = true; C.free = true; chip(); return; }
      C.justNav = true; C.manualAt = 0;
      clearTimeout(C.gt); C.gt = setTimeout(function () { C.justNav = false; apply(false, false); }, 450);
      chip(); return;
    }
    var inst = C.justNav || nav || force; C.justNav = false; C.free = false; C.denied = false;
    if (force) C.manualAt = 0;
    try { if (A.fine) A.fine(m.pg, inst); } catch (e5) { }
    var allow = inst || (Date.now() - C.manualAt > FOLLOW_COOL);
    clearPt();
    var ptDone = false;
    if (m.pt && A.ptFind) {
      var el = null; try { el = A.ptFind(m.pt); } catch (e6) { }
      if (el) {
        el.className += ' cr-pt'; C.ptEl = el;
        var sig = JSON.stringify(m.pt), isNew = (sig !== C.ptSeen); C.ptSeen = sig;
        if (allow && (isNew || inst)) { try { el.scrollIntoView({ behavior: inst ? 'auto' : 'smooth', block: 'center' }); } catch (e7) { el.scrollIntoView(); } ptDone = true; }
      }
    } else C.ptSeen = '';
    if (!ptDone && allow && typeof m.f === 'number') {
      var top = Math.round(maxScroll() * m.f);
      if (Math.abs(top - (window.pageYOffset || 0)) > 3) scrollTo_(top, !inst);
    }
    chip();
  }
  function clearPt() {
    var o = document.querySelectorAll('.cr-pt');
    for (var i = 0; i < o.length; i++) o[i].className = String(o[i].className).replace(/\s*cr-pt/g, '');
    C.ptEl = null;
  }
  function back() { if (C.role === 'follow') { C.manualAt = 0; C.free = false; C.ptSeen = ''; apply(true, true); } }

  /* 心跳：帶領者每 5 秒報平安；跟隨者 15 秒沒收到就重新連線 */
  setInterval(function () {
    if (C.role === 'host') { var cs = live(); for (var i = 0; i < cs.length; i++) try { cs[i].send({ t: 'hb' }); } catch (e) { } }
    else if (C.role === 'follow' && C.host && C.lastRx && Date.now() - C.lastRx > 15000) { C.lastRx = 0; C.status = 'lost'; chip(); dial(); }
  }, 5000);
  setInterval(function () { if (C.role === 'follow' && C.manualAt) chip(); }, 1000);
  window.addEventListener('pagehide', function () { if (C.role === 'host') { var cs = live(); for (var i = 0; i < cs.length; i++) try { cs[i].send({ t: 'hb' }); } catch (e) { } } });
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) return;
    if (C.role === 'follow' && C.status !== 'ok') dial();
    if (C.role === 'host' && C.peer && C.peer.disconnected) try { C.peer.reconnect(); } catch (e) { }
    if (C.role === 'host') snap();
  });

  /* ---------- 結束 ---------- */
  function teardown() { clearTimeout(C.rt); clearTimeout(C.rdy); clearTimeout(C.gt); try { if (C.peer) C.peer.destroy(); } catch (e) { } C.peer = null; C.conns = []; C.host = null; C.want = null; C.hostKey = ''; C.ptSeen = ''; C.pt = null; C.lastKey = ''; clearPt(); }
  function end() {
    var cs = live(); for (var i = 0; i < cs.length; i++) try { cs[i].send({ t: 'end' }); } catch (e) { }
    setTimeout(endNow, cs.length ? 300 : 0);
  }
  function endNow() { teardown(); C.role = ''; C.code = ''; C.last = null; ss(SKEY, null); chip(); paintTop(); closeSheet(); toast(X('ended')); }
  function leave(quiet) {
    var wasScr = !!window.CR_SCREEN;
    teardown(); C.role = ''; C.code = ''; ss(SKEY, null); chip(); paintTop(); closeSheet(); if (!quiet) toast(X('ended'));
    if (wasScr) setTimeout(function () { try { location.replace(location.origin + location.pathname); } catch (e) { location.reload(); } }, 400);
  }

  /* ---------- 畫面 ---------- */
  function chip() {
    var el = $id('crchip');
    if (!C.role) { if (el && el.parentNode) el.parentNode.removeChild(el); return; }
    if (!el) {
      el = document.createElement('button'); el.id = 'crchip'; el.className = 'crchip'; el.type = 'button';
      el.onclick = function () { if (C.role === 'follow' && C.status === 'ok' && !C.denied && (C.free || C.hostNp === false && manualActive())) { back(); return; } sheet(); };
      document.body.appendChild(el);
    }
    var t, cls = 'crchip';
    if (C.role === 'host') {
      t = C.status === 'ok' ? X('hostChip', C.code, live().length) : X('connecting');
      var np = true; try { np = !A.page(); } catch (e) { }
      if (C.status === 'ok' && np) { t += ' · ' + X('hostNp'); cls += ' wait'; }
    } else if (C.status !== 'ok') { t = C.status === 'lost' ? X('hostLeft') : X('connecting'); cls += ' wait'; }
    else if (C.hostNp) { t = X('noSync'); cls += ' wait'; }
    else if (C.denied) { t = X('noAuth'); cls += ' wait'; }
    else if (C.free) { t = X('free'); cls += ' off'; }
    else if (manualActive()) { t = X('paused'); cls += ' off'; }
    else t = X('following');
    el.className = cls; el.innerHTML = '<span class="dot"></span>📡 ' + E(t);
  }
  function manualActive() { return !!C.manualAt && Date.now() - C.manualAt <= FOLLOW_COOL; }
  function paintTop() { var b = $id('crTop'); if (b) b.className = 'crTop' + (C.role ? ' on' : ''); }
  function ensureTop() {
    var b = $id('crTop');
    if (b && b.parentNode) { paintTop(); return; }
    b = document.createElement('button'); b.id = 'crTop'; b.className = 'crTop'; b.type = 'button'; b.setAttribute('aria-label', 'co-read'); b.textContent = '📡';
    b.onclick = function () { sheet(); };
    var ok = false; try { ok = A.mountTop(b) !== false; } catch (e) { }
    if (ok) paintTop();
  }
  function qrInto(id, text) {
    loadJs(QR_JS, function () { return typeof window.qrcode === 'function'; }, function (ok) {
      var box = $id(id); if (!box) return; if (!ok) { box.style.display = 'none'; return; }
      try { var q = window.qrcode(0, 'M'); q.addData(text); q.make(); box.innerHTML = q.createImgTag(5, 10); } catch (e) { box.style.display = 'none'; }
    });
  }
  function paintCount() { var e = $id('crcount'); if (e) { var n = live().length; e.textContent = n ? X('people', n) : X('waiting'); } }
  function closeSheet() { var m = $id('crmask'); if (m && m.parentNode) m.parentNode.removeChild(m); }
  function openSheet(h) {
    closeSheet(); var m = document.createElement('div'); m.id = 'crmask'; m.className = 'crmask';
    m.innerHTML = '<div class="crsheet" role="dialog">' + h + '</div>';
    m.onclick = function (e) { if (e.target === m) closeSheet(); };
    document.body.appendChild(m); return m;
  }
  function sheet() {
    var h = '<div class="cr-h">📡 ' + E(X('title')) + '</div>';
    if (C.role === 'host') {
      h += '<div class="cr-k">' + E(X('code')) + '</div><div class="cr-code">' + E(C.code.slice(0, 3) + ' ' + C.code.slice(3)) + '</div>' +
        '<div class="cr-qr" id="crqr"></div><div class="cr-s">' + E(X('qrTip')) + '</div><div class="cr-count" id="crcount"></div>' +
        '<div class="cr-acts"><button class="cr-btn pri" data-cr="invite">↗ ' + E(X('invite')) + '</button><button class="cr-btn" data-cr="copy">⧉ ' + E(X('copyLink')) + '</button></div>' +
        '<div class="cr-scr"><b>' + E(X('scrT')) + '</b><div class="cr-s" style="text-align:left;margin:2px 0 6px">' + E(X('scrD')) + '</div><button class="cr-btn blk" data-cr="scr">' + E(X('scrB')) + '</button></div>' +
        '<div class="cr-s" style="margin-top:10px">' + E(X('tip')) + '</div>' +
        '<div class="cr-acts"><button class="cr-btn" data-cr="end">■ ' + E(X('end')) + '</button><button class="cr-btn" data-cr="close">' + E(X('close')) + '</button></div>';
      openSheet(h); paintCount(); qrInto('crqr', joinUrl(C.code)); return;
    }
    if (C.role === 'follow') {
      h += '<div class="cr-k">' + E(X('followOnly')) + '</div><div class="cr-code">' + E(C.code.slice(0, 3) + ' ' + C.code.slice(3)) + '</div>' +
        '<div class="cr-acts"><button class="cr-btn pri" data-cr="back">' + E(X('back2')) + '</button><button class="cr-btn" data-cr="leave">' + E(X('leave')) + '</button></div>' +
        '<div class="cr-acts"><button class="cr-btn" data-cr="close">' + E(X('close')) + '</button></div>';
      openSheet(h); return;
    }
    h += '<div class="cr-s" style="text-align:left;margin-bottom:12px">' + E(X('desc')) + '</div>' +
      '<button class="cr-btn pri blk" data-cr="host">📡 ' + E(X('host')) + '</button>' +
      '<div class="cr-k" style="margin-top:16px">' + E(X('orJoin')) + '</div>' +
      '<div class="cr-join"><input id="crin" type="tel" inputmode="numeric" maxlength="7" autocomplete="off" placeholder="' + E(X('codePH')) + '"><button class="cr-btn pri" data-cr="join">' + E(X('join')) + '</button></div>' +
      '<label class="cr-chk"><input type="checkbox" id="crscrchk"> ' + E(X('asScr')) + '</label>' +
      '<div class="cr-acts"><button class="cr-btn" data-cr="close">' + E(X('close')) + '</button></div>';
    var m = openSheet(h), inp = $id('crin');
    if (inp) inp.onkeydown = function (e) { if (e.keyCode === 13) doJoin(); };
  }
  function doJoin() { var i = $id('crin'), c = $id('crscrchk'); join(i ? i.value : '', !!(c && c.checked)); }
  document.addEventListener('click', function (e) {
    var n = e.target; while (n && n !== document && !(n.getAttribute && n.getAttribute('data-cr'))) n = n.parentNode;
    if (!n || n === document) return;
    var a = n.getAttribute('data-cr');
    if (a === 'host') { closeSheet(); host(); }
    else if (a === 'join') doJoin();
    else if (a === 'invite') shareText(X('inviteMsg', joinUrl(C.code), C.code, appName()));
    else if (a === 'copy') copyText(joinUrl(C.code));
    else if (a === 'scr') copyText(joinUrl(C.code) + '&screen=1');
    else if (a === 'end') end();
    else if (a === 'leave') leave();
    else if (a === 'back') { closeSheet(); back(); }
    else if (a === 'close') closeSheet();
  }, false);

  /* ---------- 給主程式的接口 ---------- */
  function rendered() {
    ensureTop();
    if (C.role === 'host') { clearTimeout(C.r2); C.r2 = setTimeout(snap, 150); }
    else if (C.role === 'follow') { clearTimeout(C.r3); C.r3 = setTimeout(function () { apply(false, false); }, 150); }
    chip();
  }
  window.CR = {
    on: function () { return !!C.role; },
    role: function () { return C.role; },
    sheet: sheet, join: join, host: host, end: end, leave: leave, rendered: rendered, snap: snap, back: back,
    state: C
  };
  try { if (A.hook) A.hook(rendered); } catch (e) { }
  ensureTop();

  /* 網址帶 ?join=、或重新整理後自動回到原本的共讀 */
  var keep = ss(SKEY);
  if (URLJ) setTimeout(function () { join(URLJ.c, URLJ.s); }, 600);
  else if (keep && keep.c) {
    if (keep.s) window.CR_SCREEN = true;
    setTimeout(function () { if (keep.r === 'host') host(keep.c, true); else join(keep.c, keep.s); }, 600);
  }
})();

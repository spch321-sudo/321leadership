/* 321領導力 — App Shell
   Single JS file: state, data loading, router, all views.
   No build step; vanilla JS, runs directly from index.html. */
(function () {
  "use strict";

  var VERSION = "1.0.0";
  var STORAGE_KEY = "l321_user_v1";
  var LANG_KEY = "l321_lang";
  var THEME_KEY = "l321_theme";

  // ---------------------------------------------------------------
  // i18n (chrome / UI strings — content itself comes from data files)
  // ---------------------------------------------------------------
  var UI = {
    zh: {
      brand: "321領導力", tabToday: "今日", tabCourse: "課程", tabTools: "工具", tabCompanion: "陪讀", tabMe: "我的",
      continueReading: "繼續閱讀", startPart: "開始新的一部", todayVerse: "今日金句",
      partLabel: "部", lessonLabel: "課", allParts: "11部・55課總覽",
      readBtn: "閱讀本課", markDone: "標記完成本課", doneLabel: "已完成", inProgress: "閱讀中", notStarted: "尚未開始",
      deeperPendingEn: "此則「想更深？」英文版翻譯準備中，暫以原文（繁體中文）呈現於陪讀AI回覆中，敬請期待。",
      tools: "工具", toolJourney: "321旅程地圖", toolJourneyDesc: "八大步驟×11部進度視覺化",
      toolMyths: "領導迷思破解", toolMythsDesc: "常見誤解與聖經澄清",
      toolTracks: "關鍵詞軌跡", toolTracksDesc: "核心詞彙在全書的軌跡",
      toolChecklist: "教導誠信檢核", toolChecklistDesc: "小組長／講員自我檢核",
      toolPrompter: "提詞機／小組帶領", toolPrompterDesc: "全螢幕＋分段計時",
      companionTitle: "小智．領導力教練", companionIntro: "我在這裡陪你把這一課落實到生活裡。你可以問我任何關於這一課、或321理念的問題。",
      companionPlaceholder: "輸入你的問題…", companionSend: "送出",
      companionNeedNet: "陪讀需要網路連線",
      meHighlights: "我的畫線筆記", meDeclarations: "宣告簿", meProgress: "閱讀進度", meSettings: "設定",
      meNoHighlights: "還沒有畫線筆記。閱讀時點一下段落即可標記。",
      meNoDeclarations: "還沒有宣告紀錄。讀到「本週操練與宣告」時，寫下你的宣告吧。",
      themeLight: "淺色", themeDark: "深色", themeAuto: "跟隨系統",
      writeDeclaration: "寫下你的宣告", saveDecl: "儲存宣告", declSaved: "已儲存",
      startPrompterMsg: "小組帶領模式", phase: "階段", question: "題", closing: "收尾",
      wakeLockOn: "螢幕保持喚醒", exitPrompter: "結束", prev: "上一題", next: "下一題",
      myths: "領導迷思破解", tracksTitle: "關鍵詞軌跡", occurrences: "次", chaptersSpanned: "課出現",
      checklistTitle: "教導誠信檢核", checklistPickChapter: "選擇要檢核的課別", checklistDone: "已完成",
      journeyTitle: "321旅程地圖", journeyNote: "",
      tier: { A: "A｜聖經明文教導", B: "B｜可討論的神學推論", C: "C｜321應用性表達" },
      part: "第", of: "，共",
    },
    zs: {
      brand: "321领导力", tabToday: "今日", tabCourse: "课程", tabTools: "工具", tabCompanion: "陪读", tabMe: "我的",
      continueReading: "继续阅读", startPart: "开始新的一部", todayVerse: "今日金句",
      partLabel: "部", lessonLabel: "课", allParts: "11部・55课总览",
      readBtn: "阅读本课", markDone: "标记完成本课", doneLabel: "已完成", inProgress: "阅读中", notStarted: "尚未开始",
      deeperPendingEn: "此则「想更深？」英文版翻译准备中，暂以原文（繁體中文）呈现于陪读AI回复中，敬请期待。",
      tools: "工具", toolJourney: "321旅程地图", toolJourneyDesc: "八大步骤×11部进度视觉化",
      toolMyths: "领导迷思破解", toolMythsDesc: "常见误解与圣经澄清",
      toolTracks: "关键词轨迹", toolTracksDesc: "核心词汇在全书的轨迹",
      toolChecklist: "教导诚信检核", toolChecklistDesc: "小组长／讲员自我检核",
      toolPrompter: "提词机／小组带领", toolPrompterDesc: "全萤幕＋分段计时",
      companionTitle: "小智．领导力教练", companionIntro: "我在这里陪你把这一课落实到生活里。你可以问我任何关于这一课、或321理念的问题。",
      companionPlaceholder: "输入你的问题…", companionSend: "送出",
      companionNeedNet: "陪读需要网路连线",
      meHighlights: "我的画线笔记", meDeclarations: "宣告簿", meProgress: "阅读进度", meSettings: "设定",
      meNoHighlights: "还没有画线笔记。阅读时点一下段落即可标记。",
      meNoDeclarations: "还没有宣告纪录。读到「本周操练与宣告」时，写下你的宣告吧。",
      themeLight: "浅色", themeDark: "深色", themeAuto: "跟随系统",
      writeDeclaration: "写下你的宣告", saveDecl: "储存宣告", declSaved: "已储存",
      startPrompterMsg: "小组带领模式", phase: "阶段", question: "题", closing: "收尾",
      wakeLockOn: "萤幕保持唤醒", exitPrompter: "结束", prev: "上一题", next: "下一题",
      myths: "领导迷思破解", tracksTitle: "关键词轨迹", occurrences: "次", chaptersSpanned: "课出现",
      checklistTitle: "教导诚信检核", checklistPickChapter: "选择要检核的课别", checklistDone: "已完成",
      journeyTitle: "321旅程地图", journeyNote: "",
      tier: { A: "A｜圣经明文教导", B: "B｜可讨论的神学推论", C: "C｜321应用性表达" },
      part: "第", of: "，共",
    },
    en: {
      brand: "321 Leadership", tabToday: "Today", tabCourse: "Lessons", tabTools: "Tools", tabCompanion: "Companion", tabMe: "Me",
      continueReading: "Continue Reading", startPart: "Start a New Part", todayVerse: "Verse of the Day",
      partLabel: "Part", lessonLabel: "Lesson", allParts: "11 Parts · 55 Lessons",
      readBtn: "Read this Lesson", markDone: "Mark Lesson Complete", doneLabel: "Completed", inProgress: "In Progress", notStarted: "Not Started",
      deeperPendingEn: "This “Think Deeper?” item's English translation is in progress; shown here in the original Traditional Chinese for now within the AI companion's reply. Thank you for your patience.",
      tools: "Tools", toolJourney: "321 Journey Map", toolJourneyDesc: "8 steps × 11 Parts progress",
      toolMyths: "Leadership Myths, Busted", toolMythsDesc: "Common misconceptions, clarified by Scripture",
      toolTracks: "Keyword Tracker", toolTracksDesc: "How core terms develop across the book",
      toolChecklist: "Teaching Integrity Check", toolChecklistDesc: "Self-check for leaders/teachers",
      toolPrompter: "Prompter / Group Mode", toolPrompterDesc: "Full-screen + phase timers",
      companionTitle: "Xiao Zhi · Leadership Coach", companionIntro: "I'm here to help you live out this lesson. Ask me anything about this lesson, or about the 321 vision.",
      companionPlaceholder: "Type your question…", companionSend: "Send",
      companionNeedNet: "The companion needs an internet connection",
      meHighlights: "My Highlights", meDeclarations: "Declaration Journal", meProgress: "Reading Progress", meSettings: "Settings",
      meNoHighlights: "No highlights yet. Tap a paragraph while reading to mark it.",
      meNoDeclarations: "No declarations yet. When you reach “This Week's Practice & Declaration,” write yours down.",
      themeLight: "Light", themeDark: "Dark", themeAuto: "System",
      writeDeclaration: "Write your declaration", saveDecl: "Save Declaration", declSaved: "Saved",
      startPrompterMsg: "Group Leading Mode", phase: "Phase", question: "Q", closing: "Closing",
      wakeLockOn: "Screen kept awake", exitPrompter: "Exit", prev: "Previous", next: "Next",
      myths: "Leadership Myths, Busted", tracksTitle: "Keyword Tracker", occurrences: "occurrences", chaptersSpanned: "lessons",
      checklistTitle: "Teaching Integrity Check", checklistPickChapter: "Choose a lesson to check", checklistDone: "Completed",
      journeyTitle: "321 Journey Map", journeyNote: "",
      tier: { A: "A | Explicit Scripture Teaching", B: "B | Reasoned Theological Inference", C: "C | 321's Applied Language" },
      part: "Part ", of: " of ",
    },
  };

  // ---------------------------------------------------------------
  // State
  // ---------------------------------------------------------------
  var state = {
    lang: localStorage.getItem(LANG_KEY) || "zh",
    data: {},        // lang -> parsed data.json
    user: loadUser(),
  };

  function t() { return UI[state.lang]; }

  function loadUser() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return {
      readChapters: {},      // chId -> {openedAt, lastSection}
      completedChapters: {}, // chId -> completedAt
      revisits: {},          // chId -> count
      deeperOpened: {},       // itemId -> true
      highlights: {},        // chId -> [{lang, secNo, idx, text, at}]
      declarations: [],      // {chId, chTitle, text, at}
      checklist: {},         // chId -> {itemId: bool}
      discussionDone: {},    // chId -> {qno: bool}
      theme: "auto",
    };
  }
  function saveUser() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user)); } catch (e) {}
  }

  // ---------------------------------------------------------------
  // Data loading
  // ---------------------------------------------------------------
  function loadData(lang) {
    if (state.data[lang]) return Promise.resolve(state.data[lang]);
    return fetch("data/data." + lang + ".json").then(function (r) {
      if (!r.ok) throw new Error("data load failed: " + r.status);
      return r.json();
    }).then(function (d) {
      state.data[lang] = d;
      return d;
    });
  }

  function D() { return state.data[state.lang]; }

  function chapterIds() {
    var d = D();
    return Object.keys(d.chapters).sort(function (a, b) {
      return d.chapters[a].number - d.chapters[b].number;
    });
  }

  // ---------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------
  function esc(s) {
    return (s || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function fmtDate(iso) {
    try {
      var dt = new Date(iso);
      return dt.getFullYear() + "-" + String(dt.getMonth() + 1).padStart(2, "0") + "-" + String(dt.getDate()).padStart(2, "0");
    } catch (e) { return ""; }
  }
  function qs(sel, root) { return (root || document).querySelector(sel); }
  function qsa(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function on(el, ev, sel, fn) {
    el.addEventListener(ev, function (e) {
      var t = e.target.closest(sel);
      if (t && el.contains(t)) fn(e, t);
    });
  }

  function chapterProgressState(chId) {
    if (state.user.completedChapters[chId]) return "done";
    if (state.user.readChapters[chId]) return "progress";
    return "none";
  }

  window.L321 = { state: state, saveUser: saveUser, UI: UI };
  window.L321_render = render;
  window.L321_navigate = navigate;

  function navigate(hash) { location.hash = hash; }

  // ---------------------------------------------------------------
  // Router
  // ---------------------------------------------------------------
  function parseHash() {
    var h = (location.hash || "#/today").replace(/^#\//, "");
    var parts = h.split("/").filter(Boolean);
    return parts.length ? parts : ["today"];
  }

  function render() {
    var parts = parseHash();
    var root = parts[0];
    var view = qs("#view");
    view.innerHTML = "";
    updateTabbar(root);
    updateLangSwitch();
    qs("#brandName").textContent = t().brand;
    document.title = t().brand;

    if (root === "today") return renderToday(view);
    if (root === "course" && parts[1]) return renderChapter(view, parts[1]);
    if (root === "course") return renderCourseList(view);
    if (root === "tools" && parts[1] === "journey") return renderJourney(view);
    if (root === "tools" && parts[1] === "myths") return renderMyths(view);
    if (root === "tools" && parts[1] === "tracks") return renderTracks(view);
    if (root === "tools" && parts[1] === "checklist") return renderChecklist(view, parts[2]);
    if (root === "tools" && parts[1] === "prompter" && parts[2]) return launchPrompter(parts[2]);
    if (root === "tools") return renderToolsList(view);
    if (root === "companion") return renderCompanion(view, parts[1]);
    if (root === "me") return renderMe(view);
    return renderToday(view);
  }

  function updateTabbar(root) {
    qsa("#tabbar a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-tab") === root);
    });
    qs("#tab-today").textContent = t().tabToday;
    qs("#tab-course").textContent = t().tabCourse;
    qs("#tab-tools").textContent = t().tabTools;
    qs("#tab-companion").textContent = t().tabCompanion;
    qs("#tab-me").textContent = t().tabMe;
  }
  function updateLangSwitch() {
    qsa("#langswitch button").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-lang") === state.lang);
    });
  }

  // ---------------------------------------------------------------
  // View: 今日 Today
  // ---------------------------------------------------------------
  function renderToday(view) {
    var d = D(), ids = chapterIds();
    var lastId = null, lastAt = 0;
    Object.keys(state.user.readChapters).forEach(function (cid) {
      var r = state.user.readChapters[cid];
      if (r && r.openedAt && r.openedAt > lastAt && d.chapters[cid]) { lastAt = r.openedAt; lastId = cid; }
    });
    var nextId = lastId;
    if (!nextId) nextId = ids[0];
    var doneCount = Object.keys(state.user.completedChapters).filter(function (c) { return d.chapters[c]; }).length;

    var html = "";
    html += '<div class="hero-badge"><img src="icons/icon-192.png" alt="' + esc(d.appName || "321領導力") + '">';
    html += '<div class="hb-title">' + esc(d.appName || "321領導力") + '</div>';
    html += '<div class="hb-sub">' + esc(d.bookTitle || "") + '</div></div>';
    html += '<div class="card">';
    html += '<div class="pill">' + esc(d.chapters[nextId].partTitle) + '</div>';
    html += "<h3 style='margin-top:8px'>" + esc(d.chapters[nextId].numFull) + "　" + esc(d.chapters[nextId].title) + "</h3>";
    html += '<p class="muted">' + doneCount + ' / ' + ids.length + ' ' + (state.lang === 'en' ? 'lessons completed' : '課已完成') + '</p>';
    html += '<a class="btn primary block" href="#/course/' + nextId + '">' + esc(lastId ? t().continueReading : t().readBtn) + '</a>';
    html += '</div>';

    html += '<div class="section-title">' + esc(t().allParts) + '</div>';
    html += '<div class="card" style="padding:8px 16px;">';
    (d.partsMeta || []).forEach(function (p, idx) {
      var chs = p.chapters.map(function (n) { return "ch" + String(n).padStart(2, "0"); });
      var doneInPart = chs.filter(function (c) { return state.user.completedChapters[c]; }).length;
      html += '<a class="rowlink" href="#/course/' + chs[0] + '">';
      html += '<div class="meta"><div class="t">' + esc(p.part_no) + '　' + esc(d.chapters[chs[0]].partTitle.replace(/^第[一二三四五六七八九十]+部\s*/, "")) + '</div>';
      html += '<div class="s">' + esc(p.range) + (state.lang === 'en' ? '' : '課') + ' · ' + doneInPart + '/5</div></div>';
      html += '<span class="chev">›</span></a>';
    });
    html += '</div>';

    html += '<div class="section-title">' + esc(t().toolPrompter) + '</div>';
    html += '<div class="card"><a class="btn block" href="#/tools/journey">' + esc(t().toolJourney) + '</a></div>';

    view.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // View: 課程 Course list
  // ---------------------------------------------------------------
  function renderCourseList(view) {
    var d = D();
    var html = "<h2 style='margin-top:4px'>" + esc(t().allParts) + "</h2>";
    (d.partsMeta || []).forEach(function (p) {
      var chs = p.chapters.map(function (n) { return "ch" + String(n).padStart(2, "0"); });
      var partTitle = d.chapters[chs[0]].partTitle;
      var doneInPart = chs.filter(function (c) { return state.user.completedChapters[c]; }).length;
      html += '<details class="part"' + (doneInPart < 5 && doneInPart > 0 ? " open" : "") + '>';
      html += '<summary><span class="pn">' + esc(p.part_no) + '</span><span class="pt">' + esc(partTitle.replace(/^第[一二三四五六七八九十]+部\s*/, "")) + '</span><span class="muted">' + doneInPart + '/5</span></summary>';
      html += '<div class="plist">';
      chs.forEach(function (cid) {
        var ch = d.chapters[cid];
        var st = chapterProgressState(cid);
        var badge = st === "done" ? "✓" : (st === "progress" ? "•" : "");
        html += '<a class="rowlink" href="#/course/' + cid + '">';
        html += '<div class="meta"><div class="t">' + esc(ch.numFull) + '　' + esc(ch.title) + '</div>';
        html += '<div class="s">' + (st === "done" ? esc(t().doneLabel) : (st === "progress" ? esc(t().inProgress) : esc(t().notStarted))) + '</div></div>';
        html += '<span class="chev">' + badge + '</span></a>';
      });
      html += '</div></details>';
    });
    view.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // View: chapter reader
  // ---------------------------------------------------------------
  function renderChapter(view, chId) {
    var d = D();
    var ch = d.chapters[chId];
    if (!ch) { view.innerHTML = '<div class="empty">404</div>'; return; }

    // progress tracking
    var now = Date.now();
    if (!state.user.readChapters[chId]) {
      state.user.readChapters[chId] = { openedAt: now };
    } else {
      state.user.revisits[chId] = (state.user.revisits[chId] || 0) + 1;
      state.user.readChapters[chId].openedAt = now;
    }
    saveUser();

    var bank = d.deeperBank || {};
    var anchors = ch.deeper || {};

    function deeperHtml(ids) {
      if (!ids || !ids.length) return "";
      var out = "";
      ids.forEach(function (id) {
        var it = bank[id];
        if (!it) {
          if (state.lang === "en") {
            out += '<div class="deeperPending">' + esc(t().deeperPendingEn) + '</div>';
          }
          return;
        }
        var opened = state.user.deeperOpened[id] ? " open" : "";
        out += '<details class="deeper" data-deeper-id="' + id + '"' + opened + '>';
        out += '<summary><span class="q">' + esc(it.q) + '</span></summary>';
        out += '<div class="a"><span class="tierbadge tier' + it.tier + '">' + esc(t().tier[it.tier]) + '</span>';
        out += '<div>' + esc(it.a) + '</div>';
        out += '<div class="refs">' + esc(it.refs) + '</div></div>';
        out += '</details>';
      });
      return out;
    }

    function withHighlightAttrs(html, secKey) {
      // wrap each top-level <p>...</p> so it can be tapped to highlight (skips p with class already special like q/note/htype handled generically too)
      var idx = 0;
      return html.replace(/<p(\s[^>]*)?>/g, function (m) {
        var hl = (state.user.highlights[chId] || []).some(function (h) { return h.sec === secKey && h.idx === idx; });
        var out = m.slice(0, -1) + ' data-sec="' + secKey + '" data-idx="' + idx + '"' + (hl ? ' data-hl="1"' : '') + '>';
        idx++;
        return out;
      });
    }

    var html = "";
    html += '<div class="chhead">';
    html += '<div class="pn">' + esc(ch.partTitle) + '</div>';
    html += '<h1>' + esc(ch.numFull) + '</h1>';
    html += '<h2 style="font-size:17px;color:var(--ink-soft);margin:0 0 10px;">' + esc(ch.title) + '</h2>';
    html += '</div>';

    html += '<div class="reader">';
    html += withHighlightAttrs(ch.intro, "intro");
    html += deeperHtml(anchors["intro"]);
    ch.sections.forEach(function (s) {
      html += "<h2>" + esc(s.heading) + "</h2>";
      html += withHighlightAttrs(s.html, String(s.no));
      html += deeperHtml(anchors[String(s.no)]);
      if (s.no === 9) {
        html += '<div class="card" style="margin-top:6px;">';
        html += '<h3 style="font-size:14px;margin-bottom:8px;">' + esc(t().writeDeclaration) + '</h3>';
        html += '<textarea id="declInput" rows="3" style="width:100%;border:1px solid var(--border-strong);border-radius:8px;padding:10px;font-family:inherit;font-size:14px;background:var(--surface);color:var(--ink);"></textarea>';
        html += '<button class="btn gold savebtn" id="declSaveBtn">' + esc(t().saveDecl) + '</button>';
        html += '</div>';
      }
      if (s.no === 10) {
        html += '<a class="btn primary block" href="#/tools/prompter/' + chId + '" style="margin:10px 0;">▶ ' + esc(t().toolPrompter) + '</a>';
      }
    });
    html += '</div>';

    var isDone = !!state.user.completedChapters[chId];
    html += '<button class="btn ' + (isDone ? "" : "primary") + ' block" id="markDoneBtn">' + (isDone ? "✓ " + esc(t().doneLabel) : esc(t().markDone)) + '</button>';

    // prev/next nav
    var ids = chapterIds();
    var pos = ids.indexOf(chId);
    html += '<div style="display:flex;gap:10px;margin-top:12px;">';
    if (pos > 0) html += '<a class="btn" style="flex:1" href="#/course/' + ids[pos - 1] + '">‹ ' + esc(d.chapters[ids[pos-1]].numFull) + '</a>';
    if (pos < ids.length - 1) html += '<a class="btn" style="flex:1" href="#/course/' + ids[pos + 1] + '">' + esc(d.chapters[ids[pos+1]].numFull) + ' ›</a>';
    html += '</div>';

    view.innerHTML = html;
    window.scrollTo(0, 0);

    // wire deeper open tracking
    qsa("details.deeper", view).forEach(function (det) {
      det.addEventListener("toggle", function () {
        if (det.open) {
          state.user.deeperOpened[det.getAttribute("data-deeper-id")] = true;
          saveUser();
        }
      });
    });
    // wire highlight taps
    qsa(".reader p[data-sec]", view).forEach(function (p) {
      p.addEventListener("click", function (e) {
        if (e.target.closest("a")) return;
        var sec = p.getAttribute("data-sec"), idx = parseInt(p.getAttribute("data-idx"), 10);
        var arr = state.user.highlights[chId] = state.user.highlights[chId] || [];
        var existingIdx = arr.findIndex(function (h) { return h.sec === sec && h.idx === idx; });
        if (existingIdx >= 0) {
          arr.splice(existingIdx, 1);
          p.removeAttribute("data-hl");
        } else {
          arr.push({ sec: sec, idx: idx, text: p.textContent.slice(0, 120), at: Date.now(), lang: state.lang, chId: chId, chTitle: ch.title });
          p.setAttribute("data-hl", "1");
        }
        saveUser();
      });
    });
    // wire mark done
    var mdBtn = qs("#markDoneBtn", view);
    if (mdBtn) mdBtn.addEventListener("click", function () {
      if (state.user.completedChapters[chId]) { delete state.user.completedChapters[chId]; }
      else { state.user.completedChapters[chId] = Date.now(); }
      saveUser();
      renderChapter(view, chId);
    });
    // wire declaration save
    var dsBtn = qs("#declSaveBtn", view);
    if (dsBtn) dsBtn.addEventListener("click", function () {
      var ta = qs("#declInput", view);
      var val = (ta.value || "").trim();
      if (!val) return;
      state.user.declarations.push({ chId: chId, chTitle: ch.title, text: val, at: Date.now(), lang: state.lang });
      saveUser();
      ta.value = "";
      dsBtn.textContent = t().declSaved;
      setTimeout(function () { dsBtn.textContent = t().saveDecl; }, 1400);
    });
  }

  // ---------------------------------------------------------------
  // View: 工具 Tools list
  // ---------------------------------------------------------------
  function renderToolsList(view) {
    var html = '<h2 style="margin-top:4px">' + esc(t().tools) + '</h2><div class="toolgrid">';
    var items = [
      ["journey", "🧭", t().toolJourney, t().toolJourneyDesc],
      ["myths", "💡", t().toolMyths, t().toolMythsDesc],
      ["tracks", "🔎", t().toolTracks, t().toolTracksDesc],
      ["checklist", "✅", t().toolChecklist, t().toolChecklistDesc],
    ];
    items.forEach(function (it) {
      html += '<a class="toolcard" href="#/tools/' + it[0] + '"><div class="ic">' + it[1] + '</div><h4>' + esc(it[2]) + '</h4><p>' + esc(it[3]) + '</p></a>';
    });
    html += '</div>';
    html += '<div class="section-title">' + esc(t().toolPrompter) + '</div>';
    html += '<div class="card"><p class="muted">' + esc(t().toolPrompterDesc) + (state.lang === "en" ? "" : "。從任一課的第十節「小組討論分享」進入，或先在「課程」選一課。") + '</p>';
    html += '<a class="btn block" href="#/course">' + esc(t().tabCourse) + ' ›</a></div>';
    view.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // Tool: 321旅程地圖
  // ---------------------------------------------------------------
  function renderJourney(view) {
    var d = D();
    var journey = d.tools.journey;
    var steps = journey.steps;
    var html = '<h2 style="margin-top:4px">' + esc(t().journeyTitle) + '</h2>';
    html += '<p class="muted">' + esc(journey.note[state.lang]) + '</p>';
    html += '<div class="card">';
    (d.partsMeta || []).forEach(function (p) {
      var chs = p.chapters.map(function (n) { return "ch" + String(n).padStart(2, "0"); });
      var reached = computePartStep(chs);
      html += '<div class="jrow"><div class="jt">' + esc(p.part_no) + '</div><div class="jdots">';
      steps.forEach(function (s) {
        html += '<i class="' + (s.no <= reached ? "on" : "") + '" title="' + esc(s[state.lang]) + '"></i>';
      });
      html += '</div></div>';
    });
    html += '</div>';
    html += '<div class="section-title">' + (state.lang === "en" ? "The 8 Steps" : "八大步驟") + '</div>';
    html += '<div class="card">';
    steps.forEach(function (s) {
      html += '<div style="display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--border);">';
      html += '<div style="font-family:\'Noto Serif TC\',serif;color:var(--gold);font-weight:700;width:22px;">' + s.no + '</div>';
      html += '<div><div style="font-weight:700;">' + esc(s[state.lang]) + '</div><div class="muted">' + esc(s.desc[state.lang]) + '</div></div>';
      html += '</div>';
    });
    html += '</div>';
    view.innerHTML = html;
  }
  function computePartStep(chs) {
    var openedCount = chs.filter(function (c) { return state.user.readChapters[c]; }).length;
    var doneCount = chs.filter(function (c) { return state.user.completedChapters[c]; }).length;
    var deeperCount = 0;
    var anchors = D().chapters;
    chs.forEach(function (c) {
      var ch = anchors[c]; if (!ch) return;
      Object.keys(ch.deeper || {}).forEach(function (k) {
        (ch.deeper[k] || []).forEach(function (id) { if (state.user.deeperOpened[id]) deeperCount++; });
      });
    });
    var declCount = state.user.declarations.filter(function (dc) { return chs.indexOf(dc.chId) >= 0; }).length;
    var checklistDoneChapters = chs.filter(function (c) {
      var cl = state.user.checklist[c];
      return cl && Object.keys(cl).some(function (k) { return cl[k]; });
    }).length;
    var revisitCount = chs.filter(function (c) { return state.user.revisits[c] > 0; }).length;
    var mustDone = chs.filter(function (c) {
      var dd = state.user.discussionDone[c];
      return dd && dd["15"];
    }).length;

    var step = 0;
    if (openedCount > 0) step = 1;
    if (openedCount >= 5) step = 2;
    if (deeperCount >= 3) step = 3;
    if (declCount >= 1) step = 4;
    if (doneCount >= 5) step = 5;
    if (checklistDoneChapters >= 1) step = 6;
    if (revisitCount >= 1) step = 7;
    if (mustDone >= 1) step = 8;
    return step;
  }

  // ---------------------------------------------------------------
  // Tool: 領導迷思破解
  // ---------------------------------------------------------------
  function renderMyths(view) {
    var d = D();
    var cards = (d.tools.myths.cards || []);
    var bank = d.deeperBank || {};
    var html = '<h2 style="margin-top:4px">' + esc(t().myths) + '</h2>';
    cards.forEach(function (c) {
      var it = bank[c.sourceId];
      if (!it && state.lang === "en") {
        html += '<div class="mythcard"><div class="m">' + esc(c.myth) + '</div><div class="deeperPending" style="margin:10px 14px;">' + esc(t().deeperPendingEn) + '</div>';
        html += '<div class="meta">' + esc(c.chTitle) + '</div></div>';
        return;
      }
      var q = it ? it.q : c.myth, a = it ? it.a : c.truth;
      html += '<div class="mythcard"><div class="m">' + esc(q) + '</div><div class="t">' + esc(a) + '</div>';
      html += '<div class="meta">' + esc(c.chTitle) + ' · ' + esc(t().tier[c.tier]) + '</div></div>';
    });
    view.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // Tool: 關鍵詞軌跡
  // ---------------------------------------------------------------
  function renderTracks(view) {
    var d = D();
    var data = d.tools.tracks;
    var html = '<h2 style="margin-top:4px">' + esc(t().tracksTitle) + '</h2>';
    data.keywords.forEach(function (kw) {
      var occ = data.tracks[kw] || [];
      if (!occ.length) return;
      var chSet = {};
      occ.forEach(function (o) { chSet[o.chId] = true; });
      html += '<details class="part"><summary><span class="pt">' + esc(kw) + '</span><span class="muted">' + Object.keys(chSet).length + ' ' + esc(t().chaptersSpanned) + '</span></summary><div class="plist">';
      occ.slice(0, 24).forEach(function (o) {
        html += '<a class="rowlink" href="#/course/' + o.chId + '"><div class="meta"><div class="t">' + esc(o.chTitle) + '</div><div class="s">' + esc(o.snippet) + '</div></div></a>';
      });
      html += '</div></details>';
    });
    view.innerHTML = html;
  }

  // ---------------------------------------------------------------
  // Tool: 教導誠信檢核
  // ---------------------------------------------------------------
  function renderChecklist(view, chId) {
    var d = D();
    var data = d.tools.checklist;
    if (!chId) {
      var html = '<h2 style="margin-top:4px">' + esc(t().checklistTitle) + '</h2><p class="muted">' + esc(t().checklistPickChapter) + '</p>';
      html += '<div class="card" style="padding:8px 16px;">';
      chapterIds().forEach(function (cid) {
        var cl = state.user.checklist[cid] || {};
        var doneN = Object.keys(cl).filter(function (k) { return cl[k]; }).length;
        html += '<a class="rowlink" href="#/tools/checklist/' + cid + '"><div class="meta"><div class="t">' + esc(d.chapters[cid].numFull) + '　' + esc(d.chapters[cid].title) + '</div><div class="s">' + doneN + '/' + data.template.length + '</div></div><span class="chev">›</span></a>';
      });
      html += '</div>';
      view.innerHTML = html;
      return;
    }
    var ch = d.chapters[chId];
    var cl = state.user.checklist[chId] = state.user.checklist[chId] || {};
    var html2 = '<h2 style="margin-top:4px">' + esc(t().checklistTitle) + '</h2>';
    html2 += '<p class="muted">' + esc(ch.numFull) + '　' + esc(ch.title) + '</p><div class="card">';
    var groups = {};
    data.template.forEach(function (it) { (groups[it.group] = groups[it.group] || []).push(it); });
    Object.keys(groups).forEach(function (g) {
      html2 += '<div class="clgroup">' + esc(g) + '</div>';
      groups[g].forEach(function (it) {
        html2 += '<label class="clitem"><input type="checkbox" data-cl-id="' + it.id + '"' + (cl[it.id] ? " checked" : "") + '><span>' + esc(it.text) + '</span></label>';
      });
    });
    html2 += '</div>';
    view.innerHTML = html2;
    qsa("input[data-cl-id]", view).forEach(function (inp) {
      inp.addEventListener("change", function () {
        cl[inp.getAttribute("data-cl-id")] = inp.checked;
        saveUser();
      });
    });
  }

  // ---------------------------------------------------------------
  // Tool: 提詞機／小組全螢幕帶領模式
  // ---------------------------------------------------------------
  var prompterState = null;
  var wakeLock = null;

  function flattenDiscussion(disc) {
    // returns array of {type:'phase', title} | {type:'q', ...} | {type:'closing', title, text}
    var flat = [];
    (disc.leadNotes || []).forEach(function (n) { flat.push({ type: "note", text: n }); });
    (disc.phases || []).forEach(function (p) {
      flat.push({ type: "phase", title: p.title, notes: p.notes });
      p.questions.forEach(function (q) { flat.push({ type: "q", q: q, phaseTitle: p.title }); });
    });
    return flat;
  }

  function launchPrompter(chId) {
    var d = D();
    var ch = d.chapters[chId];
    var disc = (d.tools.discussion || {})[chId];
    if (!ch || !disc) { navigate("#/course/" + chId); return; }
    var flat = flattenDiscussion(disc).filter(function (x) { return x.type === "q"; });
    prompterState = { chId: chId, items: flat, idx: 0, startTs: Date.now(), timerInt: null };

    var el = qs("#prompter");
    el.hidden = false;
    requestWakeLock();
    renderPrompterFrame();

    document.body.style.overflow = "hidden";
  }

  function exitPrompter() {
    var el = qs("#prompter");
    el.hidden = true;
    el.innerHTML = "";
    document.body.style.overflow = "";
    if (prompterState && prompterState.timerInt) clearInterval(prompterState.timerInt);
    prompterState = null;
    releaseWakeLock();
  }

  function requestWakeLock() {
    if ("wakeLock" in navigator) {
      navigator.wakeLock.request("screen").then(function (wl) { wakeLock = wl; }).catch(function () {});
    }
  }
  function releaseWakeLock() {
    if (wakeLock) { wakeLock.release().catch(function () {}); wakeLock = null; }
  }

  function renderPrompterFrame() {
    var el = qs("#prompter");
    var ps = prompterState;
    var d = D();
    var ch = d.chapters[ps.chId];
    var total = ps.items.length;
    var cur = ps.items[ps.idx];

    var html = '<div class="ptop"><span>' + esc(ch.numFull) + ' · ' + esc(t().startPrompterMsg) + '</span><span class="ptimer" id="pTimer">00:00</span></div>';
    html += '<div class="pdots">';
    ps.items.forEach(function (it, i) {
      html += '<i class="' + (i < ps.idx ? "done" : (i === ps.idx ? "now" : "")) + '"></i>';
    });
    html += '</div>';
    html += '<div class="pbody"><div class="ptitle">' + esc(cur.phaseTitle) + ' · ' + esc(t().question) + (ps.idx + 1) + ' / ' + total + (cur.q.must ? ' <span style="color:#D4A65B">★ ' + (state.lang === 'en' ? 'Multiply Task' : '【必做】') + '</span>' : '') + '</div>';
    html += '<div class="pq">' + (cur.q.h4 ? '<div style="font-size:15px;color:#D4A65B;margin-bottom:8px;">' + esc(cur.q.h4) + '</div>' : '') + esc(cur.q.text) + '</div>';
    html += '</div>';
    html += '<div class="pctl">';
    html += '<button id="pPrev"' + (ps.idx === 0 ? " disabled" : "") + '>‹ ' + esc(t().prev) + '</button>';
    html += '<button id="pDoneMust" style="' + (cur.q.must ? "" : "opacity:.5") + '">' + (state.user.discussionDone[ps.chId] && state.user.discussionDone[ps.chId][cur.q.no] ? "✓" : "○") + '</button>';
    html += '<button id="pNext">' + (ps.idx === total - 1 ? esc(t().exitPrompter) : esc(t().next) + ' ›') + '</button>';
    html += '</div>';
    el.innerHTML = html;

    qs("#pPrev", el).addEventListener("click", function () { if (ps.idx > 0) { ps.idx--; renderPrompterFrame(); } });
    qs("#pNext", el).addEventListener("click", function () {
      if (ps.idx === total - 1) { exitPrompter(); return; }
      ps.idx++; renderPrompterFrame();
    });
    qs("#pDoneMust", el).addEventListener("click", function () {
      var dd = state.user.discussionDone[ps.chId] = state.user.discussionDone[ps.chId] || {};
      dd[cur.q.no] = !dd[cur.q.no];
      saveUser();
      renderPrompterFrame();
    });

    if (ps.timerInt) clearInterval(ps.timerInt);
    ps.timerInt = setInterval(function () {
      var sec = Math.floor((Date.now() - ps.startTs) / 1000);
      var mm = String(Math.floor(sec / 60)).padStart(2, "0");
      var ss = String(sec % 60).padStart(2, "0");
      var tEl = qs("#pTimer", el);
      if (tEl) {
        tEl.textContent = mm + ":" + ss;
        tEl.classList.toggle("warn", sec > 60 * 45);
      }
    }, 1000);
  }

  // ---------------------------------------------------------------
  // View: 陪讀 Companion (小智領導力教練)
  // ---------------------------------------------------------------
  var chatSession = { messages: [] };
  var XIAOZHI_ENDPOINT = "https://xiaozhi-proxy.spch321.workers.dev";

  function companionSystemPrompt(chId) {
    var d = D();
    var ch = chId ? d.chapters[chId] : null;
    var base = {
      zh: "你是「小智」，《321建造 教會領導力》App內的AI陪讀，人設是一位謙卑、有盼望、充滿愛心的「321領導力教練」。準則：①任何回答最終必須指向耶穌的榜樣、聖經的准則、聖靈的引導，不能只停留在321術語的自我循環論證；②回答涉及神學推論時，誠實標示層級——A為聖經明文教導，B為可討論的神學推論需說明「這是我的理解，歡迎與牧者再確認」，C為321的應用性語言需說明「這是321的應用性理解」；③遇到讀者具體人生抉擇（換工作、婚姻、離開教會等），引導讀者用321原則自己思考、鼓勵與屬靈父母／小組尋求印證，不直接替讀者下判斷；④所有經文引用一律使用和合本繁體中文；⑤語氣謙卑、盼望、帶著愛心，避免說教與居高臨下，用心不用腦。",
      zs: "你是「小智」，《321建造 教会领导力》App内的AI陪读，人设是一位谦卑、有盼望、充满爱心的「321领导力教练」。准则：①任何回答最终必须指向耶稣的榜样、圣经的准则、圣灵的引导，不能只停留在321术语的自我循环论证；②回答涉及神学推论时，诚实标示层级——A为圣经明文教导，B为可讨论的神学推论需说明「这是我的理解，欢迎与牧者再确认」，C为321的应用性语言需说明「这是321的应用性理解」；③遇到读者具体人生抉择，引导读者用321原则自己思考、鼓励与属灵父母／小组寻求印证，不直接替读者下判断；④所有经文引用一律使用和合本简体中文；⑤语气谦卑、盼望、带着爱心，避免说教与居高临下。",
      en: "You are 'Xiao Zhi,' the AI companion inside the Building on 321: Church Leadership app — a humble, hopeful, loving '321 Leadership Coach.' Guidelines: (1) Every answer must ultimately point to Jesus as example, Scripture as standard, and the Holy Spirit as guide — never stay circular within 321's own vocabulary; (2) when reasoning theologically, honestly mark confidence: A = explicit Scripture teaching, B = a reasoned theological inference — say 'this is my understanding, please confirm with your pastor,' C = 321's own applied language — say 'this is 321's applied framing'; (3) for concrete life decisions (a job change, marriage, leaving a church), guide the reader to think it through using 321's principles and to seek confirmation from spiritual parents/small group — never decide for them; (4) quote Scripture using the ESV (or WEB where noted) for English; (5) tone: humble, hopeful, loving — never preachy or condescending.",
    }[state.lang];
    if (ch) {
      var ctx = state.lang === "en"
        ? "\n\nThe reader is currently on: " + ch.numFull + " — " + ch.title + " (" + ch.partTitle + ")."
        : "\n\n讀者目前所在課別：" + ch.numFull + "　" + ch.title + "（" + ch.partTitle + "）。";
      base += ctx;
    }
    return base;
  }

  function renderCompanion(view, chId) {
    var d = D();
    var html = '<div class="chatwrap">';
    html += '<div class="chatlog" id="chatlog">';
    if (!chatSession.messages.length) {
      html += '<div class="msg ai">' + esc(t().companionIntro) + '</div>';
    }
    chatSession.messages.forEach(function (m) {
      html += '<div class="msg ' + (m.role === "user" ? "user" : "ai") + '">' + esc(m.text) + '</div>';
    });
    html += '</div>';
    html += '<div class="chatinput"><textarea id="chatIn" rows="1" placeholder="' + esc(t().companionPlaceholder) + '"></textarea><button id="chatSend">' + esc(t().companionSend) + '</button></div>';
    html += '</div>';
    view.innerHTML = html;

    var log = qs("#chatlog", view);
    log.scrollTop = log.scrollHeight;

    var chId2 = chId || currentChapterHint();
    qs("#chatSend", view).addEventListener("click", function () { sendChat(chId2); });
    qs("#chatIn", view).addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(chId2); }
    });
  }

  function currentChapterHint() {
    var lastId = null, lastAt = 0;
    Object.keys(state.user.readChapters).forEach(function (cid) {
      var r = state.user.readChapters[cid];
      if (r && r.openedAt > lastAt) { lastAt = r.openedAt; lastId = cid; }
    });
    return lastId;
  }

  function sendChat(chId) {
    var ta = qs("#chatIn");
    var text = (ta.value || "").trim();
    if (!text) return;
    chatSession.messages.push({ role: "user", text: text });
    ta.value = "";
    renderCompanion(qs("#view"), chId);
    var log = qs("#chatlog"); if (log) log.scrollTop = log.scrollHeight;

    if (!navigator.onLine) {
      chatSession.messages.push({ role: "ai", text: t().companionNeedNet });
      renderCompanion(qs("#view"), chId);
      return;
    }

    var thinkingIdx = chatSession.messages.length;
    chatSession.messages.push({ role: "ai", text: "…" });
    renderCompanion(qs("#view"), chId);

    var payload = {
      system: companionSystemPrompt(chId),
      messages: chatSession.messages
        .filter(function (m, i) { return i !== thinkingIdx; })
        .slice(-12)
        .map(function (m) { return { role: m.role === "user" ? "user" : "assistant", content: m.text }; }),
    };

    fetch(XIAOZHI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (r) {
      if (!r.ok) throw new Error("proxy error " + r.status);
      return r.json();
    }).then(function (data) {
      var reply = extractReplyText(data);
      chatSession.messages[thinkingIdx] = { role: "ai", text: reply || (state.lang === "en" ? "(no reply)" : "（沒有收到回覆）") };
      renderCompanion(qs("#view"), chId);
      var log2 = qs("#chatlog"); if (log2) log2.scrollTop = log2.scrollHeight;
    }).catch(function (err) {
      chatSession.messages[thinkingIdx] = { role: "ai", text: (state.lang === "en" ? "Connection error. Please try again." : "連線發生問題，請稍後再試。") };
      renderCompanion(qs("#view"), chId);
    });
  }

  function extractReplyText(data) {
    // Defensive parsing: supports a few common proxy response shapes.
    if (!data) return "";
    if (typeof data === "string") return data;
    if (data.content && Array.isArray(data.content) && data.content[0] && data.content[0].text) return data.content[0].text;
    if (data.reply) return data.reply;
    if (data.text) return data.text;
    if (data.message) return data.message;
    if (data.choices && data.choices[0] && data.choices[0].message) return data.choices[0].message.content;
    return "";
  }

  // ---------------------------------------------------------------
  // View: 我的 Me
  // ---------------------------------------------------------------
  function renderMe(view) {
    var d = D();
    var ids = chapterIds();
    var doneCount = ids.filter(function (c) { return state.user.completedChapters[c]; }).length;

    var html = "";
    html += '<div class="card">';
    html += '<div class="section-title" style="margin-top:0">' + esc(t().meProgress) + '</div>';
    html += '<div style="font-size:26px;font-weight:800;color:var(--accent);">' + doneCount + ' <span style="font-size:14px;color:var(--ink-faint);font-weight:600;">/ ' + ids.length + '</span></div>';
    html += '<div style="height:8px;background:var(--surface-alt);border-radius:4px;margin-top:8px;overflow:hidden;"><div style="height:100%;background:var(--accent);width:' + Math.round(doneCount / ids.length * 100) + '%;"></div></div>';
    html += '</div>';

    html += '<div class="section-title">' + esc(t().meDeclarations) + '</div><div class="card">';
    var decls = state.user.declarations.slice().reverse();
    if (!decls.length) {
      html += '<div class="empty">' + esc(t().meNoDeclarations) + '</div>';
    } else {
      decls.forEach(function (dcl) {
        html += '<div class="declitem"><div class="d">' + esc(dcl.text) + '</div><div class="m">' + esc(dcl.chTitle) + ' · ' + fmtDate(dcl.at) + '</div></div>';
      });
    }
    html += '</div>';

    html += '<div class="section-title">' + esc(t().meHighlights) + '</div><div class="card">';
    var hls = [];
    Object.keys(state.user.highlights).forEach(function (cid) {
      (state.user.highlights[cid] || []).forEach(function (h) { hls.push(h); });
    });
    hls.sort(function (a, b) { return b.at - a.at; });
    if (!hls.length) {
      html += '<div class="empty">' + esc(t().meNoHighlights) + '</div>';
    } else {
      hls.slice(0, 40).forEach(function (h) {
        html += '<a class="rowlink" href="#/course/' + h.chId + '"><div class="meta"><div class="t">' + esc(h.text) + '…</div><div class="s">' + esc(h.chTitle) + ' · ' + fmtDate(h.at) + '</div></div></a>';
      });
    }
    html += '</div>';

    html += '<div class="section-title">' + esc(t().meSettings) + '</div><div class="card">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;">';
    html += '<span>' + (state.lang === "en" ? "Theme" : "外觀") + '</span>';
    html += '<div class="langswitch" id="themeswitch"><button data-theme="light">' + esc(t().themeLight) + '</button><button data-theme="dark">' + esc(t().themeDark) + '</button><button data-theme="auto">' + esc(t().themeAuto) + '</button></div>';
    html += '</div></div>';

    view.innerHTML = html;
    qsa("#themeswitch button", view).forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-theme") === state.user.theme);
      b.addEventListener("click", function () {
        state.user.theme = b.getAttribute("data-theme");
        saveUser();
        applyTheme();
        renderMe(view);
      });
    });
  }

  function applyTheme() {
    var th = state.user.theme || "auto";
    if (th === "auto") document.documentElement.removeAttribute("data-theme");
    else document.documentElement.setAttribute("data-theme", th);
  }

  // ---------------------------------------------------------------
  // Boot
  // ---------------------------------------------------------------
  var bootWatchdog = setTimeout(function () {
    var diag = qs("#boot-diag");
    if (diag) diag.style.display = "flex";
  }, 8000);

  function finishBoot() {
    clearTimeout(bootWatchdog);
    var boot = qs("#boot");
    if (boot) boot.remove();
  }

  qs("#boot-reload") && qs("#boot-reload").addEventListener("click", function () { location.reload(); });
  qs("#boot-clear") && qs("#boot-clear").addEventListener("click", function () {
    if ("caches" in window) {
      caches.keys().then(function (keys) {
        Promise.all(keys.map(function (k) { return caches.delete(k); })).then(function () { location.reload(); });
      });
    } else { location.reload(); }
  });

  function switchLang(lang) {
    state.lang = lang;
    localStorage.setItem(LANG_KEY, lang);
    loadData(lang).then(render);
  }

  function init() {
    applyTheme();
    on(qs("#langswitch"), "click", "button", function (e, btn) {
      switchLang(btn.getAttribute("data-lang"));
    });
    on(document.body, "click", "#prompter [id]", function () {}); // no-op placeholder for delegation safety

    window.addEventListener("hashchange", render);

    loadData(state.lang).then(function () {
      finishBoot();
      render();
      // background-preload the other two languages so switching is instant later
      ["zh", "zs", "en"].filter(function (l) { return l !== state.lang; }).forEach(function (l) {
        setTimeout(function () { loadData(l).catch(function () {}); }, 1500);
      });
    }).catch(function (err) {
      finishBoot();
      qs("#view").innerHTML = '<div class="empty">載入內容失敗，請檢查網路連線後重新整理。<br><span style="font-size:11px;">' + esc(String(err)) + '</span></div>';
    });

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  init();
})();


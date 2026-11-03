/* 321領導力 — App Shell
   Single JS file: state, data loading, router, all views.
   No build step; vanilla JS, runs directly from index.html. */
(function () {
  "use strict";

  var VERSION = "1.0.0";
  var STORAGE_KEY = "l321_user_v1";
  var LANG_KEY = "l321_lang";
  var THEME_KEY = "l321_theme";
  var FONT_KEY = "l321_font";
  var FONT_CLASS = ["", "fs-lg", "fs-xl", "fs-xxl"];

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
      wakeLockOn: "螢幕保持喚醒", exitPrompter: "結束", promptClose: "退出", prev: "上一題", next: "下一題",
      backHome: "首頁", backToc: "目錄", readAloud: "朗讀", pauseAloud: "暫停", resumeAloud: "繼續朗讀", stopAloud: "停止", ttsUnsupported: "這台裝置不支援語音朗讀", ttsLoading: "準備語音中…", fontSizeLabel: "調整字級大小",
      hlAddNote: "加筆記", hlEditNote: "編輯筆記", hlAskXz: "問小智", hlNotePlaceholder: "寫下你的領受或問題…", hlSave: "儲存", hlCancel: "取消", askAboutLine: "關於這一段：「", askAboutLineEnd: "」——",
      hlSheetTitle: "✍️ 寫下你的領受", hlReflectionPlaceholder: "這句話帶給你什麼領受、感動，或聖靈的提醒？寫下來，把焦點對準耶穌……", hlSaveReflection: "儲存領受", hlClearNote: "刪除領受", hlRemoveHighlight: "移除畫線", hlColorLabel: "畫線顏色",
      hlHint: "💡 讀到聖靈光照、有感動的句子，點一下就能畫線；畫線後再點一下可以寫下你的領受。",
      myths: "領導迷思破解", tracksTitle: "關鍵詞軌跡", occurrences: "次", chaptersSpanned: "課出現",
      checklistTitle: "教導誠信檢核", checklistPickChapter: "選擇要檢核的課別", checklistDone: "已完成",
      journeyTitle: "321旅程地圖", journeyNote: "",
      tier: { A: "A｜聖經明文教導", B: "B｜可討論的神學推論", C: "C｜321應用性表達" },
      part: "第", of: "，共",
      companionQsToggle: "💡 範例問題", companionQsHide: "收起範例問題", companionQsHint: "點一下問題，直接問小智",
      msgExpand: "展開全部", msgCollapse: "收合", msgSave: "收藏", msgSaved: "已收藏", msgDelete: "刪除", msgDeleteConfirm: "要刪除這則回覆嗎？",
      meFavorites: "我的收藏", meNoFavorites: "還沒有收藏。在陪讀對話中點一下「收藏」，把小智的回答留下來。",
      meFontSize: "字級大小", fontStandard: "標準", fontLarge: "大", fontXLarge: "特大", fontXXLarge: "超大",
      meVoice: "朗讀聲音",
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
      wakeLockOn: "萤幕保持唤醒", exitPrompter: "结束", promptClose: "退出", prev: "上一题", next: "下一题",
      backHome: "首页", backToc: "目录", readAloud: "朗读", pauseAloud: "暂停", resumeAloud: "继续朗读", stopAloud: "停止", ttsUnsupported: "这台装置不支持语音朗读", ttsLoading: "准备语音中…", fontSizeLabel: "调整字级大小",
      hlAddNote: "加笔记", hlEditNote: "编辑笔记", hlAskXz: "问小智", hlNotePlaceholder: "写下你的领受或问题…", hlSave: "储存", hlCancel: "取消", askAboutLine: "关于这一段：「", askAboutLineEnd: "」——",
      hlSheetTitle: "✍️ 写下你的领受", hlReflectionPlaceholder: "这句话带给你什么领受、感动，或圣灵的提醒？写下来，把焦点对准耶稣……", hlSaveReflection: "储存领受", hlClearNote: "删除领受", hlRemoveHighlight: "移除画线", hlColorLabel: "画线颜色",
      hlHint: "💡 读到圣灵光照、有感动的句子，点一下就能画线；画线后再点一下可以写下你的领受。",
      myths: "领导迷思破解", tracksTitle: "关键词轨迹", occurrences: "次", chaptersSpanned: "课出现",
      checklistTitle: "教导诚信检核", checklistPickChapter: "选择要检核的课别", checklistDone: "已完成",
      journeyTitle: "321旅程地图", journeyNote: "",
      tier: { A: "A｜圣经明文教导", B: "B｜可讨论的神学推论", C: "C｜321应用性表达" },
      part: "第", of: "，共",
      companionQsToggle: "💡 范例问题", companionQsHide: "收起范例问题", companionQsHint: "点一下问题，直接问小智",
      msgExpand: "展开全部", msgCollapse: "收合", msgSave: "收藏", msgSaved: "已收藏", msgDelete: "删除", msgDeleteConfirm: "要删除这则回复吗？",
      meFavorites: "我的收藏", meNoFavorites: "还没有收藏。在陪读对话中点一下「收藏」，把小智的回答留下来。",
      meFontSize: "字级大小", fontStandard: "标准", fontLarge: "大", fontXLarge: "特大", fontXXLarge: "超大",
      meVoice: "朗读声音",
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
      companionTitle: "Sage AI · Leadership Coach", companionIntro: "I'm here to help you live out this lesson. Ask me anything about this lesson, or about the 321 vision.",
      companionPlaceholder: "Type your question…", companionSend: "Send",
      companionNeedNet: "The companion needs an internet connection",
      meHighlights: "My Highlights", meDeclarations: "Declaration Journal", meProgress: "Reading Progress", meSettings: "Settings",
      meNoHighlights: "No highlights yet. Tap a paragraph while reading to mark it.",
      meNoDeclarations: "No declarations yet. When you reach “This Week's Practice & Declaration,” write yours down.",
      themeLight: "Light", themeDark: "Dark", themeAuto: "System",
      writeDeclaration: "Write your declaration", saveDecl: "Save Declaration", declSaved: "Saved",
      startPrompterMsg: "Group Leading Mode", phase: "Phase", question: "Q", closing: "Closing",
      wakeLockOn: "Screen kept awake", exitPrompter: "Exit", promptClose: "Exit", prev: "Previous", next: "Next",
      backHome: "Home", backToc: "Contents", readAloud: "Read Aloud", pauseAloud: "Pause", resumeAloud: "Resume", stopAloud: "Stop", ttsUnsupported: "This device does not support read-aloud", ttsLoading: "Preparing audio…", fontSizeLabel: "Adjust font size",
      hlAddNote: "Add Note", hlEditNote: "Edit Note", hlAskXz: "Ask Sage AI", hlNotePlaceholder: "Write your reflection or question…", hlSave: "Save", hlCancel: "Cancel", askAboutLine: "About this line: “", askAboutLineEnd: "” — ",
      hlSheetTitle: "✍️ Write Your Reflection", hlReflectionPlaceholder: "What reflection, feeling, or prompting from the Holy Spirit does this line stir in you? Write it down, and keep your focus on Jesus……", hlSaveReflection: "Save Reflection", hlClearNote: "Clear Reflection", hlRemoveHighlight: "Remove Highlight", hlColorLabel: "Highlight Color",
      hlHint: "💡 When a line stirs something in you, tap it to highlight it; tap the highlighted line again to write your reflection.",
      myths: "Leadership Myths, Busted", tracksTitle: "Keyword Tracker", occurrences: "occurrences", chaptersSpanned: "lessons",
      checklistTitle: "Teaching Integrity Check", checklistPickChapter: "Choose a lesson to check", checklistDone: "Completed",
      journeyTitle: "321 Journey Map", journeyNote: "",
      tier: { A: "A | Explicit Scripture Teaching", B: "B | Reasoned Theological Inference", C: "C | 321's Applied Language" },
      part: "Part ", of: " of ",
      companionQsToggle: "💡 Example Questions", companionQsHide: "Hide Example Questions", companionQsHint: "Tap a question to ask Sage AI directly",
      msgExpand: "Show more", msgCollapse: "Collapse", msgSave: "Save", msgSaved: "Saved", msgDelete: "Delete", msgDeleteConfirm: "Delete this reply?",
      meFavorites: "My Saved Replies", meNoFavorites: "No saved replies yet. Tap “Save” under one of Sage AI's answers to keep it here.",
      meFontSize: "Font Size", fontStandard: "Standard", fontLarge: "Large", fontXLarge: "X-Large", fontXXLarge: "XX-Large",
      meVoice: "Reading Voice",
    },
  };

  // ---------------------------------------------------------------
  // State
  // ---------------------------------------------------------------
  var state = {
    lang: localStorage.getItem(LANG_KEY) || "zh",
    data: {},        // lang -> parsed data.json
    user: loadUser(),
    font: parseInt(localStorage.getItem(FONT_KEY), 10) || 0, // 0=標準 1=大 2=特大 3=超大
  };

  function t() { return UI[state.lang]; }

  try { document.documentElement.setAttribute("data-lang", state.lang); } catch (e) {}

  // Localize the static boot-loading screen immediately (before data.json even
  // starts fetching) so slow-network users on zs/en don't see zh-only text.
  (function localizeBootScreen() {
    try {
      var BOOT_TEXT = {
        zh: { bt: "321領導力載入中…", diag: "載入時間較長，可能是網路或快取問題。", reload: "重新載入", clear: "清除快取並重新載入" },
        zs: { bt: "321领导力载入中…", diag: "载入时间较长，可能是网络或快取问题。", reload: "重新载入", clear: "清除快取并重新载入" },
        en: { bt: "Loading 321 Leadership…", diag: "This is taking a while — it may be a network or cache issue.", reload: "Reload", clear: "Clear Cache & Reload" }
      };
      var bt = BOOT_TEXT[state.lang] || BOOT_TEXT.zh;
      var elBt = document.getElementById("bootText");
      var elDiag = document.getElementById("bootDiagMsg");
      var elReload = document.getElementById("boot-reload");
      var elClear = document.getElementById("boot-clear");
      if (elBt) elBt.textContent = bt.bt;
      if (elDiag) elDiag.textContent = bt.diag;
      if (elReload) elReload.textContent = bt.reload;
      if (elClear) elClear.textContent = bt.clear;
    } catch (e) {}
  })();

  function applyFont() {
    try {
      document.documentElement.classList.remove("fs-lg", "fs-xl", "fs-xxl");
      var cls = FONT_CLASS[state.font] || "";
      if (cls) document.documentElement.classList.add(cls);
    } catch (e) {}
  }
  function setFont(n) {
    state.font = n;
    try { localStorage.setItem(FONT_KEY, String(state.font)); } catch (e) {}
    applyFont();
  }
  function cycleFont() { setFont((state.font + 1) % FONT_CLASS.length); }
  window.cycleFont = cycleFont;

  // ---------------------------------------------------------------
  // 語音朗讀 Read-Aloud — Azure real-voice via Cloudflare Worker (azure-tts.spch321.workers.dev),
  // falls back to the device's built-in speechSynthesis if the Worker is unreachable.
  // NOTE: this sandbox has no egress to *.workers.dev, so the Azure path is written to the
  // same documented request contract as the existing companion/TTS Workers but is UNTESTED
  // against the live Worker — verify voice names + response format after deploying, exactly
  // like the companion chat's known limitation.
  // ---------------------------------------------------------------
  var TTS_ENDPOINT = "https://azure-tts.spch321.workers.dev";
  var TTS_SIL_SENTENCE = 140, TTS_SIL_COMMA = 140, TTS_SIL_ENUM = 260;
  // 每個語言版本可選的朗讀聲音——跟姊妹App「晨讀321」共用同一個Worker、同一批Azure真人語音，
  // 使用者可在「我的」分頁依目前所在的語言版本切換；voice id存在 state.user.ttsVoice[lang]。
  var TTS_VOICE_OPTIONS = {
    zh: [
      { id: "yunjhe", voice: "zh-TW-YunJheNeural", label: "雲哲" },
      { id: "yunfan", voice: "zh-CN-Yunfan:DragonHDLatestNeural", label: "雲帆" },
      { id: "xiaochen", voice: "zh-CN-Xiaochen:DragonHDLatestNeural", label: "曉辰" },
    ],
    zs: [
      { id: "yunfan", voice: "zh-CN-Yunfan:DragonHDLatestNeural", label: "云帆" },
      { id: "yunjhe", voice: "zh-TW-YunJheNeural", label: "云哲" },
      { id: "xiaochen", voice: "zh-CN-Xiaochen:DragonHDLatestNeural", label: "晓辰" },
    ],
    en: [
      { id: "andrew", voice: "en-US-AndrewNeural", label: "Andrew" },
      { id: "emma", voice: "en-US-EmmaNeural", label: "Emma" },
      { id: "brian", voice: "en-US-BrianNeural", label: "Brian" },
    ],
  };
  var TTS_VOICE_DEFAULT = { zh: "yunjhe", zs: "yunfan", en: "andrew" };

  // ---------------------------------------------------------------
  // Highlight colors — picked from the "顏色" swatch row inside the reflection sheet, stored
  // per-highlight as h.color (default "gold" for both new highlights and any highlight saved
  // before this feature existed). `dot` is the swatch button's own fixed color (same in light
  // and dark mode, like a real highlighter's cap color); the actual soft background tint shown
  // behind highlighted text is theme-aware and lives in CSS as --hlbg-<id> (gold reuses the
  // existing --gold-soft var rather than a new one).
  var HL_COLORS = [
    { id: "gold", dot: "#D9A73D" },
    { id: "green", dot: "#6FAE71" },
    { id: "blue", dot: "#6C93D1" },
    { id: "pink", dot: "#E58FA0" },
    { id: "purple", dot: "#A48AC9" },
    // v1.3.13：深色系三色（酒紅／咖啡棕／墨黑），跟前五色的淺亮色系做出區隔，
    // 適合想標記「較沉重、較嚴肅」語氣的段落（例如警語、罪性反省）時使用。
    { id: "maroon", dot: "#8C4A4E" },
    { id: "brown", dot: "#8A6740" },
    { id: "charcoal", dot: "#54534E" },
  ];
  var HL_COLOR_NAMES = {
    zh: { gold: "金", green: "綠", blue: "藍", pink: "粉", purple: "紫", maroon: "酒紅", brown: "咖啡", charcoal: "墨黑" },
    zs: { gold: "金", green: "绿", blue: "蓝", pink: "粉", purple: "紫", maroon: "酒红", brown: "咖啡", charcoal: "墨黑" },
    en: { gold: "Gold", green: "Green", blue: "Blue", pink: "Pink", purple: "Purple", maroon: "Maroon", brown: "Brown", charcoal: "Charcoal" },
  };

  // ---------------------------------------------------------------
  // TTS pronunciation fix-up ("破音字" homophone substitution) — applied ONLY
  // to the text sent to the speech engine, never to anything shown on screen.
  // Chinese TTS engines routinely mis-read polyphonic characters (破音字);
  // these word-level substitutions swap in a homophone that forces the
  // correct reading, per Taiwan (zh) vs Mainland (zs) standard pronunciation.
  // Applied longest-pattern-first so multi-character phrases aren't partially
  // clobbered by a shorter overlapping pattern.
  // ---------------------------------------------------------------
  var TTS_FIX_ZH = [ // Traditional Chinese / Taiwan standard reading
    ["血液循環", "寫液循環"], ["血流成河", "穴流成河"], ["心血", "心穴"], ["流血", "流寫"],
    ["便宜貨", "胼宜貨"], ["方便", "方變"], ["順便", "順變"],
    ["得著", "得鑿"], ["睡著", "睡鑿"], ["著火", "鑿火"], ["著陸", "灼陸"], ["著想", "灼想"], ["著裝", "灼裝"], ["看著", "看這"], ["聽著", "聽這"], ["慢著", "慢這"],
    ["我和你", "我漢你"], ["一唱一和", "一唱一賀"], ["和平", "何平"], ["和麵", "活麵"],
    ["期待", "七待"], ["星期", "星七"], ["期間", "七間"],
    ["阿姨", "啊姨"], ["阿諛奉承", "婀諛奉承"],
    ["把手拿開", "巴手拿開"], ["刀把", "刀爸"], ["茶壺把兒", "茶壺爸兒"],
    ["紙很薄", "紙很刨"], ["薄弱", "勃弱"], ["刻薄", "刻勃"], ["薄荷糖", "迫荷糖"],
    ["背景", "貝景"], ["背叛", "貝叛"], ["背包", "杯包"],
    ["東奔西跑", "東本西跑"], ["投奔", "投笨"], ["奔向目標", "笨向目標"],
    ["參加", "餐加"], ["人參", "人深"], ["參差不齊", "蹭差不齊"],
    ["收藏", "收常"], ["躲藏", "躲常"], ["西藏", "西葬"], ["寶藏", "寶葬"],
    ["差別", "叉別"], ["很差", "很岔"], ["差點", "岔點"], ["出差", "出柴"], ["公差", "公柴"], ["參差", "參呲"],
    ["長短", "常短"], ["長江", "常江"], ["長大", "掌大"], ["校長", "校掌"],
    ["組長", "組掌"], ["長執", "掌執"], ["長老", "掌老"], ["家長", "家掌"], ["增長", "增掌"], ["長進", "掌進"], ["部長", "部掌"],
    ["倒車", "道車"], ["倒茶", "道茶"], ["跌倒", "跌島"], ["公司倒閉", "公司島閉"],
    ["得到", "德到"], ["你得加油", "你歹加油"], ["跑得快", "跑的快"],
    ["的確", "敵確"], ["目的", "目地"],
    ["身分", "身份"], ["本分", "本份"], ["分開", "吩開"],
    ["角色", "決色"], ["主角", "主決"], ["角度", "腳度"],
    ["企業企劃", "氣業氣劃"],
    ["懸崖勒馬", "懸巖樂馬"], ["勒索", "樂索"], ["勒緊", "雷緊"],
    ["測量", "測良"], ["量身高", "良身高"], ["數量", "數亮"], ["力量", "力亮"],
    ["露水", "路水"], ["暴露", "暴路"], ["露馬腳", "漏馬腳"],
    ["降落", "降洛"], ["落枕", "酪枕"], ["丟三落四", "丟三辣四"],
    ["效率", "效綠"], ["機率", "機綠"], ["率領", "帥領"],
    ["困難", "苦南"], ["災難", "災南"],
    ["強大", "牆大"], ["勉強", "勉搶"], ["倔強", "倔匠"],
    ["切西瓜", "七西瓜"], ["一切", "一妾"],
    ["彎曲", "彎區"], ["歌曲", "歌取"],
    ["塞車", "腮車"], ["阻塞", "阻澀"], ["邊塞", "邊賽"],
    ["少年", "哨年"], ["老少咸宜", "老哨咸宜"],
    ["剝削", "剝靴"], ["削蘋果", "消蘋果"],
    ["液體", "頁體"], ["汁液", "汁頁"],
    ["記載", "記宰"], ["刊載", "刊宰"], ["載客", "在客"], ["載歌載舞", "在歌在舞"],
    ["骯髒", "骯張"], ["內臟", "內葬"],
    ["中間", "忠間"], ["中獎", "眾獎"], ["中毒", "眾毒"],
    ["種子", "腫子"], ["種花", "眾花"],
    ["教會", "叫會"], // 全書「教會」都是名詞（宗教/教育的教，ㄐㄧㄠˋ），不是「教書」的ㄐㄧㄠ動詞讀音
    ["看、聽、想、講、行", "看、聽、想、講、型"], // 提綱固定用語「看聽想講行」的「行」是ㄒㄧㄥˊ（力行/實行），不是ㄏㄤˊ／ㄒㄧㄥˋ
  ];
  var TTS_FIX_ZS = [ // Simplified Chinese / Mainland standard reading
    ["血液循环", "穴液循环"], ["流血了", "流写了"], ["血淋淋", "写淋淋"],
    ["便宜货", "胼宜货"], ["方便", "方变"], ["顺便", "顺变"],
    ["得着", "得凿"], ["睡着", "睡凿"], ["着火", "凿火"], ["着陆", "灼陆"], ["着想", "灼想"], ["着装", "灼装"], ["看着", "看这"], ["听着", "听这"],
    ["我和你", "我河你"], ["一唱一和", "一唱一贺"], ["和面", "活面"], ["和泥", "活泥"], ["搅和", "搅货"],
    ["期待", "七待"], ["星期", "星七"], ["期间", "七间"],
    ["阿姨", "啊姨"], ["阿谀奉承", "婀谀奉承"],
    ["把手拿开", "巴手拿开"], ["刀把", "刀爸"], ["茶壶把儿", "茶壶爸儿"],
    ["纸很薄", "纸很雹"], ["薄弱", "勃弱"], ["刻薄", "勃刻"], ["薄荷糖", "迫荷糖"],
    ["背景", "贝景"], ["背叛", "贝叛"], ["背包", "杯包"],
    ["东奔西跑", "东本西跑"], ["投奔", "投笨"], ["奔向目标", "笨向目标"],
    ["参加", "餐加"], ["人参", "人深"], ["参差不齐", "蹭差不齐"],
    ["收藏", "收常"], ["躲藏", "躲常"], ["西藏", "西葬"], ["宝藏", "宝葬"],
    ["差别", "叉别"], ["很差", "很岔"], ["差点", "岔点"], ["出差", "出柴"], ["公差", "公柴"], ["参差", "参呲"],
    ["长短", "常短"], ["长江", "常江"], ["长大", "掌大"], ["校长", "校掌"],
    ["组长", "组掌"], ["长执", "掌执"], ["长老", "掌老"], ["家长", "家掌"], ["增长", "增掌"], ["长进", "掌进"], ["部长", "部掌"],
    ["倒车", "道车"], ["倒茶", "道茶"], ["跌倒", "跌岛"], ["公司倒闭", "公司岛闭"],
    ["得到", "德到"], ["你得加油", "你歹加油"], ["跑得快", "跑的快"],
    ["的确", "敌确"], ["目的", "目地"],
    ["成分", "成份"], ["分开", "吩开"],
    ["角色", "决色"], ["主角", "主决"], ["角度", "脚度"],
    ["企业企划", "起业起划"],
    ["测量", "测良"], ["量身高", "良身高"], ["数量", "数亮"], ["力量", "力亮"],
    ["露水", "路水"], ["暴露", "暴路"], ["露马脚", "漏马脚"],
    ["降落", "降洛"], ["落枕", "酪枕"], ["丢三落四", "丢三辣四"],
    ["效率", "效绿"], ["机率", "机绿"], ["率领", "帅领"],
    ["困难", "苦南"], ["灾难", "灾南"],
    ["强大", "墙大"], ["勉强", "勉抢"], ["倔强", "倔匠"],
    ["切西瓜", "七西瓜"], ["一切", "一妾"],
    ["弯曲", "弯区"], ["歌曲", "歌取"],
    ["塞车", "腮车"], ["阻塞", "阻色"], ["边塞", "边赛"],
    ["少年", "哨年"], ["老少咸宜", "老哨咸宜"],
    ["剥削", "剥靴"], ["削苹果", "消苹果"],
    ["液体", "夜体"], ["汁液", "汁夜"],
    ["记载", "记宰"], ["刊载", "刊宰"], ["载客", "在客"], ["载歌载舞", "在歌在舞"],
    ["肮脏", "肮张"], ["内脏", "内葬"],
    ["中间", "忠间"], ["中奖", "众奖"], ["中毒", "众毒"],
    ["种子", "肿子"], ["种花", "众花"],
    ["教会", "叫会"], // 全书「教会」都是名词（宗教/教育的教，ㄐㄧㄠˋ），不是「教书」的ㄐㄧㄠ动词读音
    ["看、听、想、讲、行", "看、听、想、讲、型"], // 提纲固定用语「看听想讲行」的「行」是ㄒㄧㄥˊ（力行/实行），不是ㄏㄤˊ／ㄒㄧㄥˋ
  ];
  // 321專用術語的數字要「逐字讀」（3-2-1／9-2-0／2-3-5），不是唸成整數
  // （如「三百二十一」）。用正則把獨立出現的321/920/235換成逐字的中文數字，
  // 只在zh／zs生效；(?<![0-9])…(?![0-9]) 確保不會誤觸更長數字（如1920、2350）中的子字串。
  // v1.3.12曾經試著改成「後面緊接中文字時保留阿拉伯數字原樣、交給語音引擎自己唸」，
  // 目的是讓「321理念」這種緊接中文字的品牌複合詞唸起來不要像分開的倒數語氣；
  // v1.3.14修正（還原）：實測發現這個調整反而更糟——語音引擎把沒轉換的阿拉伯數字「321」
  // 直接當成整數唸，繁體唸成「三百二十一」、簡體唸成更離譜的「三二十一」，完全錯誤，
  // 比原本「三…二…一…」略顯生硬但至少數字正確的唸法還糟。所以改回一律逐字轉換
  // （只要不是被更長的數字包住，例如1920、2350裡的子字串不會誤觸），
  // 不再依「後面是否緊接中文字」而保留原樣。
  var TTS_DIGIT_FIXES = [
    [/(?<![0-9])321(?![0-9])/g, "三二一"],
    [/(?<![0-9])920(?![0-9])/g, "九二零"],
    [/(?<![0-9])235(?![0-9])/g, "二三五"],
  ];
  // English edition: same brand terms should be read digit-by-digit too ("three two one",
  // not "three hundred twenty-one"). Same not-adjacent-to-another-digit guard.
  var TTS_DIGIT_FIXES_EN = [
    [/(?<![0-9])321(?![0-9])/g, "three two one"],
    [/(?<![0-9])920(?![0-9])/g, "nine two zero"],
    [/(?<![0-9])235(?![0-9])/g, "two three five"],
  ];
  // 「為大／为大」全書幾乎都是「以…為大」「誰願為大」這種「認為是大」的用法，要讀ㄨㄟˊ
  // (wéi)，不是「為了」的ㄨㄟˋ(wèi)；唯一例外是「為大使命」（為了大使命），這裡的「為」
  // 是ㄨㄟˋ，所以用負向前瞻排除掉，其餘一律換成同音字「惟」強制唸成ㄨㄟˊ。
  var TTS_WEI_DA_FIX = [
    [/為大(?!使命)/g, "惟大"],
    [/为大(?!使命)/g, "惟大"],
  ];
  // 中式編號「一、」「二、」…唸出來要用自然的口吻帶成「第一，」「第二，」，不是把「、」
  // 前的數字單獨唸出來，聽起來才像真人在說話，不是機械式報數字。
  var TTS_ENUM_FIX = /([一二三四五六七八九十百]+)、/g;

  // ---------------------------------------------------------------
  // 朗讀時跳過「純經文出處」的括號附註（如「（約翰福音十三章三至五節）」／
  // "(John 13:3–5)"）——那只是給讀者自己核對用的出處標示，唸出來反而生硬；
  // 但保留解釋性括號（如「（約20分鐘）」「（我沒有資格談領導）」），因為那些是
  // 內容的一部分。做法：先看括號裡有沒有「聖經書卷名+數字」，沒有就完全不動；
  // 有的話，把「書卷+章節」這種出處片段整段拿掉，剩下的內容如果還有東西（代表
  // 括號裡不只是出處，還夾雜別的說明），就整個括號原封不動保留；如果拿掉出處後
  // 什麼都不剩，才把整個括號（連同前面的空格）一起刪除。
  // ---------------------------------------------------------------
  var BIBLE_BOOKS_ZH = [
    "創世記", "創", "出埃及記", "出", "利未記", "利", "民數記", "民", "申命記", "申", "約書亞記", "書", "士師記", "士", "路得記", "得",
    "撒母耳記上", "撒上", "撒母耳記下", "撒下", "列王紀上", "王上", "列王紀下", "王下", "歷代志上", "代上", "歷代志下", "代下",
    "以斯拉記", "拉", "尼希米記", "尼", "以斯帖記", "斯", "約伯記", "伯", "詩篇", "詩", "箴言", "箴", "傳道書", "傳", "雅歌", "歌",
    "以賽亞書", "賽", "耶利米書", "耶", "耶利米哀歌", "哀", "以西結書", "結", "但以理書", "但",
    "何西阿書", "何", "約珥書", "珥", "阿摩司書", "摩", "俄巴底亞書", "俄", "約拿書", "拿", "彌迦書", "彌",
    "那鴻書", "鴻", "哈巴谷書", "哈", "西番雅書", "番", "哈該書", "該", "撒迦利亞書", "亞", "瑪拉基書", "瑪",
    "馬太福音", "太", "馬可福音", "可", "路加福音", "路", "約翰福音", "約", "使徒行傳", "徒", "羅馬書", "羅",
    "哥林多前書", "林前", "哥林多後書", "林後", "加拉太書", "加", "以弗所書", "弗", "腓立比書", "腓",
    "歌羅西書", "西", "帖撒羅尼迦前書", "帖前", "帖撒羅尼迦後書", "帖後", "提摩太前書", "提前", "提摩太後書", "提後",
    "提多書", "多", "腓利門書", "門", "希伯來書", "來", "雅各書", "雅",
    "彼得前書", "彼前", "彼得後書", "彼後", "約翰一書", "約一", "約壹", "約翰二書", "約二", "約貳", "約翰三書", "約三", "約參",
    "猶大書", "猶", "啟示錄", "啟",
  ];
  // NOTE (fixed in v1.3.7): this list used to be independently (and incompletely) authored —
  // it was missing "路加福音"/"路" (Luke) entirely, plus most single-character book
  // abbreviations (创/出/利/民/申/得/太/可/路/徒/加/弗/腓/西/雅/多/彼前/帖前/帖后/提前/提后 …).
  // Any scripture citation using one of those missing forms silently failed the
  // "book name + number" detection in stripScriptureRefParens() and so never got skipped
  // during 簡體 read-aloud. Now generated as an exact simplified-character mirror of
  // BIBLE_BOOKS_ZH (same 135 entries, same order) so the two lists can never drift apart again.
  var BIBLE_BOOKS_ZS = [
    "创世记", "创", "出埃及记", "出", "利未记", "利", "民数记", "民", "申命记", "申", "约书亚记", "书", "士师记", "士", "路得记", "得", "撒母耳记上", "撒上", "撒母耳记下", "撒下", "列王纪上", "王上", "列王纪下", "王下", "历代志上", "代上", "历代志下", "代下", "以斯拉记", "拉", "尼希米记", "尼", "以斯帖记", "斯", "约伯记", "伯", "诗篇", "诗", "箴言", "箴", "传道书", "传", "雅歌", "歌", "以赛亚书", "赛", "耶利米书", "耶", "耶利米哀歌", "哀", "以西结书", "结", "但以理书", "但", "何西阿书", "何", "约珥书", "珥", "阿摩司书", "摩", "俄巴底亚书", "俄", "约拿书", "拿", "弥迦书", "弥", "那鸿书", "鸿", "哈巴谷书", "哈", "西番雅书", "番", "哈该书", "该", "撒迦利亚书", "亚", "玛拉基书", "玛", "马太福音", "太", "马可福音", "可", "路加福音", "路", "约翰福音", "约", "使徒行传", "徒", "罗马书", "罗", "哥林多前书", "林前", "哥林多后书", "林后", "加拉太书", "加", "以弗所书", "弗", "腓立比书", "腓", "歌罗西书", "西", "帖撒罗尼迦前书", "帖前", "帖撒罗尼迦后书", "帖后", "提摩太前书", "提前", "提摩太后书", "提后", "提多书", "多", "腓利门书", "门", "希伯来书", "来", "雅各书", "雅", "彼得前书", "彼前", "彼得后书", "彼后", "约翰一书", "约一", "约壹", "约翰二书", "约二", "约贰", "约翰三书", "约三", "约参", "犹大书", "犹", "启示录", "启",
  ];
  var BIBLE_BOOKS_EN = [
    "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy", "Joshua", "Judges", "Ruth",
    "1 Samuel", "2 Samuel", "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles",
    "Ezra", "Nehemiah", "Esther", "Job", "Psalm", "Psalms", "Proverbs", "Ecclesiastes", "Song of Solomon", "Song of Songs",
    "Isaiah", "Jeremiah", "Lamentations", "Ezekiel", "Daniel",
    "Hosea", "Joel", "Amos", "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk", "Zephaniah", "Haggai", "Zechariah", "Malachi",
    "Matthew", "Mark", "Luke", "John", "Acts", "Romans",
    "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians",
    "1 Thessalonians", "2 Thessalonians", "1 Timothy", "2 Timothy", "Titus", "Philemon",
    "Hebrews", "James", "1 Peter", "2 Peter", "1 John", "2 John", "3 John", "Jude", "Revelation",
  ];
  function bibleBooksAlt(arr) {
    return arr.slice().sort(function (a, b) { return b.length - a.length; }).join("|");
  }
  var BIBLE_ALT_ZH = bibleBooksAlt(BIBLE_BOOKS_ZH);
  var BIBLE_ALT_ZS = bibleBooksAlt(BIBLE_BOOKS_ZS);
  var BIBLE_ALT_EN = bibleBooksAlt(BIBLE_BOOKS_EN);
  // ---------------------------------------------------------------
  // Canonical book-name lookup (alias/abbreviation → full name), built directly from the same
  // flat BIBLE_BOOKS_ZH/ZS arrays above so it can never drift out of sync with them. The flat
  // arrays are laid out as consecutive groups of [fullName, abbrev, abbrev...] — 61 books with
  // exactly 1 abbreviation, then 約翰一/二/三書 (约翰一/二/三书) with 2 abbreviations each, then
  // 猶大書/啟示錄 (犹大书/启示录) with 1 abbreviation each — 66 books, 135 entries total.
  var BIBLE_BOOK_GROUP_SIZES = (function () {
    var sizes = [];
    for (var i = 0; i < 61; i++) sizes.push(2);
    sizes.push(3, 3, 3);
    sizes.push(2, 2);
    return sizes;
  })();
  function buildBookCanon(flatArr) {
    var map = {}, idx = 0;
    BIBLE_BOOK_GROUP_SIZES.forEach(function (sz) {
      var full = flatArr[idx];
      for (var j = 0; j < sz; j++) map[flatArr[idx + j]] = full;
      idx += sz;
    });
    return map;
  }
  var BIBLE_CANON_ZH = buildBookCanon(BIBLE_BOOKS_ZH);
  var BIBLE_CANON_ZS = buildBookCanon(BIBLE_BOOKS_ZS);
  // Arabic-numeral → spoken Chinese numeral (covers Bible chapter/verse numbers, max ~176).
  function numToZh(n) {
    n = parseInt(n, 10);
    if (!isFinite(n)) return String(n);
    var d = "零一二三四五六七八九";
    if (n === 0) return d[0];
    if (n < 10) return d[n];
    if (n < 20) return "十" + (n % 10 ? d[n % 10] : "");
    if (n < 100) {
      var tens = Math.floor(n / 10), ones = n % 10;
      return d[tens] + "十" + (ones ? d[ones] : "");
    }
    var hundreds = Math.floor(n / 100), rem = n % 100;
    var out = d[hundreds] + "百";
    if (rem === 0) return out;
    if (rem < 10) return out + "零" + d[rem];
    var tens2 = Math.floor(rem / 10), ones2 = rem % 10;
    if (tens2 === 1) return out + "一十" + (ones2 ? d[ones2] : "");
    return out + d[tens2] + "十" + (ones2 ? d[ones2] : "");
  }
  // Expands abbreviated scripture citations (as 小智/Sage AI's freeform replies tend to write
  // them, e.g. "太28:19-20" or "约3:16") into the fully spoken Chinese form ("馬太福音二十八章
  // 十九到二十節" / "约翰福音三章十六节") — the book content's own 55 fixed chapters never use
  // this abbreviated arabic-numeral notation (already verified: 0 occurrences in either corpus),
  // so this only ever fires on the AI companion's dynamically generated text. Runs AFTER
  // stripScriptureRefParens() on purpose: that function only recognizes the already-fully-spelled-
  // out "書卷名+中文數字+章...節" form used by the book itself, so it correctly leaves this
  // abbreviated colon/arabic form untouched — if the order were reversed, the freshly-expanded
  // citation would then look exactly like the book's own skippable footnote citations and get
  // silently stripped instead of read aloud.
  function expandScriptureRefs(text, lang) {
    if (lang !== "zh" && lang !== "zs") return text;
    var alt = lang === "zs" ? BIBLE_ALT_ZS : BIBLE_ALT_ZH;
    var canon = lang === "zs" ? BIBLE_CANON_ZS : BIBLE_CANON_ZH;
    var jie = lang === "zs" ? "节" : "節";
    if (!alt) return text;
    var out = String(text || "");
    var reColon = new RegExp("(" + alt + ")\\s*([0-9]{1,3})\\s*[:：]\\s*([0-9]{1,3})(?:\\s*[-–~]\\s*([0-9]{1,3}))?", "g");
    var reZhang = new RegExp("(" + alt + ")\\s*([0-9]{1,3})\\s*章\\s*([0-9]{1,3})(?:\\s*[至到\\-–~]\\s*([0-9]{1,3}))?\\s*" + jie + "?", "g");
    function expand(m, book, chap, v1, v2) {
      var full = canon[book] || book;
      // 詩篇／诗篇的「篇」不是「章」——中文習慣說「詩篇六十二篇八節」，不是「詩篇六十二章八節」，
      // 這是聖經書卷裡唯一的例外（其餘65卷都用「章」），所以這裡單獨判斷書卷全名來換單位詞。
      var unit = (full === "詩篇" || full === "诗篇") ? "篇" : "章";
      var s = full + numToZh(chap) + unit + numToZh(v1);
      if (v2) s += "到" + numToZh(v2);
      return s + jie;
    }
    out = out.replace(reColon, expand);
    out = out.replace(reZhang, expand);
    return out;
  }
  // Strips emoji (and the invisible variation-selector/ZWJ codepoints that often ride along with
  // them) before TTS — 小智/Sage AI's replies sometimes end a sentence with a friendly emoji
  // (😊🙏✨❤️👍 etc.), which TTS engines otherwise mangle into an awkward spoken word/noise.
  // Deliberately narrow ranges (BMP Dingbats/Misc Symbols/Misc Symbols&Arrows + the supplementary-
  // plane pictograph blocks used by nearly all emoji) so this never touches meaningful punctuation
  // or symbols actually used in the book's own text (e.g. "→" U+2192 is in the Arrows block,
  // U+2190–21FF, which is intentionally NOT included here).
  var EMOJI_RE = /[\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u200D]|[\uD83C-\uD83E][\uDC00-\uDFFF]/g;
  function stripEmoji(text) {
    return String(text || "").replace(EMOJI_RE, "").replace(/[ \t]{2,}/g, " ");
  }
  function stripScriptureRefParens(text, lang) {
    var alt = lang === "en" ? BIBLE_ALT_EN : (lang === "zs" ? BIBLE_ALT_ZS : BIBLE_ALT_ZH);
    if (!alt) return text;
    var hasBookDigit = new RegExp("(" + alt + ")\\s*[0-9一二三四五六七八九十百千]");
    var refToken = lang === "en"
      ? new RegExp("(" + alt + ")\\s+[0-9]{1,3}\\s*[:：]\\s*[0-9]{1,3}(?:\\s*[-–~]\\s*[0-9]{1,3})?", "g")
      : new RegExp("(" + alt + ")\\s*[一二三四五六七八九十百千0-9]+\\s*章\\s*[一二三四五六七八九十百千0-9]*(?:\\s*[至到\\-–~]\\s*[一二三四五六七八九十百千0-9]+)?\\s*[節节]?", "g");
    return String(text || "").replace(/\s?[（(]([^（）()]*)[）)]/g, function (m, inner) {
      if (!hasBookDigit.test(inner)) return m; // no "book name + number" inside → not a reference, leave untouched
      var t = inner.replace(refToken, "");
      // NOTE: this connector-cleanup list must cover BOTH Traditional and Simplified forms of
      // every particle (與/与, 見/见, 節/节, 參/参, …) — a Simplified-only leftover here used to
      // make the SC edition wrongly conclude "something meaningful remains" and keep the whole
      // parenthetical un-stripped, even though the reference token itself had matched fine.
      t = lang === "en" ? t.replace(/\b(and|cf|see)\b/gi, "") : t.replace(/[、，,;；和與与及節节章篇上下至到參参见見cf]/gi, "");
      t = t.replace(/[\s\-–~:：]/g, "");
      return t.length ? m : ""; // anything meaningful left over → keep the whole parenthetical as-is
    });
  }

  function ttsPronounceFix(text) {
    if (!text) return text;
    var out = String(text);
    out = stripEmoji(out);
    out = stripScriptureRefParens(out, state.lang);
    out = expandScriptureRefs(out, state.lang);
    if (state.lang === "zh" || state.lang === "zs") {
      TTS_DIGIT_FIXES.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
      TTS_WEI_DA_FIX.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
      out = out.replace(TTS_ENUM_FIX, "第$1，");
    } else if (state.lang === "en") {
      TTS_DIGIT_FIXES_EN.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
    }
    var fixes = state.lang === "zs" ? TTS_FIX_ZS : (state.lang === "zh" ? TTS_FIX_ZH : null);
    if (!fixes) return out;
    for (var i = 0; i < fixes.length; i++) { out = out.split(fixes[i][0]).join(fixes[i][1]); }
    return out;
  }

  // `curKey` identifies WHAT is currently playing ("ch:ch01" for a chapter, "msg:<id>" for
  // one companion reply) so any number of 🔊 buttons across the app can each independently
  // know whether they're the one that's active, instead of there being only one hardcoded
  // chapter-toolbar button.
  var spk = {
    supported: (typeof window !== "undefined" && "speechSynthesis" in window),
    active: false, paused: false, loading: false, mode: "", queue: [], idx: 0, token: 0, curKey: null, audio: null, title: "",
  };

  function spkGetAudio() {
    if (!spk.audio) {
      spk.audio = new Audio();
      spk.audio.preload = "auto";
      try { spk.audio.playsInline = true; spk.audio.setAttribute("playsinline", ""); } catch (e) {}
    }
    return spk.audio;
  }
  function stripHtml(html) {
    var div = document.createElement("div");
    div.innerHTML = html || "";
    return (div.textContent || div.innerText || "").replace(/\s+/g, " ").trim();
  }
  // split plain text into speakable sentence-sized chunks (CJK + English enders).
  // Chunks are merged up to ~120 chars before cutting (not just at the first sentence-ender)
  // so a reading has fewer, longer pieces — fewer audio-source swaps, which is what actually
  // sounds like a "join" between chunks — matching the sister app 晨讀321's own chunking size.
  function spkChunks(text) {
    var t = String(text || "").replace(/\s+/g, " ").trim();
    if (!t) return [];
    var enders = "。！？；\n";
    var out = [], buf = "";
    for (var i = 0; i < t.length; i++) {
      buf += t[i];
      if (enders.indexOf(t[i]) >= 0 && buf.length >= 120) { out.push(buf); buf = ""; }
    }
    if (buf.trim()) out.push(buf);
    var fin = [];
    out.forEach(function (s) {
      if (/[a-zA-Z]/.test(s) && s.length > 260) {
        s.split(/(?<=[.!?])\s+/).forEach(function (p) { if (p.trim()) fin.push(p.trim()); });
      } else {
        fin.push(s);
      }
    });
    var out2 = [];
    fin.forEach(function (s) {
      while (s.length > 320) { out2.push(s.slice(0, 320)); s = s.slice(320); }
      if (s) out2.push(s);
    });
    return out2.length ? out2 : [t];
  }
  // 帶入「想更深」時，用自然口吻的引言句，而不是把題目/內容直接接在正文後面唸。
  var DEEPER_SPEAK_LEAD = {
    zh: "我們一起來想更深一點。",
    zs: "我们一起来想更深一点。",
    en: "Let's pause for a moment and think a bit deeper.",
  };
  // 確保每一段唸完都有明確的句尾標點，讓朗讀在段落／小標題／想更深之間有自然的停頓，
  // 而不是把不相干的句子直接黏在一起唸。
  function ttsEnsureEnd(s) {
    s = String(s || "").trim();
    if (!s) return "";
    if (!/[。！？；.!?;]$/.test(s)) s += (state.lang === "en" ? "." : "。");
    return s;
  }
  // English section headings are numbered "1. The Night…", "2. Emptying Himself…" — reading
  // the leading digit literally sounds robotic, so for English only, a leading "N. " is
  // swapped for its spoken ordinal ("First, The Night…"), matching the zh/zs TTS_ENUM_FIX's
  // "一、"→"第一，" treatment of the exact same fixed 10-section headings.
  var EN_ORDINALS = ["Zeroth", "First", "Second", "Third", "Fourth", "Fifth", "Sixth", "Seventh", "Eighth", "Ninth", "Tenth", "Eleventh", "Twelfth"];
  function ttsHeadingOrdinal(heading) {
    if (state.lang !== "en") return heading;
    var m = /^(\d{1,2})\.\s*/.exec(heading || "");
    if (!m) return heading;
    var n = parseInt(m[1], 10);
    var word = EN_ORDINALS[n] || (n + ".");
    return word + ", " + heading.slice(m[0].length);
  }
  function chapterSpeakChunks(ch) {
    var d = D();
    var bank = d.deeperBank || {};
    var anchors = ch.deeper || {};
    var lead = DEEPER_SPEAK_LEAD[state.lang] || DEEPER_SPEAK_LEAD.zh;
    function deeperSpeak(ids) {
      if (!ids || !ids.length) return "";
      var out = "";
      ids.forEach(function (id) {
        var it = bank[id];
        if (!it) return;
        out += " " + lead + " " + ttsEnsureEnd(it.q) + " " + ttsEnsureEnd(it.a);
      });
      return out;
    }
    var parts = [ttsEnsureEnd(stripHtml(ch.intro))];
    parts.push(deeperSpeak(anchors["intro"]));
    (ch.sections || []).forEach(function (s) {
      if (s.heading) parts.push(ttsEnsureEnd(ttsHeadingOrdinal(s.heading)));
      parts.push(ttsEnsureEnd(stripHtml(s.html)));
      parts.push(deeperSpeak(anchors[String(s.no)]));
    });
    return spkChunks(ttsPronounceFix(parts.join(" ")));
  }
  function ttsVoiceName() {
    var opts = TTS_VOICE_OPTIONS[state.lang] || TTS_VOICE_OPTIONS.zh;
    var chosenId = (state.user.ttsVoice && state.user.ttsVoice[state.lang]) || TTS_VOICE_DEFAULT[state.lang] || opts[0].id;
    var found = null;
    for (var i = 0; i < opts.length; i++) { if (opts[i].id === chosenId) { found = opts[i]; break; } }
    return (found || opts[0]).voice;
  }
  function setTtsVoice(lang, id) {
    if (!state.user.ttsVoice) state.user.ttsVoice = {};
    state.user.ttsVoice[lang] = id;
    saveUser();
    if (spk.active) spkStopAll(); // voice just changed — any in-progress playback was using the old one
  }

  // ---------------------------------------------------------------
  // Pre-download-ahead + progressive playback + background playback.
  //
  // Only the FIRST chunk needs to finish downloading before reading starts — there's no
  // "wait for the whole chapter" delay any more. While that first chunk plays, the next
  // couple of chunks are already being fetched in the background (a lookahead window, not
  // one-at-a-time-on-demand), so by the time the current chunk's audio ends, the next one
  // is normally already sitting in memory — that lookahead is what actually fixes the
  // reported "斷斷續續" choppiness (a live network round-trip used to sit between every
  // chunk because the old version only started fetching chunk N+1 once chunk N had already
  // finished playing). Every chunk fetched is also cached on-device via the Cache Storage
  // API, so replaying the same reading later — even offline — needs no network at all. A
  // single long-lived <audio> element is reused for every chunk (its src is swapped, the
  // element itself never recreated) — that's what lets iOS keep audio going in the
  // background / on the lock screen, backed by the MediaSession wiring below.
  // ---------------------------------------------------------------
  var TTS_AUDIO_CACHE = "l321-tts-audio-v3";
  var TTS_LOOKAHEAD = 2; // how many chunks beyond the one currently playing to keep pre-fetched
  function ttsCacheKeyFor(voice, rate, text) {
    // Cache Storage keys on a Request/URL, not a hash — synthesize one deterministically
    // from voice+rate+text (no hashing library needed) so identical text always maps to
    // the same cache entry, and a changed voice/rate never collides with an old one.
    var h = 0;
    for (var i = 0; i < text.length; i++) { h = ((h << 5) - h + text.charCodeAt(i)) | 0; }
    return TTS_ENDPOINT + "?voice=" + encodeURIComponent(voice) + "&rate=" + encodeURIComponent(rate) + "&h=" + h + "&n=" + text.length;
  }
  // In-flight de-dupe: the chunk currently being "stepped to" and the background lookahead
  // prefetch can otherwise both go to fetch the very same not-yet-cached piece at once —
  // this makes the second caller just await the first call's own promise instead of firing
  // a duplicate network request.
  var TTS_INFLIGHT = {};
  // v1.3.14／v1.3.15：使用者反映「開啟App後切換到簡體版」朗讀常常直接變成裝置內建的機械音，
  // 抓不到真人語音（雲帆）；但接著切到繁體版很快就能聽到真人語音（雲哲），這時候再切回簡體版
  // 也能聽到雲帆了。這個「一整個App session裡永遠只有第一次朗讀請求會失敗、之後不管切到哪個
  // 語言都正常」的模式，很清楚指向問題出在Worker本身「被叫醒」的冷啟動延遲——第一次呼叫要
  // 花比較久時間把底層跟Azure的連線／授權建立起來，跟使用者選的是哪個語言／哪個聲音無關。
  // v1.3.14先加了「失敗後等一下重試一次」，但實測這樣還不夠（重試的等待時間或次數不足以
  // 撐過真正的冷啟動）。v1.3.15雙管齊下：(1)重試次數加到2次、等待時間也拉長且遞增
  // （800ms、1600ms），給冷啟動更多機會恢復；(2)App一開啟就在背景先送一個小小的「暖身」
  // 請求到語音伺服器（不等結果、不影響任何畫面或播放），提早把冷啟動的延遲吃掉，讓使用者
  // 真正點下🔊朗讀的時候，Worker多半已經醒了。
  var TTS_RETRY_DELAYS_MS = [800, 1600];
  function yunFetchOnce(voice, rate, piece) {
    return fetch(TTS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ voice: voice, rate: rate, sil: TTS_SIL_SENTENCE, silc: TTS_SIL_COMMA, sile: TTS_SIL_ENUM, text: piece }),
    }).then(function (res) {
      if (!res.ok) throw new Error("TTS HTTP " + res.status);
      return res;
    });
  }
  function yunFetchWithRetry(voice, rate, piece) {
    function attempt(delaysLeft, lastErr) {
      if (!delaysLeft.length) return yunFetchOnce(voice, rate, piece); // final try — let its own rejection propagate
      return yunFetchOnce(voice, rate, piece).catch(function (err) {
        return new Promise(function (resolve) { setTimeout(resolve, delaysLeft[0]); })
          .then(function () { return attempt(delaysLeft.slice(1), err); });
      });
    }
    return attempt(TTS_RETRY_DELAYS_MS.slice(), null);
  }
  // Fire-and-forget "warm up" ping — sent once as soon as the app boots, well before the user
  // ever taps 🔊, so a slow first connection to the Worker (see comment above) has already
  // happened in the background by the time a real reading is requested. Uses a throwaway
  // one-character piece of text with the current language's default voice; result (success or
  // failure) is silently ignored either way — this must never surface an error or delay boot.
  function ttsWarmUp() {
    try {
      var opts = TTS_VOICE_OPTIONS[state.lang] || TTS_VOICE_OPTIONS.zh;
      var defId = TTS_VOICE_DEFAULT[state.lang] || (opts[0] && opts[0].id);
      var found = null;
      for (var i = 0; i < opts.length; i++) { if (opts[i].id === defId) { found = opts[i]; break; } }
      var voice = (found || opts[0]).voice;
      yunFetchOnce(voice, "+0%", "。").catch(function () {});
    } catch (e) {}
  }
  function yunFetchBuffer(piece) {
    var voice = ttsVoiceName(), rate = "+0%";
    var key = ttsCacheKeyFor(voice, rate, piece);
    if (TTS_INFLIGHT[key]) return TTS_INFLIGHT[key];
    var canCache = ("caches" in window) && ("Request" in window);
    var req = canCache ? new Request(key) : null;
    var openCache = canCache ? caches.open(TTS_AUDIO_CACHE).catch(function () { return null; }) : Promise.resolve(null);
    var p = openCache.then(function (cache) {
      var matchP = (cache && req) ? cache.match(req) : Promise.resolve(null);
      return matchP.then(function (cached) {
        if (cached) return cached.arrayBuffer();
        return yunFetchWithRetry(voice, rate, piece).then(function (res) {
          var resForCache = (cache && req) ? res.clone() : null;
          return res.arrayBuffer().then(function (buf) {
            // Wait for the cache write to actually land before resolving — otherwise an
            // immediate re-read (e.g. re-opening the same chapter right away) can race
            // ahead of the write and miss the cache even though this exact chunk was just
            // fetched a moment ago.
            if (resForCache) {
              return Promise.resolve(cache.put(req, resForCache)).catch(function () {}).then(function () { return buf; });
            }
            return buf;
          });
        });
      });
    });
    p.then(function () { delete TTS_INFLIGHT[key]; }, function () { delete TTS_INFLIGHT[key]; });
    TTS_INFLIGHT[key] = p;
    return p;
  }
  // Makes sure the chunks from spk.idx up to +TTS_LOOKAHEAD are already being fetched (fire
  // and forget — failures here are silently ignored, spkAdvanceAzure will hit the same
  // network error again for real, in order, when it actually gets to that chunk).
  function ttsPrefetchAhead(myToken) {
    for (var d = 1; d <= TTS_LOOKAHEAD; d++) {
      var i = spk.idx + d;
      if (i >= spk.queue.length) break;
      (function (piece) {
        yunFetchBuffer(piece).catch(function () {});
      })(spk.queue[i]);
    }
    void myToken; // kept for symmetry/future use — prefetch itself is token-agnostic (its results just sit in cache)
  }
  // Plays spk.queue[spk.idx], then on "ended" advances to the next chunk — reusing the same
  // <audio> element throughout. Combined with ttsPrefetchAhead() above, only the very first
  // chunk is ever waited on "cold"; every later chunk is normally already fetched by the
  // time it's needed.
  function spkAdvanceAzure(myToken) {
    if (myToken !== spk.token) return;
    if (spk.idx >= spk.queue.length) { spkStopAll(); return; }
    var first = (spk.idx === 0);
    var piece = spk.queue[spk.idx];
    spk.loading = first;
    if (first) updateSpeakButtons();
    yunFetchBuffer(piece).then(function (buf) {
      if (myToken !== spk.token) return;
      spk.loading = false;
      ttsPrefetchAhead(myToken);
      var url;
      try { url = URL.createObjectURL(new Blob([buf], { type: "audio/mpeg" })); } catch (e) { spkStopAll(); return; }
      var a = spkGetAudio();
      var oldSrc = a.src;
      a.onended = null; a.onerror = null;
      a.src = url;
      if (oldSrc) { try { URL.revokeObjectURL(oldSrc); } catch (e) {} }
      a.onended = function () { if (myToken === spk.token) { spk.idx++; spkAdvanceAzure(myToken); } };
      a.onerror = function () {
        if (myToken !== spk.token) return;
        if (first) { spk.mode = "native"; spkPlayNativeQueue(myToken); }
        else { spk.idx++; spkAdvanceAzure(myToken); } // a mid-reading chunk failed to decode — skip it, keep going
      };
      if (first) setupMediaSession(spk.title);
      try { if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "playing"; } catch (e) {}
      var p = a.play();
      if (p && p.catch) {
        p.catch(function () {
          if (myToken !== spk.token) return;
          if (first) { spk.mode = "native"; spkPlayNativeQueue(myToken); }
          else { spk.idx++; spkAdvanceAzure(myToken); }
        });
      }
      updateSpeakButtons();
    }).catch(function () {
      if (myToken !== spk.token) return;
      spk.loading = false;
      if (first) { spk.mode = "native"; spkPlayNativeQueue(myToken); }
      else { spk.idx++; spkAdvanceAzure(myToken); } // network hiccup mid-reading — skip this one, don't hard-stop
    });
  }
  function setupMediaSession(title) {
    try {
      if (!("mediaSession" in navigator) || typeof MediaMetadata === "undefined") return;
      navigator.mediaSession.metadata = new MediaMetadata({ title: title || t().brand, artist: t().brand });
      navigator.mediaSession.playbackState = "playing";
      navigator.mediaSession.setActionHandler("play", function () { try { spkGetAudio().play(); } catch (e) {} });
      navigator.mediaSession.setActionHandler("pause", function () { try { spkGetAudio().pause(); } catch (e) {} });
      navigator.mediaSession.setActionHandler("stop", function () { spkStopAll(); });
    } catch (e) {}
  }
  // Every 🔊 button in the currently-rendered view (the chapter toolbar's, or one per
  // companion reply) carries a data-speak-key; whichever one matches spk.curKey shows
  // playing/paused, every other one shows idle — so any number of them can coexist.
  function updateSpeakButtons() {
    qsa("[data-speak-key]").forEach(function (btn) {
      var key = btn.getAttribute("data-speak-key");
      if (spk.active && spk.curKey === key) {
        if (spk.loading) {
          btn.setAttribute("data-state", "loading"); btn.textContent = "⏳"; btn.setAttribute("aria-label", t().ttsLoading);
          return;
        }
        btn.setAttribute("data-state", spk.paused ? "paused" : "playing");
        btn.textContent = spk.paused ? "▶" : "⏸";
        btn.setAttribute("aria-label", spk.paused ? t().resumeAloud : t().pauseAloud);
      } else {
        btn.setAttribute("data-state", "idle");
        btn.textContent = "🔊";
        btn.setAttribute("aria-label", t().readAloud);
      }
    });
  }
  function spkStopAll() {
    spk.token++;
    spk.active = false; spk.paused = false; spk.loading = false; spk.mode = ""; spk.queue = []; spk.idx = 0; spk.curKey = null; spk.title = "";
    try {
      if (spk.audio) {
        spk.audio.pause(); spk.audio.onended = null; spk.audio.onerror = null;
        if (spk.audio.src) { URL.revokeObjectURL(spk.audio.src); spk.audio.removeAttribute("src"); }
      }
    } catch (e) {}
    try { window.speechSynthesis && window.speechSynthesis.cancel(); } catch (e) {}
    try { if ("mediaSession" in navigator) navigator.mediaSession.playbackState = "none"; } catch (e) {}
    updateSpeakButtons();
  }
  function spkPlayNativeQueue(myToken) {
    if (myToken !== spk.token || spk.paused) return;
    if (spk.idx >= spk.queue.length) { spkStopAll(); return; }
    if (!spk.supported) { spkStopAll(); uiToast(t().ttsUnsupported); return; }
    var utter = new SpeechSynthesisUtterance(spk.queue[spk.idx]);
    utter.lang = state.lang === "en" ? "en-US" : (state.lang === "zs" ? "zh-CN" : "zh-TW");
    utter.onend = function () { if (myToken === spk.token && !spk.paused) { spk.idx++; spkPlayNativeQueue(myToken); } };
    utter.onerror = function () { if (myToken === spk.token) spkStopAll(); };
    try { window.speechSynthesis.speak(utter); } catch (e) { spkStopAll(); }
  }
  // key: a string identifying what's playing ("ch:ch01" / "msg:<id>") so its button(s) can
  // be found again later. buildQueue(): returns the array of text chunks to speak. title:
  // shown on the lock-screen "now playing" card via MediaSession.
  function speakStart(key, queue, title) {
    spk.token++;
    var myToken = spk.token;
    if (!queue || !queue.length) return;
    spk.queue = queue; spk.idx = 0; spk.active = true; spk.paused = false; spk.loading = true; spk.curKey = key; spk.mode = "azure"; spk.title = title || "";
    updateSpeakButtons();
    spkAdvanceAzure(myToken);
  }
  function speakToggle(key, buildQueue, title) {
    if (spk.active && spk.curKey === key) {
      spk.paused = !spk.paused;
      if (spk.paused) {
        if (spk.mode === "native") { try { window.speechSynthesis.pause(); } catch (e) {} }
        else { try { spkGetAudio().pause(); } catch (e) {} }
      } else {
        if (spk.mode === "native") { try { window.speechSynthesis.resume(); } catch (e) {} spkPlayNativeQueue(spk.token); }
        else { try { spkGetAudio().play(); } catch (e) {} }
      }
      updateSpeakButtons();
    } else {
      spkStopAll();
      speakStart(key, buildQueue(), title);
    }
  }
  function speakToggleForChapter(chId) {
    var d = D();
    var ch = d.chapters[chId];
    if (!ch) return;
    speakToggle("ch:" + chId, function () { return chapterSpeakChunks(D().chapters[chId]); }, ch.numFull + "　" + ch.title);
  }
  window.speakToggleForChapter = speakToggleForChapter;
  // Reads one companion reply aloud — reuses mdToHtml()+stripHtml() to turn the markdown
  // back into clean spoken text (headers/bold/table syntax stripped, not read as symbols),
  // then the same pronunciation-fix + chunking pipeline as chapter reading.
  function speakToggleForMsg(mi) {
    var m = chatSession.messages[mi];
    if (!m || m.role !== "ai" || m.pending) return;
    if (!m.id) m.id = newMsgId();
    var plain = stripHtml(mdToHtml(m.text));
    speakToggle("msg:" + m.id, function () { return spkChunks(ttsPronounceFix(plain)); }, t().companionTitle);
  }
  function uiToast(msg) {
    try {
      var el = document.createElement("div");
      el.className = "uitoast";
      el.textContent = msg;
      document.body.appendChild(el);
      setTimeout(function () { el.remove(); }, 2200);
    } catch (e) {}
  }

  function userDefaults() {
    return {
      readChapters: {},      // chId -> {openedAt, lastSection}
      completedChapters: {}, // chId -> completedAt
      revisits: {},          // chId -> count
      deeperOpened: {},       // itemId -> true
      highlights: {},        // chId -> [{lang, secNo, idx, text, at}]
      declarations: [],      // {chId, chTitle, text, at}
      checklist: {},         // chId -> {itemId: bool}
      discussionDone: {},    // chId -> {qno: bool}
      favorites: [],          // [{msgId, chId, chTitle, question, answer, at}] — saved Xiao Zhi replies
      theme: "auto",
      ttsVoice: { zh: "yunjhe", zs: "yunfan", en: "andrew" }, // per-language chosen 🔊 voice id (see TTS_VOICE_OPTIONS)
    };
  }
  // Merge saved data over the defaults so a returning user's older localStorage blob
  // (saved before a new field like `favorites` existed) doesn't end up missing it.
  function loadUser() {
    var defaults = userDefaults();
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        var saved = JSON.parse(raw);
        for (var k in defaults) { if (!(k in saved)) saved[k] = defaults[k]; }
        return saved;
      }
    } catch (e) {}
    return defaults;
  }
  function saveUser() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state.user)); } catch (e) {}
  }

  // ---------------------------------------------------------------
  // Data loading
  // ---------------------------------------------------------------
  function loadData(lang) {
    if (state.data[lang]) return Promise.resolve(state.data[lang]);
    return fetch("data." + lang + ".json").then(function (r) {
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
  // Small, dependency-free Markdown -> HTML renderer for AI chat replies
  // (headers, bold/italic, blockquotes, tables, hr, lists, inline code).
  // Everything is esc()'d first so no HTML/script can be injected via a reply.
  function mdInline(s) {
    s = esc(s);
    s = s.replace(/`([^`]+)`/g, "<code>$1</code>");
    s = s.replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>");
    s = s.replace(/(^|[^*])\*([^*\n]+)\*(?!\*)/g, "$1<i>$2</i>");
    return s;
  }
  function mdToHtml(text) {
    var lines = String(text || "").replace(/\r\n/g, "\n").split("\n");
    var html = "", i = 0, inList = false, inTable = false;
    function closeList() { if (inList) { html += "</ul>"; inList = false; } }
    function closeTable() { if (inTable) { html += "</table>"; inTable = false; } }
    while (i < lines.length) {
      var line = lines[i];
      var h = line.match(/^(#{1,4})\s+(.*)$/);
      if (h) {
        closeList(); closeTable();
        var lvl = Math.min(h[1].length + 3, 6); // markdown h1-h4 -> html h4-h6, keeps chat-bubble scale sane
        html += "<h" + lvl + ">" + mdInline(h[2].trim()) + "</h" + lvl + ">";
        i++; continue;
      }
      if (/^\s*(-{3,}|\*{3,})\s*$/.test(line)) {
        closeList(); closeTable();
        html += "<hr>"; i++; continue;
      }
      var bq = line.match(/^>\s?(.*)$/);
      if (bq) {
        closeList(); closeTable();
        var qlines = [bq[1]];
        i++;
        while (i < lines.length && /^>\s?/.test(lines[i])) { qlines.push(lines[i].replace(/^>\s?/, "")); i++; }
        html += "<blockquote>" + qlines.map(mdInline).join("<br>") + "</blockquote>";
        continue;
      }
      // table: a header row followed by a |---|---| separator row
      if (/^\s*\|.*\|\s*$/.test(line) && lines[i + 1] && /^\s*\|?[\s:|-]+\|[\s:|-]*\|?\s*$/.test(lines[i + 1])) {
        closeList();
        var headCells = line.trim().replace(/^\||\|$/g, "").split("|").map(function (c) { return c.trim(); });
        html += '<div class="msg-table-wrap"><table><thead><tr>' + headCells.map(function (c) { return "<th>" + mdInline(c) + "</th>"; }).join("") + "</tr></thead><tbody>";
        i += 2;
        while (i < lines.length && /^\s*\|.*\|\s*$/.test(lines[i])) {
          var cells = lines[i].trim().replace(/^\||\|$/g, "").split("|").map(function (c) { return c.trim(); });
          html += "<tr>" + cells.map(function (c) { return "<td>" + mdInline(c) + "</td>"; }).join("") + "</tr>";
          i++;
        }
        html += "</tbody></table></div>";
        continue;
      }
      var li = line.match(/^\s*[-*•]\s+(.*)$/);
      if (li) {
        closeTable();
        if (!inList) { html += "<ul>"; inList = true; }
        html += "<li>" + mdInline(li[1]) + "</li>";
        i++; continue;
      }
      if (!line.trim()) { closeList(); closeTable(); i++; continue; }
      closeList(); closeTable();
      html += "<p>" + mdInline(line.trim()) + "</p>";
      i++;
    }
    closeList(); closeTable();
    return html || esc(text || "");
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

  window.L321 = {
    state: state, saveUser: saveUser, UI: UI, mdToHtml: mdToHtml, ttsPronounceFix: ttsPronounceFix, chapterSpeakChunks: chapterSpeakChunks,
    spk: spk, speakToggleForChapter: speakToggleForChapter, speakToggleForMsg: speakToggleForMsg,
    yunFetchBuffer: yunFetchBuffer, TTS_AUDIO_CACHE: TTS_AUDIO_CACHE, ttsVoiceName: ttsVoiceName,
    TTS_VOICE_OPTIONS: TTS_VOICE_OPTIONS, setTtsVoice: setTtsVoice,
    yunFetchWithRetry: yunFetchWithRetry, ttsWarmUp: ttsWarmUp, TTS_RETRY_DELAYS_MS: TTS_RETRY_DELAYS_MS,
    // getter (not a direct reference) because `chatSession`/`renderCompanion` are assigned further
    // down this same IIFE, after this object literal already runs — a plain reference here would
    // capture `undefined` for anything not yet hoisted-with-value at this point in the file.
    getChatSession: function () { return chatSession; },
    renderCompanion: function (view, chId) { return renderCompanion(view, chId); },
  };
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
    if (spk.active) {
      var stillOnSameChapter = root === "course" && parts[1] && ("ch:" + parts[1]) === spk.curKey;
      var stillOnCompanion = root === "companion" && spk.curKey && spk.curKey.indexOf("msg:") === 0;
      if (!stillOnSameChapter && !stillOnCompanion) spkStopAll();
    }
    var view = qs("#view");
    view.innerHTML = "";
    updateTabbar(root);
    updateLangSwitch();
    document.documentElement.setAttribute("data-lang", state.lang);
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
    html += '<div class="hero-badge"><img src="icon-192.png" alt="' + esc(d.appName || "321領導力") + '">';
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
      html += '<div class="meta"><div class="t">' + esc(p.part_no) + '　' + esc(d.chapters[chs[0]].partTitle.replace(/^(第[一二三四五六七八九十]+部|Part\s*\d+\s*[—-]?)\s*/, "")) + '</div>';
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
      html += '<summary><span class="pn">' + esc(p.part_no) + '</span><span class="pt">' + esc(partTitle.replace(/^(第[一二三四五六七八九十]+部|Part\s*\d+\s*[—-]?)\s*/, "")) + '</span><span class="muted">' + doneInPart + '/5</span></summary>';
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
        // "想更深" answer text uses the SAME <p data-sec> shape as every other reader paragraph
        // (sec is a unique "deeper:<id>" key) so it needs no separate click-wiring logic at
        // all: it's split into sentence spans and picked up automatically by the existing
        // ".reader p[data-sec]" tap-to-highlight/reflect loop below.
        var dsec = "deeper:" + id;
        out += '<details class="deeper" data-deeper-id="' + id + '"' + opened + '>';
        out += '<summary><span class="q">' + esc(it.q) + '</span><span class="chev" aria-hidden="true"></span></summary>';
        out += '<div class="a"><span class="tierbadge tier' + it.tier + '">' + esc(t().tier[it.tier]) + '</span>';
        out += '<p data-sec="' + dsec + '">' + esc(it.a) + '</p>';
        out += '<div class="refs">' + esc(it.refs) + '</div></div>';
        out += '</details>';
      });
      return out;
    }

    function withSecAttr(html, secKey) {
      // just tag each top-level <p>...</p> with which section it belongs to — sentence
      // splitting and per-sentence highlight-state/idx assignment all happen later, once this
      // HTML is actually in the DOM (see the ".reader p[data-sec]" wiring loop below).
      return html.replace(/<p(\s[^>]*)?>/g, function (m) {
        return m.slice(0, -1) + ' data-sec="' + secKey + '">';
      });
    }

    var html = "";
    html += '<div class="chtoolbar">';
    html += '<a class="chtb-btn" href="#/today" aria-label="' + esc(t().backHome) + '">🏠</a>';
    html += '<a class="chtb-btn" href="#/course" aria-label="' + esc(t().backToc) + '">☰</a>';
    html += '<span class="chtb-spacer"></span>';
    html += '<button class="chtb-btn" id="chSpeakBtn" data-speak-key="ch:' + esc(chId) + '" data-state="idle" aria-label="' + esc(t().readAloud) + '">🔊</button>';
    html += '<button class="chtb-btn" id="chFontBtn" onclick="cycleFont()" aria-label="' + esc(t().fontSizeLabel) + '">A⁺</button>';
    html += '</div>';
    html += '<div class="chhead">';
    html += '<div class="pn">' + esc(ch.partTitle) + '</div>';
    html += '<h1>' + esc(ch.numFull) + '</h1>';
    html += '<h2 style="font-size:17px;color:var(--ink-soft);margin:0 0 10px;">' + esc(ch.title) + '</h2>';
    html += '</div>';

    html += '<div class="reader">';
    var hasAnyHighlight = Object.keys(state.user.highlights).some(function (k) { return (state.user.highlights[k] || []).length > 0; });
    if (!hasAnyHighlight) html += '<div class="hl-hint">' + esc(t().hlHint) + '</div>';
    html += withSecAttr(ch.intro, "intro");
    html += deeperHtml(anchors["intro"]);
    ch.sections.forEach(function (s) {
      html += "<h2>" + esc(s.heading) + "</h2>";
      html += withSecAttr(s.html, String(s.no));
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

    // wire read-aloud button + sync its state if this chapter is already speaking
    var speakBtn = qs("#chSpeakBtn", view);
    if (speakBtn) {
      speakBtn.addEventListener("click", function () { speakToggleForChapter(chId); });
      updateSpeakButtons();
    }

    // wire deeper open tracking
    qsa("details.deeper", view).forEach(function (det) {
      det.addEventListener("toggle", function () {
        if (det.open) {
          state.user.deeperOpened[det.getAttribute("data-deeper-id")] = true;
          saveUser();
        }
      });
    });
    // wire highlight taps + the "write your reflection" bottom sheet — matching 晨讀321's own
    // behavior, but at SENTENCE granularity, not whole-paragraph: each paragraph is split into
    // individual sentences (on 。！？.!? plus any immediately-following closing quote/bracket),
    // each becoming its own tappable <span class="sent">. Tap an unhighlighted sentence once to
    // highlight just that sentence; tap an already-highlighted sentence again to open the
    // reflection sheet. Removing a highlight is only done from inside that sheet's "移除畫線"
    // button — a bare re-tap no longer un-highlights. Highlight identity is the triple
    // (sec, pidx, idx): sec = section key ("intro"/"1".."10"/"deeper:<id>"), pidx = which
    // paragraph within that section (0-based), idx = which sentence within that paragraph.
    var SENT_END_RE = /[。！？.!?]/;
    function isClosingPunct(ch) {
      return ch === "」" || ch === "』" || ch === "”" || ch === "’" || ch === '"' || ch === "'" || ch === ")" || ch === "）" || ch === "》" || ch === "】";
    }
    function splitIntoSentenceGroups(p) {
      // walk p's existing child nodes (a mix of text nodes and rare inline elements like the
      // <span dir="rtl"> Greek-word aside) and group them into per-sentence node arrays —
      // splitting only inside text nodes, never inside an element, so an inline tag always
      // stays fully attached to whichever sentence it falls in.
      var kids = Array.prototype.slice.call(p.childNodes);
      var groups = [[]];
      kids.forEach(function (node) {
        if (node.nodeType === 3) {
          var text = node.textContent;
          var buf = "";
          for (var i = 0; i < text.length; i++) {
            buf += text[i];
            if (SENT_END_RE.test(text[i])) {
              var j = i + 1;
              while (j < text.length && isClosingPunct(text[j])) { buf += text[j]; j++; }
              i = j - 1;
              groups[groups.length - 1].push(document.createTextNode(buf));
              buf = "";
              groups.push([]);
            }
          }
          if (buf) groups[groups.length - 1].push(document.createTextNode(buf));
        } else {
          groups[groups.length - 1].push(node);
        }
      });
      groups = groups.filter(function (g) { return g.length > 0; });
      if (!groups.length) groups = [[document.createTextNode("")]];
      return groups;
    }
    function findHighlight(sec, pidx, idx) {
      return (state.user.highlights[chId] || []).find(function (h) { return h.sec === sec && h.pidx === pidx && h.idx === idx; });
    }
    function hlNoteKey(sec, pidx, idx) { return sec + ":" + pidx + ":" + idx; }
    function findSentSpan(p, idx) { return p.querySelector('.sent[data-idx="' + idx + '"]'); }
    // 一條畫線可以涵蓋同一段裡連續的好幾句（h.sp＝句數，預設 1）；這裡找出「涵蓋這一句」的那條畫線
    function coverHl(sec, pidx, idx) {
      return (state.user.highlights[chId] || []).find(function (h) { return h.sec === sec && h.pidx === pidx && idx >= h.idx && idx < h.idx + (h.sp || 1); });
    }
    function repaintPara(p, sec, pidx) {
      Array.prototype.forEach.call(p.querySelectorAll(".sent"), function (s2) {
        var i2 = parseInt(s2.getAttribute("data-idx"), 10), c = coverHl(sec, pidx, i2);
        if (c) { s2.setAttribute("data-hl", "1"); s2.setAttribute("data-color", c.color || "gold"); }
        else { s2.removeAttribute("data-hl"); s2.removeAttribute("data-color"); }
      });
    }
    function renderHlNote(p, sec, pidx, idx) {
      // several sentences within the SAME paragraph can each carry their own note, so notes
      // are identified individually (data-note-key) and kept stacked in sentence order right
      // after the paragraph, instead of assuming there's only ever one note per paragraph.
      var key = hlNoteKey(sec, pidx, idx);
      var existing = p.parentNode.querySelector('.hl-note[data-note-key="' + key + '"]');
      if (existing) existing.remove();
      var h = findHighlight(sec, pidx, idx);
      if (!h || !h.note) return;
      var noteEl = document.createElement("div");
      noteEl.className = "hl-note";
      noteEl.setAttribute("data-note-key", key);
      noteEl.setAttribute("data-note-idx", idx);
      noteEl.setAttribute("data-color", h.color || "gold");
      noteEl.textContent = "📝 " + h.note;
      var anchor = p, sib = p.nextElementSibling;
      while (sib && sib.classList && sib.classList.contains("hl-note") && parseInt(sib.getAttribute("data-note-idx"), 10) < idx) {
        anchor = sib; sib = sib.nextElementSibling;
      }
      anchor.parentNode.insertBefore(noteEl, anchor.nextSibling);
      noteEl.addEventListener("click", function () { openHlSheet(findSentSpan(p, idx), sec, pidx, idx); });
    }
    function buildAskXzQuestion(sentence, note) {
      var numFull = ch.numFull;
      if (state.lang === "en") {
        return "I'm reading " + numFull + ", and I highlighted this line: “" + sentence + "”. " +
          (note ? ("My reflection: “" + note + "”. ") : "") +
          "Please help me understand what this line means for me more deeply, and help me keep my focus on Jesus.";
      }
      if (state.lang === "zs") {
        return "我正在读" + numFull + "，画了这一句：「" + sentence + "」。" +
          (note ? ("我的领受是：「" + note + "」。") : "") +
          "请帮我更深地明白这句话对我的意思，也带我把焦点对准耶稣。";
      }
      return "我正在讀" + numFull + "，畫了這一句：「" + sentence + "」。" +
        (note ? ("我的領受是：「" + note + "」。") : "") +
        "請幫我更深地明白這句話對我的意思，也帶我把焦點對準耶穌。";
    }
    function closeHlSheet() {
      var m = qs(".hlsheet-mask");
      if (m) m.remove();
    }
    function openHlSheet(span, sec, pidx, idx) {
      var h = findHighlight(sec, pidx, idx);
      if (!h || !span) return;
      closeHlSheet();
      var p = span.parentNode;
      function spanText(hh) { var o = ""; for (var d = 0; d < ((hh && hh.sp) || 1); d++) { var s3 = findSentSpan(p, idx + d); if (s3) o += s3.textContent; } return o.replace(/\s+/g, " ").trim(); }
      var sentence = spanText(h);
      var cardRef = ch.numFull + " " + ch.title;
      function shareTextOf() { var hh = findHighlight(sec, pidx, idx), n2 = (ta.value || "").trim(); return "「" + sentence + "」\n—— " + cardRef + (n2 ? "\n\n" + n2 : "") + "\n\n" + t().brand; }
      var curColor = h.color || "gold";
      var colorNames = HL_COLOR_NAMES[state.lang] || HL_COLOR_NAMES.zh;
      var colorsHtml = '<div class="hlsheet-colorrow">' +
        '<span class="hlsheet-colorlabel">' + esc(t().hlColorLabel) + '</span>' +
        '<div class="hlsheet-colors">' + HL_COLORS.map(function (c) {
          return '<button type="button" class="hlswatch' + (c.id === curColor ? " active" : "") + '" data-color="' + c.id + '" style="background:' + c.dot + '" aria-label="' + esc(colorNames[c.id] || c.id) + '"></button>';
        }).join("") + '</div></div>';
      var mask = document.createElement("div");
      mask.className = "hlsheet-mask";
      mask.innerHTML = '<div class="hlsheet-card">' +
        '<div class="hlsheet-title">' + esc(t().hlSheetTitle) + '</div>' +
        '<div class="hlsheet-quote">' + esc(sentence) + '</div>' +
        colorsHtml +
        '<div class="hlsheet-spanrow"><span class="hlsheet-colorlabel">' + esc(tx("hlSpan")) + '</span>' +
        '<button type="button" class="btn" data-act="spm">－</button><span class="hlsheet-num">' + esc(tx("spanUnit", h.sp || 1)) + '</span><button type="button" class="btn" data-act="spp">＋</button>' +
        '<button type="button" class="btn" data-act="spall">' + esc(tx("spanP")) + '</button></div>' +
        '<textarea class="hlsheet-ta" placeholder="' + esc(t().hlReflectionPlaceholder) + '">' + esc(h.note || "") + '</textarea>' +
        '<div class="hlsheet-acts">' +
        '<button type="button" data-act="save" class="btn gold">' + esc(t().hlSaveReflection) + '</button>' +
        '<button type="button" data-act="ask" class="btn primary">✨ ' + esc(t().hlAskXz) + '</button>' +
        '</div>' +
        '<div class="hlsheet-acts2">' +
        '<button type="button" data-act="mkcard" class="btn gold">🖼 ' + esc(tx("makeCard")) + '</button>' +
        '<button type="button" data-act="read" class="btn">🔊 ' + esc(tx("readThis")) + '</button>' +
        '<button type="button" data-act="copy" class="btn">⧉ ' + esc(tx("copy")) + '</button>' +
        '<button type="button" data-act="share" class="btn">↗ ' + esc(tx("share")) + '</button>' +
        '</div><div class="hlsheet-acts2">' +
        '<button type="button" data-act="clearnote" class="btn">' + esc(t().hlClearNote) + '</button>' +
        '<button type="button" data-act="remove" class="btn danger">' + esc(t().hlRemoveHighlight) + '</button>' +
        '<button type="button" data-act="cancel" class="btn">' + esc(t().hlCancel) + '</button>' +
        '</div></div>';
      document.body.appendChild(mask);
      mask.addEventListener("click", function (e) { if (e.target === mask) closeHlSheet(); });
      var ta = mask.querySelector(".hlsheet-ta");
      setTimeout(function () { ta.focus(); }, 60);
      // color picker — applies immediately on tap (a categorization choice, not something that
      // needs a separate "save" step), and updates the sentence's highlight + any of its notes
      // on screen right away so the reader sees the new color without reopening the sheet.
      Array.prototype.forEach.call(mask.querySelectorAll(".hlswatch"), function (btn) {
        btn.addEventListener("click", function () {
          var color = btn.getAttribute("data-color");
          var hh = findHighlight(sec, pidx, idx);
          if (hh) { hh.color = color; saveUser(); }
          repaintPara(p, sec, pidx);
          var key = hlNoteKey(sec, pidx, idx);
          var noteEl = p.parentNode.querySelector('.hl-note[data-note-key="' + key + '"]');
          if (noteEl) noteEl.setAttribute("data-color", color);
          Array.prototype.forEach.call(mask.querySelectorAll(".hlswatch"), function (b) {
            b.classList.toggle("active", b === btn);
          });
        });
      });
      mask.querySelector('[data-act="save"]').addEventListener("click", function () {
        var hh = findHighlight(sec, pidx, idx);
        if (hh) { hh.note = (ta.value || "").trim(); saveUser(); }
        closeHlSheet();
        renderHlNote(p, sec, pidx, idx);
      });
      mask.querySelector('[data-act="ask"]').addEventListener("click", function () {
        var note = (ta.value || "").trim();
        var hh = findHighlight(sec, pidx, idx);
        if (hh) { hh.note = note; saveUser(); } // keep whatever reflection was just typed, same as Save would
        pendingAsk = buildAskXzQuestion(spanText(findHighlight(sec, pidx, idx)), note);
        pendingAskAutoSend = true;
        closeHlSheet();
        navigate("#/companion/" + chId);
      });
      mask.querySelector('[data-act="clearnote"]').addEventListener("click", function () {
        var hh = findHighlight(sec, pidx, idx);
        if (hh) { hh.note = ""; saveUser(); }
        closeHlSheet();
        renderHlNote(p, sec, pidx, idx);
      });
      mask.querySelector('[data-act="remove"]').addEventListener("click", function () {
        var arr = state.user.highlights[chId] || [];
        var i = arr.findIndex(function (hh) { return hh.sec === sec && hh.pidx === pidx && hh.idx === idx; });
        if (i >= 0) arr.splice(i, 1);
        saveUser();
        repaintPara(p, sec, pidx);
        var key = hlNoteKey(sec, pidx, idx);
        var noteEl = p.parentNode.querySelector('.hl-note[data-note-key="' + key + '"]');
        if (noteEl) noteEl.remove();
        closeHlSheet();
      });
      function setSpan(n) {
        var hh = findHighlight(sec, pidx, idx); if (!hh) return;
        var total = p.querySelectorAll(".sent").length, max = total - idx;
        hh.sp = Math.max(1, Math.min(n, max)); if (hh.sp === 1) delete hh.sp;
        sentence = spanText(hh); hh.text = sentence.slice(0, 400);
        saveUser(); repaintPara(p, sec, pidx);
        var q = mask.querySelector(".hlsheet-quote"); if (q) q.textContent = sentence;
        var nu = mask.querySelector(".hlsheet-num"); if (nu) nu.textContent = tx("spanUnit", hh.sp || 1);
        return max;
      }
      mask.querySelector('[data-act="spm"]').addEventListener("click", function () { var hh = findHighlight(sec, pidx, idx); setSpan(((hh && hh.sp) || 1) - 1); });
      mask.querySelector('[data-act="spp"]').addEventListener("click", function () { var hh = findHighlight(sec, pidx, idx); setSpan(((hh && hh.sp) || 1) + 1); });
      mask.querySelector('[data-act="spall"]').addEventListener("click", function () {
        var hh = findHighlight(sec, pidx, idx), max = p.querySelectorAll(".sent").length - idx;
        var already = hh && (hh.sp || 1) === max; setSpan(max);
        uiToast(already ? tx("spanIsP") : tx("spanDoneP", max));
      });
      mask.querySelector('[data-act="mkcard"]').addEventListener("click", function () {
        var hh = findHighlight(sec, pidx, idx); if (hh) { hh.note = (ta.value || "").trim(); saveUser(); }
        var txt = sentence, nt = (ta.value || "").trim();
        if (window.GXU && GXU.open) { closeHlSheet(); GXU.open({ text: txt, ref: cardRef, note: nt, plain: true }); } else uiToast(tx("noGxu"));
      });
      mask.querySelector('[data-act="read"]').addEventListener("click", function () {
        var txt = sentence; closeHlSheet();
        speakToggle("hl:" + chId + ":" + sec + ":" + pidx + ":" + idx, function () { return spkChunks(ttsPronounceFix(txt)); }, cardRef);
      });
      mask.querySelector('[data-act="copy"]').addEventListener("click", function () { xzCopy(shareTextOf(), function () { uiToast(tx("copied")); }); });
      mask.querySelector('[data-act="share"]').addEventListener("click", function () { xzShare(shareTextOf()); });
      mask.querySelector('[data-act="cancel"]').addEventListener("click", closeHlSheet);
    }
    // split every highlightable paragraph into sentence spans (pidx = paragraph position
    // within its section, assigned here in document order — mirrors what the old regex-based
    // per-paragraph idx counter did), restore any already-saved highlight/note state per
    // sentence, and wire the tap handler on each sentence individually.
    var secPCounts = {};
    qsa(".reader p[data-sec]", view).forEach(function (p) {
      var sec = p.getAttribute("data-sec");
      var pidx = secPCounts[sec] || 0;
      secPCounts[sec] = pidx + 1;
      var groups = splitIntoSentenceGroups(p);
      while (p.firstChild) p.removeChild(p.firstChild);
      groups.forEach(function (nodes, idx) {
        var span = document.createElement("span");
        span.className = "sent";
        span.setAttribute("data-sec", sec);
        span.setAttribute("data-pidx", pidx);
        span.setAttribute("data-idx", idx);
        var existingHl = coverHl(sec, pidx, idx);
        if (existingHl) {
          span.setAttribute("data-hl", "1");
          span.setAttribute("data-color", existingHl.color || "gold");
        }
        nodes.forEach(function (n) { span.appendChild(n); });
        p.appendChild(span);
        span.addEventListener("click", function (e) {
          if (e.target.closest("a")) return;
          var arr = state.user.highlights[chId] = state.user.highlights[chId] || [];
          var cov = coverHl(sec, pidx, idx);
          if (cov) {
            openHlSheet(findSentSpan(p, cov.idx) || span, sec, pidx, cov.idx);
          } else {
            arr.push({ sec: sec, pidx: pidx, idx: idx, text: span.textContent.slice(0, 200), at: Date.now(), lang: state.lang, chId: chId, chTitle: ch.title, color: "gold" });
            span.setAttribute("data-hl", "1");
            span.setAttribute("data-color", "gold");
            saveUser();
          }
        });
      });
      groups.forEach(function (nodes, idx) {
        if (findHighlight(sec, pidx, idx)) renderHlNote(p, sec, pidx, idx);
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
    html += '<div class="card"><p class="muted">' + esc(t().toolPrompterDesc) + (state.lang === "en" ? " Open it from section 10, \"Small-Group Discussion,\" in any lesson — or pick a lesson under \"Course\" first." : "。從任一課的第十節「小組討論分享」進入，或先在「課程」選一課。") + '</p>';
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

    var html = '<div class="ptop"><button id="pClose" aria-label="' + esc(t().promptClose) + '">✕</button><span>' + esc(ch.numFull) + ' · ' + esc(t().startPrompterMsg) + '</span><span class="ptimer" id="pTimer">00:00</span></div>';
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

    qs("#pClose", el).addEventListener("click", exitPrompter);
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
  var pendingAsk = null; // set by "ask Xiaozhi about this line" from a highlighted paragraph
  var pendingAskAutoSend = false; // when true, renderCompanion sends pendingAsk immediately instead of just pre-filling it
  var msgIdSeq = 0;
  function newMsgId() { msgIdSeq++; return "m" + Date.now().toString(36) + msgIdSeq; }


  /* ===== 小智回答選項（回答對象十種／長度／慕道友信仰背景／追問／截斷接續）與畫線面板補強：移植自 321互動聖經 ===== */
  var XP = {"zh":{"audT":"小智的回答對象","auds":"🧑 成人|🧒 青少年|🧸 兒童|🌱 慕道友|👴 長輩|👩‍👧 單親|🙋 單身|👨‍👩‍👧 父母|💑 夫妻|⛪ 牧者","audNow":"回答對象：{0}　▾","audSet":"小智會用「{0}」聽得懂的方式回答","audD_adult":"有深度，貼近工作、家庭與關係","audD_teen":"幽默風趣、不說教，用你的世界來比喻","audD_kid":"非常簡單好懂，像在聽故事","audD_seeker":"還沒信主也聽得懂，不說教，給實際的幫助","aud_adult":"【回答對象】成年讀者：口吻成熟、溫暖、真誠。","aud_teen":"【回答對象】青少年：像朋友聊天，幽默風趣，可以有一點梗，但不說教、不輕浮，也絕不拿神和聖經開玩笑。","aud_kid":"【回答對象】兒童（5–11 歲）：非常淺顯，短句，像說故事，一句只講一件事，不用艱深名詞。","aud_seeker":"【回答對象】慕道友（還沒信主的朋友）：從他的處境與疑問切入，再帶到經文；用最平常的話，不用「無己、作王、得勝、屬靈」等教會內部用語，必須用的詞立刻用生活說法解釋；誠實、尊重、不說教、不施壓、不要求現在就相信；清楚說出神是怎樣的神、耶穌為我們做了什麼；給一兩個這星期就能試的小步驟；禱告只當作「若你願意，可以這樣對神說」的邀請。","prayRule":"\n【禱告的寫法（一定要照做）】回答裡凡要寫禱告，那一段的小標題一律寫「憑信心禱告」，不要寫「為你禱告」「我為你禱告」或「一起禱告」。禱告前先用一句話邀請讀者自己開口，例如「請你憑信心，親口向主這樣禱告：」。禱告本身要用讀者的第一人稱，寫成讀者自己向神說的話；不要寫成小智替讀者禱告，不要出現「這位」「他／她」等第三人稱。禱告要簡短、真誠、帶著信心交託與感恩，結尾一律用「奉主耶穌的名禱告，阿們。」","fu_adult":"💑 用在婚姻~請把你剛才的回答，用在夫妻關係裡，給我一個具體做法。|🏠 用在家庭~請把你剛才的回答，用在和家人的相處上。|💼 用在職場~請把你剛才的回答，用在職場與同事相處上。|💗 我的內心~如果我心裡還在掙扎，你剛才的回答可以怎樣幫助我？|🙏 帶我禱告~請依你剛才的回答，帶我憑信心禱告。","fu_teen":"🏫 在學校~把你剛才說的，用在學校和同學身上會怎樣？|👫 跟朋友~跟朋友相處時，我可以怎麼做？|📱 手機網路~這和我用手機、上網有什麼關係？|💪 今天挑戰~給我一個今天就能做的小挑戰。|🙏 一起禱告~請用簡單的話帶我禱告。","fu_kid":"🏠 在家裡~在家裡我可以怎麼做？|🏫 在學校~在學校我可以怎麼做？|📖 說個故事~可以用一個小故事告訴我嗎？|🙏 小禱告~教我一句小小的禱告。","fu_seeker":"🤔 我還有疑問~我還是有些疑問，可以再用平常的話解釋嗎？|🚶 下一步~如果我想多了解，這個星期可以先做什麼？|💭 人生意義~這和我人生的意義有什麼關係？|🙏 試著禱告~如果我想試著和神說話，可以怎麼說？","bgs":"🌱 沒有信仰|☸️ 佛教|🏮 民間信仰|🕯️ 一貫道|☪️ 穆斯林|🔬 無神論","bgNames":"沒有信仰|佛教|民間信仰|一貫道|穆斯林|無神論者","bgT":"信仰背景：","lenT":"長度：","lens":"簡要|適中|詳細","lenSet":"小智接著用「{0}」重新回答","lenSet2":"已改為「{0}」，下次提問就會照這個長度回答","bgSet":"小智接著以「{0}」的角度重新回答","bgSet2":"已改為「{0}」，下次提問就會照這個角度回答","lenSys_brief":"\n【回答長度：簡要】只用3～5句話，約150字：先給核心答案，加上一句經文或一個比喻，最後一句禱告或一個小步驟；不用表格，不列長清單。","lenSys_full":"\n【回答長度：詳細】約800～1200字：說明經文脈絡、關鍵字詞、相關經文對照，連結321應用與本週操練，最後寫禱告；可使用短小的標題。","skbg_none":"\n【信仰背景：沒有信仰】不預設任何宗教詞彙，從對方的生活處境（壓力、關係、意義、不安）切入；一次只講一個重點，用日常說法，避免「無己、作王、得勝」等內部用語。\n共通原則：保持尊重與愛心，不嘲笑、不施壓、不要求對方立刻決定；誠實而溫和地說明基督信仰；先回答對方真正的問題，再連結到目前這個主題。","skbg_buddhism":"\n【信仰背景：佛教】不貶低佛陀與修行，不使用「拜偶像、迷信」等字眼；先肯定佛教對苦、無常、慈悲的重視，再說明聖經所說有位格的創造主、白白的恩典（不靠功德）、一世生命而非輪迴；不亂用佛教名詞。\n共通原則：保持尊重與愛心，不嘲笑、不施壓、不要求對方立刻決定；誠實而溫和地說明基督信仰；先回答對方真正的問題，再連結到目前這個主題。","skbg_folk":"\n【信仰背景：民間信仰】尊重孝心與祭祖的心意，先肯定聖經本來就教導孝敬父母；再說明敬拜歸給獨一真神；關心拜拜背後對平安與保佑的需要，並溫和說明祭祖與追思的不同；不要求對方立刻改變家人的習慣。\n共通原則：保持尊重與愛心，不嘲笑、不施壓、不要求對方立刻決定；誠實而溫和地說明基督信仰；先回答對方真正的問題，再連結到目前這個主題。","skbg_yiguandao":"\n【信仰背景：一貫道】尊重吃素與重視倫理的生活，不批評師尊、道場與儀式，也不自己推斷教義細節；從對「天」的敬畏談起，再溫和說明約翰福音14:6，耶穌是通往天父的道路。\n共通原則：保持尊重與愛心，不嘲笑、不施壓、不要求對方立刻決定；誠實而溫和地說明基督信仰；先回答對方真正的問題，再連結到目前這個主題。","skbg_muslim":"\n【信仰背景：穆斯林】以最大的敬意對談，不辱罵、不嘲諷、不施壓勸對方改教（考慮其家庭與社群的代價）；從獨一的神，以及亞伯拉罕、摩西、大衛談起；只引用聖經；清楚說明基督徒信的不是三個神；可比較「靠行為得救」與「靠恩典得救」；避免使用與豬肉、酒有關的比喻。\n共通原則：保持尊重與愛心，不嘲笑、不施壓、不要求對方立刻決定；誠實而溫和地說明基督信仰；先回答對方真正的問題，再連結到目前這個主題。","skbg_atheist":"\n【信仰背景：無神論者】尊重理性與證據，不說「只要信就好」，不把對方的想法稻草人化；誠實承認對苦難與宗教歷史錯誤的質疑很有分量，也承認哪些事無法用科學證明；從道德直覺、人生意義、宇宙秩序與耶穌的歷史記載談起；語氣平等、好奇、不防衛。\n共通原則：保持尊重與愛心，不嘲笑、不施壓、不要求對方立刻決定；誠實而溫和地說明基督信仰；先回答對方真正的問題，再連結到目前這個主題。","audNowS":"回答對象：{0} ▾","audD_elder":"尊敬溫和、慢慢說，句子清楚好懂","audD_single_parent":"先接住你的辛苦，給做得到的小步驟與盼望","audD_single":"真誠平等，不催婚，談身分、等待與使命","audD_parent":"貼近養兒育女的日常：溝通、管教、陪伴與禱告","audD_couple":"夫妻同行：溝通、饒恕、同心與一起禱告","audD_pastor":"同工口吻：牧養、講道預備、團隊與不倦怠","aud_elder":"【回答對象】回答對象：長輩（約65歲以上）。請用尊敬、溫和、慢慢說的口吻，像晚輩敬重地陪長輩讀經；句子清楚、不拐彎，不用網路用語和英文縮寫；比喻取自一生的閱歷（田地、家人、歲月、病痛、孫子、老街坊）。重點先講，分成短段落，不要太長。肯定他們一生走過的路與在主裡的忠心，不說教、不指責、不用「你應該」。可以談健康與軟弱、孤單、放下與交託、把信仰傳給下一代、永恆的盼望與感恩。結尾給一件簡單、容易做到的小事（一句禱告、打電話問候家人、數算一件感謝）。若提到身體不適、孤單或失去親人，要先溫柔安慰，並鼓勵他和家人、教會關懷同工聯絡。","fu_elder":"🩺 健康~請針對你剛才的回答，用簡單清楚、慢慢說的話說明怎麼把它用在身體的軟弱與健康，並給我一個這個星期做得到的具體小步驟。|🤍 孤單~請針對你剛才的回答，用簡單清楚、慢慢說的話說明怎麼把它用在孤單與思念，並給我一個這個星期做得到的具體小步驟。|👨‍👩‍👧‍👦 兒孫~請針對你剛才的回答，用簡單清楚、慢慢說的話說明怎麼把它用在和兒孫、家人的關係，並給我一個這個星期做得到的具體小步驟。|🕊️ 交託~請針對你剛才的回答，用簡單清楚、慢慢說的話說明怎麼把它用在放下心中的牽掛、交託給主，並給我一個這個星期做得到的具體小步驟。|🌅 盼望~請針對你剛才的回答，用簡單清楚、慢慢說的話說明怎麼把它用在永恆的盼望與感恩，並給我一個這個星期做得到的具體小步驟。|🙏 禱告~請把你剛才說的重點，用簡單的話寫成一段短短的禱告，讓我可以慢慢念給主聽。","aud_single_parent":"【回答對象】回答對象：單親爸爸或媽媽（一個人撐起一個家）。請先接住他的辛苦：他常常很累、有愧疚、有孤單，也有經濟、時間與教養的壓力。口吻溫暖、接納、不評斷，不追問過去的原因，不說「你應該再找個伴」，也不把單親說成缺憾。引用神的心意：神是孤兒的父、寡婦的伸冤者（詩篇68:5），祂與我們同在。再給盼望與實際：每一個小步驟都要在忙碌中做得到（五分鐘禱告、跟孩子的一個小儀式、開口向弟兄姊妹求助）。內容簡短、段落要短。結尾給一個這個星期做得到的小步驟。若他提到被暴力對待、疲憊到撐不下去或想傷害自己，要溫柔回應，並鼓勵他立刻聯絡信任的人、教會同工或專業協助。","fu_single_parent":"😮‍💨 疲累~請針對你剛才的回答，說明怎麼把它用在一個人撐家的疲累與內疚，並給我一個這個星期做得到的具體小步驟。|👧 孩子~請針對你剛才的回答，說明怎麼把它用在陪伴孩子與教養，並給我一個這個星期做得到的具體小步驟。|💰 經濟~請針對你剛才的回答，說明怎麼把它用在經濟與時間的壓力，並給我一個這個星期做得到的具體小步驟。|🤝 求助~請針對你剛才的回答，說明怎麼把它用在向弟兄姊妹或教會開口求助，並給我一個這個星期做得到的具體小步驟。|🌤️ 盼望~請針對你剛才的回答，說明怎麼把它用在在這個階段看見神的同在與盼望，並給我一個這個星期做得到的具體小步驟。|🙏 禱告~請把你剛才說的重點，寫成一段我在忙碌中五分鐘內就能禱告完的短禱告。","aud_single":"【回答對象】回答對象：單身的人（可能未婚、離婚、喪偶，或正在等候；不要預設他想結婚或不想結婚）。請不要把單身說成缺憾、「預備期」或「還沒到的人生」，也不要用催婚的口氣。談在基督裡的身分已經完整、被愛；談孤單時怎麼與神、與朋友、與團契連結；談時間、金錢與恩賜的運用與使命；談等待中的信靠；談感情與婚姻的智慧，以及在情感與身體上的聖潔，態度要尊重、不論斷。口吻真誠、平等、輕鬆。結尾給一個這個星期可以做的小步驟。若他提到孤單到想傷害自己，要溫柔回應並鼓勵他立刻聯絡信任的人或專業協助。","fu_single":"🫶 孤單~請針對你剛才的回答，說明怎麼把它用在孤單時怎麼與神、與朋友連結，並給我一個這個星期做得到的具體小步驟。|💝 身分~請針對你剛才的回答，說明怎麼把它用在我在基督裡的身分與價值，並給我一個這個星期做得到的具體小步驟。|⏳ 等待~請針對你剛才的回答，說明怎麼把它用在等待中的信靠，並給我一個這個星期做得到的具體小步驟。|💞 感情~請針對你剛才的回答，說明怎麼把它用在感情與交友的智慧，並給我一個這個星期做得到的具體小步驟。|🎯 使命~請針對你剛才的回答，說明怎麼把它用在把時間與恩賜用在神的使命上，並給我一個這個星期做得到的具體小步驟。|🙏 禱告~請把你剛才說的重點，寫成一段簡短、真誠的禱告，讓我可以拿來禱告。","aud_parent":"【回答對象】回答對象：正在養育孩子的父母（孩子可能從嬰幼兒到成年）。請站在父母的位置：他們常常疲累、擔心孩子、也常常內疚。口吻溫暖、貼近生活、不評斷；承認每個孩子與每個家庭都不同。談陪伴與榜樣、管教與恩典的平衡、親子溝通（怎麼聽、怎麼說）、為孩子禱告、夫妻同心、面對自己的軟弱與失敗；可用日常場景當比喻（吃飯、功課、手機、睡前）。結尾給一個這個星期可以做的具體小步驟（一句話、一個擁抱、一段睡前禱告）。若提到孩子遭受傷害、家庭暴力或孩子有自傷的念頭，要溫柔回應並鼓勵立刻尋求專業協助與信任的人。","fu_parent":"🗣️ 溝通~請針對你剛才的回答，說明怎麼把它用在跟孩子好好溝通（怎麼聽、怎麼說），並給我一個這個星期做得到的具體小步驟。|⚖️ 管教~請針對你剛才的回答，說明怎麼把它用在管教與恩典的平衡，並給我一個這個星期做得到的具體小步驟。|😔 內疚~請針對你剛才的回答，說明怎麼把它用在對孩子發脾氣或覺得虧欠的內疚，並給我一個這個星期做得到的具體小步驟。|💑 夫妻~請針對你剛才的回答，說明怎麼把它用在夫妻在教養上同心，並給我一個這個星期做得到的具體小步驟。|📖 信仰~請針對你剛才的回答，說明怎麼把它用在帶孩子認識神、一起親近神，並給我一個這個星期做得到的具體小步驟。|🙏 禱告~請把你剛才說的重點，寫成一段我可以為孩子祝福的短禱告。","aud_couple":"【回答對象】回答對象：夫妻（正在經營婚姻的丈夫與妻子，可能是新婚、有孩子的中年夫妻，或相伴多年的伴侶）。請站在夫妻同行的位置：口吻溫暖、真誠、不評斷，不偏袒任何一方；承認每段婚姻都有磨合、疲累與受傷的時候。談愛是決定與付出、彼此饒恕、傾聽與表達（怎麼說、怎麼聽）、尊重與同心、金錢與家務的分工、姻親與孩子的教養、一起禱告與一起讀經、在主裡成為一體；可用日常場景當比喻（飯桌、手牽手、吵完架之後、睡前）。結尾給一個這個星期兩個人就能一起做的具體小步驟（一句感謝的話、一段兩人的禱告、一次不看手機的散步）。不要教導妻子順服或丈夫掌權的單方面要求，要強調彼此相愛、彼此順服。若提到家庭暴力、外遇、對方的威脅或有自傷念頭，要溫柔回應，把安全放在第一位，並鼓勵立刻尋求專業協助與信任的人，不要勸人一味忍耐。","fu_couple":"🗣️ 溝通~請針對你剛才的回答，說明夫妻怎麼把它用在好好說、好好聽，並給我們一個這個星期兩個人做得到的具體小步驟。|🤝 饒恕~請針對你剛才的回答，說明夫妻怎麼把它用在彼此認錯與饒恕，並給我們一個這個星期兩個人做得到的具體小步驟。|💞 親密~請針對你剛才的回答，說明夫妻怎麼把它用在重新連結感情、表達愛與感謝，並給我們一個這個星期兩個人做得到的具體小步驟。|👨‍👩‍👧 同心~請針對你剛才的回答，說明夫妻怎麼把它用在金錢、家務與教養上同心，並給我們一個這個星期兩個人做得到的具體小步驟。|📖 同讀~請針對你剛才的回答，說明夫妻怎麼一起讀經、一起親近神，並給我們一個這個星期兩個人做得到的具體小步驟。|🙏 禱告~請把你剛才說的重點，寫成一段夫妻可以一起禱告的短禱告。","aud_pastor":"【回答對象】回答對象：牧者與傳道同工（教會的牧師、傳道人、小組長與事奉的同工）。請站在同工的位置：他們常常肩負許多人的重擔，自己也會疲累、孤單、被誤解或灰心。口吻尊重、平等、真誠，像同工之間彼此扶持，不說教、不居高臨下。可以有適度的深度：點出經文脈絡、原文語境與關鍵字詞的意思，談牧養羊群與生命建造、預備講道與教導、帶領小組與門徒訓練、團隊同心與衝突、面對批評與孤單、屬靈爭戰、自己的靈命與家庭，以及不倦怠的安息與依靠；也可提供講章或查經的切入點、段落與應用建議，但要提醒最後仍須自己在神面前領受。結尾給一個這個星期可以做的具體小步驟（一段安靜親近神的時間、一通關心的電話、一次向同工的坦誠分享）。若提到極度疲憊、憂鬱、想放棄或有自傷念頭，要溫柔回應，並鼓勵立刻尋求信任的同工、屬靈長輩與專業協助。","fu_pastor":"📖 講道~請針對你剛才的回答，提供一個可用於講道或查經的架構（三個要點與一個應用），並提醒我自己先在神面前領受。|🐑 牧養~請針對你剛才的回答，說明怎麼把它用在牧養羊群與關心個別的人，並給我一個這個星期做得到的具體小步驟。|🤝 團隊~請針對你剛才的回答，說明怎麼把它用在帶領團隊、同工同心與處理衝突，並給我一個這個星期做得到的具體小步驟。|🕊️ 安息~請針對你剛才的回答，說明怎麼把它用在自己的疲累與靈命保守，並給我一個這個星期做得到的具體小步驟。|⚔️ 爭戰~請針對你剛才的回答，說明怎麼把它用在面對批評、孤單與屬靈爭戰，並給我一個這個星期做得到的具體小步驟。|🙏 代禱~請把你剛才說的重點，寫成一段我可以為教會與同工代求的短禱告。","hlSpan":"範圍","spanUnit":"{0} 句","spanP":"整段","makeCard":"做成美圖","readThis":"朗讀","copy":"複製","share":"分享","spanIsP":"這一段已經整段畫起來了","spanDoneP":"已畫整段，共 {0} 句","copied":"已複製","favB":"收藏","xzGoOn":"（剛才的回答因字數上限中斷了。請從中斷的地方直接接著寫完，不要重複前面的內容，也不要加開場白或說明。）","xzExamples":"不知道問甚麼？看看範例","hlShareFail":"這台裝置不能直接分享，已改為複製","noGxu":"美圖工作室還沒載入，請稍後再試","xzOptT":"回答選項","xzCtxL":"小智還在接著寫…"},"zs":{"audT":"小智的回答对象","auds":"🧑 成人|🧒 青少年|🧸 儿童|🌱 慕道友|👴 长辈|👩‍👧 单亲|🙋 单身|👨‍👩‍👧 父母|💑 夫妻|⛪ 牧者","audNow":"回答对象：{0}　▾","audSet":"小智会用「{0}」听得懂的方式回答","audD_adult":"有深度，贴近工作、家庭与关系","audD_teen":"幽默风趣、不说教，用你的世界来比喻","audD_kid":"非常简单好懂，像在听故事","audD_seeker":"还没信主也听得懂，不说教，给实际的帮助","aud_adult":"【回答对象】成年读者：口吻成熟、温暖、真诚。","aud_teen":"【回答对象】青少年：像朋友聊天，幽默风趣，可以有一点梗，但不说教、不轻浮，也绝不拿神和圣经开玩笑。","aud_kid":"【回答对象】儿童（5–11 岁）：非常浅显，短句，像说故事，一句只讲一件事，不用艰深名词。","aud_seeker":"【回答对象】慕道友（还没信主的朋友）：从他的处境与疑问切入，再带到经文；用最平常的话，不用「无己、作王、得胜、属灵」等教会内部用语，必须用的词立刻用生活说法解释；诚实、尊重、不说教、不施压、不要求现在就相信；清楚说出神是怎样的神、耶稣为我们做了什么；给一两个这星期就能试的小步骤；祷告只当作「若你愿意，可以这样对神说」的邀请。","prayRule":"\n【祷告的写法（一定要照做）】回答里凡要写祷告，那一段的小标题一律写「凭信心祷告」，不要写「为你祷告」「我为你祷告」或「一起祷告」。祷告前先用一句话邀请读者自己开口，例如「请你凭信心，亲口向主这样祷告：」。祷告本身要用读者的第一人称，写成读者自己向神说的话；不要写成小智替读者祷告，不要出现「这位」「他／她」等第三人称。祷告要简短、真诚、带着信心交托与感恩，结尾一律用「奉主耶稣的名祷告，阿们。」","fu_adult":"💑 用在婚姻~请把你刚才的回答，用在夫妻关系里，给我一个具体做法。|🏠 用在家庭~请把你刚才的回答，用在和家人的相处上。|💼 用在职场~请把你刚才的回答，用在职场与同事相处上。|💗 我的内心~如果我心里还在挣扎，你刚才的回答可以怎样帮助我？|🙏 带我祷告~请依你刚才的回答，带我凭信心祷告。","fu_teen":"🏫 在学校~把你刚才说的，用在学校和同学身上会怎样？|👫 跟朋友~跟朋友相处时，我可以怎么做？|📱 手机网路~这和我用手机、上网有什么关系？|💪 今天挑战~给我一个今天就能做的小挑战。|🙏 一起祷告~请用简单的话带我祷告。","fu_kid":"🏠 在家里~在家里我可以怎么做？|🏫 在学校~在学校我可以怎么做？|📖 说个故事~可以用一个小故事告诉我吗？|🙏 小祷告~教我一句小小的祷告。","fu_seeker":"🤔 我还有疑问~我还是有些疑问，可以再用平常的话解释吗？|🚶 下一步~如果我想多了解，这个星期可以先做什么？|💭 人生意义~这和我人生的意义有什么关系？|🙏 试着祷告~如果我想试着和神说话，可以怎么说？","bgs":"🌱 没有信仰|☸️ 佛教|🏮 民间信仰|🕯️ 一贯道|☪️ 穆斯林|🔬 无神论","bgNames":"没有信仰|佛教|民间信仰|一贯道|穆斯林|无神论者","bgT":"信仰背景：","lenT":"长度：","lens":"简要|适中|详细","lenSet":"小智接着用「{0}」重新回答","lenSet2":"已改为「{0}」，下次提问就会照这个长度回答","bgSet":"小智接着以「{0}」的角度重新回答","bgSet2":"已改为「{0}」，下次提问就会照这个角度回答","lenSys_brief":"\n【回答长度：简要】只用3～5句话，约150字：先给核心答案，加上一句经文或一个比喻，最后一句祷告或一个小步骤；不用表格，不列长清单。","lenSys_full":"\n【回答长度：详细】约800～1200字：说明经文脉络、关键字词、相关经文对照，连结321应用与本周操练，最后写祷告；可使用短小的标题。","skbg_none":"\n【信仰背景：没有信仰】不预设任何宗教词汇，从对方的生活处境（压力、关系、意义、不安）切入；一次只讲一个重点，用日常说法，避免「无己、作王、得胜」等内部用语。\n共通原则：保持尊重与爱心，不嘲笑、不施压、不要求对方立刻决定；诚实而温和地说明基督信仰；先回答对方真正的问题，再连结到目前这个主题。","skbg_buddhism":"\n【信仰背景：佛教】不贬低佛陀与修行，不使用「拜偶像、迷信」等字眼；先肯定佛教对苦、无常、慈悲的重视，再说明圣经所说有位格的创造主、白白的恩典（不靠功德）、一世生命而非轮回；不乱用佛教名词。\n共通原则：保持尊重与爱心，不嘲笑、不施压、不要求对方立刻决定；诚实而温和地说明基督信仰；先回答对方真正的问题，再连结到目前这个主题。","skbg_folk":"\n【信仰背景：民间信仰】尊重孝心与祭祖的心意，先肯定圣经本来就教导孝敬父母；再说明敬拜归给独一真神；关心拜拜背后对平安与保佑的需要，并温和说明祭祖与追思的不同；不要求对方立刻改变家人的习惯。\n共通原则：保持尊重与爱心，不嘲笑、不施压、不要求对方立刻决定；诚实而温和地说明基督信仰；先回答对方真正的问题，再连结到目前这个主题。","skbg_yiguandao":"\n【信仰背景：一贯道】尊重吃素与重视伦理的生活，不批评师尊、道场与仪式，也不自己推断教义细节；从对「天」的敬畏谈起，再温和说明约翰福音14:6，耶稣是通往天父的道路。\n共通原则：保持尊重与爱心，不嘲笑、不施压、不要求对方立刻决定；诚实而温和地说明基督信仰；先回答对方真正的问题，再连结到目前这个主题。","skbg_muslim":"\n【信仰背景：穆斯林】以最大的敬意对谈，不辱骂、不嘲讽、不施压劝对方改教（考虑其家庭与社群的代价）；从独一的神，以及亚伯拉罕、摩西、大卫谈起；只引用圣经；清楚说明基督徒信的不是三个神；可比较「靠行为得救」与「靠恩典得救」；避免使用与猪肉、酒有关的比喻。\n共通原则：保持尊重与爱心，不嘲笑、不施压、不要求对方立刻决定；诚实而温和地说明基督信仰；先回答对方真正的问题，再连结到目前这个主题。","skbg_atheist":"\n【信仰背景：无神论者】尊重理性与证据，不说「只要信就好」，不把对方的想法稻草人化；诚实承认对苦难与宗教历史错误的质疑很有分量，也承认哪些事无法用科学证明；从道德直觉、人生意义、宇宙秩序与耶稣的历史记载谈起；语气平等、好奇、不防卫。\n共通原则：保持尊重与爱心，不嘲笑、不施压、不要求对方立刻决定；诚实而温和地说明基督信仰；先回答对方真正的问题，再连结到目前这个主题。","audNowS":"回答对象：{0} ▾","audD_elder":"尊敬温和、慢慢说，句子清楚好懂","audD_single_parent":"先接住你的辛苦，给做得到的小步骤与盼望","audD_single":"真诚平等，不催婚，谈身分、等待与使命","audD_parent":"贴近养儿育女的日常：沟通、管教、陪伴与祷告","audD_couple":"夫妻同行：沟通、饶恕、同心与一起祷告","audD_pastor":"同工口吻：牧养、讲道预备、团队与不倦怠","aud_elder":"【回答对象】回答对象：长辈（约65岁以上）。请用尊敬、温和、慢慢说的口吻，像晚辈敬重地陪长辈读经；句子清楚、不拐弯，不用网路用语和英文缩写；比喻取自一生的阅历（田地、家人、岁月、病痛、孙子、老街坊）。重点先讲，分成短段落，不要太长。肯定他们一生走过的路与在主里的忠心，不说教、不指责、不用「你应该」。可以谈健康与软弱、孤单、放下与交托、把信仰传给下一代、永恒的盼望与感恩。结尾给一件简单、容易做到的小事（一句祷告、打电话问候家人、数算一件感谢）。若提到身体不适、孤单或失去亲人，要先温柔安慰，并鼓励他和家人、教会关怀同工联络。","fu_elder":"🩺 健康~请针对你刚才的回答，用简单清楚、慢慢说的话说明怎么把它用在身体的软弱与健康，并给我一个这个星期做得到的具体小步骤。|🤍 孤单~请针对你刚才的回答，用简单清楚、慢慢说的话说明怎么把它用在孤单与思念，并给我一个这个星期做得到的具体小步骤。|👨‍👩‍👧‍👦 儿孙~请针对你刚才的回答，用简单清楚、慢慢说的话说明怎么把它用在和儿孙、家人的关系，并给我一个这个星期做得到的具体小步骤。|🕊️ 交托~请针对你刚才的回答，用简单清楚、慢慢说的话说明怎么把它用在放下心中的牵挂、交托给主，并给我一个这个星期做得到的具体小步骤。|🌅 盼望~请针对你刚才的回答，用简单清楚、慢慢说的话说明怎么把它用在永恒的盼望与感恩，并给我一个这个星期做得到的具体小步骤。|🙏 祷告~请把你刚才说的重点，用简单的话写成一段短短的祷告，让我可以慢慢念给主听。","aud_single_parent":"【回答对象】回答对象：单亲爸爸或妈妈（一个人撑起一个家）。请先接住他的辛苦：他常常很累、有愧疚、有孤单，也有经济、时间与教养的压力。口吻温暖、接纳、不评断，不追问过去的原因，不说「你应该再找个伴」，也不把单亲说成缺憾。引用神的心意：神是孤儿的父、寡妇的伸冤者（诗篇68:5），祂与我们同在。再给盼望与实际：每一个小步骤都要在忙碌中做得到（五分钟祷告、跟孩子的一个小仪式、开口向弟兄姐妹求助）。内容简短、段落要短。结尾给一个这个星期做得到的小步骤。若他提到被暴力对待、疲惫到撑不下去或想伤害自己，要温柔回应，并鼓励他立刻联络信任的人、教会同工或专业协助。","fu_single_parent":"😮‍💨 疲累~请针对你刚才的回答，说明怎么把它用在一个人撑家的疲累与内疚，并给我一个这个星期做得到的具体小步骤。|👧 孩子~请针对你刚才的回答，说明怎么把它用在陪伴孩子与教养，并给我一个这个星期做得到的具体小步骤。|💰 经济~请针对你刚才的回答，说明怎么把它用在经济与时间的压力，并给我一个这个星期做得到的具体小步骤。|🤝 求助~请针对你刚才的回答，说明怎么把它用在向弟兄姐妹或教会开口求助，并给我一个这个星期做得到的具体小步骤。|🌤️ 盼望~请针对你刚才的回答，说明怎么把它用在在这个阶段看见神的同在与盼望，并给我一个这个星期做得到的具体小步骤。|🙏 祷告~请把你刚才说的重点，写成一段我在忙碌中五分钟内就能祷告完的短祷告。","aud_single":"【回答对象】回答对象：单身的人（可能未婚、离婚、丧偶，或正在等候；不要预设他想结婚或不想结婚）。请不要把单身说成缺憾、「预备期」或「还没到的人生」，也不要用催婚的口气。谈在基督里的身分已经完整、被爱；谈孤单时怎么与神、与朋友、与团契连结；谈时间、金钱与恩赐的运用与使命；谈等待中的信靠；谈感情与婚姻的智慧，以及在情感与身体上的圣洁，态度要尊重、不论断。口吻真诚、平等、轻松。结尾给一个这个星期可以做的小步骤。若他提到孤单到想伤害自己，要温柔回应并鼓励他立刻联络信任的人或专业协助。","fu_single":"🫶 孤单~请针对你刚才的回答，说明怎么把它用在孤单时怎么与神、与朋友连结，并给我一个这个星期做得到的具体小步骤。|💝 身分~请针对你刚才的回答，说明怎么把它用在我在基督里的身分与价值，并给我一个这个星期做得到的具体小步骤。|⏳ 等待~请针对你刚才的回答，说明怎么把它用在等待中的信靠，并给我一个这个星期做得到的具体小步骤。|💞 感情~请针对你刚才的回答，说明怎么把它用在感情与交友的智慧，并给我一个这个星期做得到的具体小步骤。|🎯 使命~请针对你刚才的回答，说明怎么把它用在把时间与恩赐用在神的使命上，并给我一个这个星期做得到的具体小步骤。|🙏 祷告~请把你刚才说的重点，写成一段简短、真诚的祷告，让我可以拿来祷告。","aud_parent":"【回答对象】回答对象：正在养育孩子的父母（孩子可能从婴幼儿到成年）。请站在父母的位置：他们常常疲累、担心孩子、也常常内疚。口吻温暖、贴近生活、不评断；承认每个孩子与每个家庭都不同。谈陪伴与榜样、管教与恩典的平衡、亲子沟通（怎么听、怎么说）、为孩子祷告、夫妻同心、面对自己的软弱与失败；可用日常场景当比喻（吃饭、功课、手机、睡前）。结尾给一个这个星期可以做的具体小步骤（一句话、一个拥抱、一段睡前祷告）。若提到孩子遭受伤害、家庭暴力或孩子有自伤的念头，要温柔回应并鼓励立刻寻求专业协助与信任的人。","fu_parent":"🗣️ 沟通~请针对你刚才的回答，说明怎么把它用在跟孩子好好沟通（怎么听、怎么说），并给我一个这个星期做得到的具体小步骤。|⚖️ 管教~请针对你刚才的回答，说明怎么把它用在管教与恩典的平衡，并给我一个这个星期做得到的具体小步骤。|😔 内疚~请针对你刚才的回答，说明怎么把它用在对孩子发脾气或觉得亏欠的内疚，并给我一个这个星期做得到的具体小步骤。|💑 夫妻~请针对你刚才的回答，说明怎么把它用在夫妻在教养上同心，并给我一个这个星期做得到的具体小步骤。|📖 信仰~请针对你刚才的回答，说明怎么把它用在带孩子认识神、一起亲近神，并给我一个这个星期做得到的具体小步骤。|🙏 祷告~请把你刚才说的重点，写成一段我可以为孩子祝福的短祷告。","aud_couple":"【回答对象】回答对象：夫妻（正在经营婚姻的丈夫与妻子，可能是新婚、有孩子的中年夫妻，或相伴多年的伴侶）。请站在夫妻同行的位置：口吻温暖、真诚、不评断，不偏袒任何一方；承认每段婚姻都有磨合、疲累与受伤的时候。谈爱是决定与付出、彼此饶恕、倾听与表达（怎么说、怎么听）、尊重与同心、金钱与家务的分工、姻亲与孩子的教养、一起祷告与一起读经、在主里成为一体；可用日常场景当比喻（饭桌、手牵手、吵完架之后、睡前）。结尾给一个这个星期两个人就能一起做的具体小步骤（一句感谢的话、一段两人的祷告、一次不看手机的散步）。不要教导妻子顺服或丈夫掌权的单方面要求，要强调彼此相爱、彼此顺服。若提到家庭暴力、外遇、对方的威胁或有自伤念头，要温柔回应，把安全放在第一位，并鼓励立刻寻求专业协助与信任的人，不要劝人一味忍耐。","fu_couple":"🗣️ 沟通~请针对你刚才的回答，说明夫妻怎么把它用在好好说、好好听，并给我们一个这个星期两个人做得到的具体小步骤。|🤝 饶恕~请针对你刚才的回答，说明夫妻怎么把它用在彼此认错与饶恕，并给我们一个这个星期两个人做得到的具体小步骤。|💞 亲密~请针对你刚才的回答，说明夫妻怎么把它用在重新连结感情、表达爱与感谢，并给我们一个这个星期两个人做得到的具体小步骤。|👨‍👩‍👧 同心~请针对你刚才的回答，说明夫妻怎么把它用在金钱、家务与教养上同心，并给我们一个这个星期两个人做得到的具体小步骤。|📖 同读~请针对你刚才的回答，说明夫妻怎么一起读经、一起亲近神，并给我们一个这个星期两个人做得到的具体小步骤。|🙏 祷告~请把你刚才说的重点，写成一段夫妻可以一起祷告的短祷告。","aud_pastor":"【回答对象】回答对象：牧者与传道同工（教会的牧师、传道人、小组长与事奉的同工）。请站在同工的位置：他们常常肩负许多人的重担，自己也会疲累、孤单、被误解或灰心。口吻尊重、平等、真诚，像同工之间彼此扶持，不说教、不居高临下。可以有适度的深度：点出经文脉络、原文语境与关键字词的意思，谈牧养羊群与生命建造、预备讲道与教导、带领小组与门徒训练、团队同心与冲突、面对批评与孤单、属灵争战、自己的灵命与家庭，以及不倦怠的安息与依靠；也可提供讲章或查经的切入点、段落与应用建议，但要提醒最后仍须自己在神面前领受。结尾给一个这个星期可以做的具体小步骤（一段安静亲近神的时间、一通关心的电话、一次向同工的坦诚分享）。若提到极度疲惫、忧郁、想放弃或有自伤念头，要温柔回应，并鼓励立刻寻求信任的同工、属灵长辈与专业协助。","fu_pastor":"📖 讲道~请针对你刚才的回答，提供一个可用于讲道或查经的架构（三个要点与一个应用），并提醒我自己先在神面前领受。|🐑 牧养~请针对你刚才的回答，说明怎么把它用在牧养羊群与关心个别的人，并给我一个这个星期做得到的具体小步骤。|🤝 团队~请针对你刚才的回答，说明怎么把它用在带领团队、同工同心与处理冲突，并给我一个这个星期做得到的具体小步骤。|🕊️ 安息~请针对你刚才的回答，说明怎么把它用在自己的疲累与灵命保守，并给我一个这个星期做得到的具体小步骤。|⚔️ 争战~请针对你刚才的回答，说明怎么把它用在面对批评、孤单与属灵争战，并给我一个这个星期做得到的具体小步骤。|🙏 代祷~请把你刚才说的重点，写成一段我可以为教会与同工代求的短祷告。","hlSpan":"范围","spanUnit":"{0} 句","spanP":"整段","makeCard":"做成美图","readThis":"朗读","copy":"复制","share":"分享","spanIsP":"这一段已经整段画起来了","spanDoneP":"已画整段，共 {0} 句","copied":"已复制","favB":"收藏","xzGoOn":"（刚才的回答因字数上限中断了。请从中断的地方直接接着写完，不要重复前面的内容，也不要加开场白或说明。）","xzExamples":"不知道问什么？看看范例","hlShareFail":"这台设备不能直接分享，已改为复制","noGxu":"美图工作室还没载入，请稍后再试","xzOptT":"回答选项","xzCtxL":"小智还在接着写…"},"en":{"audT":"Who Xiaozhi is answering","auds":"🧑 Adult|🧒 Teen|🧸 Kid|🌱 Seeker|👴 Elder|👩‍👧 Single parent|🙋 Single|👨‍👩‍👧 Parent|💑 Couple|⛪ Pastor","audNow":"Answering: {0}　▾","audSet":"Xiaozhi will answer in a way \"{0}\" can understand","audD_adult":"In depth, close to work, family, and relationships","audD_teen":"Funny and fun, no preaching, using metaphors from your world","audD_kid":"Very simple and easy to understand, like listening to a story","audD_seeker":"Understandable even if you don't yet believe; no preaching, with practical help","aud_adult":"[Audience] Adult reader: a mature, warm, sincere tone.","aud_teen":"[Audience] Teen: like chatting with a friend, humorous and fun, with a few jokes allowed, but no preaching and no flippancy, and never joke about God or the Bible.","aud_kid":"[Audience] Child (ages 5-11): very simple, short sentences, like telling a story, one thing per sentence, no difficult terms.","aud_seeker":"[Audience] Seeker (a friend who does not yet believe): start from their situation and questions, then bring in the Scripture; use the plainest words, and avoid church insider terms such as \"selflessness, let Jesus be King, victory, spiritual\"; if such a term is needed, explain it right away in everyday language; be honest and respectful, no preaching, no pressure, and do not ask them to believe right now; state clearly what kind of God he is and what Jesus has done for us; give one or two small steps they can try this week; treat prayer only as an invitation: \"if you are willing, you could say this to God.\"","prayRule":"\n[How to write prayers (must follow)] Whenever the answer includes a prayer, always give that section the heading \"Pray in Faith\"; do not write \"Praying for you\", \"I pray for you\", or \"Let's pray together\". Before the prayer, use one sentence to invite the reader to speak it themselves, for example \"Please pray this to the Lord yourself, in faith:\". Write the prayer in the reader's first person, as words the reader says to God; do not write it as Xiaozhi praying on the reader's behalf, and do not use third-person words such as \"this person\" or \"he/she\". Keep the prayer short and sincere, full of faith, trust, and thanksgiving, and always end with \"In the name of the Lord Jesus Christ, I pray. Amen.\"","fu_adult":"💑 In marriage~Please apply your answer just now to the marriage relationship and give me a concrete way to do it.|🏠 In family~Please apply your answer just now to how I get along with my family.|💼 At work~Please apply your answer just now to getting along with colleagues at work.|💗 My heart~If I am still struggling inside, how can your answer just now help me?|🙏 Lead me in prayer~Based on your answer just now, please lead me to pray in faith.","fu_teen":"🏫 At school~What would it look like to apply what you just said at school with classmates?|👫 With friends~What can I do when I'm with friends?|📱 Phone and internet~How does this relate to my phone and going online?|💪 Today's challenge~Give me a small challenge I can do today.|🙏 Pray together~Please lead me in prayer using simple words.","fu_kid":"🏠 At home~What can I do at home?|🏫 At school~What can I do at school?|📖 Tell a story~Can you tell me with a little story?|🙏 Little prayer~Teach me a short little prayer.","fu_seeker":"🤔 I still have questions~I still have some questions. Can you explain again in everyday words?|🚶 Next step~If I want to learn more, what can I do first this week?|💭 Meaning of life~How does this relate to the meaning of my life?|🙏 Try praying~If I want to try talking to God, what could I say?","bgs":"🌱 No faith|☸️ Buddhism|🏮 Folk religion|🕯️ Yiguandao|☪️ Muslim|🔬 Atheist","bgNames":"No faith|Buddhism|Folk religion|Yiguandao|Muslim|Atheist","bgT":"Faith background: ","lenT":"Length: ","lens":"Brief|Medium|Detailed","lenSet":"Xiaozhi will now answer again in \"{0}\"","lenSet2":"Changed to \"{0}\". The next question will be answered at this length.","bgSet":"Xiaozhi will now answer again from the \"{0}\" perspective","bgSet2":"Changed to \"{0}\". The next question will be answered from this perspective.","lenSys_brief":"\n[Answer length: Brief] Use only 3 to 5 sentences, about 100 words: give the core answer first, add one Bible verse or one metaphor, and finish with one sentence of prayer or one small step; no tables, no long lists.","lenSys_full":"\n[Answer length: Detailed] About 500 to 800 words: explain the context of the Scripture, key words and phrases, and cross-references to related passages, connect to 321 application and this week's practice, and end with a prayer; short headings may be used.","skbg_none":"\n[Faith background: no faith] Presume no religious vocabulary; start from the person's life situation (stress, relationships, meaning, unease); make only one point at a time, in everyday language, avoiding insider terms such as \"selflessness, let Jesus be King, victory\".\n【Rules for every background】Stay respectful and loving; never mock, pressure, or demand an immediate decision; explain the Christian faith honestly and gently; answer the person's real question first, then connect it to the current topic.","skbg_buddhism":"\n[Faith background: Buddhism] Do not belittle the Buddha or Buddhist practice, and do not use words like \"idol worship\" or \"superstition\"; first affirm Buddhism's attention to suffering, impermanence, and compassion, then explain what the Bible says about a personal Creator, grace that is free (not by merit), and one life rather than reincarnation; do not misuse Buddhist terms.\n【Rules for every background】Stay respectful and loving; never mock, pressure, or demand an immediate decision; explain the Christian faith honestly and gently; answer the person's real question first, then connect it to the current topic.","skbg_folk":"\n[Faith background: folk religion] Respect filial piety and the heart behind honoring ancestors; first affirm that the Bible itself teaches honoring parents; then explain that worship belongs to the one true God; care about the need for peace and protection behind the worship rituals, and gently explain the difference between ancestor worship and remembrance; do not ask the person to change family customs right away.\n【Rules for every background】Stay respectful and loving; never mock, pressure, or demand an immediate decision; explain the Christian faith honestly and gently; answer the person's real question first, then connect it to the current topic.","skbg_yiguandao":"\n[Faith background: Yiguandao] Respect vegetarian living and a life that values ethics; do not criticize the master, the temple, or the rituals, and do not infer doctrinal details yourself; start from reverence for \"Heaven\", then gently explain John 14:6, that Jesus is the way to the Father.\n【Rules for every background】Stay respectful and loving; never mock, pressure, or demand an immediate decision; explain the Christian faith honestly and gently; answer the person's real question first, then connect it to the current topic.","skbg_muslim":"\n[Faith background: Muslim] Converse with the greatest respect; no insults, no mockery, and no pressure to convert (consider the cost to their family and community); start from the one God and from Abraham, Moses, and David; quote only the Bible; state clearly that Christians do not believe in three gods; you may compare \"salvation by works\" with \"salvation by grace\"; avoid metaphors involving pork or alcohol.\n【Rules for every background】Stay respectful and loving; never mock, pressure, or demand an immediate decision; explain the Christian faith honestly and gently; answer the person's real question first, then connect it to the current topic.","skbg_atheist":"\n[Faith background: atheist] Respect reason and evidence; do not say \"just believe\", and do not strawman their views; honestly acknowledge that doubts about suffering and the historical mistakes of religion carry weight, and admit what cannot be proven by science; start from moral intuition, the meaning of life, the order of the universe, and the historical records of Jesus; keep a tone that is equal, curious, and not defensive.\n【Rules for every background】Stay respectful and loving; never mock, pressure, or demand an immediate decision; explain the Christian faith honestly and gently; answer the person's real question first, then connect it to the current topic.","audNowS":"Answering: {0} ▾","audD_elder":"Respectful and gentle, spoken slowly, with clear and easy sentences","audD_single_parent":"First acknowledges how hard it is, then gives doable small steps and hope","audD_single":"Sincere and equal; no pressure to marry; talks about identity, waiting, and calling","audD_parent":"Close to the daily life of raising children: communication, discipline, companionship, and prayer","audD_couple":"Walking together as a couple: communication, forgiveness, unity, and praying together","audD_pastor":"Fellow-worker tone: shepherding, sermon preparation, teams, and avoiding burnout","aud_elder":"[Audience] Audience: an elder (about 65 and older). Speak respectfully, gently and unhurriedly, like a younger person reading Scripture with an older one they honour. Short, clear sentences; no internet slang or abbreviations; pictures from a long life (fields, family, the years, illness, grandchildren, old neighbours). Main point first, in short paragraphs. Honour the road they have walked and their faithfulness in the Lord; never preach, scold, or say \"you should\". You may speak of health and frailty, loneliness, letting go and entrusting, passing faith to the next generation, eternal hope and gratitude. End with one simple thing that is easy to do (a short prayer, a phone call to family, counting one blessing). If they mention illness, loneliness or loss, comfort them first and encourage them to reach out to family or the church care team.","fu_elder":"🩺 Health~Based on your answer, explain how to apply it to physical frailty and health, and give me one concrete step I can take this week.|🤍 Loneliness~Based on your answer, explain how to apply it to loneliness and missing loved ones, and give me one concrete step I can take this week.|👨‍👩‍👧‍👦 Family~Based on your answer, explain how to apply it to my relationship with my children and grandchildren, and give me one concrete step I can take this week.|🕊️ Entrusting~Based on your answer, explain how to apply it to letting go of my worries and entrusting them to the Lord, and give me one concrete step I can take this week.|🌅 Hope~Based on your answer, explain how to apply it to eternal hope and gratitude, and give me one concrete step I can take this week.|🙏 Prayer~Please turn the key point of your answer into a short, simple prayer I can read slowly to the Lord.","aud_single_parent":"[Audience] Audience: a single parent (carrying a household alone). First receive their weariness: they are often exhausted, carry guilt and loneliness, and face pressure over money, time and raising children. Be warm, accepting and non-judging; do not ask why they are single, never say \"you should find a partner\", and never describe single parenting as a lack. Bring in God's heart: he is a father to the fatherless and a defender of widows (Psalm 68:5), and he is with us. Then give hope and practicality — every small step must be doable in a busy life (a five-minute prayer, one small ritual with the child, asking brothers and sisters for help). Keep it short, in short paragraphs. End with one step they can take this week. If they mention being abused, being too exhausted to go on, or wanting to harm themselves, answer gently and encourage them to contact someone they trust, a church worker or professional help right away.","fu_single_parent":"😮‍💨 Weary~Based on your answer, explain how to apply it to the weariness and guilt of carrying a family alone, and give me one concrete step I can take this week.|👧 Child~Based on your answer, explain how to apply it to being with my child and parenting, and give me one concrete step I can take this week.|💰 Money~Based on your answer, explain how to apply it to pressure over money and time, and give me one concrete step I can take this week.|🤝 Help~Based on your answer, explain how to apply it to asking brothers, sisters or the church for help, and give me one concrete step I can take this week.|🌤️ Hope~Based on your answer, explain how to apply it to seeing God's presence and hope in this season, and give me one concrete step I can take this week.|🙏 Prayer~Please turn the key point of your answer into a short prayer I can finish in five minutes in the middle of a busy day.","aud_single":"[Audience] Audience: a single person (never married, divorced, widowed, or still waiting — do not assume they want or do not want to marry). Never describe being single as a lack, a \"preparation stage\" or \"life not yet begun\", and never use a pushy-about-marriage tone. Speak of an identity in Christ that is already whole and loved; of connecting with God, friends and fellowship in loneliness; of using time, money and gifts for a purpose; of trusting while waiting; of wisdom in dating and marriage and of purity in heart and body, respectfully and without judging. Be sincere, equal and light. End with one step they can take this week. If they mention loneliness so deep they want to harm themselves, answer gently and encourage them to contact someone they trust or professional help right away.","fu_single":"🫶 Loneliness~Based on your answer, explain how to apply it to connecting with God and friends when I feel lonely, and give me one concrete step I can take this week.|💝 Identity~Based on your answer, explain how to apply it to my identity and worth in Christ, and give me one concrete step I can take this week.|⏳ Waiting~Based on your answer, explain how to apply it to trusting God while I wait, and give me one concrete step I can take this week.|💞 Relationships~Based on your answer, explain how to apply it to wisdom in dating and friendship, and give me one concrete step I can take this week.|🎯 Purpose~Based on your answer, explain how to apply it to using my time and gifts for God's purposes, and give me one concrete step I can take this week.|🙏 Prayer~Please turn the key point of your answer into a short, sincere prayer I can pray.","aud_parent":"[Audience] Audience: a parent raising children (from babies to adult children). Stand in the parent's shoes: they are often tired, worried about their children, and often feel guilty. Be warm, down-to-earth and non-judging; acknowledge that every child and every family is different. Speak of presence and example, balancing discipline and grace, parent–child communication (how to listen, how to speak), praying for children, husband and wife standing together, and facing one's own weakness and failure; use everyday scenes as pictures (mealtime, homework, phones, bedtime). End with one concrete step for this week (one sentence, a hug, a bedtime prayer). If a child is being harmed, there is domestic violence, or the child has thoughts of self-harm, answer gently and encourage seeking professional help and a trusted person right away.","fu_parent":"🗣️ Talking~Based on your answer, explain how to apply it to communicating well with my child (how to listen, how to speak), and give me one concrete step I can take this week.|⚖️ Discipline~Based on your answer, explain how to apply it to balancing discipline and grace, and give me one concrete step I can take this week.|😔 Guilt~Based on your answer, explain how to apply it to the guilt of losing my temper or feeling I owe my child more, and give me one concrete step I can take this week.|💑 Spouse~Based on your answer, explain how to apply it to husband and wife being united in parenting, and give me one concrete step I can take this week.|📖 Faith~Based on your answer, explain how to apply it to leading my child to know God and drawing near to him together, and give me one concrete step I can take this week.|🙏 Prayer~Please turn the key point of your answer into a short prayer of blessing I can pray over my child.","aud_couple":"[Audience] Audience: a married couple (husband and wife — newlyweds, parents in the thick of life, or long-time partners). Stand beside them as a fellow traveler: warm, sincere, never judging and never taking one side; admit every marriage has seasons of friction, weariness and hurt. Speak of love as a decision and a gift, forgiving one another, listening and speaking well, respect and unity, money and household work, in-laws and raising children, praying and reading Scripture together, becoming one in the Lord. Use everyday pictures (the dinner table, holding hands, after an argument, bedtime). Close with one small step the two of them can do together this week (a word of thanks, a short prayer together, a phone-free walk). Never lay one-sided demands on the wife to submit or the husband to rule; stress mutual love and mutual submission. If domestic violence, an affair, threats or thoughts of self-harm come up, respond gently, put safety first, and encourage reaching out at once to professionals and trusted people — never urge someone just to endure.","fu_couple":"🗣️ Talking~Based on your answer, show how a couple can apply it to speaking and listening well, and give us one small step we can both do this week.|🤝 Forgiving~Based on your answer, show how a couple can apply it to owning mistakes and forgiving, and give us one small step we can both do this week.|💞 Closeness~Based on your answer, show how a couple can apply it to reconnecting and expressing love and thanks, and give us one small step we can both do this week.|👨‍👩‍👧 Unity~Based on your answer, show how a couple can apply it to being united on money, chores and parenting, and give us one small step we can both do this week.|📖 Together~Based on your answer, show how a couple can read Scripture and draw near to God together, and give us one small step we can both do this week.|🙏 Prayer~Turn the main points of your answer into a short prayer a couple can pray together.","aud_pastor":"[Audience] Audience: a pastor or ministry worker (pastor, preacher, small-group leader, church staff or volunteer). Stand beside them as a fellow worker: they carry many people's burdens and can themselves be weary, lonely, misunderstood or discouraged. Be respectful, equal and sincere — never lecturing or talking down. You may go deeper: the context of the passage, the sense of key words, shepherding and building lives, sermon and lesson preparation, leading groups and discipleship, team unity and conflict, criticism and loneliness, spiritual warfare, one's own walk and family, and resting in God without burning out. You may offer a sermon or Bible-study outline with points and applications, but remind them to receive the word from God themselves first. Close with one small step for this week (a quiet hour with God, a caring phone call, an honest talk with a coworker). If extreme exhaustion, depression, wanting to quit or self-harm come up, respond gently and encourage reaching out at once to trusted coworkers, spiritual elders and professionals.","fu_pastor":"📖 Sermon~Based on your answer, give a sermon or Bible-study outline (three points and one application), and remind me to receive it from God first.|🐑 Shepherd~Based on your answer, show how to apply it to shepherding the flock and caring for individuals, and give me one small step for this week.|🤝 Team~Based on your answer, show how to apply it to leading a team, unity among coworkers and handling conflict, and give me one small step for this week.|🕊️ Rest~Based on your answer, show how to apply it to my own weariness and guarding my walk with God, and give me one small step for this week.|⚔️ Warfare~Based on your answer, show how to apply it to criticism, loneliness and spiritual warfare, and give me one small step for this week.|🙏 Intercede~Turn the main points of your answer into a short prayer I can pray for the church and my coworkers.","hlSpan":"Range","spanUnit":"{0} sent.","spanP":"Whole paragraph","makeCard":"Make a picture","readThis":"Listen","copy":"Copy","share":"Share","spanIsP":"The whole paragraph is already highlighted","spanDoneP":"Whole paragraph highlighted ({0} sentences)","copied":"Copied","favB":"Save","xzGoOn":"(Your previous answer was cut off by the length limit. Continue exactly where it stopped; do not repeat earlier text or add any preamble.)","xzExamples":"Not sure what to ask? See examples","hlShareFail":"Sharing is not available here — copied instead","noGxu":"The card studio is not ready yet — try again shortly","xzOptT":"Answer options","xzCtxL":"Sage AI is still writing…"}};
  function tx(k) {
    var d = XP[state.lang] || XP.zh, s = d[k]; if (s == null) s = XP.zh[k]; if (s == null) s = k;
    for (var i = 1; i < arguments.length; i++) s = String(s).split("{" + (i - 1) + "}").join(arguments[i]);
    return s;
  }
  var AUD_KEYS = ["adult", "teen", "kid", "seeker", "elder", "single_parent", "single", "parent", "couple", "pastor"];
  var LEN_KEYS = ["brief", "mid", "full"], BG_KEYS = ["none", "buddhism", "folk", "yiguandao", "muslim", "atheist"];
  var xzOptOpen = false, xzAudOpen = false;
  function xo() {
    var u = state.user; if (!u.xzOpt) u.xzOpt = { aud: "adult", len: "mid", bg: "none" };
    if (AUD_KEYS.indexOf(u.xzOpt.aud) < 0) u.xzOpt.aud = "adult";
    if (LEN_KEYS.indexOf(u.xzOpt.len) < 0) u.xzOpt.len = "mid";
    if (BG_KEYS.indexOf(u.xzOpt.bg) < 0) u.xzOpt.bg = "none";
    return u.xzOpt;
  }
  /* ===== XZ2（-xz1103）：小智最新功能共用套件——回答長度五段、讀者資料、慕道友信仰背景、設定頁區塊、滿版小智頁摘要列 ===== */
  var xzCurCh = null;
  XZ2.init({
    app: "leadership", pfx: "ldr321-", ownAud: true,
    lang: function () { return state.lang; },
    aud: { get: function () { return xo().aud; }, set: function (k) { xo().aud = k; saveUser(); } },
    legacyLen: function () { return xo().len; },
    ctxWord: "課文脈絡", ctxWordZs: "课文脉络", ctxWordEn: "the lesson context",
    qsLabel: ["對象範例題", "对象范例题", "Examples for me"],
    reAnswer: function (m) { return xzReAnswer(xzCurCh, m); },
    onAsk: function (q) { var ta = qs("#chatIn"); if (ta) { ta.value = q; sendChat(xzCurCh); } },
    toast: function (m) { uiToast(m); },
    readCtx: function () { try { var c = xzCurCh && D().chapters[xzCurCh]; return c ? [(state.lang === "en" ? "Currently reading: " : "目前讀到：") + c.numFull + " " + c.title] : []; } catch (e) { return []; } }
  });
  XZ2.watchScroll();
  function xzOptSys() {
    /* 回答對象用本 App 的領導力版本；信仰背景、讀者資料、回答長度（五段）改由 XZ2 提供，只送一次 */
    var o = xo();
    return "\n" + tx("aud_" + o.aud) + XZ2.sysTail() + tx("prayRule");
  }
  function xzOptsHtml() { return XZ2.controlsHtml({ qs: true }); }
  function xzFuHtml() {
    var a = tx("fu_" + xo().aud).split("|"), h = '<div class="fu">';
    a.forEach(function (x) { var p = x.split("~"); h += '<button type="button" class="fu-chip" data-q="' + esc(p[1] || p[0]) + '">' + esc(p[0]) + "</button>"; });
    return h + "</div>";
  }
  function xzReAnswer(chId, msg) {
    var ms = chatSession.messages; if (ms.length < 2) return false;
    var a2 = ms[ms.length - 1], u2 = ms[ms.length - 2];
    if (a2.role !== "ai" || a2.pending || u2.role !== "user") return false;
    ms.splice(ms.length - 2, 2); if (msg) uiToast(msg);
    var ta = qs("#chatIn"); if (!ta) return false; ta.value = u2.text; sendChat(chId); return true;
  }
  function xzCutOff(data, txt) {
    var sr = data && (data.stop_reason || data.finish_reason || (data.choices && data.choices[0] && data.choices[0].finish_reason));
    if (sr) return sr === "max_tokens" || sr === "length";
    var s = String(txt || "").replace(/\s+/g, " ").trim(); return s.length > 300 && !/[。！？.!?」』”)）阿們men]$/.test(s);
  }
  function xzJoin(a2, b) {
    b = String(b).replace(/^\s*(好的|好|接續|繼續|继续|Continuing)[，,:：。.!！]?\s*/, "");
    for (var n = Math.min(80, a2.length, b.length); n >= 6; n--) if (a2.slice(-n) === b.slice(0, n)) return a2 + b.slice(n);
    var nl = /^(#|>|-|\*|\d+[.、]|\|)/.test(b.trim()) && !/\n$/.test(a2);
    return a2 + (nl ? "\n\n" : "") + b;
  }
  function xzCopy(text, done) {
    function fb() { try { var ta = document.createElement("textarea"); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0"; document.body.appendChild(ta); ta.select(); document.execCommand("copy"); ta.remove(); } catch (e) {} if (done) done(); }
    try { if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { if (done) done(); }, fb); else fb(); } catch (e) { fb(); }
  }
  function xzShare(text) {
    if (navigator.share) { navigator.share({ text: text }).catch(function () {}); return; }
    xzCopy(text, function () { uiToast(tx("hlShareFail")); });
  }

  function companionSystemPrompt(chId) {
    var d = D();
    var ch = chId ? d.chapters[chId] : null;
    var base = {
      zh: "你是「小智」，《321建造 教會領導力》App內的AI陪讀，人設是一位謙卑、有盼望、充滿愛心的「321領導力教練」。準則：①任何回答最終必須指向耶穌的榜樣、聖經的准則、聖靈的引導，不能只停留在321術語的自我循環論證；②回答涉及神學推論時，誠實標示層級——A為聖經明文教導，B為可討論的神學推論需說明「這是我的理解，歡迎與牧者再確認」，C為321的應用性語言需說明「這是321的應用性理解」；③遇到讀者具體人生抉擇（換工作、婚姻、離開教會等），引導讀者用321原則自己思考、鼓勵與屬靈父母／小組尋求印證，不直接替讀者下判斷；④所有經文引用一律使用和合本繁體中文；⑤語氣謙卑、盼望、帶著愛心，避免說教與居高臨下，用心不用腦；⑥這是手機聊天介面，版面要美觀、簡單、易讀：整則回覆整體字數盡量精簡（一般問題約150-250字為佳，除非讀者明確要求詳細說明），標題只在真的需要分段時偶爾使用一個「##」等級的小標題，不要每段都加標題，不用把全部內容都塞進表格，優先用簡短的段落與條列，重點文字適度加粗即可，避免過度使用巢狀項目符號或多層表格。",
      zs: "你是「小智」，《321建造 教会领导力》App内的AI陪读，人设是一位谦卑、有盼望、充满爱心的「321领导力教练」。准则：①任何回答最终必须指向耶稣的榜样、圣经的准则、圣灵的引导，不能只停留在321术语的自我循环论证；②回答涉及神学推论时，诚实标示层级——A为圣经明文教导，B为可讨论的神学推论需说明「这是我的理解，欢迎与牧者再确认」，C为321的应用性语言需说明「这是321的应用性理解」；③遇到读者具体人生抉择，引导读者用321原则自己思考、鼓励与属灵父母／小组寻求印证，不直接替读者下判断；④所有经文引用一律使用和合本简体中文；⑤语气谦卑、盼望、带着爱心，避免说教与居高临下；⑥这是手机聊天界面，版面要美观、简单、易读：整则回复整体字数尽量精简（一般问题约150-250字为佳，除非读者明确要求详细说明），标题只在真的需要分段时偶尔使用一个「##」等级的小标题，不要每段都加标题，不用把全部内容都塞进表格，优先用简短的段落与条列，重点文字适度加粗即可，避免过度使用嵌套项目符号或多层表格。",
      en: "You are 'Sage AI,' the AI companion inside the Building on 321: Church Leadership app — a humble, hopeful, loving '321 Leadership Coach.' Guidelines: (1) Every answer must ultimately point to Jesus as example, Scripture as standard, and the Holy Spirit as guide — never stay circular within 321's own vocabulary; (2) when reasoning theologically, honestly mark confidence: A = explicit Scripture teaching, B = a reasoned theological inference — say 'this is my understanding, please confirm with your pastor,' C = 321's own applied language — say 'this is 321's applied framing'; (3) for concrete life decisions (a job change, marriage, leaving a church), guide the reader to think it through using 321's principles and to seek confirmation from spiritual parents/small group — never decide for them; (4) quote Scripture using the ESV (or WEB where noted) for English; (5) tone: humble, hopeful, loving — never preachy or condescending; (6) this is a mobile chat interface — keep replies clean, simple and easy to read: keep the overall length concise (roughly 100-180 words for an ordinary question, unless the reader explicitly asks for more depth), use at most an occasional small '##'-level heading only when a real section break helps (never one per paragraph), don't force everything into a table, prefer short paragraphs and simple bullet lists, use bold sparingly for genuinely key words, and avoid deeply nested lists or multi-level tables.",
    }[state.lang];
    if (ch) {
      var ctx = state.lang === "en"
        ? "\n\nThe reader is currently on: " + ch.numFull + " — " + ch.title + " (" + ch.partTitle + ")."
        : "\n\n讀者目前所在課別：" + ch.numFull + "　" + ch.title + "（" + ch.partTitle + "）。";
      base += ctx;
    }
    return base + xzOptSys();
  }

  var companionQsOpen = false;
  var companionQsPart = null;

  function renderCompanion(view, chId) {
    var d = D();
    var chId2 = chId || currentChapterHint();
    xzCurCh = chId2;
    var curPartNo = (chId2 && d.chapters[chId2]) ? d.chapters[chId2].partNo : 1;
    if (!companionQsPart) companionQsPart = curPartNo || 1;

    var html = '<div class="chatwrap">';
    html += '<div id="xzOpts">' + xzOptsHtml() + '</div>';
    html += '<button type="button" class="qs-toggle" id="companionQsToggle">' + esc(companionQsOpen ? t().companionQsHide : t().companionQsToggle) + '</button>';
    html += '<div class="qs-panel" id="companionQsPanel" ' + (companionQsOpen ? "" : 'hidden') + '>';
    var qsData = d.companionQs || [];
    html += '<div class="qs-parts" id="qsParts">';
    qsData.forEach(function (p) {
      html += '<button type="button" class="qs-partchip' + (p.partNo === companionQsPart ? ' on' : '') + '" data-part="' + p.partNo + '">' + p.partNo + '</button>';
    });
    html += '</div>';
    var curPart = qsData.find(function (p) { return p.partNo === companionQsPart; });
    if (curPart) {
      html += '<div class="qs-partlabel">' + esc(curPart.label) + '</div>';
      html += '<div class="qs-hint">' + esc(t().companionQsHint) + '</div>';
      html += '<div class="qs-list">';
      curPart.qs.forEach(function (q, qi) {
        html += '<button type="button" class="qs-chip" data-qidx="' + qi + '">' + esc(q) + '</button>';
      });
      html += '</div>';
    }
    html += '</div>';

    html += '<div class="chatlog" id="chatlog">';
    if (!chatSession.messages.length) {
      html += '<div class="msg ai">' + esc(t().companionIntro) + '</div>';
    }
    chatSession.messages.forEach(function (m, mi) {
      if (m.role === "user") {
        html += '<div class="msg user">' + esc(m.text) + '</div>';
        return;
      }
      if (m.pending) {
        html += '<div class="msg ai">' + esc(m.text) + '</div>';
        return;
      }
      var isFav = !!(m.id && state.user.favorites.some(function (f) { return f.msgId === m.id; }));
      html += '<div class="msg ai" data-mi="' + mi + '">';
      html += '<div class="msg-body' + (m.collapsed !== false ? " clamped" : "") + '">' + mdToHtml(m.text) + '</div>';
      html += '<div class="msg-actions">';
      html += '<button type="button" class="msg-act msg-speak" data-mi="' + mi + '" data-speak-key="msg:' + esc(m.id || "") + '" data-state="idle" aria-label="' + esc(t().readAloud) + '">🔊</button>';
      html += '<button type="button" class="msg-act msg-collapse" data-mi="' + mi + '" hidden></button>';
      html += '<button type="button" class="msg-act msg-fav' + (isFav ? " on" : "") + '" data-mi="' + mi + '">' + (isFav ? "★ " + esc(t().msgSaved) : "☆ " + esc(t().msgSave)) + '</button>';
      html += '<button type="button" class="msg-act msg-copy" data-mi="' + mi + '">⧉ ' + esc(tx("copy")) + '</button>';
      html += '<button type="button" class="msg-act msg-share" data-mi="' + mi + '">↗ ' + esc(tx("share")) + '</button>';
      html += '<button type="button" class="msg-act msg-del" data-mi="' + mi + '">🗑 ' + esc(t().msgDelete) + '</button>';
      html += '</div>';
      if (mi === chatSession.messages.length - 1 && m.ok) html += xzFuHtml();
      html += '</div>';
    });
    html += '</div>';

    html += '<div class="chatinput"><textarea id="chatIn" rows="1" placeholder="' + esc(t().companionPlaceholder) + '"></textarea><button id="chatSend">' + esc(t().companionSend) + '</button></div>';
    html += '</div>';
    view.innerHTML = html;

    var log = qs("#chatlog", view);
    (function (l) { if (l) setTimeout(function () { try { l.scrollIntoView({ block: "end" }); } catch (e) { } }, 30); })(log.lastElementChild);

    // A long AI reply's "展開全部/收合" toggle only appears if the reply actually overflows
    // the collapsed height — measured against the real rendered content (tables/headers and
    // all), not a character-count guess, so it works no matter what the reply contains.
    qsa(".msg.ai[data-mi]", log).forEach(function (bubble) {
      var mi = parseInt(bubble.getAttribute("data-mi"), 10);
      var m = chatSession.messages[mi];
      var body = qs(".msg-body", bubble);
      var btn = qs(".msg-collapse", bubble);
      if (!m || !body || !btn) return;
      body.classList.remove("clamped");
      var full = body.scrollHeight;
      if (full > 194) {
        var collapsed = m.collapsed !== false;
        m.collapsed = collapsed;
        body.classList.toggle("clamped", collapsed);
        btn.hidden = false;
        btn.textContent = collapsed ? t().msgExpand : t().msgCollapse;
      } else {
        m.collapsed = false;
        btn.hidden = true;
      }
    });
    log.addEventListener("click", function (e) {
      var speakBtn2 = e.target.closest(".msg-speak");
      var collapseBtn = e.target.closest(".msg-collapse");
      var favBtn = e.target.closest(".msg-fav");
      var delBtn = e.target.closest(".msg-del");
      var fuBtn = e.target.closest(".fu-chip");
      var cpBtn = e.target.closest(".msg-copy");
      var shBtn = e.target.closest(".msg-share");
      if (fuBtn) { var tf = qs("#chatIn", view); tf.value = fuBtn.getAttribute("data-q"); sendChat(chId2); return; }
      if (cpBtn || shBtn) {
        var mm = chatSession.messages[parseInt((cpBtn || shBtn).getAttribute("data-mi"), 10)];
        if (mm) { var plain2 = stripHtml(mdToHtml(mm.text)); if (cpBtn) xzCopy(plain2, function () { uiToast(tx("copied")); }); else xzShare(plain2); }
        return;
      }
      if (speakBtn2) {
        speakToggleForMsg(parseInt(speakBtn2.getAttribute("data-mi"), 10));
        return;
      }
      if (collapseBtn) {
        var m1 = chatSession.messages[parseInt(collapseBtn.getAttribute("data-mi"), 10)];
        if (m1) { m1.collapsed = !m1.collapsed; renderCompanion(view, chId); }
        return;
      }
      if (favBtn) {
        toggleFavorite(parseInt(favBtn.getAttribute("data-mi"), 10), chId2);
        renderCompanion(view, chId);
        return;
      }
      if (delBtn) {
        if (!window.confirm(t().msgDeleteConfirm)) return;
        var delMi = parseInt(delBtn.getAttribute("data-mi"), 10);
        var delMsg = chatSession.messages[delMi];
        if (delMsg && spk.active && spk.curKey === "msg:" + delMsg.id) spkStopAll();
        chatSession.messages.splice(delMi, 1);
        renderCompanion(view, chId);
        return;
      }
    });
    updateSpeakButtons();

    var chatInEl = qs("#chatIn", view);
    if (pendingAsk) {
      chatInEl.value = pendingAsk;
      var autoSend = pendingAskAutoSend;
      pendingAsk = null; pendingAskAutoSend = false;
      if (autoSend) { sendChat(chId2); } else { setTimeout(function () { chatInEl.focus(); }, 0); }
    }
    qs("#chatSend", view).addEventListener("click", function () { sendChat(chId2); });
    chatInEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendChat(chId2); }
    });

    qs("#companionQsToggle", view).addEventListener("click", function () {
      companionQsOpen = !companionQsOpen;
      renderCompanion(view, chId);
    });
    var partsEl = qs("#qsParts", view);
    if (partsEl) {
      partsEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".qs-partchip");
        if (!btn) return;
        companionQsPart = parseInt(btn.getAttribute("data-part"), 10);
        renderCompanion(view, chId);
      });
    }
    var listEl = qs(".qs-list", view);
    if (listEl && curPart) {
      listEl.addEventListener("click", function (e) {
        var btn = e.target.closest(".qs-chip");
        if (!btn) return;
        var qi = parseInt(btn.getAttribute("data-qidx"), 10);
        var qText = curPart.qs[qi];
        if (!qText) return;
        chatInEl.value = qText;
        sendChat(chId2);
      });
    }
  }

  function currentChapterHint() {
    var lastId = null, lastAt = 0;
    Object.keys(state.user.readChapters).forEach(function (cid) {
      var r = state.user.readChapters[cid];
      if (r && r.openedAt > lastAt) { lastAt = r.openedAt; lastId = cid; }
    });
    return lastId;
  }

  function toggleFavorite(mi, chId2) {
    var m = chatSession.messages[mi];
    if (!m || m.role !== "ai" || m.pending) return;
    if (!m.id) m.id = newMsgId();
    var existingIdx = state.user.favorites.findIndex(function (f) { return f.msgId === m.id; });
    if (existingIdx >= 0) {
      state.user.favorites.splice(existingIdx, 1);
    } else {
      var d = D();
      var ch = chId2 ? d.chapters[chId2] : null;
      var question = null;
      for (var i = mi - 1; i >= 0; i--) {
        if (chatSession.messages[i].role === "user") { question = chatSession.messages[i].text; break; }
      }
      state.user.favorites.push({
        msgId: m.id, chId: chId2 || null, chTitle: ch ? (ch.numFull + "　" + ch.title) : "",
        question: question, answer: m.text, at: Date.now(),
      });
    }
    saveUser();
  }

  function sendChat(chId) {
    var ta = qs("#chatIn");
    var text = (ta.value || "").trim();
    if (!text) return;
    try { XZ2.collapse(); } catch (e) { }
    chatSession.messages.push({ role: "user", text: text, id: newMsgId() });
    ta.value = "";
    renderCompanion(qs("#view"), chId);
    var log = qs("#chatlog"); if (log) (function (l) { if (l) setTimeout(function () { try { l.scrollIntoView({ block: "end" }); } catch (e) { } }, 30); })(log.lastElementChild);

    if (!navigator.onLine) {
      chatSession.messages.push({ role: "ai", text: t().companionNeedNet, id: newMsgId() });
      renderCompanion(qs("#view"), chId);
      return;
    }

    var thinkingId = newMsgId();
    chatSession.messages.push({ role: "ai", text: "…", id: thinkingId, pending: true });
    renderCompanion(qs("#view"), chId);

    var baseMsgs = chatSession.messages
      .filter(function (m) { return m.id !== thinkingId; })
      .slice(-12)
      .map(function (m) { return { role: m.role === "user" ? "user" : "assistant", content: m.text }; });
    while (baseMsgs.length && baseMsgs[0].role !== "user") baseMsgs.shift();

    // Look up the "…" placeholder by id (not array index) when the reply lands, since the
    // user may have deleted an earlier message in the meantime and shifted every index.
    function findMsgIdxById(id) {
      for (var i = 0; i < chatSession.messages.length; i++) { if (chatSession.messages[i].id === id) return i; }
      return -1;
    }
    function finish(text) {
      var idx = findMsgIdxById(thinkingId);
      if (idx >= 0) chatSession.messages[idx] = { role: "ai", text: text || (state.lang === "en" ? "(no reply)" : "（沒有收到回覆）"), id: thinkingId, ok: !!text };
      renderCompanion(qs("#view"), chId);
      var log2 = qs("#chatlog"); if (log2) log2.scrollTop = log2.scrollHeight;
    }
    function failed() {
      var idx2 = findMsgIdxById(thinkingId);
      if (idx2 >= 0) chatSession.messages[idx2] = { role: "ai", text: (state.lang === "en" ? "Connection error. Please try again." : "連線發生問題，請稍後再試。"), id: thinkingId };
      renderCompanion(qs("#view"), chId);
    }
    // 回答被字數上限截斷（stop_reason=max_tokens 或沒有結束標點）時自動接著問，最多再接 4 次
    var acc = "";
    (function round(k) {
      var ms = baseMsgs.slice();
      if (k) { ms.push({ role: "assistant", content: acc }); ms.push({ role: "user", content: tx("xzGoOn") }); }
      var payload = { model: "claude-sonnet-4-6", max_tokens: XZ2.maxTokens(), system: companionSystemPrompt(chId), messages: ms };
      fetch(XIAOZHI_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }).then(function (r) {
        if (!r.ok) throw new Error("proxy error " + r.status);
        return r.json();
      }).then(function (data) {
        var reply = extractReplyText(data);
        if (!reply) { if (acc) finish(acc); else finish(""); return; }
        acc = k ? xzJoin(acc, reply) : reply;
        if (k < 4 && xzCutOff(data, acc)) {
          var idx3 = findMsgIdxById(thinkingId);
          if (idx3 >= 0) { chatSession.messages[idx3].text = acc + " …"; renderCompanion(qs("#view"), chId); }
          round(k + 1); return;
        }
        finish(acc);
      }).catch(function (err) { if (acc) finish(acc); else failed(); });
    })(0);
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

    html += '<div class="section-title">' + esc(t().meFavorites) + '</div><div class="card">';
    var favs = state.user.favorites.slice().reverse();
    if (!favs.length) {
      html += '<div class="empty">' + esc(t().meNoFavorites) + '</div>';
    } else {
      favs.slice(0, 60).forEach(function (f) {
        html += '<div class="favitem">';
        if (f.question) html += '<div class="fq">' + esc(f.question) + '</div>';
        html += '<div class="fa">' + mdToHtml(f.answer) + '</div>';
        html += '<div class="m"><span>' + esc(f.chTitle || "") + (f.chTitle ? " · " : "") + fmtDate(f.at) + '</span><button type="button" class="favdel" data-favid="' + esc(f.msgId) + '">🗑</button></div>';
        html += '</div>';
      });
    }
    html += '</div>';

    html += '<div class="section-title">' + esc(t().meSettings) + '</div><div class="card">';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;">';
    html += '<span>' + (state.lang === "en" ? "Theme" : "外觀") + '</span>';
    html += '<div class="langswitch" id="themeswitch"><button data-theme="light">' + esc(t().themeLight) + '</button><button data-theme="dark">' + esc(t().themeDark) + '</button><button data-theme="auto">' + esc(t().themeAuto) + '</button></div>';
    html += '</div>';
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border);">';
    html += '<span>' + esc(t().meFontSize) + '</span>';
    html += '<div class="langswitch" id="fontswitch"><button data-font="0">' + esc(t().fontStandard) + '</button><button data-font="1">' + esc(t().fontLarge) + '</button><button data-font="2">' + esc(t().fontXLarge) + '</button><button data-font="3">' + esc(t().fontXXLarge) + '</button></div>';
    html += '</div>';
    var voiceOpts = TTS_VOICE_OPTIONS[state.lang] || TTS_VOICE_OPTIONS.zh;
    var curVoiceId = (state.user.ttsVoice && state.user.ttsVoice[state.lang]) || TTS_VOICE_DEFAULT[state.lang];
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border);">';
    html += '<span>' + esc(t().meVoice) + '</span>';
    html += '<div class="langswitch" id="voiceswitch">' + voiceOpts.map(function (o) {
      return '<button data-voice="' + esc(o.id) + '">' + esc(o.label) + '</button>';
    }).join("") + '</div>';
    html += '</div></div>';

    html += '<div class="section-title">' + esc(state.lang === "en" ? "Xiaozhi settings" : state.lang === "zs" ? "小智设置" : "小智設定") + '</div><div class="card">' + XZ2.settingsHtml() + '</div>';

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
    qsa("#fontswitch button", view).forEach(function (b) {
      b.classList.toggle("active", parseInt(b.getAttribute("data-font"), 10) === state.font);
      b.addEventListener("click", function () {
        setFont(parseInt(b.getAttribute("data-font"), 10));
        renderMe(view);
      });
    });
    qsa("#voiceswitch button", view).forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-voice") === curVoiceId);
      b.addEventListener("click", function () {
        setTtsVoice(state.lang, b.getAttribute("data-voice"));
        renderMe(view);
      });
    });
    qsa(".favdel", view).forEach(function (b) {
      b.addEventListener("click", function () {
        var id = b.getAttribute("data-favid");
        state.user.favorites = state.user.favorites.filter(function (f) { return f.msgId !== id; });
        saveUser();
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
    applyFont();
    ttsWarmUp(); // fire-and-forget — see comment at its definition
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
      var loadFailMsg = {
        zh: "載入內容失敗，請檢查網路連線後重新整理。",
        zs: "载入内容失败，请检查网络连线后重新整理。",
        en: "Failed to load content. Please check your network connection and reload."
      }[state.lang] || "Failed to load content. Please check your network connection and reload.";
      qs("#view").innerHTML = '<div class="empty">' + esc(loadFailMsg) + '<br><span style="font-size:11px;">' + esc(String(err)) + '</span></div>';
    });

    // 自動更新與 Service Worker 註冊改由 upd321.js 掛件負責（updateViaCache:'none'、version.json 輪詢、空閒自動套用）
  }

  init();
})();


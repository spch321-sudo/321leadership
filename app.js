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
  var FONT_CLASS = ["", "fs-lg", "fs-xl"];

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
      backHome: "首頁", backToc: "目錄", readAloud: "朗讀", pauseAloud: "暫停", resumeAloud: "繼續朗讀", stopAloud: "停止", ttsUnsupported: "這台裝置不支援語音朗讀", ttsLoading: "準備語音中…", fontSizeLabel: "調整字級大小",
      hlAddNote: "加筆記", hlEditNote: "編輯筆記", hlAskXz: "問小智", hlNotePlaceholder: "寫下你的領受或問題…", hlSave: "儲存", hlCancel: "取消", askAboutLine: "關於這一段：「", askAboutLineEnd: "」——",
      myths: "領導迷思破解", tracksTitle: "關鍵詞軌跡", occurrences: "次", chaptersSpanned: "課出現",
      checklistTitle: "教導誠信檢核", checklistPickChapter: "選擇要檢核的課別", checklistDone: "已完成",
      journeyTitle: "321旅程地圖", journeyNote: "",
      tier: { A: "A｜聖經明文教導", B: "B｜可討論的神學推論", C: "C｜321應用性表達" },
      part: "第", of: "，共",
      companionQsToggle: "💡 範例問題", companionQsHide: "收起範例問題", companionQsHint: "點一下問題，直接問小智",
      msgExpand: "展開全部", msgCollapse: "收合", msgSave: "收藏", msgSaved: "已收藏", msgDelete: "刪除", msgDeleteConfirm: "要刪除這則回覆嗎？",
      meFavorites: "我的收藏", meNoFavorites: "還沒有收藏。在陪讀對話中點一下「收藏」，把小智的回答留下來。",
      meFontSize: "字級大小", fontStandard: "標準", fontLarge: "大", fontXLarge: "特大",
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
      wakeLockOn: "萤幕保持唤醒", exitPrompter: "结束", prev: "上一题", next: "下一题",
      backHome: "首页", backToc: "目录", readAloud: "朗读", pauseAloud: "暂停", resumeAloud: "继续朗读", stopAloud: "停止", ttsUnsupported: "这台装置不支持语音朗读", ttsLoading: "准备语音中…", fontSizeLabel: "调整字级大小",
      hlAddNote: "加笔记", hlEditNote: "编辑笔记", hlAskXz: "问小智", hlNotePlaceholder: "写下你的领受或问题…", hlSave: "储存", hlCancel: "取消", askAboutLine: "关于这一段：「", askAboutLineEnd: "」——",
      myths: "领导迷思破解", tracksTitle: "关键词轨迹", occurrences: "次", chaptersSpanned: "课出现",
      checklistTitle: "教导诚信检核", checklistPickChapter: "选择要检核的课别", checklistDone: "已完成",
      journeyTitle: "321旅程地图", journeyNote: "",
      tier: { A: "A｜圣经明文教导", B: "B｜可讨论的神学推论", C: "C｜321应用性表达" },
      part: "第", of: "，共",
      companionQsToggle: "💡 范例问题", companionQsHide: "收起范例问题", companionQsHint: "点一下问题，直接问小智",
      msgExpand: "展开全部", msgCollapse: "收合", msgSave: "收藏", msgSaved: "已收藏", msgDelete: "删除", msgDeleteConfirm: "要删除这则回复吗？",
      meFavorites: "我的收藏", meNoFavorites: "还没有收藏。在陪读对话中点一下「收藏」，把小智的回答留下来。",
      meFontSize: "字级大小", fontStandard: "标准", fontLarge: "大", fontXLarge: "特大",
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
      backHome: "Home", backToc: "Contents", readAloud: "Read Aloud", pauseAloud: "Pause", resumeAloud: "Resume", stopAloud: "Stop", ttsUnsupported: "This device does not support read-aloud", ttsLoading: "Preparing audio…", fontSizeLabel: "Adjust font size",
      hlAddNote: "Add Note", hlEditNote: "Edit Note", hlAskXz: "Ask Xiao Zhi", hlNotePlaceholder: "Write your reflection or question…", hlSave: "Save", hlCancel: "Cancel", askAboutLine: "About this line: “", askAboutLineEnd: "” — ",
      myths: "Leadership Myths, Busted", tracksTitle: "Keyword Tracker", occurrences: "occurrences", chaptersSpanned: "lessons",
      checklistTitle: "Teaching Integrity Check", checklistPickChapter: "Choose a lesson to check", checklistDone: "Completed",
      journeyTitle: "321 Journey Map", journeyNote: "",
      tier: { A: "A | Explicit Scripture Teaching", B: "B | Reasoned Theological Inference", C: "C | 321's Applied Language" },
      part: "Part ", of: " of ",
      companionQsToggle: "💡 Example Questions", companionQsHide: "Hide Example Questions", companionQsHint: "Tap a question to ask Xiao Zhi directly",
      msgExpand: "Show more", msgCollapse: "Collapse", msgSave: "Save", msgSaved: "Saved", msgDelete: "Delete", msgDeleteConfirm: "Delete this reply?",
      meFavorites: "My Saved Replies", meNoFavorites: "No saved replies yet. Tap “Save” under one of Xiao Zhi's answers to keep it here.",
      meFontSize: "Font Size", fontStandard: "Standard", fontLarge: "Large", fontXLarge: "X-Large",
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
    font: parseInt(localStorage.getItem(FONT_KEY), 10) || 0, // 0=標準 1=大 2=特大
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
      document.documentElement.classList.remove("fs-lg", "fs-xl");
      var cls = FONT_CLASS[state.font] || "";
      if (cls) document.documentElement.classList.add(cls);
    } catch (e) {}
  }
  function setFont(n) {
    state.font = n;
    try { localStorage.setItem(FONT_KEY, String(state.font)); } catch (e) {}
    applyFont();
  }
  function cycleFont() { setFont((state.font + 1) % 3); }
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
  ];
  // 321專用術語的數字要「逐字讀」（3-2-1／9-2-0／2-3-5），不是唸成整數
  // （如「三百二十一」）。用正則把獨立出現的321/920/235換成逐字的中文數字，
  // 只在zh／zs生效；(?<![0-9])…(?![0-9]) 確保不會誤觸更長數字（如1920、2350）中的子字串。
  var TTS_DIGIT_FIXES = [
    [/(?<![0-9])321(?![0-9])/g, "三二一"],
    [/(?<![0-9])920(?![0-9])/g, "九二零"],
    [/(?<![0-9])235(?![0-9])/g, "二三五"],
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
  function ttsPronounceFix(text) {
    if (!text) return text;
    var out = String(text);
    if (state.lang === "zh" || state.lang === "zs") {
      TTS_DIGIT_FIXES.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
      TTS_WEI_DA_FIX.forEach(function (pair) { out = out.replace(pair[0], pair[1]); });
      out = out.replace(TTS_ENUM_FIX, "第$1，");
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
      if (s.heading) parts.push(ttsEnsureEnd(s.heading));
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
        return fetch(TTS_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ voice: voice, rate: rate, sil: TTS_SIL_SENTENCE, silc: TTS_SIL_COMMA, sile: TTS_SIL_ENUM, text: piece }),
        }).then(function (res) {
          if (!res.ok) throw new Error("TTS HTTP " + res.status);
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
        out += '<details class="deeper" data-deeper-id="' + id + '"' + opened + '>';
        out += '<summary><span class="q">' + esc(it.q) + '</span><span class="chev" aria-hidden="true"></span></summary>';
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
    // wire highlight taps + per-highlight note / ask-Xiaozhi actions
    function findHighlight(sec, idx) {
      return (state.user.highlights[chId] || []).find(function (h) { return h.sec === sec && h.idx === idx; });
    }
    function renderHlExtras(p, sec, idx) {
      var next = p.nextElementSibling;
      if (next && next.classList && next.classList.contains("hl-extras")) next.remove();
      var h = findHighlight(sec, idx);
      if (!h) return;
      var box = document.createElement("div");
      box.className = "hl-extras";
      var noteHtml = h.note ? '<div class="hl-note" data-act="editnote">📝 ' + esc(h.note) + '</div>' : "";
      box.innerHTML = noteHtml +
        '<div class="hl-actions">' +
        '<button type="button" data-act="note">📝 ' + esc(h.note ? t().hlEditNote : t().hlAddNote) + '</button>' +
        '<button type="button" data-act="ask">💬 ' + esc(t().hlAskXz) + '</button>' +
        '</div>';
      p.parentNode.insertBefore(box, p.nextSibling);
      box.querySelector('[data-act="note"]').addEventListener("click", function () { openNoteEditor(box, p, sec, idx); });
      var noteEl = box.querySelector(".hl-note");
      if (noteEl) noteEl.addEventListener("click", function () { openNoteEditor(box, p, sec, idx); });
      box.querySelector('[data-act="ask"]').addEventListener("click", function () {
        pendingAsk = t().askAboutLine + p.textContent.slice(0, 140) + t().askAboutLineEnd;
        navigate("#/companion/" + chId);
      });
    }
    function openNoteEditor(box, p, sec, idx) {
      var h = findHighlight(sec, idx);
      var existing = h && h.note ? h.note : "";
      box.innerHTML = '<div class="hl-noteedit">' +
        '<textarea rows="2" placeholder="' + esc(t().hlNotePlaceholder) + '">' + esc(existing) + '</textarea>' +
        '<div class="hl-noteedit-btns"><button type="button" data-act="save" class="btn gold">' + esc(t().hlSave) + '</button>' +
        '<button type="button" data-act="cancel" class="btn">' + esc(t().hlCancel) + '</button></div></div>';
      var ta = box.querySelector("textarea");
      ta.focus();
      box.querySelector('[data-act="save"]').addEventListener("click", function () {
        var hh = findHighlight(sec, idx);
        if (hh) { hh.note = (ta.value || "").trim(); saveUser(); }
        renderHlExtras(p, sec, idx);
      });
      box.querySelector('[data-act="cancel"]').addEventListener("click", function () { renderHlExtras(p, sec, idx); });
    }
    qsa(".reader p[data-sec]", view).forEach(function (p) {
      var sec0 = p.getAttribute("data-sec"), idx0 = parseInt(p.getAttribute("data-idx"), 10);
      if (findHighlight(sec0, idx0)) renderHlExtras(p, sec0, idx0);
      p.addEventListener("click", function (e) {
        if (e.target.closest("a") || e.target.closest(".hl-extras")) return;
        var sec = p.getAttribute("data-sec"), idx = parseInt(p.getAttribute("data-idx"), 10);
        var arr = state.user.highlights[chId] = state.user.highlights[chId] || [];
        var existingIdx = arr.findIndex(function (h) { return h.sec === sec && h.idx === idx; });
        if (existingIdx >= 0) {
          arr.splice(existingIdx, 1);
          p.removeAttribute("data-hl");
          var next = p.nextElementSibling;
          if (next && next.classList && next.classList.contains("hl-extras")) next.remove();
        } else {
          arr.push({ sec: sec, idx: idx, text: p.textContent.slice(0, 120), at: Date.now(), lang: state.lang, chId: chId, chTitle: ch.title });
          p.setAttribute("data-hl", "1");
          renderHlExtras(p, sec, idx);
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
  var pendingAsk = null; // set by "ask Xiaozhi about this line" from a highlighted paragraph
  var msgIdSeq = 0;
  function newMsgId() { msgIdSeq++; return "m" + Date.now().toString(36) + msgIdSeq; }

  function companionSystemPrompt(chId) {
    var d = D();
    var ch = chId ? d.chapters[chId] : null;
    var base = {
      zh: "你是「小智」，《321建造 教會領導力》App內的AI陪讀，人設是一位謙卑、有盼望、充滿愛心的「321領導力教練」。準則：①任何回答最終必須指向耶穌的榜樣、聖經的准則、聖靈的引導，不能只停留在321術語的自我循環論證；②回答涉及神學推論時，誠實標示層級——A為聖經明文教導，B為可討論的神學推論需說明「這是我的理解，歡迎與牧者再確認」，C為321的應用性語言需說明「這是321的應用性理解」；③遇到讀者具體人生抉擇（換工作、婚姻、離開教會等），引導讀者用321原則自己思考、鼓勵與屬靈父母／小組尋求印證，不直接替讀者下判斷；④所有經文引用一律使用和合本繁體中文；⑤語氣謙卑、盼望、帶著愛心，避免說教與居高臨下，用心不用腦；⑥這是手機聊天介面，版面要美觀、簡單、易讀：整則回覆整體字數盡量精簡（一般問題約150-250字為佳，除非讀者明確要求詳細說明），標題只在真的需要分段時偶爾使用一個「##」等級的小標題，不要每段都加標題，不用把全部內容都塞進表格，優先用簡短的段落與條列，重點文字適度加粗即可，避免過度使用巢狀項目符號或多層表格。",
      zs: "你是「小智」，《321建造 教会领导力》App内的AI陪读，人设是一位谦卑、有盼望、充满爱心的「321领导力教练」。准则：①任何回答最终必须指向耶稣的榜样、圣经的准则、圣灵的引导，不能只停留在321术语的自我循环论证；②回答涉及神学推论时，诚实标示层级——A为圣经明文教导，B为可讨论的神学推论需说明「这是我的理解，欢迎与牧者再确认」，C为321的应用性语言需说明「这是321的应用性理解」；③遇到读者具体人生抉择，引导读者用321原则自己思考、鼓励与属灵父母／小组寻求印证，不直接替读者下判断；④所有经文引用一律使用和合本简体中文；⑤语气谦卑、盼望、带着爱心，避免说教与居高临下；⑥这是手机聊天界面，版面要美观、简单、易读：整则回复整体字数尽量精简（一般问题约150-250字为佳，除非读者明确要求详细说明），标题只在真的需要分段时偶尔使用一个「##」等级的小标题，不要每段都加标题，不用把全部内容都塞进表格，优先用简短的段落与条列，重点文字适度加粗即可，避免过度使用嵌套项目符号或多层表格。",
      en: "You are 'Xiao Zhi,' the AI companion inside the Building on 321: Church Leadership app — a humble, hopeful, loving '321 Leadership Coach.' Guidelines: (1) Every answer must ultimately point to Jesus as example, Scripture as standard, and the Holy Spirit as guide — never stay circular within 321's own vocabulary; (2) when reasoning theologically, honestly mark confidence: A = explicit Scripture teaching, B = a reasoned theological inference — say 'this is my understanding, please confirm with your pastor,' C = 321's own applied language — say 'this is 321's applied framing'; (3) for concrete life decisions (a job change, marriage, leaving a church), guide the reader to think it through using 321's principles and to seek confirmation from spiritual parents/small group — never decide for them; (4) quote Scripture using the ESV (or WEB where noted) for English; (5) tone: humble, hopeful, loving — never preachy or condescending; (6) this is a mobile chat interface — keep replies clean, simple and easy to read: keep the overall length concise (roughly 100-180 words for an ordinary question, unless the reader explicitly asks for more depth), use at most an occasional small '##'-level heading only when a real section break helps (never one per paragraph), don't force everything into a table, prefer short paragraphs and simple bullet lists, use bold sparingly for genuinely key words, and avoid deeply nested lists or multi-level tables.",
    }[state.lang];
    if (ch) {
      var ctx = state.lang === "en"
        ? "\n\nThe reader is currently on: " + ch.numFull + " — " + ch.title + " (" + ch.partTitle + ")."
        : "\n\n讀者目前所在課別：" + ch.numFull + "　" + ch.title + "（" + ch.partTitle + "）。";
      base += ctx;
    }
    return base;
  }

  var companionQsOpen = false;
  var companionQsPart = null;

  function renderCompanion(view, chId) {
    var d = D();
    var chId2 = chId || currentChapterHint();
    var curPartNo = (chId2 && d.chapters[chId2]) ? d.chapters[chId2].partNo : 1;
    if (!companionQsPart) companionQsPart = curPartNo || 1;

    var html = '<div class="chatwrap">';
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
      html += '<button type="button" class="msg-act msg-del" data-mi="' + mi + '">🗑 ' + esc(t().msgDelete) + '</button>';
      html += '</div>';
      html += '</div>';
    });
    html += '</div>';

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

    html += '<div class="chatinput"><textarea id="chatIn" rows="1" placeholder="' + esc(t().companionPlaceholder) + '"></textarea><button id="chatSend">' + esc(t().companionSend) + '</button></div>';
    html += '</div>';
    view.innerHTML = html;

    var log = qs("#chatlog", view);
    log.scrollTop = log.scrollHeight;

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
      pendingAsk = null;
      setTimeout(function () { chatInEl.focus(); }, 0);
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
    chatSession.messages.push({ role: "user", text: text, id: newMsgId() });
    ta.value = "";
    renderCompanion(qs("#view"), chId);
    var log = qs("#chatlog"); if (log) log.scrollTop = log.scrollHeight;

    if (!navigator.onLine) {
      chatSession.messages.push({ role: "ai", text: t().companionNeedNet, id: newMsgId() });
      renderCompanion(qs("#view"), chId);
      return;
    }

    var thinkingId = newMsgId();
    chatSession.messages.push({ role: "ai", text: "…", id: thinkingId, pending: true });
    renderCompanion(qs("#view"), chId);

    var payload = {
      system: companionSystemPrompt(chId),
      messages: chatSession.messages
        .filter(function (m) { return m.id !== thinkingId; })
        .slice(-12)
        .map(function (m) { return { role: m.role === "user" ? "user" : "assistant", content: m.text }; }),
    };

    // Look up the "…" placeholder by id (not array index) when the reply lands, since the
    // user may have deleted an earlier message in the meantime and shifted every index.
    function findMsgIdxById(id) {
      for (var i = 0; i < chatSession.messages.length; i++) { if (chatSession.messages[i].id === id) return i; }
      return -1;
    }

    fetch(XIAOZHI_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(function (r) {
      if (!r.ok) throw new Error("proxy error " + r.status);
      return r.json();
    }).then(function (data) {
      var reply = extractReplyText(data);
      var idx = findMsgIdxById(thinkingId);
      if (idx >= 0) chatSession.messages[idx] = { role: "ai", text: reply || (state.lang === "en" ? "(no reply)" : "（沒有收到回覆）"), id: thinkingId };
      renderCompanion(qs("#view"), chId);
      var log2 = qs("#chatlog"); if (log2) log2.scrollTop = log2.scrollHeight;
    }).catch(function (err) {
      var idx2 = findMsgIdxById(thinkingId);
      if (idx2 >= 0) chatSession.messages[idx2] = { role: "ai", text: (state.lang === "en" ? "Connection error. Please try again." : "連線發生問題，請稍後再試。"), id: thinkingId };
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
    html += '<div class="langswitch" id="fontswitch"><button data-font="0">' + esc(t().fontStandard) + '</button><button data-font="1">' + esc(t().fontLarge) + '</button><button data-font="2">' + esc(t().fontXLarge) + '</button></div>';
    html += '</div>';
    var voiceOpts = TTS_VOICE_OPTIONS[state.lang] || TTS_VOICE_OPTIONS.zh;
    var curVoiceId = (state.user.ttsVoice && state.user.ttsVoice[state.lang]) || TTS_VOICE_DEFAULT[state.lang];
    html += '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-top:1px solid var(--border);">';
    html += '<span>' + esc(t().meVoice) + '</span>';
    html += '<div class="langswitch" id="voiceswitch">' + voiceOpts.map(function (o) {
      return '<button data-voice="' + esc(o.id) + '">' + esc(o.label) + '</button>';
    }).join("") + '</div>';
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

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () {});
    }
  }

  init();
})();


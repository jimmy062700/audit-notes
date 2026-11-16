# 審計筆記簿 Audit Notes Ledger

用固定七段格式整理的審計學學習筆記網站。純靜態網頁，部署於 GitHub Pages。

網站：https://jimmy062700.github.io/audit-notes/

## 特色

- 每則筆記同一套格式：一句話重點 → 核心概念 → 架構或公式 → 例子 → 常見混淆 → 自我檢查 → 準則依據
- 首頁目錄、編號、標籤篩選、上下篇導覽皆由 `assets/notes.js` 自動產生
- 專案規則寫在 [`CLAUDE.md`](CLAUDE.md)，AI 讀完即可依相同方式新增筆記

## 目前內容

| 編號 | 筆記 |
|---|---|
| A-001 | 審計風險模型 |
| A-002 | 重大性 |
| A-003 | 查核意見的類型 |

## 新增筆記

1. 複製 `templates/note.html` 為 `notes/<slug>.html` 並填寫內容
2. 在 `assets/notes.js` 最後加一筆資料

詳細規則見 `CLAUDE.md`。

## 本機預覽

直接用瀏覽器開啟 `index.html` 即可，不需要安裝任何東西。

> 本站為個人學習筆記，實際規定請以審計準則原文為準。

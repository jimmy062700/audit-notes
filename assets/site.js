/* 共用版面：頁首、頁尾、首頁帳簿清單、筆記頁的編號與上下篇。
 * 各頁面只需要寫內容，版面一律由這支程式產生。 */
(function () {
  var root = document.body.dataset.root || ".";
  var notes = window.NOTES || [];
  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var no = function (i) { return "A-" + String(i + 1).padStart(3, "0"); };
  var href = function (n) { return root + "/notes/" + n.slug + ".html"; };

  // 頁首
  var header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML =
    '<a class="brand" href="' + root + '/index.html"><span class="brand-mark">審</span>' +
    '<span class="brand-text">審計筆記簿<small>Audit Notes Ledger</small></span></a>' +
    '<nav><a href="' + root + '/index.html#ledger">筆記目錄</a>' +
    '<a href="' + root + '/index.html#about">關於</a></nav>';
  document.body.prepend(header);

  // 頁尾
  var footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML =
    "<p>本站為個人學習筆記，內容為自行整理之理解，實際規定請以審計準則原文為準。</p>" +
    "<p>共 " + notes.length + " 則筆記 · 依 CLAUDE.md 規則維護</p>";
  document.body.append(footer);

  // 首頁：帳簿式目錄 + 標籤篩選
  var ledger = document.getElementById("ledger-body");
  if (ledger) {
    var filters = document.getElementById("tag-filters");
    var tags = [];
    notes.forEach(function (n) {
      n.tags.forEach(function (t) { if (tags.indexOf(t) < 0) tags.push(t); });
    });
    var active = "全部";
    var draw = function () {
      ledger.innerHTML = notes.map(function (n, i) {
        if (active !== "全部" && n.tags.indexOf(active) < 0) return "";
        return '<tr><td class="c-no">' + no(i) + '</td><td class="c-date">' + esc(n.date) +
          '</td><td class="c-title"><a href="' + href(n) + '">' + esc(n.title) + "</a>" +
          '<span class="c-sum">' + esc(n.summary) + '</span></td><td class="c-tags">' +
          n.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("") +
          "</td></tr>";
      }).join("");
      filters.innerHTML = ["全部"].concat(tags).map(function (t) {
        return '<button type="button" class="chip' + (t === active ? " on" : "") + '">' + esc(t) + "</button>";
      }).join("");
    };
    filters.addEventListener("click", function (e) {
      if (e.target.classList.contains("chip")) { active = e.target.textContent; draw(); }
    });
    draw();
  }

  // 筆記頁：編號、日期、標籤、上下篇
  var slug = document.body.dataset.slug;
  if (slug) {
    var idx = notes.findIndex(function (n) { return n.slug === slug; });
    var meta = document.getElementById("note-meta");
    if (idx >= 0 && meta) {
      var n = notes[idx];
      meta.innerHTML = '<span class="stamp">' + no(idx) + "</span><span>" + esc(n.date) + "</span>" +
        n.tags.map(function (t) { return '<span class="tag">' + esc(t) + "</span>"; }).join("");
    }
    var pager = document.createElement("nav");
    pager.className = "pager";
    var prev = notes[idx - 1], next = notes[idx + 1];
    pager.innerHTML =
      (prev ? '<a class="prev" href="' + href(prev) + '"><small>上一則</small>' + esc(prev.title) + "</a>" : "<span></span>") +
      '<a class="home" href="' + root + '/index.html#ledger">回目錄</a>' +
      (next ? '<a class="next" href="' + href(next) + '"><small>下一則</small>' + esc(next.title) + "</a>" : "<span></span>");
    document.querySelector("main").append(pager);
  }
})();

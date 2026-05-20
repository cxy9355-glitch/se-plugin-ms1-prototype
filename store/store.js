// ── Mock Plugin Data (keyed by slug) ──
var pluginData = {
  "batch-align": {
    id: 1, key: "batch-align", title: "批量对齐工具 v1.2.0", author: "工坊达人A", date: "2026.04.15",
    subcategory: "编辑器工具", starRating: 4.8, approvalRate: 92,
    desc: "批量对齐工具，支持多种对齐方式，包括X轴对齐、Y轴对齐、分布对齐等。优化了大场景下的对齐性能，显著提升编辑效率。",
    tags: ["对齐","批量操作","效率"],
    likes: 128, dislikes: 5, views: 1024, downloads: 1024,
    version: "v1.2.0", size: "156 KB",
    changelog: "v1.2.0: 新增Y轴对齐、分布对齐功能；优化大场景性能；修复Z轴偏移问题\nv1.1.0: 新增批量选择对齐；修复旋转后对齐误差\nv1.0.0: 首次发布，支持X轴对齐"
  },
  "terrain-gen": {
    id: 2, key: "terrain-gen", title: "地形生成器Pro v2.1.0", author: "官方", date: "2026.03.20",
    subcategory: "地形", starRating: 4.9, approvalRate: 96,
    desc: "地形生成器Pro，一键生成复杂地形，支持侵蚀模拟、噪声种子自定义和高度图导出。",
    tags: ["地形","生成","Pro"],
    likes: 256, dislikes: 3, views: 3200, downloads: 3200,
    version: "v2.1.0", size: "892 KB",
    changelog: "v2.1.0: 新增侵蚀模拟；支持噪声种子自定义；导出高度图\nv2.0.0: 重构地形生成算法；新增多种地形预设\nv1.0.0: 首次发布"
  },
  "ai-behavior-tree": {
    id: 3, key: "ai-behavior-tree", title: "AI行为树编辑器 v1.5.0", author: "工坊达人B", date: "2026.05.01",
    subcategory: "AI工具", starRating: 4.6, approvalRate: 88,
    desc: "AI行为树编辑器，可视化编辑NPC行为逻辑，支持节点拖拽、条件分支和并行执行。",
    tags: ["AI","行为树","可视化"],
    likes: 412, dislikes: 8, views: 5600, downloads: 5600,
    version: "v1.5.0", size: "2.3 MB",
    changelog: "v1.5.0: 新增条件分支预览；优化节点拖拽体验\nv1.0.0: 首次发布，支持节点拖拽、条件分支、并行执行"
  },
  "one-click-color": {
    id: 4, key: "one-click-color", title: "一键染色工具 v2.0.1", author: "工坊达人C", date: "2026.04.28",
    subcategory: "编辑器工具", starRating: 4.7, approvalRate: 90,
    desc: "一键染色工具，快速更换模型材质颜色，支持透明度调节和批量染色。",
    tags: ["染色","材质","颜色"],
    likes: 89, dislikes: 2, views: 890, downloads: 890,
    version: "v2.0.1", size: "320 KB",
    changelog: "v2.0.1: 修复颜色溢出问题；支持透明度调节\nv2.0.0: 新增批量染色功能\nv1.0.0: 首次发布"
  },
  "resource-scanner": {
    id: 5, key: "resource-scanner", title: "资源扫描器 v1.0.0", author: "工坊达人D", date: "2026.05.10",
    subcategory: "编辑器工具", starRating: 4.5, approvalRate: 85,
    desc: "资源扫描器，快速定位项目中的冗余资源，支持纹理、模型、音频冗余检测。",
    tags: ["扫描","资源","优化"],
    likes: 67, dislikes: 1, views: 430, downloads: 430,
    version: "v1.0.0", size: "480 KB",
    changelog: "v1.0.0: 首次发布，支持纹理、模型、音频冗余检测"
  },
  "parkour-skeleton": {
    id: 6, key: "parkour-skeleton", title: "跑酷骨架生成 v3.0.0", author: "工坊达人E", date: "2026.03.01",
    subcategory: "AI工具", starRating: 4.9, approvalRate: 95,
    desc: "跑酷骨架生成，自动生成跑酷关卡骨架，支持曲线路径和障碍物密度调节。",
    tags: ["跑酷","骨架","关卡"],
    likes: 190, dislikes: 4, views: 1800, downloads: 1800,
    version: "v3.0.0", size: "640 KB",
    changelog: "v3.0.0: 重构关卡生成逻辑；新增AI路径优化\nv2.0.0: 新增曲线路径生成\nv1.3.0: 支持障碍物密度调节"
  }
};

var plugins = Object.values(pluginData);

// ── My Published Plugins (上架中) ──
var myPublished = [
  { id: 1, key: "batch-align", title: "批量对齐工具", author: "我", date: "2026.04.15", status: "online",
    starRating: 4.8, approvalRate: 92, version: "v1.2.0", downloads: 1280 },
  { id: 5, key: "resource-scanner", title: "资源扫描器", author: "我", date: "2026.05.10", status: "reviewing",
    starRating: 0, approvalRate: 0, version: "v1.0.0", downloads: 0 },
  { id: 7, key: "relation-graph", title: "关系图谱生成器", author: "我", date: "2026.03.01", status: "offline",
    starRating: 4.2, approvalRate: 78, version: "v1.0.0", downloads: 340 },
  { id: 8, key: "terrain-brush", title: "地形画刷工具", author: "我", date: "2026.02.20", status: "online",
    starRating: 4.6, approvalRate: 89, version: "v0.9.0", downloads: 2100 }
];

// ── My Acquired Plugins (已获取) ──
var myAcquired = [
  { id: 3, key: "ai-behavior-tree", title: "AI行为树编辑器", author: "工坊达人B", version: "v1.5.0",
    date: "2026.05.15", subcategory: "AI工具" },
  { id: 4, key: "one-click-color", title: "一键染色工具", author: "工坊达人C", version: "v2.0.1",
    date: "2026.04.28", subcategory: "编辑器工具" },
  { id: 2, key: "terrain-gen", title: "地形生成器Pro", author: "官方", version: "v2.1.0",
    date: "2026.05.01", subcategory: "地形" }
];

var statusLabels = { online: "已上架", reviewing: "审核中", offline: "已下架" };
var statusClasses = { online: "status-online", reviewing: "status-reviewing", offline: "status-offline" };

// ── State ──
var currentPage = "browse";
var currentDetailKey = null;
var selectedSubcategory = "all";
var filterMode = "all";
var myResSubtab = "published";
var myPublishedState = myPublished.map(function(p) { return Object.assign({}, p); });

var FILTER_MODES = ["all", "top-rated"];

function getPlugin(key) {
  return pluginData[key] || null;
}

// ── Render Browse Grid ──
function renderBrowse() {
  var grid = document.getElementById("browseGrid");
  var filtered = plugins;
  if (selectedSubcategory !== "all") {
    filtered = filtered.filter(function(p) { return p.subcategory === selectedSubcategory; });
  }
  if (filterMode === "top-rated") {
    filtered = filtered.filter(function(p) { return p.starRating >= 4.7; });
  }
  grid.innerHTML = filtered.map(function(p) {
    return '\
    <div class="resource-card" onclick="openDetail(\'' + p.key + '\')">\
      <div class="card-thumb">🧩</div>\
      <div class="card-body">\
        <div class="card-title">' + p.title + '</div>\
        <div class="card-author">@' + p.author + '</div>\
        <div class="card-meta-row">\
          <span class="card-stars">⭐' + p.starRating + '</span>\
          <span class="card-approval">好评' + p.approvalRate + '%</span>\
          <span>' + p.subcategory + '</span>\
          <span>' + p.date + '</span>\
        </div>\
        <div class="card-tags">\
          ' + p.tags.map(function(t) { return '<span class="card-tag">' + t + '</span>'; }).join("") + '\
        </div>\
      </div>\
    </div>';
  }).join("");
}

// ── Render My Resources ──
function renderMyResources() {
  var grid = document.getElementById("myResGrid");
  if (myResSubtab === "published") {
    grid.innerHTML = myPublishedState.map(function(p) {
      var cls = statusClasses[p.status];
      var label = statusLabels[p.status];
      var actionsHtml = "";
      if (p.status === "online") {
        actionsHtml = '<button class="btn-action btn-delist" onclick="event.stopPropagation(); delistPlugin(' + p.id + ')">下架</button>';
      } else if (p.status === "reviewing") {
        actionsHtml = '<button class="btn-action btn-cancel-review" onclick="event.stopPropagation(); cancelReview(' + p.id + ')">取消审核</button>';
      } else if (p.status === "offline") {
        actionsHtml = '<button class="btn-action btn-relist" onclick="event.stopPropagation(); relistPlugin(' + p.id + ')">重新上架</button>';
      }
      var showRating = p.status !== "reviewing";
      return '\
        <div class="resource-card" style="cursor:default;">\
          <div class="card-thumb">🧩</div>\
          <div class="card-body">\
            <div class="card-title">' + p.title + '</div>\
            <div class="card-author">@' + p.author + '</div>\
            <div class="card-meta-row">\
              ' + (showRating ? '<span class="card-stars">⭐' + p.starRating + '</span><span class="card-approval">好评' + p.approvalRate + '%</span>' : '<span class="card-stars">⭐0.0</span>') + '\
              <span>' + p.version + '</span>\
              <span>' + p.date + '</span>\
            </div>\
          </div>\
          <div class="card-right">\
            <span class="status-badge ' + cls + '">' + label + '</span>\
            ' + actionsHtml + '\
          </div>\
        </div>';
    }).join("");
  } else {
    grid.innerHTML = myAcquired.map(function(p) {
      var actionsHtml = '<button class="btn-action btn-detail" onclick="event.stopPropagation(); openDetail(\'' + p.key + '\')">查看详情</button>';
      return '\
        <div class="resource-card" style="cursor:default;">\
          <div class="card-thumb">🧩</div>\
          <div class="card-body">\
            <div class="card-title">' + p.title + '</div>\
            <div class="card-author">@' + p.author + '</div>\
            <div class="card-meta-row">\
              <span>' + p.version + '</span>\
              <span>' + p.date + '获取</span>\
              <span>' + p.subcategory + '</span>\
            </div>\
          </div>\
          <div class="card-right">\
            <div style="display:flex;gap:4px;">' + actionsHtml + '</div>\
          </div>\
        </div>';
    }).join("");
  }
}

function delistPlugin(id) {
  var p = myPublishedState.find(function(x) { return x.id === id; });
  if (p) { p.status = "offline"; renderMyResources(); }
}
function relistPlugin(id) {
  var p = myPublishedState.find(function(x) { return x.id === id; });
  if (p) { p.status = "online"; renderMyResources(); }
}
function cancelReview(id) {
  var p = myPublishedState.find(function(x) { return x.id === id; });
  if (p) { p.status = "offline"; renderMyResources(); }
}

// ── Render Detail ──
function openDetail(key) {
  currentDetailKey = key;
  currentPage = "detail";
  var p = getPlugin(key);
  if (!p) return;

  document.getElementById("pageBrowse").classList.add("hidden");
  document.getElementById("pageMyResources").classList.add("hidden");
  document.getElementById("pageDetail").classList.remove("hidden");
  document.getElementById("breadcrumb").classList.remove("hidden");
  document.getElementById("breadcrumbTitle").textContent = p.title;

  document.querySelectorAll("#navTabs .nav-tab").forEach(function(t) {
    t.classList.remove("active", "active-orange");
  });

  document.getElementById("detailPreviewName").textContent = p.title;

  // 详细信息 = 描述 + meta 表格
  document.getElementById("detailDesc").textContent = p.desc;
  document.getElementById("detailMeta").innerHTML =
    '<div class="detail-meta-item"><span class="key">发布时间</span><span class="val">' + p.date + '</span></div>' +
    '<div class="detail-meta-item"><span class="key">版本</span><span class="val">' + p.version + ' <button class="btn-changelog" onclick="openChangelog()">更新日志</button></span></div>' +
    '<div class="detail-meta-item"><span class="key">大小</span><span class="val">' + p.size + '</span></div>' +
    '<div class="detail-meta-item"><span class="key">获取次数</span><span class="val">' + p.downloads.toLocaleString() + '</span></div>';

  // 更新日志（弹窗内容，点按钮才显示）
  var clParts = p.changelog.split("\n").filter(Boolean);
  document.getElementById("detailChangelog").innerHTML = clParts.map(function(line) {
    var colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      var ver = line.substring(0, colonIdx);
      var rest = line.substring(colonIdx + 1);
      return '<div class="ver">' + ver + '</div><div style="margin-bottom:8px;">' + rest + '</div>';
    }
    return '<div style="margin-bottom:4px;">' + line + '</div>';
  }).join("");

  // 右侧信息面板
  document.getElementById("detailInfo").innerHTML =
    '<div class="detail-author-row">' +
    '  <div class="detail-author-avatar">' + p.author.charAt(0) + '</div>' +
    '  <div class="detail-author-name">@' + p.author + '</div>' +
    '</div>' +
    '<div class="detail-title">' + p.title.split(" v")[0] + '</div>' +
    '<div class="detail-category">插件 › ' + p.subcategory + '</div>' +
    '<div class="detail-tags">' + p.tags.map(function(t) { return '<span class="tag">' + t + '</span>'; }).join("") + '</div>' +
    '<div class="detail-stats">' +
    '  <div class="detail-likes-row">' +
    '    <span>👍 ' + p.likes + '</span>' +
    '    <span>👎 ' + p.dislikes + '</span>' +
    '    <span>👁 ' + p.views.toLocaleString() + '</span>' +
    '  </div>' +
    '</div>' +
    '<button class="btn-cta">🪙 免费 添加到我的资源库</button>';

  var related = plugins.filter(function(x) { return x.key !== key; }).slice(0, 3);
  document.getElementById("relatedGrid").innerHTML = related.map(function(r) {
    return '\
    <div class="related-card" onclick="openDetail(\'' + r.key + '\')">\
      <div class="rc-thumb">🧩</div>\
      <div class="rc-title">' + r.title + '</div>\
      <div class="rc-author">@' + r.author + '</div>\
      <div class="rc-stars">⭐' + r.starRating + ' 好评' + r.approvalRate + '%</div>\
    </div>';
  }).join("");
}

function goBrowse() {
  showPage("browse");
}

// ── Page Switching ──
function showPage(page) {
  currentPage = page;
  currentDetailKey = null;

  document.getElementById("pageBrowse").classList.add("hidden");
  document.getElementById("pageDetail").classList.add("hidden");
  document.getElementById("pageMyResources").classList.add("hidden");
  document.getElementById("breadcrumb").classList.add("hidden");

  var tabs = document.querySelectorAll("#navTabs .nav-tab");
  tabs.forEach(function(t) {
    t.classList.remove("active", "active-orange");
  });

  if (page === "browse") {
    document.getElementById("pageBrowse").classList.remove("hidden");
    tabs[0].classList.add("active");
  } else if (page === "myresources") {
    document.getElementById("pageMyResources").classList.remove("hidden");
    tabs[1].classList.add("active-orange");
    renderMyResources();
  }
}

// ── Nav tab clicks ──
document.getElementById("navTabs").addEventListener("click", function(e) {
  var tab = e.target.closest(".nav-tab");
  if (!tab) return;
  var page = tab.dataset.page;
  if (page) showPage(page);
});

// ── Category sidebar ──
document.querySelector(".cat-sidebar").addEventListener("click", function(e) {
  var item = e.target.closest(".cat-item");
  if (!item) return;
  document.querySelectorAll(".cat-item").forEach(function(i) { i.classList.remove("active"); });
  item.classList.add("active");
  selectedSubcategory = item.dataset.sub;
  renderBrowse();
});

// ── My Resources subtabs ──
document.getElementById("myResSubtabs").addEventListener("click", function(e) {
  var tab = e.target.closest(".subtab");
  if (!tab) return;
  document.querySelectorAll("#myResSubtabs .subtab").forEach(function(t) { t.classList.remove("active"); });
  tab.classList.add("active");
  myResSubtab = tab.dataset.subtab;
  renderMyResources();
});

// ── Changelog modal ──
function openChangelog() {
  document.getElementById("changelogModal").classList.remove("hidden");
}
function closeChangelog() {
  document.getElementById("changelogModal").classList.add("hidden");
}

// ── Init ──
renderBrowse();

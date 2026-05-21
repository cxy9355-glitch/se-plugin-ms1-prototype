// =============================================================
// SAMPLE DATA
// =============================================================
var officialPlugins = [
  { name: 'SE UGC Plugin Sample', ver: '1.0.0', desc: 'SE 模式编辑器 API 测试示例' }
];

var myCreatedPlugins = [
  { name: '批量对齐工具', ver: '1.1.0', status: 'synced' },
  { name: '资源扫描器', ver: '0.9.0', status: 'modified' },
  { name: '关系图谱生成器', ver: '1.0.0', status: 'missing' }
];

var myAcquiredPlugins = [
  { name: '一键染色工具', ver: '2.0.1', author: '张三', status: 'updated' },
  { name: '地图模板管理器', ver: '1.3.0', author: '李四', status: 'update-available' },
  { name: '场景批量导出器', ver: '1.0.0', author: '王五', status: 'not-downloaded' },
  { name: '灯光预设工具', ver: '0.8.0', author: '赵六', status: 'unpublished' }
];

var localPlugins = [];
var localIdCounter = 0;
var renameTarget = null;
var deleteTarget = null;
var publishTarget = null;
var activePublishMode = 'new';
var TAKEN_VERSION = '1.0.0';

// =============================================================
// INIT
// =============================================================
(function init() {
  addDefaultLocal();
  renderOfficial();
  renderMyCreated();
  renderMyAcquired();
  renderLocal();
})();

function addDefaultLocal() {
  localIdCounter++;
  localPlugins.push({
    id: localIdCounter,
    name: '我的测试插件',
    ver: '0.1.0',
    path: 'C:/Users/Admin/Documents/EggyPartyEditor/ugc_plugin/my_test/'
  });
}

// =============================================================
// STATUS UTILS
// =============================================================
function badgeClass(status) {
  switch (status) {
    case 'synced': return 'badge-synced';
    case 'modified': return 'badge-modified';
    case 'missing': return 'badge-missing';
    case 'updated': return 'badge-updated';
    case 'update-available': return 'badge-update-available';
    case 'not-downloaded': return 'badge-missing';
    case 'unpublished': return 'badge-version';
    default: return 'badge-version';
  }
}

function statusText(status) {
  switch (status) {
    case 'synced': return '已同步';
    case 'modified': return '本地有修改';
    case 'missing': return '本地文件不存在';
    case 'updated': return '已是最新';
    case 'update-available': return '有更新可用';
    case 'not-downloaded': return '未下载';
    case 'unpublished': return '已下架';
    default: return status;
  }
}

// =============================================================
// CREATE CARD
// =============================================================
function iconHTML() {
  return '<div class="plugin-icon">&#x1F9E9;</div>';
}

// --- 官方插件 card ---
function createOfficialCard(p) {
  return '' +
    '<div class="plugin-card">' +
      '<div class="card-row">' +
        iconHTML() +
        '<div class="card-info">' +
          '<div class="plugin-meta">' +
            '<span class="plugin-name">' + esc(p.name) + '</span>' +
            '<span class="badge badge-version">v' + esc(p.ver) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="plugin-desc">' + esc(p.desc) + '</div>' +
      '<div class="card-row">' +
        '<div class="plugin-actions">' +
          '<button class="btn btn-outline">打开</button>' +
          '<button class="btn btn-outline btn-export-to-local" data-name="' + escAttr(p.name) + '" data-ver="' + escAttr(p.ver) + '">导出到本地</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

function storeStatusBadge(storeStatus) {
  if (!storeStatus) return '';
  var map = {
    'reviewing':  ['badge-modified',  '审核中'],
    'published':  ['badge-synced',    '已上架'],
    'rejected':   ['badge-missing',   '审核未通过'],
    'unpublished':['badge-version',   '已下架']
  };
  var entry = map[storeStatus];
  return entry ? '<span class="badge ' + entry[0] + '">' + entry[1] + '</span>' : '';
}

// --- 我创建的 card ---
function createMyCreatedCard(p) {
  var isMissing = p.status === 'missing';
  var cardClass = isMissing ? ' plugin-card card-disabled' : ' plugin-card';
  var nameClass = isMissing ? ' plugin-name' : ' plugin-name';

  var btnOpen = '';
  var btnSync = '';
  var btnRename = '';
  var btnFolder = '';
  var btnRestore = '';
  var btnPublish = '';
  var btnDelete = '';

  if (isMissing) {
    btnOpen = '<span class="has-tooltip" data-tooltip="本地文件不存在，请先从云端恢复"><button class="btn btn-outline" disabled>打开</button></span>';
    btnSync = '<span class="has-tooltip" data-tooltip="本地文件不存在，请先从云端恢复"><button class="btn btn-outline" disabled>同步到云</button></span>';
    btnRename = '<span class="has-tooltip" data-tooltip="本地文件不存在，请先从云端恢复"><button class="btn btn-ghost" disabled>重命名</button></span>';
    btnFolder = '<span class="has-tooltip" data-tooltip="本地文件不存在，请先从云端恢复"><button class="btn btn-ghost" disabled>打开文件夹</button></span>';
    btnPublish = '<span class="has-tooltip" data-tooltip="本地文件不存在，请先从云端恢复"><button class="btn btn-primary" disabled>上架</button></span>';
    btnRestore = '<button class="btn btn-warning btn-restore-from-cloud" data-name="' + escAttr(p.name) + '">从云端恢复</button>';
    btnDelete = '<button class="btn btn-danger btn-delete-plugin" data-name="' + escAttr(p.name) + '" data-type="created">删除</button>';
  } else {
    btnOpen = '<button class="btn btn-outline">打开</button>';
    btnSync = '<button class="btn btn-outline">同步到云</button>';
    btnRename = '<button class="btn btn-ghost btn-rename" data-name="' + escAttr(p.name) + '">重命名</button>';
    btnFolder = '<button class="btn btn-ghost btn-open-folder" data-name="' + escAttr(p.name) + '">打开文件夹</button>';
    btnPublish = '<button class="btn btn-primary btn-publish" data-name="' + escAttr(p.name) + '" data-ver="' + escAttr(p.ver) + '">上架</button>';
    if (p.storeStatus === 'reviewing') {
      btnPublish = '<span class="has-tooltip" data-tooltip="审核中，请等待审核完成"><button class="btn btn-primary" disabled>上架</button></span>';
    }
    if (p.status === 'synced') {
      btnRestore = '<button class="btn btn-ghost" disabled>从云端恢复</button>';
    } else {
      btnRestore = '<button class="btn btn-warning btn-restore-from-cloud" data-name="' + escAttr(p.name) + '">从云端恢复</button>';
    }
    btnDelete = '<button class="btn btn-danger btn-delete-plugin" data-name="' + escAttr(p.name) + '" data-type="created">删除</button>';
  }

  return '' +
    '<div class="' + cardClass + '">' +
      '<div class="card-row">' +
        iconHTML() +
        '<div class="card-info">' +
          '<div class="plugin-meta">' +
            '<span class="' + nameClass + '">' + esc(p.name) + '</span>' +
            '<span class="badge badge-version">v' + esc(p.ver) + '</span>' +
            '<span class="badge ' + badgeClass(p.status) + '">' + statusText(p.status) + '</span>' +
            storeStatusBadge(p.storeStatus) +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-row">' +
        '<div class="plugin-actions">' +
          btnOpen +
          btnSync +
          btnRename +
          btnFolder +
          btnRestore +
          btnPublish +
          btnDelete +
        '</div>' +
      '</div>' +
    '</div>';
}

// --- 我获取的 card ---
function createAcquiredCard(p) {
  var isNotDownloaded = p.status === 'not-downloaded';
  var isUnpublished   = p.status === 'unpublished';
  var hasUpdate       = p.status === 'update-available';

  var btnOpen   = isNotDownloaded ? '' : '<button class="btn btn-outline">打开</button>';
  var btnUpdate = hasUpdate
    ? '<button class="btn btn-outline btn-update-acquired" data-name="' + escAttr(p.name) + '">更新</button>'
    : '';
  var btnDownload = isNotDownloaded
    ? '<button class="btn btn-primary btn-download-acquired" data-name="' + escAttr(p.name) + '">下载</button>'
    : '';
  var btnDetail  = '<button class="btn btn-outline">查看商店详情</button>';
  var btnFolder  = isNotDownloaded ? '' : '<button class="btn btn-ghost btn-open-folder" data-name="' + escAttr(p.name) + '">打开文件夹</button>';

  return '' +
    '<div class="plugin-card' + (isNotDownloaded ? ' card-disabled' : '') + '">' +
      '<div class="card-row">' +
        iconHTML() +
        '<div class="card-info">' +
          '<div class="plugin-meta">' +
            '<span class="plugin-name">' + esc(p.name) + '</span>' +
            '<span class="plugin-author">@' + esc(p.author) + '</span>' +
            '<span class="badge badge-version">v' + esc(p.ver) + '</span>' +
            '<span class="badge ' + badgeClass(p.status) + '">' + statusText(p.status) + '</span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="card-row">' +
        '<div class="plugin-actions">' +
          btnDownload + btnOpen + btnUpdate + btnDetail + btnFolder +
        '</div>' +
      '</div>' +
    '</div>';
}

// --- 本地插件 card ---
function createLocalCard(p) {
  return '' +
    '<div class="plugin-card">' +
      '<div class="card-row">' +
        iconHTML() +
        '<div class="card-info">' +
          '<span class="plugin-name">' + esc(p.name) + '</span>' +
          '<span class="badge badge-version">v' + esc(p.ver) + '</span>' +
        '</div>' +
      '</div>' +
      '<div class="card-row">' +
        '<span class="plugin-path" style="margin-left:50px;">' + esc(p.path) + '</span>' +
      '</div>' +
      '<div class="card-row">' +
        '<div class="plugin-actions">' +
          '<button class="btn btn-outline">打开</button>' +
          '<button class="btn btn-success btn-upload-to-cloud" data-name="' + escAttr(p.name) + '">上传到云</button>' +
          '<button class="btn btn-ghost btn-rename" data-name="' + escAttr(p.name) + '">重命名</button>' +
          '<button class="btn btn-danger btn-delete-plugin" data-name="' + escAttr(p.name) + '" data-type="local">删除</button>' +
          '<button class="btn btn-ghost btn-open-folder" data-name="' + escAttr(p.name) + '">打开文件夹</button>' +
        '</div>' +
      '</div>' +
    '</div>';
}

// =============================================================
// RENDER FUNCTIONS
// =============================================================
function renderOfficial() {
  var html = '';
  officialPlugins.forEach(function(p) { html += createOfficialCard(p); });
  document.getElementById('tab-official').innerHTML = html;
}

function renderMyCreated() {
  var html = '';
  myCreatedPlugins.forEach(function(p) { html += createMyCreatedCard(p); });
  document.getElementById('subtabs-created').innerHTML = html;
}

function renderMyAcquired() {
  var html = '';
  myAcquiredPlugins.forEach(function(p) { html += createAcquiredCard(p); });
  document.getElementById('subtabs-acquired').innerHTML = html;
}

function renderLocal() {
  var list = document.getElementById('localList');
  var empty = document.getElementById('localEmpty');
  list.innerHTML = '';
  if (localPlugins.length === 0) {
    list.style.display = 'none';
    empty.style.display = 'flex';
    return;
  }
  empty.style.display = 'none';
  list.style.display = 'flex';
  list.style.flexDirection = 'column';
  list.style.gap = '12px';
  localPlugins.forEach(function(p) {
    var div = document.createElement('div');
    div.innerHTML = createLocalCard(p);
    list.appendChild(div);
  });
}

// =============================================================
// UTILS
// =============================================================
function esc(s) { return (s || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function escAttr(s) { return (s || '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;'); }

// =============================================================
// TAB SWITCHING - Left sidebar
// =============================================================
document.getElementById('sidebar').addEventListener('click', function(e) {
  var btn = e.target.closest('.sidebar-tab');
  if (!btn) return;
  document.querySelectorAll('.sidebar-tab').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var tabId = 'tab-' + btn.dataset.tab;
  document.querySelectorAll('#contentArea > .tab-content').forEach(function(c) { c.classList.remove('active', 'fade-in'); });
  var target = document.getElementById(tabId);
  target.classList.add('active');
  void target.offsetWidth;
  target.classList.add('fade-in');
});

// =============================================================
// SUB-TAB SWITCHING (我的插件)
// =============================================================
document.getElementById('subTabs').addEventListener('click', function(e) {
  var btn = e.target.closest('.sub-tab');
  if (!btn) return;
  document.querySelectorAll('.sub-tab').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var subtabId = 'subtabs-' + btn.dataset.subtab;
  document.querySelectorAll('#tab-my > .tab-content').forEach(function(c) { c.classList.remove('active'); });
  document.getElementById(subtabId).classList.add('active');
});

// =============================================================
// MODAL HELPERS
// =============================================================
function openModal(id) { document.getElementById(id).classList.remove('hidden'); }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); }

// Click overlay to close
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('modal-overlay')) {
    closeModal(e.target.id);
  }
});

// Click close buttons inside modals
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.close-btn');
  if (!btn) return;
  var ov = btn.closest('.modal-overlay');
  if (ov) closeModal(ov.id);
});

// Click modal .modal-close buttons
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.modal-close');
  if (!btn) return;
  var ov = btn.closest('.modal-overlay');
  if (ov) closeModal(ov.id);
});

// =============================================================
// MODAL: 新建插件
// =============================================================
document.getElementById('btnNewPlugin').addEventListener('click', function() {
  document.getElementById('inputNewPluginName').value = '';
  openModal('modalNewPlugin');
  setTimeout(function() { document.getElementById('inputNewPluginName').focus(); }, 150);
});

document.getElementById('btnConfirmCreate').addEventListener('click', function() {
  var name = document.getElementById('inputNewPluginName').value.trim();
  if (!name) { document.getElementById('inputNewPluginName').focus(); return; }
  localIdCounter++;
  localPlugins.push({
    id: localIdCounter,
    name: name,
    ver: '0.1.0',
    path: name.replace(/\s+/g, '_') + '/'
  });
  closeModal('modalNewPlugin');
  renderLocal();
});

// =============================================================
// MODAL: 上架 (Publish)
// =============================================================
// Toggle: 新发布 / 更新已有
document.getElementById('publishToggle').addEventListener('click', function(e) {
  var btn = e.target.closest('.toggle-option');
  if (!btn) return;
  document.querySelectorAll('#publishToggle .toggle-option').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  activePublishMode = btn.dataset.mode;
  document.getElementById('publishNewSection').style.display = activePublishMode === 'new' ? 'block' : 'none';
  document.getElementById('publishUpdateSection').style.display = activePublishMode === 'update' ? 'block' : 'none';
  document.getElementById('btnSubmitPublish').textContent = activePublishMode === 'update' ? '提交更新' : '提交审核';
  resetPublishValidation();
});

function resetPublishForm() {
  coverImages = [];
  pkgTags = [];
  renderCoverUpload();
  renderTagList();
  document.getElementById('pkgName').value = '';
  document.getElementById('pkgDesc').value = '';
  document.getElementById('pkgVersion').value = '';
  document.getElementById('pkgCategory').value = '';
  document.getElementById('updateTarget').value = '';
  document.getElementById('updateVersion').value = '';
  document.getElementById('updateChangelog').value = '';
  document.querySelectorAll('#publishNewSection .form-input, #publishUpdateSection .form-input').forEach(function(el) { el.classList.remove('error'); });
  document.getElementById('versionErrorNew').classList.add('hidden');
  document.getElementById('versionErrorUpdate').classList.add('hidden');
  document.querySelectorAll('#publishToggle .toggle-option').forEach(function(b) { b.classList.remove('active'); });
  document.querySelector('#publishToggle .toggle-option[data-mode="new"]').classList.add('active');
  activePublishMode = 'new';
  document.getElementById('publishNewSection').style.display = 'block';
  document.getElementById('publishUpdateSection').style.display = 'none';
  document.getElementById('btnSubmitPublish').textContent = '提交审核';
  disableSubmitButton();
}

function resetPublishValidation() {
  document.querySelectorAll('#publishNewSection .form-input, #publishUpdateSection .form-input')
    .forEach(function(el) { el.classList.remove('error'); });
}

function disableSubmitButton() {
  var btn = document.getElementById('btnSubmitPublish');
  btn.disabled = true;
  btn.classList.add('disabled');
}

function enableSubmitButton() {
  var btn = document.getElementById('btnSubmitPublish');
  btn.disabled = false;
  btn.classList.remove('disabled');
}

function validatePublishForm() {
  var mode = activePublishMode;
  var hasError = false;

  if (mode === 'new') {
    var name = document.getElementById('pkgName').value.trim();
    var desc = document.getElementById('pkgDesc').value.trim();
    var ver = document.getElementById('pkgVersion').value.trim();
    var cat = document.getElementById('pkgCategory').value;

    // Version check
    var verInput = document.getElementById('pkgVersion');
    var verError = document.getElementById('versionErrorNew');
    if (ver && ver === TAKEN_VERSION) {
      verInput.classList.add('error');
      verError.classList.remove('hidden');
      hasError = true;
    } else {
      verInput.classList.remove('error');
      verError.classList.add('hidden');
    }

    // Cover image: at least 1 required
    if (coverImages.length === 0) hasError = true;

    if (!name || !desc || !ver || !cat) {
      hasError = true;
    }
  } else {
    var target = document.getElementById('updateTarget').value;
    var uver = document.getElementById('updateVersion').value.trim();
    var changelog = document.getElementById('updateChangelog').value.trim();

    var uverInput = document.getElementById('updateVersion');
    var uverError = document.getElementById('versionErrorUpdate');
    if (uver && uver === TAKEN_VERSION) {
      uverInput.classList.add('error');
      uverError.classList.remove('hidden');
      hasError = true;
    } else {
      uverInput.classList.remove('error');
      uverError.classList.add('hidden');
    }

    if (!target || !uver || !changelog) {
      hasError = true;
    }
  }

  if (hasError) {
    disableSubmitButton();
  } else {
    enableSubmitButton();
  }
}

// Monitor form inputs for validation
document.getElementById('publishModalBody').addEventListener('input', function(e) {
  if (e.target.closest('#publishNewSection') || e.target.closest('#publishUpdateSection')) {
    validatePublishForm();
  }
});
document.getElementById('publishModalBody').addEventListener('change', function(e) {
  if (e.target.closest('#publishNewSection') || e.target.closest('#publishUpdateSection')) {
    validatePublishForm();
  }
});

// Open publish dialog — with dirty check
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-publish');
  if (!btn || btn.disabled) return;
  publishTarget = { name: btn.dataset.name, ver: btn.dataset.ver };
  // Check if local has unsaved changes
  var plugin = myCreatedPlugins.find(function(p) { return p.name === publishTarget.name; });
  if (plugin && plugin.status === 'modified') {
    openModal('modalPublishDirtyCheck');
  } else {
    openPublishForm();
  }
});

document.getElementById('btnPublishAnyway').addEventListener('click', function() {
  closeModal('modalPublishDirtyCheck');
  openPublishForm();
});

document.getElementById('btnSyncThenPublish').addEventListener('click', function() {
  closeModal('modalPublishDirtyCheck');
  // Mock: mark as synced then open publish form
  myCreatedPlugins.forEach(function(p) {
    if (p.name === publishTarget.name) p.status = 'synced';
  });
  renderMyCreated();
  openPublishForm();
});

function openPublishForm() {
  resetPublishForm();
  // Pre-fill plugin name and version
  if (publishTarget) {
    document.getElementById('pkgName').value = publishTarget.name;
    document.getElementById('pkgVersion').value = publishTarget.ver;
  }
  // Update target select
  var sel = document.getElementById('updateTarget');
  sel.innerHTML = '<option value="">请选择目标插件</option>';
  myCreatedPlugins.forEach(function(p) {
    sel.innerHTML += '<option value="' + escAttr(p.name) + '">' + esc(p.name) + ' (v' + esc(p.ver) + ')</option>';
  });
  openModal('modalPublish');
  validatePublishForm();
}

// Monitor version change for validation
document.getElementById('pkgVersion').addEventListener('input', function() {
  validatePublishForm();
});

// Submit publish
document.getElementById('btnSubmitPublish').addEventListener('click', function() {
  if (!publishTarget) return;
  myCreatedPlugins.forEach(function(p) {
    if (p.name === publishTarget.name) p.storeStatus = 'reviewing';
  });
  renderMyCreated();
  closeModal('modalPublish');
  publishTarget = null;
});

// =============================================================
// MODAL: 重命名
// =============================================================
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-rename');
  if (!btn || btn.disabled) return;
  renameTarget = { name: btn.dataset.name, type: btn.closest('#subtabs-created') ? 'created' : 'local' };
  document.getElementById('inputRenameName').value = renameTarget.name;
  openModal('modalRename');
  setTimeout(function() { document.getElementById('inputRenameName').focus(); document.getElementById('inputRenameName').select(); }, 150);
});

document.getElementById('btnConfirmRename').addEventListener('click', function() {
  if (!renameTarget) return;
  var newName = document.getElementById('inputRenameName').value.trim();
  if (!newName) { document.getElementById('inputRenameName').focus(); return; }
  if (renameTarget.type === 'created') {
    myCreatedPlugins.forEach(function(p) {
      if (p.name === renameTarget.name) p.name = newName;
    });
    renderMyCreated();
  } else {
    localPlugins.forEach(function(p) {
      if (p.name === renameTarget.name) p.name = newName;
    });
    renderLocal();
  }
  closeModal('modalRename');
  renameTarget = null;
});

// =============================================================
// MODAL: 删除
// =============================================================
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-delete-plugin');
  if (!btn || btn.disabled) return;
  deleteTarget = { name: btn.dataset.name, type: btn.dataset.type, el: btn.closest('.plugin-card') };
  showDeleteDialog();
});

function showDeleteDialog() {
  var body = document.getElementById('deleteModalBody');
  var footer = document.getElementById('deleteModalFooter');

  if (deleteTarget.type === 'created') {
    body.innerHTML = '' +
      '<div class="confirm-text" style="margin-bottom:4px;">确认要删除插件「<span class="highlight">' + esc(deleteTarget.name) + '</span>」？请选择删除方式：</div>' +
      '<div class="delete-options-row">' +
        '<button class="delete-option-btn" id="deleteOptCloud">' +
          '<div class="delete-option-title">仅删除本地文件</div>' +
          '<div class="delete-option-desc">云端数据保留</div>' +
        '</button>' +
        '<button class="delete-option-btn" id="deleteOptFull">' +
          '<div class="delete-option-title">从列表删除并删除本地文件</div>' +
          '<div class="delete-option-desc">彻底删除本地文件</div>' +
        '</button>' +
      '</div>';
    footer.innerHTML = '<button class="btn btn-ghost modal-close">取消</button>';
  } else {
    body.innerHTML = '' +
      '<div class="confirm-text">确认从列表移除插件「<span class="highlight">' + esc(deleteTarget.name) + '</span>」？' +
        '<div class="sub-text">本地文件将保留，可重新导入。</div>' +
      '</div>';
    footer.innerHTML = '' +
      '<button class="btn btn-ghost modal-close">取消</button>' +
      '<button class="btn btn-danger" id="btnConfirmDelete">确认移除</button>';
  }
  openModal('modalDelete');
}

// Handle delete option clicks
document.getElementById('deleteModalBody').addEventListener('click', function(e) {
  var opt = e.target.closest('.delete-option-btn');
  if (!opt) return;
  doDelete(opt.id === 'deleteOptCloud' ? 'cloud' : 'full');
});

document.getElementById('deleteModalFooter').addEventListener('click', function(e) {
  if (e.target.id === 'btnConfirmDelete') {
    doDelete('local');
  }
});

function doDelete(mode) {
  if (!deleteTarget) return;
  if (deleteTarget.type === 'local' || mode === 'local') {
    localPlugins = localPlugins.filter(function(p) { return p.name !== deleteTarget.name; });
    renderLocal();
  } else if (deleteTarget.type === 'created') {
    myCreatedPlugins = myCreatedPlugins.filter(function(p) { return p.name !== deleteTarget.name; });
    renderMyCreated();
    // Also update publish target select
    var sel = document.getElementById('updateTarget');
    sel.innerHTML = '<option value="">请选择目标插件</option>';
    myCreatedPlugins.forEach(function(p) {
      sel.innerHTML += '<option value="' + escAttr(p.name) + '">' + esc(p.name) + ' (v' + esc(p.ver) + ')</option>';
    });
  }
  closeModal('modalDelete');
  deleteTarget = null;
}

// =============================================================
// MODAL: 上传到云
// =============================================================
var coverImages = []; // stores {url, name} for new-publish cover

function renderCoverUpload() {
  var area = document.getElementById('uploadAreaNew');
  area.innerHTML = '';
  coverImages.forEach(function(img, idx) {
    var thumb = document.createElement('div');
    thumb.className = 'cover-thumb';
    thumb.innerHTML =
      '<img src="' + img.url + '" alt="' + esc(img.name) + '">' +
      '<button class="cover-remove" data-idx="' + idx + '">&#x2715;</button>';
    area.appendChild(thumb);
  });
  if (coverImages.length < 4) {
    var addBtn = document.createElement('label');
    addBtn.className = 'upload-placeholder';
    addBtn.innerHTML = '+ 上传<input type="file" id="coverFileInput" accept=".jpg,.jpeg,.png" style="display:none;" multiple>';
    area.appendChild(addBtn);
  }
}

document.getElementById('uploadAreaNew').addEventListener('change', function(e) {
  var input = e.target;
  if (!input || input.type !== 'file') return;
  var files = Array.from(input.files);
  files.forEach(function(file) {
    if (coverImages.length >= 4) return;
    var url = URL.createObjectURL(file);
    coverImages.push({ url: url, name: file.name });
  });
  renderCoverUpload();
  validatePublishForm();
  // reset input so same file can be re-selected
  input.value = '';
});

document.getElementById('uploadAreaNew').addEventListener('click', function(e) {
  var btn = e.target.closest('.cover-remove');
  if (!btn) return;
  var idx = parseInt(btn.dataset.idx, 10);
  URL.revokeObjectURL(coverImages[idx].url);
  coverImages.splice(idx, 1);
  renderCoverUpload();
  validatePublishForm();
});


document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-upload-to-cloud');
  if (!btn) return;
  uploadTarget = { name: btn.dataset.name };
  document.getElementById('uploadCloudName').textContent = uploadTarget.name;
  openModal('modalUploadCloud');
});

document.getElementById('btnConfirmUploadCloud').addEventListener('click', function() {
  if (!uploadTarget) return;
  localPlugins = localPlugins.filter(function(p) { return p.name !== uploadTarget.name; });
  myCreatedPlugins.unshift({ name: uploadTarget.name, ver: '0.1.0', status: 'synced' });
  renderLocal();
  renderMyCreated();
  var sel = document.getElementById('updateTarget');
  sel.innerHTML = '<option value="">请选择目标插件</option>';
  myCreatedPlugins.forEach(function(p) {
    sel.innerHTML += '<option value="' + escAttr(p.name) + '">' + esc(p.name) + ' (v' + esc(p.ver) + ')</option>';
  });
  closeModal('modalUploadCloud');
  uploadTarget = null;
});

// =============================================================
// MODAL: 从云端恢复
// =============================================================
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-restore-from-cloud');
  if (!btn || btn.disabled) return;
  var name = btn.dataset.name;
  document.getElementById('restoreCloudMsg').innerHTML =
    '确认从云端恢复「<span class="highlight">' + esc(name) + '</span>」？本地文件将被云端版本覆盖，此操作<b style="color:#e06060;">不可撤销</b>。';
  window._restoreCloudName = name;
  openModal('modalRestoreCloud');
});

document.getElementById('btnConfirmRestoreCloud').addEventListener('click', function() {
  if (!window._restoreCloudName) return;
  myCreatedPlugins.forEach(function(p) {
    if (p.name === window._restoreCloudName && p.status === 'missing') {
      p.status = 'synced';
    }
  });
  renderMyCreated();
  closeModal('modalRestoreCloud');
  window._restoreCloudName = null;
});

// =============================================================
// 我获取的：下载 & 更新
// =============================================================
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-download-acquired');
  if (!btn) return;
  var name = btn.dataset.name;
  myAcquiredPlugins.forEach(function(p) {
    if (p.name === name) p.status = 'updated';
  });
  renderMyAcquired();
});

document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-update-acquired');
  if (!btn) return;
  var name = btn.dataset.name;
  myAcquiredPlugins.forEach(function(p) {
    if (p.name === name) { p.status = 'updated'; p.ver = p.ver.replace(/\d+$/, function(n) { return +n + 1; }); }
  });
  renderMyAcquired();
});

// =============================================================
// 导入插件 (添加一个本地插件样本)
// =============================================================
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-open-folder');
  if (!btn || btn.disabled) return;
  var name = btn.dataset.name;

  // 模拟运行时文件夹存在性检查
  // 对"我获取的"已下载的插件，模拟文件夹已丢失
  var acquired = myAcquiredPlugins.find(function(p) { return p.name === name; });
  if (acquired && acquired.status !== 'not-downloaded') {
    acquired.status = 'not-downloaded';
    renderMyAcquired();
    alert('本地文件已丢失，已降级为「未下载」状态，请重新下载。\n（原型演示 — 实际运行中每次操作前做此检查）');
    return;
  }

  alert('打开文件夹: ' + name);
});

// =============================================================
// 登录状态（内部版本可免登录）
// =============================================================
var isLoggedIn = true;

function applyLoginState() {
  var myTab = document.querySelector('.sidebar-tab[data-tab="my"]');
  myTab.style.display = isLoggedIn ? '' : 'none';
  // 若当前在我的插件且切成未登录，跳到本地插件
  if (!isLoggedIn && myTab.classList.contains('active')) {
    myTab.classList.remove('active');
    document.querySelectorAll('#contentArea > .tab-content').forEach(function(c) { c.classList.remove('active', 'fade-in'); });
    document.querySelector('.sidebar-tab[data-tab="local"]').classList.add('active');
    var t = document.getElementById('tab-local');
    t.classList.add('active');
    void t.offsetWidth;
    t.classList.add('fade-in');
  }
}

// 顶部 title 双击切换登录态（原型演示用）
document.querySelector('.title-bar .title').addEventListener('dblclick', function() {
  isLoggedIn = !isLoggedIn;
  this.textContent = '🛠 编辑器插件' + (isLoggedIn ? '' : '（未登录）');
  applyLoginState();
});


// =============================================================
var pkgTags = [];

function renderTagList() {
  var list = document.getElementById('tagList');
  list.innerHTML = pkgTags.map(function(t, i) {
    return '<span class="tag-chip">' + esc(t) +
      '<button class="tag-remove" data-idx="' + i + '">×</button></span>';
  }).join('');
  var input = document.getElementById('tagInput');
  input.style.display = pkgTags.length >= 5 ? 'none' : '';
}

document.getElementById('tagInput').addEventListener('keydown', function(e) {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  var val = this.value.trim();
  if (!val) return;
  if (pkgTags.length >= 5) return;
  if (pkgTags.indexOf(val) !== -1) { this.value = ''; return; }
  // mock 屏蔽字检测
  if (val.indexOf('违禁') !== -1) {
    this.value = '';
    alert('输入内容含有违禁词，请修改');
    return;
  }
  pkgTags.push(val);
  this.value = '';
  renderTagList();
});

document.getElementById('tagList').addEventListener('click', function(e) {
  var btn = e.target.closest('.tag-remove');
  if (!btn) return;
  pkgTags.splice(parseInt(btn.dataset.idx), 1);
  renderTagList();
});


// =============================================================
var exportTarget = null;
document.addEventListener('click', function(e) {
  var btn = e.target.closest('.btn-export-to-local');
  if (!btn) return;
  exportTarget = { name: btn.dataset.name, ver: btn.dataset.ver };
  document.getElementById('exportPluginName').textContent = exportTarget.name;
  openModal('modalExportToLocal');
});

document.getElementById('btnConfirmExportToLocal').addEventListener('click', function() {
  if (!exportTarget) return;
  var baseName = exportTarget.name;
  // 若本地已有同名，加后缀避免重名
  var name = baseName;
  var existing = localPlugins.map(function(p) { return p.name; });
  var suffix = 1;
  while (existing.indexOf(name) !== -1) {
    suffix++;
    name = baseName + '_' + suffix;
  }
  localIdCounter++;
  localPlugins.push({
    id: localIdCounter,
    name: name,
    ver: exportTarget.ver,
    path: name.replace(/\s+/g, '_') + '/'
  });
  renderLocal();
  closeModal('modalExportToLocal');
  exportTarget = null;
  // 切换到本地插件 tab
  document.querySelectorAll('.sidebar-tab').forEach(function(b) { b.classList.remove('active'); });
  var localTab = document.querySelector('.sidebar-tab[data-tab="local"]');
  localTab.classList.add('active');
  document.querySelectorAll('#contentArea > .tab-content').forEach(function(c) { c.classList.remove('active', 'fade-in'); });
  var target = document.getElementById('tab-local');
  target.classList.add('active');
  void target.offsetWidth;
  target.classList.add('fade-in');
});
document.getElementById('btnImportPlugin').addEventListener('click', function() {
  localIdCounter++;
  localPlugins.push({
    id: localIdCounter,
    name: '导入的插件 ' + localIdCounter,
    ver: '0.1.0',
    path: 'D:/Imported/plugin_' + localIdCounter + '/'
  });
  renderLocal();
});
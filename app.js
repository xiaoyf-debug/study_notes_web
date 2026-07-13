const STORAGE_KEYS = { notes: "study-notes", questions: "study-questions" };
const DEFAULT_DATA = {
  notes: [{ subject: "程序设计", chapter: "指针与数组", tags: ["C++", "基础"], content: "数组名在多数表达式中会转换为指向首元素的指针，但 sizeof 数组名得到的是整个数组所占字节数。", createTime: "2026/07/13 20:00:00" }],
  questions: [{ subject: "程序设计", chapter: "循环结构", question: "遍历长度为 n 的数组时，循环边界应如何设置？", wrongAns: "i <= n", rightAns: "下标从 0 开始时使用 i < n。", errReason: "数组下标越界", collect: true, createTime: "2026/07/13 20:00:00" }],
};
const state = {
  notes: JSON.parse(localStorage.getItem(STORAGE_KEYS.notes) || JSON.stringify(DEFAULT_DATA.notes)),
  questions: JSON.parse(localStorage.getItem(STORAGE_KEYS.questions) || JSON.stringify(DEFAULT_DATA.questions)),
  editingNote: null,
  editingQuestion: null,
};

const $ = (id) => document.getElementById(id);
const escapeHtml = (value = "") => value.replace(/[&<>'"]/g, (char) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;",
})[char]);

function persist() {
  localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(state.notes));
  localStorage.setItem(STORAGE_KEYS.questions, JSON.stringify(state.questions));
}

function showPage(page) {
  $("homePage").classList.toggle("hidden", page !== "home");
  $("statPage").classList.toggle("hidden", page !== "stats");
  if (page === "stats") renderStats();
}

function resetForm(modalId) {
  document.querySelectorAll(`#${modalId} input:not([type=checkbox]), #${modalId} textarea`).forEach((item) => { item.value = ""; });
  document.querySelectorAll(`#${modalId} input[type=checkbox]`).forEach((item) => { item.checked = false; });
}

function closeModal(modalId) {
  $(modalId).classList.add("hidden");
  resetForm(modalId);
  state.editingNote = null;
  state.editingQuestion = null;
}

function render(filters = {}) {
  const keyword = (filters.keyword || "").toLowerCase();
  const includesKeyword = (values) => !keyword || values.some((value) => String(value).toLowerCase().includes(keyword));
  const notes = state.notes.filter((item) => includesKeyword([item.subject, item.chapter, item.content, ...item.tags]));
  const questions = state.questions.filter((item) => includesKeyword([item.subject, item.chapter, item.question, item.errReason]));

  $("noteList").innerHTML = notes.length ? notes.map((item) => {
    const index = state.notes.indexOf(item);
    return `<article class="item-card">
      <div class="item-head"><strong>${escapeHtml(item.subject)} · ${escapeHtml(item.chapter)}</strong><div><button data-edit-note="${index}">编辑</button><button data-delete-note="${index}">删除</button></div></div>
      <div class="tag-list">${item.tags.map((tag) => `<span class="tag-item">${escapeHtml(tag)}</span>`).join("")}</div>
      <pre>${escapeHtml(item.content)}</pre><small>录入时间：${escapeHtml(item.createTime)}</small>
    </article>`;
  }).join("") : '<p class="empty-tip">暂无笔记，可点击左侧“新增笔记”开始记录。</p>';

  $("qList").innerHTML = questions.length ? questions.map((item) => {
    const index = state.questions.indexOf(item);
    return `<article class="item-card">
      <div class="item-head"><strong>${escapeHtml(item.subject)} · ${escapeHtml(item.chapter)} ${item.collect ? "★" : ""}</strong><div><button data-edit-question="${index}">编辑</button><button data-delete-question="${index}">删除</button></div></div>
      <p><b>题干：</b>${escapeHtml(item.question)}</p><p><b>正确解法：</b>${escapeHtml(item.rightAns)}</p>
      <p><b>错因：</b>${escapeHtml(item.errReason)}</p><small>录入时间：${escapeHtml(item.createTime)}</small>
    </article>`;
  }).join("") : '<p class="empty-tip">暂无错题，可点击左侧“录入错题”建立错题库。</p>';
}

function renderStats() {
  const subjects = {};
  state.notes.forEach(({ subject }) => { (subjects[subject] ||= { notes: 0, questions: 0 }).notes += 1; });
  state.questions.forEach(({ subject }) => { (subjects[subject] ||= { notes: 0, questions: 0 }).questions += 1; });
  const rows = Object.entries(subjects).map(([subject, value]) => `<tr><td>${escapeHtml(subject)}</td><td>${value.notes}</td><td>${value.questions}</td></tr>`).join("");
  $("statText").innerHTML = `<div class="stat-summary"><strong>${state.notes.length}</strong><span>篇笔记</span><strong>${state.questions.length}</strong><span>道错题</span></div>${rows ? `<table><thead><tr><th>学科</th><th>笔记</th><th>错题</th></tr></thead><tbody>${rows}</tbody></table>` : '<p class="empty-tip">录入内容后即可查看统计。</p>'}`;
}

function readTextFile(file, target) {
  if (!file || !/\.(txt|md)$/i.test(file.name)) return alert("仅支持 TXT 或 Markdown 文件。");
  const reader = new FileReader();
  reader.onload = () => { target.value = reader.result; };
  reader.readAsText(file, "utf-8");
}

function bindUpload(areaId, inputId, targetId) {
  const area = $(areaId); const input = $(inputId);
  area.onclick = () => input.click();
  ["dragenter", "dragover", "dragleave", "drop"].forEach((event) => area.addEventListener(event, (e) => e.preventDefault()));
  area.addEventListener("drop", (e) => readTextFile(e.dataTransfer.files[0], $(targetId)));
  input.addEventListener("change", () => readTextFile(input.files[0], $(targetId)));
}

$("homeBtn").onclick = () => { showPage("home"); render(); };
$("statBtn").onclick = () => showPage("stats");
$("addNoteBtn").onclick = () => $("noteModal").classList.remove("hidden");
$("addQBtn").onclick = () => $("qModal").classList.remove("hidden");
$("closeNoteModal").onclick = () => closeModal("noteModal");
$("closeQModal").onclick = () => closeModal("qModal");
$("searchBtn").onclick = () => render({ keyword: $("searchInput").value.trim() });
$("searchInput").addEventListener("keydown", (event) => { if (event.key === "Enter") render({ keyword: event.target.value.trim() }); });

$("saveNote").onclick = () => {
  const item = { subject: $("noteSubject").value.trim(), chapter: $("noteChapter").value.trim(), tags: $("noteTag").value.split(/[,，]/).map((tag) => tag.trim()).filter(Boolean), content: $("noteText").value.trim(), createTime: new Date().toLocaleString() };
  if (!item.subject || !item.chapter || !item.content) return alert("请填写学科、章节和内容。");
  state.editingNote === null ? state.notes.push(item) : state.notes.splice(state.editingNote, 1, item);
  persist(); closeModal("noteModal"); render();
};

$("saveQ").onclick = () => {
  const item = { subject: $("qSubject").value.trim(), chapter: $("qChapter").value.trim(), question: $("qText").value.trim(), wrongAns: $("wrongAns").value.trim(), rightAns: $("rightAns").value.trim(), errReason: $("errReason").value.trim(), collect: $("collectFlag").checked, createTime: new Date().toLocaleString() };
  if (!item.subject || !item.chapter || !item.question) return alert("请填写学科、章节和题干。");
  state.editingQuestion === null ? state.questions.push(item) : state.questions.splice(state.editingQuestion, 1, item);
  persist(); closeModal("qModal"); render();
};

document.addEventListener("click", (event) => {
  const button = event.target.closest("button"); if (!button) return;
  if (button.dataset.deleteNote !== undefined && confirm("确定删除这篇笔记吗？")) { state.notes.splice(Number(button.dataset.deleteNote), 1); persist(); render(); }
  if (button.dataset.deleteQuestion !== undefined && confirm("确定删除这道错题吗？")) { state.questions.splice(Number(button.dataset.deleteQuestion), 1); persist(); render(); }
  if (button.dataset.editNote !== undefined) {
    const item = state.notes[Number(button.dataset.editNote)]; state.editingNote = Number(button.dataset.editNote);
    $("noteSubject").value = item.subject; $("noteChapter").value = item.chapter; $("noteTag").value = item.tags.join(", "); $("noteText").value = item.content; $("noteModal").classList.remove("hidden");
  }
  if (button.dataset.editQuestion !== undefined) {
    const item = state.questions[Number(button.dataset.editQuestion)]; state.editingQuestion = Number(button.dataset.editQuestion);
    $("qSubject").value = item.subject; $("qChapter").value = item.chapter; $("qText").value = item.question; $("wrongAns").value = item.wrongAns; $("rightAns").value = item.rightAns; $("errReason").value = item.errReason; $("collectFlag").checked = item.collect; $("qModal").classList.remove("hidden");
  }
});

$("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify({ version: 1, notes: state.notes, questions: state.questions }, null, 2)], { type: "application/json" });
  const link = Object.assign(document.createElement("a"), { href: URL.createObjectURL(blob), download: `study-notes-${new Date().toISOString().slice(0, 10)}.json` });
  link.click(); URL.revokeObjectURL(link.href);
};
$("importBtn").onclick = () => $("importFile").click();
$("importFile").onchange = () => {
  const reader = new FileReader();
  reader.onload = () => { try { const data = JSON.parse(reader.result); if (!Array.isArray(data.notes) || !Array.isArray(data.questions)) throw new Error(); state.notes = data.notes; state.questions = data.questions; persist(); render(); alert("数据导入成功。"); } catch { alert("导入失败，请选择由本站导出的 JSON 文件。"); } };
  reader.readAsText($("importFile").files[0], "utf-8");
};

bindUpload("noteUpload", "noteFile", "noteText");
bindUpload("qUpload", "qFile", "qText");
render();

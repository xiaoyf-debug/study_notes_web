// 本地存储数据
let noteData = JSON.parse(localStorage.getItem("notes") || "[]");
let qData = JSON.parse(localStorage.getItem("questions") || "[]");
let allTags = new Set();

const localResources = [
    ["软件工程", "软件工程导论知识点复习资料（详细拓展版）.pdf"],
    ["概率统计", "2017概率统计理工类期末A卷第二学期.pdf"],
    ["概率统计", "2017概率统计理工类期末B卷第二学期.pdf"],
    ["概率统计", "2018概率统计理工类期末A卷第一学期答案.pdf"],
    ["概率统计", "2018概率统计理工类期末B卷第一学期答案.pdf"],
    ["概率统计", "2019-2020概统上解析_all_pages.pdf"],
    ["概率统计", "2020-2021 概统理工类真题解析_all_pages.pdf"],
    ["概率统计", "2020秋02(A.S)期末解析.pdf"],
    ["概率统计", "2021下学期概率统计理工类解析_all_pages.pdf"],
    ["数据结构与算法", "2023 数据结构与算法 期中.pdf"],
    ["数据结构与算法", "2025王道数据结构考研复习指导 (王道论坛) (Z-Library).pdf"],
    ["数据结构与算法", "数据结构(俞勇_张铭_陈越_韩文弢)(Z-Library).pdf"],
    ["数据结构与算法", "数据结构与STL_11261832.pdf"],
    ["数据结构与算法", "数据结构习题集答案(C语言版严蔚敏) .pdf"],
    ["数据结构与算法", "数据结构课件.zip"],
    ["数据结构与算法", "数据结构（C语言版)(严蔚敏+吴伟民) .pdf"],
    ["离散数学", "2023 离散数学 B卷.pdf"],
    ["离散数学", "DiscreteMathAnswers.pdf"],
    ["离散数学", "离散数学基础2019期末A卷.pdf"],
    ["计算机组成原理", "2023计算机组成原理考研复习指导 (王道论坛) (Z-Library).pdf"],
    ["计算机组成原理", "CH01_Solution.pdf"], ["计算机组成原理", "CH02_Solution.pdf"],
    ["计算机组成原理", "CH03_Solution.pdf"], ["计算机组成原理", "CH04_Solution.pdf"],
    ["计算机组成原理", "CH05_Solution.pdf"], ["计算机组成原理", "CH06_Solution.pdf"],
    ["计算机组成原理", "COD MIPS 6e_Chapter_1_solutions_updated.pdf"],
    ["计算机组成原理", "COD MIPS 6e_Chapter_2_solutions_updated.pdf"],
    ["计算机组成原理", "COD MIPS 6e_Chapter_3_solutions_updated.pdf"],
    ["计算机组成原理", "COD MIPS 6e_Chapter_4_solutions_updated.pdf"],
    ["计算机组成原理", "COD MIPS 6e_Chapter_5_solutions_updated.pdf"],
    ["计算机组成原理", "COD MIPS 6e_Chapter_6_solutions_updated.pdf"],
    ["计算机组成原理", "Course Introduction1.pdf"],
    ["计算机组成原理", "Lab1.pdf"],
    ["计算机组成原理", "Verilog 数字系统设计教程 [第2版] —— Digital System Design Tutorial, Second Edition (夏宇闻  编著) (z-lib.org).pdf"],
    ["计算机组成原理", "ZYNQ7010开发板烧录教程(新).pdf"],
    ["计算机组成原理", "计算机组成与设计 硬件软件接口 MIPS版 原书第6版 (David A.Patterson, John L.Hennessy).pdf"],
    ["计算机组成原理", "计组期中测验题（11.10）(参考答案）(1).docx"],
    ["计算机组成原理", "计组理论.7z"],
    ["计算机组成原理", "计组考试试卷.pdf"]
].map(([course, name]) => ({
    course,
    name,
    source: "桌面本地资料（未公开上传）",
    unavailable: true
}));

const jaisonResources = [
    ["离散数学", "离散数学笔记", "https://jaison.ink/blog/discrete-mathematics-notes/article"],
    ["离散数学", "组合数学知识体系", "https://jaison.ink/blog/%E7%BB%84%E5%90%88%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB/%E7%BB%84%E5%90%88%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86%E4%BD%93%E7%B3%BB"],
    ["软件工程", "软工期末复习资料汇总", "https://jaison.ink/blog/summary-of-final-review-materials/article"],
    ["软件工程", "一个大二学生对软工课程的感受分享", "https://jaison.ink/blog/advice-on-softwareengineering-courses/article"],
    ["人工智能", "CS229 学习指引", "https://jaison.ink/blog/cs229-guide/article"],
    ["人工智能", "CS229 概率论中文笔记", "https://jaison.ink/blog/cs229notes_prob/cs229notes-probability%E4%B8%AD%E6%96%87%E7%BF%BB%E8%AF%91"],
    ["人工智能", "CS229 SVM 笔记", "https://jaison.ink/blog/cs229-notes3-svm/article"],
    ["人工智能", "CS229 Regularization and Model Selection 解读", "https://jaison.ink/blog/cs229-notes5-regularization-and-model-selection/article"],
    ["人工智能", "CS230 导学", "https://jaison.ink/blog/cs230-guidance/article"],
    ["人工智能", "什么是 Batch Normalization", "https://jaison.ink/blog/batchnorm/%E5%95%A5%E6%98%AFbatch-norm"],
    ["人工智能", "PRML：机器学习视角下的概率论核心", "https://jaison.ink/blog/prml-2-probability-theory/article"]
].map(([course, name, path]) => ({ course, name, path, source: "Jaison's ink", external: true }));

const xindonResources = [
    {
        course: "数据结构与算法",
        name: "数据结构与算法实现：顺序表、链表、树、图、查找与排序",
        path: "https://myblog.xindon.top/posts/bc9ae956.html",
        source: "迷路的小朋友 · 欣冻",
        external: true
    }
];

const sharedResources = [
    {
        course: "大二上电子书",
        name: "大二上学期课程教材电子版（.NET 为专业选修，可按选课情况使用）",
        path: "https://pan.baidu.com/s/1qbuyD9OGtwsN9zkrq83xNQ?pwd=sysu",
        password: "sysu",
        source: "百度网盘分享",
        external: true
    },
    {
        course: "综合资料",
        name: "大二上课程资料文件夹",
        path: "https://ccnjl3brvt1i.feishu.cn/drive/folder/AwaBfLheClmuAzdoyOqcBKcMn1f",
        source: "飞书云盘分享",
        external: true
    },
    {
        course: "马克思主义基本原理",
        name: "马原资料第二弹：课后题答案、马原期末笔记",
        path: "https://vcnb9q9vmvpt.feishu.cn/drive/folder/DOA9fpgP6lLTeMdWmgdcrFRIn4f",
        password: "mmzqvsiba!",
        source: "飞书云盘分享",
        external: true
    },
    {
        course: "数据结构与算法",
        name: "《数据结构》6小时快速突击（蜂考完整版）",
        path: "https://www.bilibili.com/video/BV1eaCPYSEtH?p=2",
        source: "哔哩哔哩 · 蜂考",
        external: true
    },
    {
        course: "计算机组成原理实验",
        name: "MIPS 微程序地址转移逻辑设计参考电路",
        path: "https://blog.csdn.net/Rick_Theseusr/article/details/140250649",
        source: "CSDN · Rick_Theseusr",
        external: true
    },
    {
        course: "综合资料",
        name: "期末复习资料与往年真题检索（破壁计划）",
        path: "https://arxiv.jaison.ink/",
        source: "破壁计划 · 中大资料共享社区",
        external: true
    }
];

const cloudResources = [
    ["数据结构与算法", "数据结构真题.rar（2.4 MB）", "https://wwavx.lanzoum.com/b0139fky9i", "4qzf"],
    ["数据结构与算法", "中山大学十套数据结构试题及答案.pdf（1.1 MB）", "https://wwavx.lanzoum.com/b0139fky9i", "4qzf"],
    ["数据结构与算法", "数据结构(3).zip（1.9 MB）", "https://wwavx.lanzoum.com/b0139fky9i", "4qzf"],
    ["马克思主义基本原理", "马原真题.zip（3.0 MB）", "https://wwavx.lanzoum.com/b0139fky2b", "3j73"],
    ["毛泽东思想和中国特色社会主义理论体系概论", "毛概课后题提取2023.pdf（7.9 MB）", "https://wwavx.lanzoum.com/b0139fl22f", "6wwz"],
    ["毛泽东思想和中国特色社会主义理论体系概论", "毛概背诵.pdf（888.4 KB）", "https://wwavx.lanzoum.com/b0139fl22f", "6wwz"],
    ["毛泽东思想和中国特色社会主义理论体系概论", "2023版毛概习题1-7章.pptx（486 KB）", "https://wwavx.lanzoum.com/b0139fl22f", "6wwz"]
].map(([course, name, path, password]) => ({ course, name, path, password, source: "Aeolian 蓝奏云分享", external: true }));

const sseRows = `
数据结构与算法|院内离散、计组或数据结构真题|1365
数据结构与算法|求助数据结构期末机考|1479
数据结构与算法|数据结构与算法|1601
数据结构与算法|毕业出书（教材+考研）|2544
数据结构与算法|学长学姐出课本|2788
数据结构与算法|大二的一些学习资料|2990
数据结构与算法|求数据结构往年真题|3247
数据结构与算法|分享一道珠数数据结构题|3662
数据结构与算法|期末真题|4059
数据结构与算法|期末复习资料汇总|4152
数据结构与算法|期末复习资料汇总（新）|4187
数据结构与算法|数据结构|4428
离散数学|院内离散、计组或数据结构真题|1365
离散数学|浅浅发个疯，明早接着干|1580
离散数学|毕业出书（教材+考研）|2544
离散数学|学长学姐出课本|2788
离散数学|期末真题|4059
离散数学|离散数学题型|4193
计算机组成原理|院内离散、计组或数据结构真题|1365
计算机组成原理|计算机组成原理期末实验|1554
计算机组成原理|学长学姐出课本|2788
计算机组成原理|期末真题|4059
计算机组成原理|计组实验|4105
马克思主义基本原理|马原真题与复习资料分享|2637
马克思主义基本原理|马克思主义原理|2650
马克思主义基本原理|马克思主义基本原理第2-3章|2652
马克思主义基本原理|马原第4-7章思维导图|2664
马克思主义基本原理|PDF课件划分|2678
马克思主义基本原理|马原考试题型分布|2733
马克思主义基本原理|马克思主义原理资料|2743
毛泽东思想和中国特色社会主义理论体系概论|毛概第一章思维导图|1523
毛泽东思想和中国特色社会主义理论体系概论|毛概第二单元|1528
毛泽东思想和中国特色社会主义理论体系概论|毛概第三章社会主义改造理论|1533
毛泽东思想和中国特色社会主义理论体系概论|社会主义建设道路初步探索的理论成果|1548
毛泽东思想和中国特色社会主义理论体系概论|毛概第五章：中国特色社会主义理论体系的形成发展|1564
毛泽东思想和中国特色社会主义理论体系概论|毛概资料总结（1-5、8章）|1630
毛泽东思想和中国特色社会主义理论体系概论|2024-1 毛概原卷回忆版|1636
毛泽东思想和中国特色社会主义理论体系概论|毛概回忆|4262
综合资料|软工教材电子书|103
综合资料|计算机专业期末复习课资源|284
综合资料|综合资料分享|303
综合资料|期末复习资料汇总|4152
综合资料|给大一同学的资料（第二弹）|4161
综合资料|期末复习资料汇总（新）|4187
未分类|I have a friend…|1346
未分类|PPT资料（约17份）|1599
未分类|工业软件导论 PDF 快速定位|2184
未分类|考研试题|2570
未分类|程序分析考试内容讨论|2590
未分类|期末周讨论帖|2636
未分类|突发奇想|2651
未分类|收书|2757
未分类|最后一题|2769
未分类|大一期中题查询|4172
未分类|导论课后题答案|4218
未分类|关于资料的声明|4226`.trim();

const sseResources = sseRows.split("\n").map(row => {
    const [course, name, id] = row.split("|");
    return { course, name, path: `https://ssemarket.cn/new/postdetail/${id}`, source: "SSE Market（当前备案拦截）", external: true, unavailable: true };
});

const courseResources = [...localResources, ...cloudResources, ...sharedResources, ...jaisonResources, ...xindonResources];

let activeResourceCourse = "全部";
let activeResourceKind = "全部";

function updateActiveNav(page){
    document.querySelectorAll("[data-page]").forEach(item => item.classList.toggle("active", item.dataset.page === page));
}

function showMainPage(page){
    document.getElementById("homePage").classList.toggle("hidden", page !== "home");
    document.getElementById("resourcePage").classList.toggle("hidden", page !== "resources");
    document.getElementById("statPage").classList.toggle("hidden", page !== "stats");
    updateActiveNav(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// -------------------------- 左侧导航按钮绑定（优先执行，保证可点击） --------------------------
document.getElementById("homeBtn").onclick = function(){
    showMainPage("home");
    renderAllList();
}
document.querySelector('[data-page="home"]').onclick = document.getElementById("homeBtn").onclick;
document.getElementById("resourceBtn").onclick = function(){
    showMainPage("resources");
    renderResources();
}
document.getElementById("heroResourceBtn").onclick = document.getElementById("resourceBtn").onclick;
document.getElementById("addNoteBtn").onclick = function(){
    document.getElementById("noteModal").classList.remove("hidden");
}
document.getElementById("addQBtn").onclick = function(){
    document.getElementById("qModal").classList.remove("hidden");
}
document.getElementById("statBtn").onclick = function(){
    showMainPage("stats");
    renderStat();
}

function resourceKind(name, external = false){
    if(external){
        if(name.includes("视频") || name.includes("突击")) return "视频课程";
        if(name.includes("教材电子版") || name.includes("文件夹")) return "资料合集";
        if(name.includes("检索")) return "资料平台";
        if(name.includes("真题") || name.includes("习题") || name.includes("课后题")) return "真题 / 习题";
        return "学习文章";
    }
    const ext = name.split(".").pop().toUpperCase();
    const lower = name.toLowerCase();
    if(lower.includes("solution") || name.includes("答案") || name.includes("Answers") || name.includes("解析")) return "答案 / 解析";
    if(name.includes("试卷") || name.includes("期中") || name.includes("期末") || name.includes("测验") || /^20\d{2}/.test(name)) return "真题";
    if(name.includes("Lab") || name.includes("实验") || name.includes("开发板") || name.includes("Verilog")) return "实验资料";
    if(name.includes("复习") || name.includes("王道")) return "复习总结";
    if(name.includes("课件") || name.includes("Course Introduction") || name.includes("计组理论")) return "课程讲义";
    if(name.includes("数据结构(") || name.includes("数据结构（") || name.includes("数据结构与STL") || name.includes("计算机组成与设计")) return "教材";
    if(ext === "ZIP" || ext === "7Z") return "课程资料包";
    return ext === "PDF" ? "参考资料" : ext;
}

function renderCourseOverview(){
    const preferredOrder = ["数据结构与算法", "离散数学", "计算机组成原理", "概率统计", "软件工程", "人工智能", "马克思主义基本原理", "毛泽东思想和中国特色社会主义理论体系概论"];
    const stats = courseResources.reduce((map, item) => {
        const row = map[item.course] ||= { local: 0, external: 0, total: 0 };
        row[item.external ? "external" : "local"] += 1;
        row.total += 1;
        return map;
    }, {});
    const courses = Object.entries(stats).filter(([course, count]) => preferredOrder.includes(course) || count.local > 0).sort(([a], [b]) => {
        const ai = preferredOrder.indexOf(a), bi = preferredOrder.indexOf(b);
        return (ai < 0 ? 99 : ai) - (bi < 0 ? 99 : bi) || a.localeCompare(b, "zh-CN");
    });
    document.getElementById("courseOverview").innerHTML = courses.map(([course, count], index) => `
        <button class="overview-card" type="button" data-overview-course="${course}">
            <span class="overview-index">${String(index + 1).padStart(2, "0")}</span>
            <strong>${course}</strong>
            <span>${count.local} 本地 · ${count.external} 在线</span>
            <i>→</i>
        </button>`).join("");
    document.querySelectorAll("[data-overview-course]").forEach(button => button.onclick = () => {
        activeResourceCourse = button.dataset.overviewCourse;
        activeResourceKind = "全部";
        showMainPage("resources");
        renderResources();
    });
}

function renderResources(){
    const keyword = document.getElementById("resourceSearch").value.trim().toLowerCase();
    const courses = ["全部", ...new Set(courseResources.map(item => item.course))];
    const kinds = ["全部", ...new Set(courseResources.map(item => resourceKind(item.name, item.external)))];
    const kindSelect = document.getElementById("resourceKindFilter");
    kindSelect.innerHTML = kinds.map(kind => `<option value="${kind}" ${kind === activeResourceKind ? "selected" : ""}>${kind === "全部" ? "全部类型" : kind}</option>`).join("");
    document.getElementById("resourceFilters").innerHTML = courses.map(course =>
        `<button class="filter-chip ${course === activeResourceCourse ? "active" : ""}" data-course="${course}">${course}</button>`
    ).join("");
    const kindOrder = ["教材", "课程讲义", "实验资料", "复习总结", "真题", "答案 / 解析", "真题 / 习题", "视频课程", "学习文章", "资料合集", "资料平台", "课程资料包", "参考资料"];
    const filtered = courseResources.filter(item =>
        (activeResourceCourse === "全部" || item.course === activeResourceCourse) &&
        (activeResourceKind === "全部" || resourceKind(item.name, item.external) === activeResourceKind) &&
        (!keyword || `${item.course} ${item.name}`.toLowerCase().includes(keyword))
    ).sort((a, b) => a.course.localeCompare(b.course, "zh-CN") || kindOrder.indexOf(resourceKind(a.name, a.external)) - kindOrder.indexOf(resourceKind(b.name, b.external)) || a.name.localeCompare(b.name, "zh-CN"));
    document.getElementById("resourceCount").textContent = courseResources.length;
    document.getElementById("localFileCount").textContent = localResources.length;
    document.getElementById("localCourseCount").textContent = new Set(localResources.map(item => item.course)).size;
    document.getElementById("resourceResultSummary").textContent = `显示 ${filtered.length} / ${courseResources.length} 项资料${activeResourceCourse !== "全部" ? ` · ${activeResourceCourse}` : ""}${activeResourceKind !== "全部" ? ` · ${activeResourceKind}` : ""}`;
    const grouped = filtered.reduce((result, item) => {
        (result[item.course] ||= []).push(item);
        return result;
    }, {});
    const renderCard = item => {
        const ext = item.external ? "WEB" : item.name.split(".").pop().toUpperCase();
        return `<article class="resource-card">
            <div class="file-icon">${ext}</div>
            <div class="resource-card-body">
                <span class="course-label">${item.course}</span>
                <h3>${item.name}</h3>
                <span class="file-kind">${resourceKind(item.name, item.external)}</span>
                <span class="source-note">来源：${item.source}${item.password ? ` · 密码：${item.password}` : ""}</span>
            </div>
            ${item.unavailable
                ? '<span class="open-resource resource-unavailable">仅本地可用</span>'
                : `<a class="open-resource" href="${item.path}" target="_blank" rel="noopener">${item.password ? "打开网盘" : item.external ? "访问原文" : "打开"}</a>`}
        </article>`;
    };
    document.getElementById("resourceList").innerHTML = filtered.length ? Object.entries(grouped).map(([course, items]) => `
        <section class="resource-group">
            <div class="resource-group-title"><h2>${course}</h2><span>${items.length} 项</span></div>
            <div class="resource-group-list">${items.map(renderCard).join("")}</div>
        </section>`).join("") : '<p class="empty-resource">没有找到匹配的资料。</p>';
    document.querySelectorAll("[data-course]").forEach(button => button.onclick = () => {
        activeResourceCourse = button.dataset.course;
        renderResources();
    });
}

document.getElementById("resourceSearch").addEventListener("input", renderResources);
document.getElementById("resourceKindFilter").addEventListener("change", event => {
    activeResourceKind = event.target.value;
    renderResources();
});
document.getElementById("clearResourceSearch").onclick = () => {
    document.getElementById("resourceSearch").value = "";
    activeResourceCourse = "全部";
    activeResourceKind = "全部";
    renderResources();
};
const savedTheme = localStorage.getItem("study-theme");
if(savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) document.documentElement.classList.add("dark");
document.getElementById("themeBtn").onclick = function(){
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("study-theme", document.documentElement.classList.contains("dark") ? "dark" : "light");
}
document.getElementById("backupBtn").onclick = function(){
    alert("打开终端，执行命令：python scripts/export_backup.py 导出数据备份");
}

// 弹窗DOM
const noteModal = document.getElementById("noteModal");
const qModal = document.getElementById("qModal");
const noteMask = document.querySelector(".noteMask");
const qMask = document.querySelector(".qMask");
const noteBox = noteModal.querySelector(".modal");
const qBox = qModal.querySelector(".small-modal");

// 关闭弹窗函数
function closeNoteModal(){
    noteModal.classList.add("hidden");
    document.querySelectorAll("#noteModal input,#noteModal textarea").forEach(el => el.value = "");
}
function closeQModal(){
    qModal.classList.add("hidden");
    document.querySelectorAll("#qModal input,#qModal textarea").forEach(el => el.value = "");
}

// 弹窗取消按钮
document.getElementById("closeNoteModal").onclick = closeNoteModal;
document.getElementById("closeQModal").onclick = closeQModal;

// 点击遮罩空白关闭弹窗
noteMask.addEventListener("click", (e) => {
    if (!noteBox.contains(e.target)) closeNoteModal();
})
qMask.addEventListener("click", (e) => {
    if (!qBox.contains(e.target)) closeQModal();
})

// -------------------------- TXT/MD 文件拖拽上传逻辑（仅稳定纯文本） --------------------------
// 笔记上传区域
const noteUpload = document.getElementById("noteUpload");
const noteFileInput = document.getElementById("noteFile");
noteUpload.onclick = () => noteFileInput.click();
["dragenter","dragover","dragleave","drop"].forEach(evt=> noteUpload.addEventListener(evt,e=>e.preventDefault()));
noteUpload.addEventListener("drop",e=>{
    const file = e.dataTransfer.files[0];
    readTextFile(file, document.getElementById("noteText"))
})
noteFileInput.addEventListener("change",e=>{
    const file = e.target.files[0];
    readTextFile(file, document.getElementById("noteText"))
})

// 错题上传区域
const qUpload = document.getElementById("qUpload");
const qFileInput = document.getElementById("qFile");
qUpload.onclick = () => qFileInput.click();
["dragenter","dragover","dragleave","drop"].forEach(evt=> qUpload.addEventListener(evt,e=>e.preventDefault()));
qUpload.addEventListener("drop",e=>{
    const file = e.dataTransfer.files[0];
    readTextFile(file, document.getElementById("qText"))
})
qFileInput.addEventListener("change",e=>{
    const file = e.target.files[0];
    readTextFile(file, document.getElementById("qText"))
})

// 纯文本读取函数（仅txt/md，无复杂异步阻塞）
function readTextFile(file, targetTextarea){
    if(!file) return;
    const suffix = file.name.split(".").pop().toLowerCase();
    if(suffix !== "txt" && suffix !== "md"){
        alert("仅支持 .txt / .md 纯文本文档");
        return;
    }
    const reader = new FileReader();
    reader.readAsText(file,"utf-8");
    reader.onload = function(e){
        targetTextarea.value = e.target.result;
    }
    reader.onerror = function(){
        alert("文件读取失败，请检查文档");
    }
}

// -------------------------- 保存逻辑 --------------------------
// 保存章节笔记
document.getElementById("saveNote").onclick = function(){
    const sub = document.getElementById("noteSubject").value.trim();
    const chap = document.getElementById("noteChapter").value.trim();
    const tagArr = document.getElementById("noteTag").value.split(",").map(i=>i.trim()).filter(Boolean);
    const content = document.getElementById("noteText").value.trim();
    if(!sub || !chap || !content){
        return alert("学科、章节、内容不能为空");
    }
    const newNote = {
        subject: sub,
        chapter: chap,
        tags: tagArr,
        content: content,
        createTime: new Date().toLocaleString()
    };
    noteData.push(newNote);
    localStorage.setItem("notes", JSON.stringify(noteData));
    closeNoteModal();
    renderAllList();
    alert("笔记保存成功");
}

// 保存错题
document.getElementById("saveQ").onclick = function(){
    const sub = document.getElementById("qSubject").value.trim();
    const chap = document.getElementById("qChapter").value.trim();
    const question = document.getElementById("qText").value.trim();
    const wrongAns = document.getElementById("wrongAns").value.trim();
    const rightAns = document.getElementById("rightAns").value.trim();
    const errReason = document.getElementById("errReason").value.trim();
    const collect = document.getElementById("collectFlag").checked;
    if(!sub || !chap || !question){
        return alert("学科、章节、题干为必填项");
    }
    const newQ = {
        subject: sub,
        chapter: chap,
        question: question,
        wrongAns: wrongAns,
        rightAns: rightAns,
        errReason: errReason,
        collect: collect,
        createTime: new Date().toLocaleString()
    };
    qData.push(newQ);
    localStorage.setItem("questions", JSON.stringify(qData));
    closeQModal();
    renderAllList();
    alert("错题录入完成");
}

// -------------------------- 渲染、标签、搜索、统计 --------------------------
function collectAllTags(){
    allTags.clear();
    noteData.forEach(item=> item.tags.forEach(tag=> allTags.add(tag)));
    qData.forEach(item=>{
        if(item.errReason.includes("代码")) allTags.add("代码题");
    })
}

function renderAllList(filterTag = null){
    collectAllTags();
    const noteWrap = document.getElementById("noteList");
    const qWrap = document.getElementById("qList");
    noteWrap.innerHTML = "";
    qWrap.innerHTML = "";

    let filterNotes = noteData;
    let filterQuestions = qData;
    if(filterTag){
        filterNotes = noteData.filter(n=> n.tags.includes(filterTag));
        filterQuestions = qData.filter(q=> q.errReason.includes(filterTag) || q.question.includes(filterTag));
    }

    if(filterNotes.length === 0) noteWrap.innerHTML = '<div class="empty-state"><strong>还没有章节笔记</strong><span>从一条课程总结开始，慢慢建立自己的知识库。</span><button type="button" data-empty-action="note">新增笔记</button></div>';
    if(filterQuestions.length === 0) qWrap.innerHTML = '<div class="empty-state"><strong>还没有错题记录</strong><span>把第一次做错的题留下来，它会成为之后最有价值的复习材料。</span><button type="button" data-empty-action="question">录入错题</button></div>';

    filterNotes.forEach(item=>{
        const card = document.createElement("div");
        card.className = "item-card";
        const tagHtml = item.tags.map(t=>`<span class="tag-item" data-tag="${t}">${t}</span>`).join(" ");
        card.innerHTML = `
            <strong>${item.subject}｜${item.chapter}</strong>
            <div class="tag-list">${tagHtml}</div>
            <div>内容：<pre style="white-space:pre-wrap;font-family:Consolas;">${item.content}</pre></div>
            <div style="color:#58606e;font-size:12px;">录入时间：${item.createTime}</div>
        `;
        noteWrap.appendChild(card);
    })

    filterQuestions.forEach(item=>{
        const card = document.createElement("div");
        card.className = "item-card";
        card.innerHTML = `
            <strong>${item.subject} ${item.chapter} ${item.collect ? "⭐收藏" : ""}</strong>
            <div>题干：<pre style="white-space:pre-wrap;font-family:Consolas;">${item.question}</pre></div>
            <div>错解：${item.wrongAns}</div>
            <div>正解：<pre style="white-space:pre-wrap;font-family:Consolas;">${item.rightAns}</pre></div>
            <div>错误原因：${item.errReason}</div>
            <div style="color:#58606e;font-size:12px;">录入时间：${item.createTime}</div>
        `;
        qWrap.appendChild(card);
    })

    // 标签点击筛选
    document.querySelectorAll(".tag-item").forEach(tagEl=>{
        tagEl.onclick = function(e){
            renderAllList(e.target.dataset.tag);
        }
    })
    document.querySelector('[data-empty-action="note"]')?.addEventListener("click", () => document.getElementById("addNoteBtn").click());
    document.querySelector('[data-empty-action="question"]')?.addEventListener("click", () => document.getElementById("addQBtn").click());
}

// 搜索按钮
document.getElementById("searchBtn").onclick = function(){
    const keyword = document.getElementById("searchInput").value.toLowerCase();
    if(!keyword) return renderAllList();
    const filterN = noteData.filter(x=>
        x.subject.includes(keyword) || x.chapter.includes(keyword) || x.content.includes(keyword) || x.tags.some(t=>t.includes(keyword))
    )
    const filterQ = qData.filter(x=>
        x.subject.includes(keyword) || x.chapter.includes(keyword) || x.question.includes(keyword) || x.errReason.includes(keyword)
    )
    const noteWrap = document.getElementById("noteList");
    const qWrap = document.getElementById("qList");
    noteWrap.innerHTML = "";
    qWrap.innerHTML = "";
    filterN.forEach(item=>{
        const d = document.createElement("div");
        d.className = "item-card";
        d.innerHTML = `<strong>${item.subject}｜${item.chapter}</strong><div>${item.content}</div>`;
        noteWrap.appendChild(d);
    })
    filterQ.forEach(item=>{
        const d = document.createElement("div");
        d.className = "item-card";
        d.innerHTML = `<strong>${item.subject} ${item.chapter}</strong><div>题干：${item.question}</div>`;
        qWrap.appendChild(d);
    })
}

// 统计页面渲染
function renderStat(){
    const statTextDom = document.getElementById("statText");
    const subjectMap = {};
    noteData.forEach(item=>{
        if(!subjectMap[item.subject]) subjectMap[item.subject] = {note:0, q:0};
        subjectMap[item.subject].note +=1;
    })
    qData.forEach(item=>{
        if(!subjectMap[item.subject]) subjectMap[item.subject] = {note:0, q:0};
        subjectMap[item.subject].q +=1;
    })
    let html = "<h3>学习统计汇总</h3>";
    html += `<p>总笔记：${noteData.length} 篇 | 总错题：${qData.length} 道</p>`;
    for(let sub in subjectMap){
        html += `<p>${sub}：笔记${subjectMap[sub].note}篇，错题${subjectMap[sub].q}道</p>`;
    }
    statTextDom.innerHTML = html;
}

// 页面加载初始化
window.onload = function(){
    renderAllList();
    renderResources();
    renderCourseOverview();
}

// 预留顶层拖拽接口（空函数，不阻塞代码）
function addDragArea(){}

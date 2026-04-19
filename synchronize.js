
// 子页面通用公共脚本：头部、背景、底部、设置面板、返回主页、功能全正常
document.addEventListener('DOMContentLoaded', async function () {
  // 自动加载图标
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
  document.head.appendChild(link);
  await new Promise(r => setTimeout(r, 50));

  // ======================================
  // 插入背景
  // ======================================
  const bgHTML = `
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">

    <link rel="stylesheet" href="../main.css">
    <div class="bg-custom" id="bgCustom"></div>
    <div class="bg-layer"></div>
    <div class="bg-gradients">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
    </div>
  `;

  // ======================================
  // 头部（去掉搜索，加返回主页）
  // ======================================
  const headerHTML = `
  <header class="header">
    <div class="header-inner">
      <a href="index.html" class="logo">
        <div class="logo-mark"><i class="fa-solid fa-toolbox"></i></div>
        <div class="logo-text">工具<span>盒子</span></div>
      </a>

      <!-- 返回主页按钮 -->
      <button class="icon-btn" id="backToHome" title="返回主页" style="
         display: inline-flex;
         align-items: center;
         gap: 4px;
         border: 2px solid currentColor;
         border-radius: 8px;
         padding: 8px 50px;
         background: transparent;
         cursor: pointer;
         font-size: 14px;
      ">
       <i class="fa-solid fa-arrow-left"></i>
       <span style="white-space: nowrap;">返回主页</span>
      </button>

      <div class="header-actions">
        <button class="icon-btn" id="themeToggle"><i class="fa-solid fa-moon"></i></button>
        <button class="icon-btn" id="settingsBtn"><i class="fa-solid fa-gear"></i></button>
        <button class="icon-btn menu-btn" id="menuBtn"><i class="fa-solid fa-bars"></i></button>
      </div>
    </div>
  </header>
  `;

  // ======================================
  // 底部（最终版：智能底板+毛玻璃）
  // ======================================
  const footerHTML = `
  <footer style="
    padding: 16px;
    text-align: center;
    font-size: 13px;
  ">
    <span id="footerPlate" style="
      display: inline-block;
      padding: 2px 10px;
      border-radius: 4px;
      background: transparent;
      transition: all 0.25s ease;
    ">
      小念工具 &copy; 2026 &mdash; 让效率成为习惯
    </span>
  </footer>
  `;

  // ======================================
  // 设置面板
  // ======================================
  const settingsHTML = `
  <div class="settings-overlay" id="settingsOverlay"></div>
  <aside class="settings-panel" id="settingsPanel">
    <div class="sp-header">
      <h2>设置</h2>
      <button class="sp-close" id="spClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="sp-body">
      <div class="sp-section">
        <div class="sp-section-title">外观设置</div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-icon"><i class="fa-solid fa-circle-half-stroke"></i></div>
            <div class="toggle-text">
              <div class="tt">深色模式</div>
              <div class="td">切换亮色 / 暗色主题</div>
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" id="darkModeToggle">
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-icon"><i class="fa-solid fa-droplet"></i></div>
            <div class="toggle-text">
              <div class="tt">玻璃质感</div>
              <div class="td">卡片与面板显示毛玻璃效果</div>
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" id="glassToggle">
            <span class="slider"></span>
          </label>
        </div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
            <div class="toggle-text">
              <div class="tt">背景模糊</div>
              <div class="td">对自定义背景图应用模糊</div>
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" id="blurToggle">
            <span class="slider"></span>
          </label>
        </div>
      </div>
      <div class="sp-section">
        <div class="sp-section-title">自定义背景</div>
        <div class="upload-area" id="uploadArea">
          <div class="ua-icon"><i class="fa-solid fa-cloud-arrow-up"></i></div>
          <div class="ua-text">点击或拖拽上传背景图片</div>
          <div class="ua-hint">支持 JPG / PNG / WebP，建议 1920x1080</div>
          <input type="file" id="bgUpload" accept="image/*">
        </div>
        <div class="bg-preview" id="bgPreview">
          <img id="bgPreviewImg" alt="预览">
          <button class="remove-bg" id="removeBg"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="toggle-row">
          <div class="toggle-info">
            <div class="toggle-icon"><i class="fa-solid fa-image"></i></div>
            <div class="toggle-text">
              <div class="tt">启用自定义背景</div>
              <div class="td">开启后使用上传的图片作为背景</div>
            </div>
          </div>
          <label class="switch">
            <input type="checkbox" id="customBgToggle">
            <span class="slider"></span>
          </label>
        </div>
      </div>
    </div>
  </aside>
  `;

  // ======================================
  // 移动端导航
  // ======================================
  const mobileNavHTML = `
  <div class="mobile-overlay" id="mobileOverlay"></div>
  <nav class="mobile-nav" id="mobileNav">
    <div class="mn-header">
      <div class="logo">
        <div class="logo-mark"><i class="fa-solid fa-toolbox"></i></div>
        <div class="logo-text">工具<span>盒子</span></div>
      </div>
      <button class="mn-close" id="mnClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
    <div class="mn-section">
      <h3>快捷操作</h3>
      <a class="mn-item" id="mnSettings"><i class="fa-solid fa-gear"></i><span>设置面板</span></a>
      <a class="mn-item" id="mnTheme"><i class="fa-solid fa-circle-half-stroke"></i><span>切换主题</span></a>
      <a class="mn-item" id="mnHome"><i class="fa-solid fa-arrow-left"></i><span>返回主页</span></a>
    </div>
  </nav>
  `;

  // 插入页面
  document.body.insertAdjacentHTML('afterbegin', bgHTML + headerHTML);
  document.body.insertAdjacentHTML('beforeend', settingsHTML + mobileNavHTML + footerHTML);

  // ======================================
  // 同步状态
  // ======================================
  const html = document.documentElement;
  const bgCustom = document.getElementById('bgCustom');
  const bgPreviewImg = document.getElementById('bgPreviewImg');

  const theme = localStorage.getItem('tb-theme') || 'light';
  const glass = localStorage.getItem('tb-glass') || 'off';
  const blur = localStorage.getItem('tb-blur') || 'off';
  const bgImage = localStorage.getItem('tb-bg-image');
  const useBg = localStorage.getItem('tb-custombg') || 'off';

  html.setAttribute('data-theme', theme);
  html.setAttribute('data-glass', glass);
  html.setAttribute('data-custombg', useBg);

  if (bgImage && useBg === 'on') {
    bgCustom.style.backgroundImage = `url(${bgImage})`;
    bgPreviewImg.src = bgImage;

    if (blur === 'on') {
      bgCustom.style.filter = 'blur(12px) brightness(0.95)';
      bgCustom.style.transform = 'scale(1.08)';
    }
  }

  // ======================================
  // 所有功能绑定（完整版，可点击）
  // ======================================
  setTimeout(() => {
    const backToHome = document.getElementById('backToHome');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const spClose = document.getElementById('spClose');
    const menuBtn = document.getElementById('menuBtn');
    const mobileNav = document.getElementById('mobileNav');
    const mnClose = document.getElementById('mnClose');
    const mnSettings = document.getElementById('mnSettings');
    const mnTheme = document.getElementById('mnTheme');
    const mnHome = document.getElementById('mnHome');
    const themeToggle = document.getElementById('themeToggle');

    const darkToggle = document.getElementById('darkModeToggle');
    const glassToggle = document.getElementById('glassToggle');
    const blurToggle = document.getElementById('blurToggle');
    const customBgToggle = document.getElementById('customBgToggle');
    const bgUpload = document.getElementById('bgUpload');
    const removeBg = document.getElementById('removeBg');

    // 返回主页
    backToHome.onclick = () => location.href = 'index.html';
    mnHome.onclick = () => location.href = 'index.html';

    // 设置面板
    settingsBtn.onclick = () => settingsPanel.classList.add('open');
    spClose.onclick = () => settingsPanel.classList.remove('open');

    // 移动端菜单
    menuBtn.onclick = () => mobileNav.classList.add('open');
    mnClose.onclick = () => mobileNav.classList.remove('open');
    mnSettings.onclick = () => { mobileNav.classList.remove('open'); settingsPanel.classList.add('open'); };

    // 同步开关状态
    darkToggle.checked = theme === 'dark';
    glassToggle.checked = glass === 'on';
    blurToggle.checked = blur === 'on';
    customBgToggle.checked = useBg === 'on';

    // 同步主题按钮图标（初始化）
    function syncThemeIcon(isDark) {
      if (isDark) {
        themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
      }
    }
    syncThemeIcon(theme === 'dark');

    // 深色模式
    function updateTheme() {
      const isDark = darkToggle.checked;
      html.setAttribute('data-theme', isDark ? 'dark' : 'light');
      localStorage.setItem('tb-theme', isDark ? 'dark' : 'light');
      syncThemeIcon(isDark);
      updateFooterStyle();
    }

    darkToggle.onchange = updateTheme;

    // 顶部主题按钮
    themeToggle.onclick = () => {
      darkToggle.checked = !darkToggle.checked;
      updateTheme();
    };

    // 毛玻璃（已修复：切换时同步底部）
    glassToggle.onchange = () => {
      const on = glassToggle.checked;
      html.setAttribute('data-glass', on ? 'on' : 'off');
      localStorage.setItem('tb-glass', on ? 'on' : 'off');
      updateFooterStyle();
    };

    // 背景模糊
    blurToggle.onchange = () => {
      const on = blurToggle.checked;
      localStorage.setItem('tb-blur', on ? 'on' : 'off');
      if (bgImage) {
        bgCustom.style.filter = on ? 'blur(12px) brightness(0.95)' : '';
        bgCustom.style.transform = on ? 'scale(1.08)' : '';
      }
    };

    // 启用背景
    customBgToggle.onchange = () => {
      const on = customBgToggle.checked;
      html.setAttribute('data-custombg', on ? 'on' : 'off');
      localStorage.setItem('tb-custombg', on ? 'on' : 'off');
      updateFooterStyle();
    };

    // 上传背景
    bgUpload.onchange = () => {
      const file = bgUpload.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const url = reader.result;
        localStorage.setItem('tb-bg-image', url);
        bgCustom.style.backgroundImage = `url(${url})`;
        bgPreviewImg.src = url;
        html.setAttribute('data-custombg', 'on');
        customBgToggle.checked = true;
        localStorage.setItem('tb-custombg', 'on');
        updateFooterStyle();
      };
      reader.readAsDataURL(file);
    };

    // 移除背景
    removeBg.onclick = () => {
      localStorage.removeItem('tb-bg-image');
      localStorage.setItem('tb-custombg', 'off');
      bgCustom.style.backgroundImage = '';
      bgPreviewImg.src = '';
      customBgToggle.checked = false;
      html.setAttribute('data-custombg', 'off');
      updateFooterStyle();
    };

    // 移动端切换主题
    mnTheme.onclick = () => {
      darkToggle.checked = !darkToggle.checked;
      updateTheme();
    };

    // ======================================
    // 底部样式：主题 + 背景 + 毛玻璃 全同步
    // ======================================
    function updateFooterStyle() {
      const footerPlate = document.getElementById('footerPlate');
      if (!footerPlate) return;

      const currTheme = html.getAttribute('data-theme');
      const currGlass = localStorage.getItem('tb-glass') || 'off';
      const currUseBg = localStorage.getItem('tb-custombg') || 'off';
      const currBgImg = localStorage.getItem('tb-bg-image');

      // 1. 文字颜色
      footerPlate.style.color = currTheme === 'dark' ? '#bababa' : '#454545';

      // 2. 底板：仅启用背景时显示
      if (currUseBg === 'on' && currBgImg) {
        // 明暗底色
        const baseBg = currTheme === 'dark'
          ? 'rgba(0, 0, 0, 0.35)'
          : 'rgba(255, 255, 255, 0.45)';

        // 毛玻璃开关控制
        if (currGlass === 'on') {
          footerPlate.style.background = baseBg;
          footerPlate.style.backdropFilter = 'blur(8px) saturate(120%)';
          footerPlate.style.webkitBackdropFilter = 'blur(8px) saturate(120%)';
        } else {
          footerPlate.style.background = baseBg;
          footerPlate.style.backdropFilter = 'none';
          footerPlate.style.webkitBackdropFilter = 'none';
        }
      } else {
        // 关闭背景：隐藏底板
        footerPlate.style.background = 'transparent';
        footerPlate.style.backdropFilter = 'none';
        footerPlate.style.webkitBackdropFilter = 'none';
      }
    }

    // 初始化
    updateFooterStyle();
  }, 100);

// ==============================
// 返回顶部按钮（SVG进度条在最上层 · 毛玻璃在下）
// ==============================
(function () {
  const container = document.createElement('div');
  container.style.cssText = `
    position: fixed;
    right: 20px;
    bottom: 80px;
    width: 46px;
    height: 46px;
    z-index: 99;
  `;

  // 按钮（毛玻璃层）
  const btn = document.createElement('button');
  btn.id = 'backToTopBtn';
  btn.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1;
  `;
  btn.innerHTML = '<i class="fa-solid fa-arrow-up"></i>';

  // SVG 进度条（在最上层！）
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 46 46");
  svg.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 10; /* 进度条在最上层 */
  `;

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  const grad = document.createElementNS("http://www.w3.org/2000/svg", "linearGradient");
  grad.setAttribute("id", "orangeGradTop");
  grad.setAttribute("x1", "0");
  grad.setAttribute("y1", "0");
  grad.setAttribute("x2", "1");
  grad.setAttribute("y2", "1");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#ffaf00");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#ff6b00");

  grad.appendChild(stop1);
  grad.appendChild(stop2);
  defs.appendChild(grad);
  svg.appendChild(defs);

  const track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  track.setAttribute("cx", "23");
  track.setAttribute("cy", "23");
  track.setAttribute("r", "20");
  track.setAttribute("fill", "none");
  track.setAttribute("stroke-width", "2");

  const bar = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  bar.setAttribute("cx", "23");
  bar.setAttribute("cy", "23");
  bar.setAttribute("r", "20");
  bar.setAttribute("fill", "none");
  bar.setAttribute("stroke", "url(#orangeGradTop)");
  bar.setAttribute("stroke-width", "2");
  bar.setAttribute("stroke-dasharray", "125.6");
  bar.setAttribute("stroke-dashoffset", "125.6");
  bar.setAttribute("stroke-linecap", "round");

  svg.appendChild(track);
  svg.appendChild(bar);
  container.appendChild(btn);
  container.appendChild(svg); // 最后插入 → 最上层
  document.body.appendChild(container);

  const circ = 125.6;

  function updateScroll() {
    const top = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    const per = total > 0 ? top / total : 0;
    bar.style.strokeDashoffset = circ - per * circ;
    container.style.opacity = top > 10 ? "1" : "0";
  }

  function updateStyle() {
    const theme = localStorage.getItem('tb-theme') || 'light';
    const glass = localStorage.getItem('tb-glass') || 'off';

    track.style.stroke = theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)';
    btn.style.color = theme === 'dark' ? '#ffab40' : '#ff9500';

    if (glass === 'on') {
      btn.style.background = theme === 'dark' ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.15)';
      btn.style.backdropFilter = 'blur(8px) saturate(120%)';
    } else {
      btn.style.background = theme === 'dark' ? 'rgba(0,0,0,0.4)' : 'rgba(255,255,255,0.4)';
      btn.style.backdropFilter = 'none';
    }
  }

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', updateScroll);
  setInterval(updateStyle, 200);
  updateScroll();
  updateStyle();
})();

});

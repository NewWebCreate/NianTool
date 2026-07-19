/**
 * 小念工具 - 网站控制面板脚本
 * 功能：维护模式覆盖、开屏弹窗、页面公告
 * 数据源：Extends Class JSON Storage
 * 隔离策略：IIFE + nian- 前缀类名 + Shadow-free 注入
 */
(function () {
    'use strict';

    // ==================== 配置 ====================
    var BIN_URL = 'https://json.extendsclass.com/bin/733f987ad3a5';
    var PREFIX = 'nian-';

    // ==================== 注入 CSS（nian- 前缀隔离） ====================
    var cssText = [
        /* 公告栏 - 关联 header 但不在 header 底板上 */
        '.header { position: relative; }',
        '.' + PREFIX + 'announcement {',
        '  position: absolute; left: 0; right: 0; top: 100%;',
        '  display: none; align-items: center;',
        '  margin: 6px 12px 0;',
        '  background: var(--surface, rgba(255,255,255,0.72));',
        '  border: 1px solid var(--border, rgba(0,0,0,0.08));',
        '  border-radius: 12px;',
        '  backdrop-filter: blur(20px) saturate(1.2);',
        '  -webkit-backdrop-filter: blur(20px) saturate(1.2);',
        '  box-shadow: 0 2px 12px rgba(0,0,0,0.06);',
        '  padding: 0 16px; min-height: 44px;',
        '  font-family: "Plus Jakarta Sans", -apple-system, sans-serif;',
        '  font-size: 13px; color: var(--text-primary, #111827);',
        '  z-index: 99;',
        '}',
        '.' + PREFIX + 'announcement.' + PREFIX + 'show { display: flex; }',
        '.' + PREFIX + 'ann-icon {',
        '  color: var(--accent, #6366f1); font-size: 14px; flex-shrink: 0;',
        '}',
        '.' + PREFIX + 'ann-divider {',
        '  width: 1px; height: 16px; margin: 0 10px; flex-shrink: 0;',
        '  background: var(--border, rgba(0,0,0,0.08));',
        '}',
        '.' + PREFIX + 'ann-content {',
        '  flex: 1; overflow: hidden; white-space: nowrap; position: relative;',
        '}',
        '.' + PREFIX + 'ann-text {',
        '  display: inline-block; font-weight: 500;',
        '}',
        '.' + PREFIX + 'ann-text.' + PREFIX + 'ann-scrolling {',
        '  animation: ' + PREFIX + 'marquee var(--dur, 10s) linear infinite;',
        '}',
        '@keyframes ' + PREFIX + 'marquee {',
        '  0% { transform: translateX(var(--cw, 200px)); }',
        '  100% { transform: translateX(-100%); }',
        '}',
        /* 公告显示时 header 背景不透明，避免透出下方内容 */
        'body.' + PREFIX + 'ann-active .header {',
        '  background: var(--surface-solid, #ffffff);',
        '}',
        '[data-theme="dark"] body.' + PREFIX + 'ann-active .header {',
        '  background: var(--surface-solid, #1e202a);',
        '}',
        /* 公告下方间隙的 spacer */
        '.' + PREFIX + 'ann-spacer { height: 6px; }',
        '@media (max-width:768px) {',
        '  .' + PREFIX + 'announcement { margin: 4px 8px 0; min-height: 38px; }',
        '}',


        /* 开屏弹窗 */
        '.' + PREFIX + 'popup-overlay {',
        '  position: fixed; inset: 0; z-index: 99998;',
        '  background: rgba(0,0,0,0.4);',
        '  display: none; align-items: center; justify-content: center;',
        '  backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);',
        '  opacity: 0; transition: opacity 0.3s ease;',
        '}',
        '.' + PREFIX + 'popup-overlay.' + PREFIX + 'show { display: flex; }',
        '.' + PREFIX + 'popup-overlay.' + PREFIX + 'visible { opacity: 1; }',
        '.' + PREFIX + 'popup-box {',
        '  background: var(--surface-solid, #ffffff);',
        '  border: 1px solid var(--border, rgba(0,0,0,0.08));',
        '  border-radius: 24px; padding: 36px 32px 28px;',
        '  max-width: 420px; width: 90%; text-align: center;',
        '  box-shadow: 0 20px 60px rgba(0,0,0,0.15);',
        '  transform: scale(0.9) translateY(10px);',
        '  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);',
        '  position: relative; overflow: hidden;',
        '  font-family: "Plus Jakarta Sans", -apple-system, sans-serif;',
        '}',
        '.' + PREFIX + 'popup-overlay.' + PREFIX + 'visible .' + PREFIX + 'popup-box {',
        '  transform: scale(1) translateY(0);',
        '}',
        '.' + PREFIX + 'popup-box::before {',
        '  content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px;',
        '  background: linear-gradient(90deg, #6366f1, #a78bfa, #ec4899, #06b6d4);',
        '}',
        '.' + PREFIX + 'popup-title {',
        '  font-size: 20px; font-weight: 800; color: var(--text-primary, #111827);',
        '  letter-spacing: -0.03em; margin-bottom: 12px;',
        '}',
        '.' + PREFIX + 'popup-content {',
        '  font-size: 14px; color: var(--text-secondary, #6b7280);',
        '  line-height: 1.7; margin-bottom: 24px; white-space: pre-wrap;',
        '}',
        '.' + PREFIX + 'popup-buttons { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }',
        '.' + PREFIX + 'popup-btn {',
        '  padding: 10px 24px; border-radius: 100px; font-size: 13px; font-weight: 600;',
        '  border: none; cursor: pointer; font-family: inherit;',
        '  transition: all 0.25s cubic-bezier(0.4,0,0.2,1);',
        '}',
        '.' + PREFIX + 'popup-btn-primary {',
        '  background: #6366f1; color: #fff;',
        '  box-shadow: 0 4px 12px rgba(99,102,241,0.3);',
        '}',
        '.' + PREFIX + 'popup-btn-primary:hover {',
        '  background: #4f46e5; transform: translateY(-1px);',
        '  box-shadow: 0 6px 16px rgba(99,102,241,0.4);',
        '}',
        '.' + PREFIX + 'popup-btn-secondary {',
        '  background: rgba(0,0,0,0.05); color: var(--text-secondary, #6b7280);',
        '  border: 1px solid var(--border, rgba(0,0,0,0.08));',
        '}',
        '.' + PREFIX + 'popup-btn-secondary:hover {',
        '  background: rgba(0,0,0,0.08); color: var(--text-primary, #111827);',
        '}',

        /* 维护模式全屏覆盖 */
        '.' + PREFIX + 'maintenance {',
        '  position: fixed; inset: 0; z-index: 99999;',
        '  background: var(--bg, #f0f2f5);',
        '  display: none; align-items: center; justify-content: center;',
        '  font-family: "Plus Jakarta Sans", -apple-system, sans-serif;',
        '  flex-direction: column;',
        '}',
        '.' + PREFIX + 'maintenance.' + PREFIX + 'show { display: flex; }',
        '.' + PREFIX + 'maintenance .'+ PREFIX +'m-card {',
        '  background: var(--surface, rgba(255,255,255,0.72));',
        '  border: 1px solid var(--border, rgba(0,0,0,0.08));',
        '  border-radius: 28px; padding: 48px 40px; text-align: center;',
        '  max-width: 460px; width: 90%;',
        '  backdrop-filter: blur(20px) saturate(1.2);',
        '  -webkit-backdrop-filter: blur(20px) saturate(1.2);',
        '  box-shadow: 0 12px 40px rgba(0,0,0,0.12);',
        '}',
        '.' + PREFIX + 'maintenance .'+ PREFIX +'m-icon {',
        '  font-size: 48px; color: var(--accent, #6366f1); margin-bottom: 20px;',
        '}',
        '.' + PREFIX + 'maintenance .'+ PREFIX +'m-title {',
        '  font-size: 24px; font-weight: 800; color: var(--text-primary, #111827);',
        '  margin-bottom: 12px;',
        '}',
        '.' + PREFIX + 'maintenance .'+ PREFIX +'m-text {',
        '  font-size: 14px; color: var(--text-secondary, #6b7280); line-height: 1.7;',
        '  white-space: pre-wrap;',
        '}',

        /* 暗色模式适配 */
        '[data-theme="dark"] .' + PREFIX + 'maintenance { background: #0f1117; }',
        '[data-theme="dark"] .' + PREFIX + 'announcement {',
        '  background: var(--surface, rgba(30,32,42,0.72));',
        '  border-color: var(--border, rgba(255,255,255,0.08));',
        '  box-shadow: 0 2px 12px rgba(0,0,0,0.2);',
        '}',
        '[data-theme="dark"] .' + PREFIX + 'popup-btn-secondary {',
        '  background: rgba(255,255,255,0.06); color: #94a3b8;',
        '  border-color: rgba(255,255,255,0.08);',
        '}',
        '[data-theme="dark"] .' + PREFIX + 'popup-btn-secondary:hover {',
        '  background: rgba(255,255,255,0.1); color: #f1f5f9;',
        '}',
    ].join('\n');

    var styleEl = document.createElement('style');
    styleEl.textContent = cssText;
    document.head.appendChild(styleEl);

    // ==================== 注入 HTML ====================
    // 1. 公告栏（注入到 header 内部，作为 header 的一部分）
    var announcementEl = document.createElement('div');
    announcementEl.className = PREFIX + 'announcement';
    announcementEl.id = PREFIX + 'announcementBar';
    announcementEl.innerHTML =
        '<i class="fa-solid fa-bullhorn ' + PREFIX + 'ann-icon"></i>' +
        '<span class="' + PREFIX + 'ann-divider"></span>' +
        '<div class="' + PREFIX + 'ann-content"><span class="' + PREFIX + 'ann-text" id="' + PREFIX + 'annText"></span></div>';
    var headerEl = document.querySelector('.header');
    if (headerEl) headerEl.appendChild(announcementEl);

    // 2. 开屏弹窗
    var popupOverlay = document.createElement('div');
    popupOverlay.className = PREFIX + 'popup-overlay';
    popupOverlay.id = PREFIX + 'popupOverlay';
    popupOverlay.innerHTML =
        '<div class="' + PREFIX + 'popup-box">' +
            '<div class="' + PREFIX + 'popup-title" id="' + PREFIX + 'popupTitle"></div>' +
            '<div class="' + PREFIX + 'popup-content" id="' + PREFIX + 'popupContent"></div>' +
            '<div class="' + PREFIX + 'popup-buttons" id="' + PREFIX + 'popupButtons"></div>' +
        '</div>';
    document.body.appendChild(popupOverlay);

    // 3. 维护模式覆盖
    var maintenanceEl = document.createElement('div');
    maintenanceEl.className = PREFIX + 'maintenance';
    maintenanceEl.id = PREFIX + 'maintenance';
    maintenanceEl.innerHTML =
        '<div class="' + PREFIX + 'm-card">' +
            '<div class="' + PREFIX + 'm-icon"><i class="fa-solid fa-wrench"></i></div>' +
            '<div class="' + PREFIX + 'm-title" id="' + PREFIX + 'mTitle"></div>' +
            '<div class="' + PREFIX + 'm-text" id="' + PREFIX + 'mText"></div>' +
        '</div>';
    document.body.appendChild(maintenanceEl);

    // 维护模式下禁用右键
    document.addEventListener('contextmenu', function (e) {
        if (maintenanceEl.classList.contains(PREFIX + 'show')) {
            e.preventDefault();
            e.stopPropagation();
        }
    }, true);

    // 维护模式下禁用选中
    document.addEventListener('selectstart', function (e) {
        if (maintenanceEl.classList.contains(PREFIX + 'show')) {
            e.preventDefault();
        }
    }, true);

    // ==================== 数据获取 ====================
    var defaultConfig = {
        maintenance: false,
        popup: {
            enabled: false,
            title: '公告',
            content: '欢迎使用小念工具！',
            buttons: [{ text: '知道了', action: 'close' }]
        },
        announcement: {
            enabled: false,
            content: '这是一条公告'
        }
    };

    function mergeConfig(def, data) {
        var result = JSON.parse(JSON.stringify(def));
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                if (typeof data[key] === 'object' && !Array.isArray(data[key]) && data[key] !== null) {
                    result[key] = mergeConfig(result[key], data[key]);
                } else {
                    result[key] = data[key];
                }
            }
        }
        return result;
    }

    async function fetchConfig() {
        try {
            var resp = await fetch(BIN_URL, { method: 'GET' });
            if (!resp.ok) throw new Error('HTTP ' + resp.status);
            var data = await resp.json();
            return mergeConfig(defaultConfig, data);
        } catch (e) {
            console.warn('[NianControl] 配置加载失败，使用默认值:', e.message);
            return JSON.parse(JSON.stringify(defaultConfig));
        }
    }

    // ==================== 功能实现 ====================

    // 维护模式
    function applyMaintenance(config) {
        if (config.maintenance) {
            var titleEl = document.getElementById(PREFIX + 'mTitle');
            var textEl = document.getElementById(PREFIX + 'mText');
            titleEl.textContent = '网站维护中';
            textEl.textContent = '我们正在进行系统维护和升级，\n暂时无法访问。请稍后再试。';
            maintenanceEl.classList.add(PREFIX + 'show');
            document.body.style.overflow = 'hidden';
            // 维护模式 CSS 禁止选中和右键
            maintenanceEl.style.userSelect = 'none';
            maintenanceEl.style.webkitUserSelect = 'none';
        }
    }

    // 公告
    var annSpacer = null;
    function applyAnnouncement(config) {
        if (config.announcement && config.announcement.enabled && config.announcement.content) {
            var textEl = document.getElementById(PREFIX + 'annText');
            textEl.textContent = config.announcement.content;
            announcementEl.classList.add(PREFIX + 'show');
            document.body.classList.add(PREFIX + 'ann-active');
            // 注入 spacer 到 header 后面，把内容推下去
            if (!annSpacer && headerEl) {
                annSpacer = document.createElement('div');
                annSpacer.className = PREFIX + 'ann-spacer';
                headerEl.parentNode.insertBefore(annSpacer, headerEl.nextSibling);
            }
            // 等公告渲染完成后测量高度，设置 spacer
            requestAnimationFrame(function () {
                if (annSpacer) {
                    var h = announcementEl.offsetHeight + 6; // 公告高度 + 底部间隙
                    annSpacer.style.height = h + 'px';
                }
                checkMarquee();
            });
        }
    }

    function checkMarquee() {
        var textEl = document.getElementById(PREFIX + 'annText');
        if (!textEl) return;
        var contentEl = textEl.parentElement;
        if (textEl.offsetWidth > contentEl.offsetWidth) {
            textEl.classList.add(PREFIX + 'ann-scrolling');
            textEl.style.setProperty('--cw', contentEl.offsetWidth + 'px');
            var dur = Math.max(4, (contentEl.offsetWidth + textEl.offsetWidth) / 60);
            textEl.style.setProperty('--dur', dur + 's');
        } else {
            textEl.classList.remove(PREFIX + 'ann-scrolling');
        }
    }

    // 窗口大小变化时重新计算滚动
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
            var textEl = document.getElementById(PREFIX + 'annText');
            if (textEl) {
                textEl.classList.remove(PREFIX + 'ann-scrolling');
                requestAnimationFrame(function () { checkMarquee(); });
            }
        }, 150);
    });

    // 开屏弹窗
    var DISMISSED_KEY = PREFIX + 'popup-dismissed';
    var DISMISSED_TIME_KEY = PREFIX + 'popup-dismissed-time';
    var COOLDOWN_MS = 10 * 60 * 1000; // 10 分钟冷却

    function isExternalVisit() {
        var ref = document.referrer;
        if (!ref) return false; // 无 referrer = 直接访问/刷新，不算外部
        try {
            return new URL(ref).hostname !== location.hostname;
        } catch (e) {
            return false;
        }
    }

    function applyPopup(config) {
        if (!config.popup || !config.popup.enabled) return;

        var dismissed = sessionStorage.getItem(DISMISSED_KEY);
        if (dismissed) {
            var dismissedTime = parseInt(sessionStorage.getItem(DISMISSED_TIME_KEY) || '0', 10);
            var elapsed = Date.now() - dismissedTime;
            // 外部跳转过来 → 清除标记，继续显示
            if (isExternalVisit()) {
                sessionStorage.removeItem(DISMISSED_KEY);
                sessionStorage.removeItem(DISMISSED_TIME_KEY);
            } else if (elapsed >= COOLDOWN_MS) {
                // 距离上次关闭超过 10 分钟 → 重新显示
                sessionStorage.removeItem(DISMISSED_KEY);
                sessionStorage.removeItem(DISMISSED_TIME_KEY);
            } else {
                // 冷却期内 → 不再显示
                return;
            }
        }

        var titleEl = document.getElementById(PREFIX + 'popupTitle');
        var contentEl = document.getElementById(PREFIX + 'popupContent');
        var buttonsEl = document.getElementById(PREFIX + 'popupButtons');

        titleEl.textContent = config.popup.title || '公告';
        contentEl.textContent = config.popup.content || '';

        // 渲染按钮
        buttonsEl.innerHTML = '';
        var buttons = config.popup.buttons || [{ text: '知道了', action: 'close' }];
        for (var i = 0; i < buttons.length; i++) {
            (function (btn) {
                var btnEl = document.createElement('button');
                btnEl.className = PREFIX + 'popup-btn ' + (i === 0 ? PREFIX + 'popup-btn-primary' : PREFIX + 'popup-btn-secondary');
                btnEl.textContent = btn.text || '按钮';
                btnEl.addEventListener('click', function () {
                    if (btn.action === 'link' && btn.link) {
                        window.open(btn.link, '_blank');
                    }
                    closePopup();
                });
                buttonsEl.appendChild(btnEl);
            })(buttons[i]);
        }

        // 显示弹窗（延迟一点让页面先渲染）
        setTimeout(function () {
            popupOverlay.classList.add(PREFIX + 'show');
            // 触发过渡动画
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    popupOverlay.classList.add(PREFIX + 'visible');
                });
            });
            document.body.style.overflow = 'hidden';
        }, 300);
    }

    function closePopup() {
        sessionStorage.setItem(DISMISSED_KEY, '1');
        sessionStorage.setItem(DISMISSED_TIME_KEY, String(Date.now()));
        popupOverlay.classList.remove(PREFIX + 'visible');
        setTimeout(function () {
            popupOverlay.classList.remove(PREFIX + 'show');
            // 如果维护模式没开，恢复滚动
            if (!maintenanceEl || !maintenanceEl.classList.contains(PREFIX + 'show')) {
                document.body.style.overflow = '';
            }
        }, 300);
    }

    // 点击遮罩关闭弹窗
    popupOverlay.addEventListener('click', function (e) {
        if (e.target === popupOverlay) {
            closePopup();
        }
    });

    // ESC 关闭弹窗
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && popupOverlay.classList.contains(PREFIX + 'show')) {
            closePopup();
        }
    });

    // ==================== 初始化 ====================
    (async function init() {
        var config = await fetchConfig();
        applyMaintenance(config);
        applyAnnouncement(config);
        applyPopup(config);
    })();

})();

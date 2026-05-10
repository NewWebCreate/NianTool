    // ==================== DATA ====================
    const cats = {
        daily:   { name:'日常工具', icon:'fa-solid fa-sun',           color:'#f97316' },
        text:    { name:'文本处理', icon:'fa-solid fa-font',          color:'#06b6d4' },
        image:   { name:'图片工具', icon:'fa-solid fa-image',         color:'#10b981' },
        dev:     { name:'开发工具', icon:'fa-solid fa-code',          color:'#8b5cf6' },
        finance: { name:'计算工具', icon:'fa-solid fa-calculator',    color:'#f59e0b' },
        edu:     { name:'教育学习', icon:'fa-solid fa-graduation-cap',color:'#ef4444' },
        fun:     { name:'生活娱乐', icon:'fa-solid fa-gamepad',       color:'#14b8a6' },
    };

    const tools = [
        { name:'增强声音',   desc:'录制并同步播放增强的声音',       icon:'fas fa-volume-up',        cat:'daily',   url:'1' },
        { name:'BMI 计算器',   desc:'计算身体质量指数',       icon:'fa-solid fa-heart-pulse',        cat:'daily',   url:'2' },
        { name:'计时器',       desc:'在线倒计时与秒表',       icon:'fa-solid fa-stopwatch',           cat:'daily',   url:'#' },
        { name:'二维码生成',   desc:'文本/链接转二维码',      icon:'fa-solid fa-qrcode',              cat:'daily',   url:'#' },
        { name:'单位换算',     desc:'长度/重量/温度等',       icon:'fa-solid fa-right-left',          cat:'daily',   url:'#' },
        { name:'日期计算',     desc:'计算两日期间隔天数',     icon:'fa-solid fa-calendar-days',       cat:'daily',   url:'#' },
        { name:'随机数生成',   desc:'自定义范围随机数',       icon:'fa-solid fa-shuffle',             cat:'daily',   url:'#' },
        { name:'密码生成器',   desc:'生成安全随机密码',       icon:'fa-solid fa-key',                 cat:'daily',   url:'#' },
        { name:'电子签名',     desc:'手写签名并导出图片',     icon:'fa-solid fa-signature',           cat:'daily',   url:'#' },

        { name:'字数统计',     desc:'实时统计字符与段落',     icon:'fa-solid fa-font',                cat:'text',    url:'#' },
        { name:'文本对比',     desc:'逐行比较两段文本差异',   icon:'fa-solid fa-code-compare',        cat:'text',    url:'#' },
        { name:'大小写转换',   desc:'全角半角/大小写互转',    icon:'fa-solid fa-text-height',         cat:'text',    url:'#' },
        { name:'Markdown 编辑',desc:'实时预览 Markdown',      icon:'fa-brands fa-markdown',           cat:'text',    url:'#' },
        { name:'正则测试器',   desc:'在线正则匹配与调试',     icon:'fa-solid fa-asterisk',            cat:'text',    url:'#' },
        { name:'Base64 编解码',desc:'文本与 Base64 互转',     icon:'fa-solid fa-file-code',           cat:'text',    url:'#' },
        { name:'Unicode 转换', desc:'Unicode 与中文互转',     icon:'fa-solid fa-language',            cat:'text',    url:'#' },

        { name:'图片压缩',     desc:'在线压缩 JPG/PNG 图片',  icon:'fa-solid fa-compress',            cat:'image',   url:'#' },
        { name:'格式转换',     desc:'JPG / PNG / WebP / SVG', icon:'fa-solid fa-rotate',              cat:'image',   url:'#' },
        { name:'调色板',       desc:'取色、配色方案生成',     icon:'fa-solid fa-palette',             cat:'image',   url:'#' },
        { name:'图片裁剪',     desc:'在线裁剪调整尺寸',       icon:'fa-solid fa-crop-simple',         cat:'image',   url:'#' },
        { name:'滤镜效果',     desc:'给图片添加风格滤镜',     icon:'fa-solid fa-wand-magic-sparkles', cat:'image',   url:'#' },
        { name:'图片加水印',   desc:'批量添加文字水印',       icon:'fa-solid fa-stamp',               cat:'image',   url:'#' },
        { name:'SVG 编辑器',   desc:'在线编辑 SVG 矢量图',    icon:'fa-solid fa-pen-nib',             cat:'image',   url:'#' },

        { name:'JSON 格式化',  desc:'JSON 美化与压缩',        icon:'fab fa-js-square',      cat:'dev',     url:'#' },
        { name:'HTML 预览',    desc:'实时运行 HTML/CSS/JS',   icon:'fa-brands fa-html5',              cat:'dev',     url:'#' },
        { name:'URL 编解码',   desc:'URL Encode / Decode',    icon:'fa-solid fa-link',                cat:'dev',     url:'#' },
        { name:'UUID 生成',    desc:'生成唯一标识符',         icon:'fa-solid fa-fingerprint',         cat:'dev',     url:'#' },
        { name:'Hash 计算',    desc:'MD5 / SHA1 / SHA256',    icon:'fa-solid fa-hashtag',             cat:'dev',     url:'#' },
        { name:'cron 表达式',  desc:'解析与生成定时任务',     icon:'fa-solid fa-clock-rotate-left',   cat:'dev',     url:'#' },
        { name:'时间戳转换',   desc:'时间戳与日期互转',       icon:'fa-solid fa-clock',               cat:'dev',     url:'#' },
        { name:'代码对比',     desc:'在线 Diff 代码差异',     icon:'fa-solid fa-code-compare',        cat:'dev',     url:'#' },

        { name:'科学计算器',   desc:'支持三角函数等高级运算', icon:'fa-solid fa-calculator',          cat:'finance', url:'#' },
        { name:'汇率换算',     desc:'实时多币种汇率查询',     icon:'fa-solid fa-coins',               cat:'finance', url:'#' },
        { name:'贷款计算器',   desc:'房贷/车贷月供计算',      icon:'fa-solid fa-house',               cat:'finance', url:'#' },
        { name:'百分比计算',   desc:'增减率、占比等',         icon:'fa-solid fa-percent',             cat:'finance', url:'#' },
        { name:'复利计算器',   desc:'投资收益复利计算',       icon:'fa-solid fa-chart-line',          cat:'finance', url:'#' },
        { name:'进制转换',     desc:'二/八/十/十六进制互转',  icon:'fa-solid fa-arrow-right-arrow-left',cat:'finance',url:'#' },
        { name:'年龄计算器',   desc:'精确到天的年龄计算',     icon:'fa-solid fa-cake-candles',        cat:'finance', url:'#' },

        { name:'英汉词典',     desc:'快速查单词释义',         icon:'fa-solid fa-book',                cat:'edu',     url:'#' },
        { name:'元素周期表',   desc:'交互式化学元素表',       icon:'fa-solid fa-atom',                cat:'edu',     url:'#' },
        { name:'数学公式',     desc:'常用数学公式速查',       icon:'fa-solid fa-square-root-variable',cat:'edu',     url:'#' },
        { name:'ASCII 表',     desc:'完整 ASCII 码对照表',    icon:'fa-solid fa-table-cells',         cat:'edu',     url:'#' },
        { name:'颜色代码表',   desc:'常用颜色 HEX 对照',      icon:'fa-solid fa-droplet',             cat:'edu',     url:'#' },
        { name:'键盘测试',     desc:'检测键盘按键是否正常',   icon:'fa-solid fa-keyboard',            cat:'edu',     url:'#' },
        { name:'打字测速',     desc:'测试中英文打字速度',     icon:'fa-solid fa-gauge-high',          cat:'edu',     url:'#' },

        { name:'每日一言',     desc:'随机获取一句名言',       icon:'fa-solid fa-quote-left',          cat:'fun',     url:'#' },
        { name:'掷骰子',       desc:'模拟掷骰子',             icon:'fa-solid fa-dice',                cat:'fun',     url:'#' },
        { name:'决定转盘',     desc:'帮你做选择的转盘',       icon:'fa-solid fa-dharmachakra',        cat:'fun',     url:'#' },
        { name:'抽签工具',     desc:'在线随机抽签',           icon:'fa-solid fa-wand-magic',          cat:'fun',     url:'#' },
        { name:'番茄钟',       desc:'25 分钟专注工作法',      icon:'fa-solid fa-bell',                cat:'fun',     url:'#' },
        { name:'习惯打卡',     desc:'每日习惯追踪记录',       icon:'fa-solid fa-check-double',        cat:'fun',     url:'#' },
    ];

    const catOrder = ['daily','text','image','dev','finance','edu','fun'];

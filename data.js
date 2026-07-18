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
        { name:'增强声音',   desc:'录制并同步播放增强的声音',       icon:'fas fa-volume-up',        cat:'daily',   url:'n/1' },
        { name:'BMI 计算器',   desc:'计算身体质量指数',       icon:'fa-solid fa-heart-pulse',        cat:'daily',   url:'n/2' },
        
    ];

    const catOrder = ['daily','text','image','dev','finance','edu','fun'];

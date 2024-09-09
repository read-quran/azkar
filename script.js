const dhikrInfo = {
    "الصلاة على النبي": {
        count: 10,
        link: "https://read-quran.github.io/azkar/pages/1"
    },
    "سبحان الله وبحمده": {
        count: 100,
        link: "https://read-quran.github.io/azkar/pages/2"
    }
};

let dhikrs = [];

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    saveSettings();
}

// إضافة نموذج ذكر جديد
function addDhikrForm() {
    const dhikrForms = document.getElementById('dhikrForms');
    const newForm = document.createElement('div');
    newForm.className = 'dhikr-form';
    newForm.innerHTML = `
        <input type="text" class="dhikrInput" placeholder="أدخل الذكر">
        <input type="number" class="countInput" placeholder="عدد المرات" min="1">
        <textarea class="hadithInput" placeholder="الحديث (اختياري)"></textarea>
        <textarea class="virtuesInput" placeholder="الفضائل (اختياري)"></textarea>
        <input type="url" class="linkInput" placeholder="رابط (اختياري)">
    `;
    dhikrForms.appendChild(newForm);
}

// بدء الذكر
function startDhikr() {
    const forms = document.querySelectorAll('.dhikr-form');
    dhikrs = [];

    forms.forEach((form, index) => {
        const dhikr = form.querySelector('.dhikrInput').value;
        const count = parseInt(form.querySelector('.countInput').value);
        const hadith = form.querySelector('.hadithInput').value;
        const virtues = form.querySelector('.virtuesInput').value;
        const linkUrl = form.querySelector('.linkInput').value;

        if (dhikr && count) {
            dhikrs.push({ dhikr, count, hadith, virtues, linkUrl, currentCount: 0 });
        }
    });

    if (dhikrs.length === 0) {
        alert('الرجاء إدخال الذكر وعدد المرات على الأقل');
        return;
    }

    displayDhikrs();
    document.getElementById('countButton').style.display = 'block';
}

// عرض الأذكار
function displayDhikrs() {
    const dhikrDisplays = document.getElementById('dhikrDisplays');
    dhikrDisplays.innerHTML = '';

    dhikrs.forEach((dhikr, index) => {
        const dhikrElement = document.createElement('div');
        dhikrElement.className = 'dhikr-display';
        dhikrElement.innerHTML = `
            <div class="dhikr-text">${dhikr.dhikr}</div>
            <div class="dhikr-counter" id="counter-${index}">${dhikr.currentCount} / ${dhikr.count}</div>
        `;
        dhikrDisplays.appendChild(dhikrElement);
    });
}

// زيادة العداد
function incrementCounter() {
    let allCompleted = true;

    dhikrs.forEach((dhikr, index) => {
        if (dhikr.currentCount < dhikr.count) {
            dhikr.currentCount++;
            document.getElementById(`counter-${index}`).textContent = `${dhikr.currentCount} / ${dhikr.count}`;
            animateCounter(`counter-${index}`);
            allCompleted = false;
        }
    });

    if (allCompleted) {
        document.getElementById('countButton').style.display = 'none';
        showCompletion();
    }
}

// إظهار رسالة الإكمال
function showCompletion() {
    let hadithText = '';
    let virtuesText = '';

    dhikrs.forEach(dhikr => {
        if (dhikr.hadith) hadithText += dhikr.hadith + '\n\n';
        if (dhikr.virtues) virtuesText += dhikr.virtues + '\n\n';
    });

    document.getElementById('hadith').textContent = hadithText.trim();
    document.getElementById('virtues').textContent = virtuesText.trim();
    document.getElementById('hadith').style.display = 'block';
    document.getElementById('virtues').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'inline-block';
    document.getElementById('shareBtn').style.display = 'inline-block';
    document.getElementById('exportBtn').style.display = 'inline-block';
}

// إعادة تعيين الذكر
function resetDhikr() {
    dhikrs = [];
    document.getElementById('dhikrForms').innerHTML = `
        <div class="dhikr-form">
            <input type="text" class="dhikrInput" placeholder="أدخل الذكر">
            <input type="number" class="countInput" placeholder="عدد المرات" min="1">
            <textarea class="hadithInput" placeholder="الحديث (اختياري)"></textarea>
            <textarea class="virtuesInput" placeholder="الفضائل (اختياري)"></textarea>
            <input type="url" class="linkInput" placeholder="رابط (اختياري)">
        </div>
    `;
    document.getElementById('dhikrDisplays').innerHTML = '';
    document.getElementById('hadith').textContent = '';
    document.getElementById('virtues').textContent = '';
    document.getElementById('hadith').style.display = 'none';
    document.getElementById('virtues').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('shareBtn').style.display = 'none';
    document.getElementById('exportBtn').style.display = 'none';
    document.getElementById('countButton').style.display = 'none';
}

// مشاركة الصفحة
function sharePage() {
    let shareText = 'الأذكار اليومية:\n\n';
    
    dhikrs.forEach(dhikr => {
        shareText += `${dhikr.dhikr}\n`;
        shareText += `عدد مرات التكرار: ${dhikr.count}\n`;
        if (dhikr.hadith) shareText += `الحديث: ${dhikr.hadith}\n`;
        if (dhikr.virtues) shareText += `الفضائل: ${dhikr.virtues}\n`;
        if (dhikr.linkUrl) shareText += `الرابط: ${dhikr.linkUrl}\n`;
        shareText += '\n';
    });

    shareViaWhatsApp(shareText);
}

// مشاركة عبر واتساب
function shareViaWhatsApp(text) {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
}

// تصدير الذكر
function exportDhikr() {
    let dhikrsHtml = '';
    dhikrs.forEach((dhikr, index) => {
        dhikrsHtml += `
            <div class="dhikr-item">
                <h2>${dhikr.dhikr}</h2>
                <div class="counter" id="counter-${index}">0 / ${dhikr.count}</div>
                <button class="count-btn" onclick="incrementCounter(${index})">انقر للعد</button>
                <div class="hadith" style="display: none;">${dhikr.hadith || ''}</div>
                <div class="virtues" style="display: none;">${dhikr.virtues || ''}</div>
            </div>
        `;
    });

    const exportContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عداد الأذكار</title>
    <style>
        :root {
            --primary-color: #4a90e2;
            --secondary-color: #f39c12;
            --background-light: #f0f0f0;
            --background-dark: #333;
            --text-light: #333;
            --text-dark: #f0f0f0;
            --container-bg-light: #ffffff;
            --container-bg-dark: #444;
        }
        body {
            font-family: 'Arial', sans-serif;
            text-align: center;
            background-color: var(--background-light);
            color: var(--text-light);
            transition: background-color 0.3s, color 0.3s;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 1rem;
        }
        body.dark-mode {
            background-color: var(--background-dark);
            color: var(--text-dark);
        }
        .container {
            background-color: var(--container-bg-light);
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
        }
        body.dark-mode .container {
            background-color: var(--container-bg-dark);
        }
        h1, h2 { 
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        .dhikr-item {
            margin-bottom: 2rem;
            padding: 1rem;
            background-color: rgba(74, 144, 226, 0.1);
            border-radius: 5px;
        }
        .counter { 
            font-size: 2rem;
            color: var(--secondary-color);
            margin: 1rem 0;
        }
        .count-btn {
            font-size: 1.2rem;
            padding: 0.5rem 1rem;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .count-btn:hover {
            background-color: #e67e22;
        }
        .hadith, .virtues {
            margin-top: 1rem;
            font-style: italic;
        }
        .button {
            font-size: 1rem;
            padding: 0.5rem 1rem;
            margin: 0.5rem;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        .theme-toggle {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
        }
     </style>
</head>
<body>
    <button class="theme-toggle" onclick="toggleTheme()">🌓</button>
    <div class="container">
        <h1>عداد الأذكار</h1>
        <div id="dhikrContainer">
            ${dhikrsHtml}
        </div>
        <button id="shareButton" class="button" onclick="shareDhikr()" style="display: none;">مشاركة عبر واتساب</button>
        <button id="resetButton" class="button" onclick="resetCounter()" style="display: none;">إعادة</button>
    </div>
    <script>
        const dhikrs = ${JSON.stringify(dhikrs)};
        let currentCounts = dhikrs.map(() => 0);

        function incrementCounter(index) {
            if (currentCounts[index] < dhikrs[index].count) {
                currentCounts[index]++;
                document.getElementById(\`counter-\${index}\`).textContent = \`\${currentCounts[index]} / \${dhikrs[index].count}\`;
                if (currentCounts[index] === dhikrs[index].count) {
                    document.querySelector(\`#counter-\${index} + .count-btn\`).style.display = 'none';
                    document.querySelector(\`#counter-\${index} ~ .hadith\`).style.display = 'block';
                    document.querySelector(\`#counter-\${index} ~ .virtues\`).style.display = 'block';
                }
                if (currentCounts.every((count, i) => count === dhikrs[i].count)) {
                    document.getElementById('shareButton').style.display = 'inline-block';
                    document.getElementById('resetButton').style.display = 'inline-block';
                }
            }
        }

        function resetCounter() {
            currentCounts = dhikrs.map(() => 0);
            dhikrs.forEach((dhikr, index) => {
                document.getElementById(\`counter-\${index}\`).textContent = \`0 / \${dhikr.count}\`;
                document.querySelector(\`#counter-\${index} + .count-btn\`).style.display = 'inline-block';
                document.querySelector(\`#counter-\${index} ~ .hadith\`).style.display = 'none';
                document.querySelector(\`#counter-\${index} ~ .virtues\`).style.display = 'none';
            });
            document.getElementById('shareButton').style.display = 'none';
            document.getElementById('resetButton').style.display = 'none';
        }

        function shareDhikr() {
            let shareText = 'الأذكار اليومية:\\n\\n';
            dhikrs.forEach((dhikr, index) => {
                shareText += \`\${dhikr.dhikr}\\n\`;
                shareText += \`عدد مرات التكرار: \${dhikr.count}\\n\`;
                if (dhikr.hadith) shareText += \`الحديث: \${dhikr.hadith}\\n\`;
                if (dhikr.virtues) shareText += \`الفضائل: \${dhikr.virtues}\\n\`;
                if (dhikr.linkUrl) shareText += \`الرابط: \${dhikr.linkUrl}\\n\`;
                shareText += '\\n';
            });
            
            const whatsappUrl = \`https://wa.me/?text=\${encodeURIComponent(shareText)}\`;
            window.open(whatsappUrl, '_blank');
        }

function toggleTheme() {
            document.body.classList.toggle('dark-mode');
        }
    </script>
</body>
</html>
    `;

    const blob = new Blob([exportContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'exported_dhikr.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// مشاركة الرابط المحدد مسبقًا
function sharePredefinedLink() {
    const selectedDhikr = document.getElementById('predefinedDhikr').value;
    if (selectedDhikr && dhikrInfo[selectedDhikr]) {
        const { count, link } = dhikrInfo[selectedDhikr];
        const shareText = `الذكر: ${selectedDhikr}\nعدد مرات التكرار: ${count}\n\n${link}`;
        shareViaWhatsApp(shareText);
    } else {
        alert('الرجاء اختيار ذكر من القائمة');
    }
}

// تحريك العداد
function animateCounter(counterId) {
    const counter = document.getElementById(counterId);
    counter.style.animation = 'none';
    counter.offsetHeight; // trigger reflow
    counter.style.animation = 'pulse 0.3s';
}

// تحميل الإعدادات المحفوظة
function loadSavedSettings() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// حفظ الإعدادات
function saveSettings() {
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
}

// تهيئة التطبيق
function initApp() {
    loadSavedSettings();
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
    document.getElementById('addDhikrBtn').addEventListener('click', addDhikrForm);
    document.getElementById('predefinedDhikr').addEventListener('change', function() {
        const selectedDhikr = this.value;
        if (selectedDhikr && dhikrInfo[selectedDhikr]) {
            const lastForm = document.querySelector('.dhikr-form:last-child');
            lastForm.querySelector('.dhikrInput').value = selectedDhikr;
            lastForm.querySelector('.countInput').value = dhikrInfo[selectedDhikr].count;
            lastForm.querySelector('.linkInput').value = dhikrInfo[selectedDhikr].link;
        }
    });
    document.getElementById('sharePredefinedLink').addEventListener('click', sharePredefinedLink);
}

// تشغيل التهيئة عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', initApp);

let dhikr, hadith, virtues, count, currentCount, linkUrl;

function startDhikr() {
    dhikr = document.getElementById('dhikrInput').value;
    hadith = document.getElementById('hadithInput').value;
    virtues = document.getElementById('virtuesInput').value;
    count = parseInt(document.getElementById('countInput').value);
    linkUrl = document.getElementById('linkInput').value;
    currentCount = 0;

    if (!dhikr || !count) {
        alert('الرجاء إدخال الذكر وعدد المرات');
        return;
    }

    document.getElementById('dhikrDisplay').textContent = dhikr;
    updateCounter();
    document.getElementById('countButton').style.display = 'block';
}

function incrementCounter() {
    currentCount++;
    updateCounter();

    if (currentCount === count) {
        document.getElementById('countButton').style.display = 'none';
        showCompletion();
    }

    document.getElementById('counter').style.animation = 'pulse 0.3s';
    setTimeout(() => {
        document.getElementById('counter').style.animation = 'none';
    }, 300);
}

function updateCounter() {
    document.getElementById('counter').textContent = `${currentCount} / ${count}`;
}

function showCompletion() {
    document.getElementById('hadith').textContent = hadith;
    document.getElementById('virtues').textContent = virtues;
    document.getElementById('hadith').style.display = 'block';
    document.getElementById('virtues').style.display = 'block';
    document.getElementById('resetBtn').style.display = 'inline-block';
    document.getElementById('shareBtn').style.display = 'inline-block';
    document.getElementById('exportBtn').style.display = 'inline-block';
}

function resetDhikr() {
    document.getElementById('dhikrInput').value = '';
    document.getElementById('hadithInput').value = '';
    document.getElementById('virtuesInput').value = '';
    document.getElementById('countInput').value = '';
    document.getElementById('linkInput').value = '';
    document.getElementById('dhikrDisplay').textContent = '';
    document.getElementById('counter').textContent = '';
    document.getElementById('hadith').textContent = '';
    document.getElementById('virtues').textContent = '';
    document.getElementById('hadith').style.display = 'none';
    document.getElementById('virtues').style.display = 'none';
    document.getElementById('resetBtn').style.display = 'none';
    document.getElementById('shareBtn').style.display = 'none';
    document.getElementById('exportBtn').style.display = 'none';
    document.getElementById('countButton').style.display = 'none';
}

function sharePage() {
    let shareText = 'الأذكار اليومية:\n';
    shareText += `${dhikr}\n`;
    shareText += `عدد مرات التكرار: ${count}\n\n`;
    if (hadith) shareText += ` ${hadith}\n\n`;
    if (virtues) shareText += ` ${virtues}\n\n`;
    if (linkUrl) shareText += linkUrl;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(whatsappUrl, '_blank');
}

function exportDhikr() {
    const exportContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عداد الأذكار</title>
    <style>
        :root {
            --background-light: #f0f0f0;
            --background-dark: #333;
            --text-light: #333;
            --text-dark: #f0f0f0;
            --primary-color: #4a90e2;
            --secondary-color: #f39c12;
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
            background-color: white;
            border-radius: 10px;
            padding: 2rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
        }
        body.dark-mode .container {
            background-color: #444;
        }
        h1 { 
            color: var(--primary-color);
            margin-bottom: 1rem;
        }
        #dhikr, #counter { 
            font-size: 1.5rem;
            margin: 1rem 0;
        }
        #countButton {
            font-size: 1.5rem;
            padding: 0.75rem 1.5rem;
            margin: 1rem 0;
            background-color: var(--secondary-color);
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }
        #counter { 
            font-size: 2rem;
            color: var(--secondary-color);
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
        #finalMessage {
            display: none;
            background-color: var(--secondary-color);
            color: white;
            padding: 1rem;
            border-radius: 10px;
            margin-top: 1rem;
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
        <div id="dhikr">${dhikr}</div>
        <div id="counter">0 / ${count}</div>
        <button id="countButton" onclick="incrementCounter()">انقر للعد</button>
        <div id="finalMessage"></div>
        <button id="shareButton" class="button" onclick="shareDhikr()" style="display: none;">مشاركة عبر واتساب</button>
        <button id="resetButton" class="button" onclick="resetCounter()" style="display: none;">إعادة</button>
    </div>
    <script>
        let currentCount = 0;
        const totalCount = ${count};
        const dhikrText = "${dhikr}";
        const hadithText = "${hadith}";
        const virtuesText = "${virtues}";
        const linkUrl = "${linkUrl}";
        
        function incrementCounter() {
            currentCount++;
            document.getElementById('counter').textContent = currentCount + ' / ' + totalCount;
            if (currentCount === totalCount) {
                document.getElementById('countButton').style.display = 'none';
                document.getElementById('dhikr').style.display = 'none';
                document.getElementById('finalMessage').style.display = 'block';
                document.getElementById('finalMessage').textContent = hadithText + '\\n\\n' + virtuesText;
                document.getElementById('shareButton').style.display = 'inline-block';
                document.getElementById('resetButton').style.display = 'inline-block';
            }
        }
        
        function resetCounter() {
            currentCount = 0;
            document.getElementById('counter').textContent = '0 / ' + totalCount;
            document.getElementById('countButton').style.display = 'inline-block';
            document.getElementById('dhikr').style.display = 'block';
            document.getElementById('finalMessage').style.display = 'none';
            document.getElementById('shareButton').style.display = 'none';
            document.getElementById('resetButton').style.display = 'none';
        }
        
        function shareDhikr() {
            let shareText = 'الأذكار اليومية:\\n';
            shareText += dhikrText + '\\n';
            shareText += 'عدد مرات التكرار: ' + totalCount + '\\n\\n';
            if (hadithText) shareText += '' + hadithText + '\\n\\n';
            if (virtuesText) shareText += '' + virtuesText + '\\n\\n';
            if (linkUrl) shareText += linkUrl;
            
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

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

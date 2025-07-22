// js/game.js

let currentLevel = 0;
let db;
let currentLang = 'en';
let score = 0;

async function initDB(schema) {
  const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.8.0/${file}` });
  db = new SQL.Database();
  db.run(schema);
}

function renderTable(rows) {
  if (!rows || !rows.length) return `<em>No rows returned</em>`;
  const headers = Object.keys(rows[0]);
  let html = '<table><thead><tr>' + headers.map(h => `<th>${h}</th>`).join('') + '</tr></thead><tbody>';
  rows.forEach(r => {
    html += '<tr>' + headers.map(h => `<td>${r[h]}</td>`).join('') + '</tr>';
  });
  html += '</tbody></table>';
  return html;
}

function translateUI(lang) {
  currentLang = lang;
  const t = langPack[lang];
  document.getElementById('title').innerText = t.title;
  document.getElementById('queryLabel').innerText = t.enterQuery;
  document.getElementById('checkBtn').innerText = t.check;
  document.getElementById('nextLevel').innerText = t.next;
  document.getElementById('levelTitle').innerText = `${t.level} ${currentLevel + 1}`;
  document.getElementById('taskDescription').innerText = levels[currentLevel].description[lang];
  document.getElementById('queryOptions').innerHTML = `<strong>${t.queryOptions}</strong><ul>` +
    levels[currentLevel].options.map(opt => `<li><code>${opt}</code></li>`).join('') + '</ul>';
  document.getElementById('schema').innerHTML = `<strong>${t.schemaTitle}</strong><pre>${levels[currentLevel].schema}</pre>`;
  document.getElementById('expectedResult').innerHTML = `<strong>${t.expectedTitle}</strong>` + renderTable(levels[currentLevel].expected);
  document.getElementById('feedback').innerText = '';
  document.getElementById('query').value = '';
  document.getElementById('nextLevel').style.display = 'none';
  updateScoreboard();
}

function updateScoreboard() {
  const t = langPack[currentLang];
  document.getElementById('scoreboard').innerText = `${t.scoreText}: ${score} | ${t.level} ${currentLevel + 1}`;
}

document.getElementById('lang').addEventListener('change', (e) => {
  translateUI(e.target.value);
});

document.getElementById('checkBtn').addEventListener('click', async (e) => {
  e.preventDefault();
  const query = document.getElementById('query').value.trim();
  if (!query) return;
  try {
    const res = db.exec(query);
    if (!res.length) throw new Error('No result');
    const rows = res[0].values.map(row =>
      Object.fromEntries(row.map((val, idx) => [res[0].columns[idx], val]))
    );
    const expected = JSON.stringify(levels[currentLevel].expected);
    const actual = JSON.stringify(rows);
    const feedback = document.getElementById('feedback');
    if (expected === actual) {
      feedback.innerText = langPack[currentLang].correct;
      feedback.className = 'feedback correct';
      score += 10;
      updateScoreboard();
      document.getElementById('nextLevel').style.display = 'block';
    } else {
      feedback.innerText = langPack[currentLang].incorrect;
      feedback.className = 'feedback incorrect';
    }
  } catch {
    const feedback = document.getElementById('feedback');
    feedback.innerText = langPack[currentLang].incorrect;
    feedback.className = 'feedback incorrect';
  }
});

document.getElementById('nextLevel').addEventListener('click', async () => {
  currentLevel++;
  if (currentLevel >= levels.length) {
    alert(currentLang === 'uk' ? `🎉 Гра завершена! Ваш результат: ${score} очок.` : `🎉 Game complete! Your score: ${score} points.`);
    currentLevel = 0;
    score = 0;
  }
  await startLevel();
});

async function startLevel() {
  await initDB(levels[currentLevel].schema);
  translateUI(currentLang);
}

startLevel();

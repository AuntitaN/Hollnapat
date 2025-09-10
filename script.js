// ====== CONFIG ======
const YOUTUBE_ID = 'PmbLSP5mKW0'; // วิดีโอ YouTube ของคุณ

// ====== ฝัง YouTube ======
const playerWrap = document.getElementById('playerWrap');
playerWrap.innerHTML = `<iframe src="https://www.youtube.com/embed/${YOUTUBE_ID}?rel=0&modestbranding=1&playsinline=1" allowfullscreen></iframe>`;

// ====== หัวใจลอย ======
const card = document.querySelector('.card');
const hearts = ['💗','💖','💞','💘'];
for (let i = 0; i < 18; i++) {
  const s = document.createElement('div');
  s.className = 'bg-heart';
  s.textContent = hearts[Math.floor(Math.random() * hearts.length)];
  s.style.left = Math.random() * 100 + '%';
  s.style.bottom = (-20 - Math.random() * 120) + 'px';
  s.style.animationDuration = (10 + Math.random() * 14) + 's';
  s.style.fontSize = (18 + Math.random() * 22) + 'px';
  card.appendChild(s);
}

// ====== Toast helper (มุมล่าง) ======
const toast = document.getElementById('toast');
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}

// ====== Confetti ======
const fx = document.getElementById('fx');
const ctx = fx.getContext('2d');
function resize(){ fx.width = innerWidth; fx.height = innerHeight }
addEventListener('resize', resize); resize();
let confetti = [];
function boom(){
  confetti = Array.from({ length: 180 }, () => ({
    x: fx.width/2 + (Math.random()-0.5)*120,
    y: fx.height/2,
    r: 2 + Math.random()*4,
    vx: (Math.random()-0.5)*6,
    vy: (-6 - Math.random()*6),
    a: 0.98 + Math.random()*0.02
  }));
}
function loop(){
  ctx.clearRect(0,0,fx.width,fx.height);
  confetti.forEach(p=>{
    p.vx *= 0.995;
    p.vy += 0.15;
    p.vy *= p.a;
    p.x += p.vx;
    p.y += p.vy;
    ctx.beginPath();
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle = `hsl(${Math.random()*360},100%,60%)`;
    ctx.fill();
  });
  requestAnimationFrame(loop);
}
loop();

// ====== ปุ่ม Yes / No ======
const yesBtn = document.getElementById('yesBtn');
const noBtn  = document.getElementById('noBtn');

yesBtn.addEventListener('click', () => {
  boom();
  showToast('เย้! ขอบคุณที่ตกลงนะ 💗');

  // Popup ใหญ่กลางจอ
  const msg = document.createElement('div');
  msg.style.position='fixed';
  msg.style.inset='0';
  msg.style.display='grid';
  msg.style.placeItems='center';
  msg.style.background='rgba(255,255,255,.85)';
  msg.style.backdropFilter='blur(4px)';
  msg.innerHTML = `
    <div style="background:white;padding:24px 28px;border-radius:16px;
                box-shadow:0 10px 25px rgba(0,0,0,.1);max-width:540px;text-align:center;">
      <div style="font-size:42px;">🎉</div>
      <h2 style="margin:10px 0 6px;">เป็นแฟนกันแล้วนะ!</h2>
      <p style="color:#374151; line-height:1.7;">
      ขอบคุณนะคะ เค้าจะตั้งใจถนอมเธอให้ดีที่สุดเลย คนเก่ง :) รักเธอนะ
      </p>
      <button id="closeOk" style="margin-top:10px;background:#111827;color:#fff;
                  padding:10px 16px;border-radius:12px;border:0;cursor:pointer;">
        ปิด
      </button>
    </div>`;
  document.body.appendChild(msg);
  msg.querySelector('#closeOk').addEventListener('click',()=> msg.remove());
});

noBtn.addEventListener('click', () => {
  showToast('โอเค เคารพการตัดสินใจของเธอเสมอ');

  // Popup ใหญ่กลางจอ
  const msg = document.createElement('div');
  msg.style.position='fixed';
  msg.style.inset='0';
  msg.style.display='grid';
  msg.style.placeItems='center';
  msg.style.background='rgba(17,24,39,.6)';
  msg.innerHTML = `
    <div style="background:white;padding:22px;border-radius:16px;
                box-shadow:0 10px 25px rgba(0,0,0,.1);max-width:520px;text-align:center;">
      <div style="font-size:36px">😢</div>
      <h3 style="margin:8px 0 6px">ขอบคุณที่ผ่านเข้ามา</h3>
      <p style="color:#374151;line-height:1.7">
        ไม่ว่าเธอจะตัดสินใจยังไง เค้าก็ยังเคารพและหวังดีเสมอ โชคดีงับ
      </p>
      <button id="closeNo" style="margin-top:10px;background:#111827;color:#fff;
                  padding:10px 16px;border-radius:12px;border:0;cursor:pointer;">
        ปิด
      </button>
    </div>`;
  document.body.appendChild(msg);
  msg.querySelector('#closeNo').addEventListener('click',()=> msg.remove());
});

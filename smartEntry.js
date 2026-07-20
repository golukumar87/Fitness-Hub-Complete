// Smart Entry (QR) + Frontdesk scan + history
// Uses BarcodeDetector if available; otherwise supports manual entry via prompt.

(function(){
  const STORAGE_KEYS = {
    qrMemberId: (email) => `rajGym_memberId_${email}`,
    checkins: (email) => `rajGym_checkins_${email || 'global'}`
  };

  const DEFAULT_HISTORY_LIMIT = 20;

  let scanInterval = null;
  let scanStream = null;
  let scanStartedAt = null;

  function safeJsonParse(x, fallback){
    try{ return JSON.parse(x); }catch{ return fallback; }
  }

  function getLoggedUserEmail(){
    try{
      const u = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
      return u?.email || null;
    }catch{ return null; }
  }

  function showMsg(elId, message, type){
    const el = document.getElementById(elId);
    if(!el) return;
    el.style.display = 'block';
    el.textContent = message;
    el.style.border = '1px solid rgba(255,255,255,0.12)';
    el.style.padding = '12px 14px';
    el.style.borderRadius = '12px';
    el.style.marginTop = '12px';
    el.style.background = 'rgba(255,255,255,0.04)';
    el.style.color = type === 'err' ? '#ff4444' : 'var(--primary)';
  }

  function hideMsg(elId){
    const el = document.getElementById(elId);
    if(!el) return;
    el.style.display = 'none';
    el.textContent = '';
  }

  function getPayloadForMember(memberId){
    return JSON.stringify({
      v: 1,
      memberId,
      type: 'rajgym_member_qr',
      issuedAt: Date.now()
    });
  }

  function setMemberMeta(memberId){
    const d = document.getElementById('memberIdDisplay');
    const s = document.getElementById('memberQrStatus');
    if(d) d.textContent = memberId;
    if(s) s.textContent = 'QR generated';
  }

  function getQRCodeLib(){
    // qrcodejs often sets global `QRCode`, but check a few variants too.
    return window.QRCode || window.qrcode || window.QRCodeJS || window.qrcodejs || null;
  }

  function sanitizeQrRenderEl(qrDiv){
    if(!qrDiv) return;
    qrDiv.innerHTML = '';

    // allow qrcodejs to inject DOM
    setTimeout(() => {
      const canvas = qrDiv.querySelector('canvas');
      const img = qrDiv.querySelector('img');
      const node = canvas || img;
      if(!node) return;

      node.style.width = '100%';
      node.style.height = '100%';
      node.style.display = 'block';
      node.style.margin = '0';
      node.style.padding = '0';
      node.style.objectFit = 'contain';

      if(canvas){
        try{
          const ctx = canvas.getContext('2d');
          if(ctx && canvas.width && canvas.height){
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            // Make any non-dark pixels pure white.
            for(let i=0;i<data.length;i+=4){
              if(data[i] > 30 || data[i+1] > 30 || data[i+2] > 30){
                data[i] = 255;
                data[i+1] = 255;
                data[i+2] = 255;
              }
            }
            ctx.putImageData(imageData, 0, 0);
          }
        }catch{}
      }
    }, 0);
  }

 // Generate QR Code
window.generateMyQr = function(){
    const email = getLoggedUserEmail();
    if(!email){
        showMsg('memberQrMsg','⚠️ Please login first to generate QR','err');
        return;
    }

    const memberId = email;
    const payload = getPayloadForMember(memberId);
    const qrDiv = document.getElementById('myQrDiv');
    const canvas = document.getElementById('myQrCanvas');

    if(!qrDiv){
        showMsg('memberQrMsg','⚠️ QR container not found','err');
        return;
    }

    sanitizeQrRenderEl(qrDiv);

    const QRCodeLib = getQRCodeLib();
    if (!QRCodeLib) {
        showMsg('memberQrMsg', '⚠️ QRCode library not loaded. Refresh page and check console/network.', 'err');
        return;
    }

    // Set fixed render size to match CSS box (prevents “QR not visible”)
    const QR_W = 260;
    const QR_H = 260;

    try {
        new QRCodeLib(qrDiv, {
            text: payload,
            width: QR_W,
            height: QR_H,
            colorDark: '#000000',
            colorLight: '#ffffff',
            correctLevel: QRCodeLib.CorrectLevel ? QRCodeLib.CorrectLevel.H : undefined
        });

        // Ensure browser paints QR after DOM/CSS sizing
        requestAnimationFrame(() => {
          sanitizeQrRenderEl(qrDiv);
        });


        setMemberMeta(memberId);
        hideMsg('memberQrMsg');
        showMsg('memberQrMsg','✅ QR Code generated successfully! Scan karo!','ok');

        if (canvas) canvas.style.display = 'none';
    } catch(e) {

        console.error('QR generation error:', e);
        showMsg('memberQrMsg', '⚠️ QR generation failed: ' + String(e?.message || e), 'err');
    }
};

  window.downloadMyQr = function(){
    const qrDiv = document.getElementById('myQrDiv');
    if(!qrDiv) return;

    // If qrcodejs created an <img> inside, download that.
    const img = qrDiv.querySelector('img');
    if (img && img.src) {
      const link = document.createElement('a');
      link.download = 'rajgym-my-qr.png';
      link.href = img.src;
      link.click();
      return;
    }

    // Fallback: try find canvas created inside DIV
    const c = qrDiv.querySelector('canvas');
    if(c && c.toDataURL) {
      const link = document.createElement('a');
      link.download = 'rajgym-my-qr.png';
      link.href = c.toDataURL('image/png');
      link.click();
    }
  };

  function getCheckinsStore(){
    const key = 'rajGym_checkins_global';
    const raw = localStorage.getItem(key);
    const arr = safeJsonParse(raw,'[]');
    return Array.isArray(arr) ? arr : [];
  }

  function setCheckinsStore(arr){
    localStorage.setItem('rajGym_checkins_global', JSON.stringify(arr));
  }

  function renderHistory(){
    const listEl = document.getElementById('checkinHistoryList');
    const emptyEl = document.getElementById('checkinHistoryEmpty');
    if(!listEl || !emptyEl) return;

    const arr = getCheckinsStore().slice(0, DEFAULT_HISTORY_LIMIT);
    listEl.innerHTML = '';

    if(arr.length === 0){
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';

    arr.forEach(item => {
      const el = document.createElement('div');
      el.className = 'history-item';
      el.style.padding = '10px 12px';
      el.style.border = '1px solid rgba(255,255,255,0.08)';
      el.style.borderRadius = '12px';
      el.style.background = 'rgba(255,255,255,0.02)';
      el.style.marginBottom = '10px';
      const t = item.timestamp ? new Date(item.timestamp).toLocaleString() : '';
      el.innerHTML = `
        <div style="font-weight:900;color:var(--primary);">${escapeHtml(item.memberId)}</div>
        <div style="color:var(--gray);font-weight:800;font-size:0.85rem;">${t}</div>
        <div style="color:var(--light-gray);font-weight:700;font-size:0.85rem;">${escapeHtml(item.result || '')}</div>
      `;
      listEl.appendChild(el);
    });
  }

  function escapeHtml(str){
    return String(str||'')
      .replaceAll('&','&amp;')
      .replaceAll('<','<')
      .replaceAll('>','>')
      .replaceAll('"','"')
      .replaceAll("'",'&#039;');
  }

  function validateQrPayload(payload){
    try{
      const obj = JSON.parse(payload);
      if(obj && obj.type === 'rajgym_member_qr' && obj.memberId){
        return { ok:true, memberId: obj.memberId };
      }
      return { ok:false, error:'Invalid QR payload' };
    }catch{
      return { ok:false, error:'QR not valid JSON' };
    }
  }

  async function decodeWithBarcodeDetector(videoEl){
    if(!('BarcodeDetector' in window)) throw new Error('BarcodeDetector not supported');

    const detector = new BarcodeDetector({
      formats: ['qr_code', 'qr']
    });

    const barcodes = await detector.detect(videoEl);
    if(barcodes && barcodes.length){
      return barcodes[0].rawValue || null;
    }
    return null;
  }

  window.startFrontdeskScan = async function(){
    const video = document.getElementById('scanVideo');
    const msgEl = document.getElementById('frontdeskScanMsg');

    if(!video){
      showMsg('frontdeskScanMsg','⚠️ scanVideo not found','err');
      return;
    }

    hideMsg('frontdeskScanMsg');

    if(scanInterval) return;

    try{
      scanStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      video.srcObject = scanStream;
      await video.play();
      scanStartedAt = Date.now();

      scanInterval = setInterval(async ()=>{
        if(!video.videoWidth) return;
        try{
          const raw = await decodeWithBarcodeDetector(video);
          if(raw){
            stopFrontdeskScan();
            handleCheckinRaw(raw);
          }
        }catch(e){
          stopFrontdeskScan();

          const manualText = (e && String(e.message || e).toLowerCase().includes('barcodedetector'))
            ? '⚠️ BarcodeDetector not supported on this browser. Use fallback prompt.'
            : '⚠️ Could not decode QR automatically. Use fallback prompt.';

          showMsg('frontdeskScanMsg', manualText,'err');

          setTimeout(()=>{
            const manual = prompt('Paste QR payload / scan result text:');
            if(manual) handleCheckinRaw(manual);
          }, 300);
        }

      }, 700);

      showMsg('frontdeskScanMsg','🎯 Scan started. Point QR to camera...','ok');
    }catch(e){
      showMsg('frontdeskScanMsg','⚠️ Camera permission denied or unavailable.','err');
    }
  };

  window.stopFrontdeskScan = function(){
    if(scanInterval){
      clearInterval(scanInterval);
      scanInterval = null;
    }
    const video = document.getElementById('scanVideo');
    if(scanStream){
      try{ scanStream.getTracks().forEach(t=>t.stop()); }catch{}
      scanStream = null;
    }
    if(video){
      try{ video.pause(); video.srcObject = null; }catch{}
    }
  };

  function handleCheckinRaw(raw){
    const res = validateQrPayload(raw);
    if(!res.ok){
      const arr = getCheckinsStore();
      arr.unshift({
        id: Date.now(),
        memberId: 'unknown',
        timestamp: new Date().toISOString(),
        result: '❌ Invalid QR'
      });
      setCheckinsStore(arr.slice(0, DEFAULT_HISTORY_LIMIT));
      renderHistory();
      showMsg('frontdeskScanMsg','❌ Invalid QR.','err');
      return;
    }

    const arr = getCheckinsStore();
    arr.unshift({
      id: Date.now(),
      memberId: res.memberId,
      timestamp: new Date().toISOString(),
      result: '✅ Check-in successful'
    });
    setCheckinsStore(arr.slice(0, DEFAULT_HISTORY_LIMIT));
    renderHistory();
    showMsg('frontdeskScanMsg','✅ Check-in successful for '+res.memberId,'ok');
  }

  document.addEventListener('DOMContentLoaded', ()=>{
    renderHistory();

    const c = document.getElementById('myQrCanvas');
    if(c){
      c.width = 260;
      c.height = 260;
      c.style.display = 'none';
    }

    // QR sizing/boxing CSS ke control me rahe (inline styles avoid)
    // const qrDiv = document.getElementById('myQrDiv');
    // if(qrDiv){ /* CSS handle karega */ }
    
  });
})();
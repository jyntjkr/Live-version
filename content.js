document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'Y') {
      e.preventDefault();
      chrome.runtime.sendMessage({message: 'saveUrl', url: window.location.href});
    } else if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
      e.preventDefault();
      chrome.runtime.sendMessage({message: 'removeUrl', url: window.location.href});
    } else if (e.key === 'F12') {
      e.preventDefault();
      chrome.runtime.sendMessage({message: 'toggleFullscreen'});
    }
  });
export class CustomInnerHeader {
    init(params) {
      this.eGui = document.createElement('div');
      this.eGui.classList.add('custom-inner-header');
  
      const icon = document.createElement('i');
      icon.classList.add('fas', params.icon || 'fa-user'); // 아이콘 클래스 추가
      icon.style.marginRight = '6px';
  
      const text = document.createElement('span');
      text.textContent = params.displayName;
  
      this.eGui.appendChild(icon);
      this.eGui.appendChild(text);
    }
  
    getGui() {
      return this.eGui;
    }
  
    refresh(params) {
      this.eGui.querySelector('span').textContent = params.displayName;
      return true;
    }
  }
  
import type { ElementInfo, ViewportInfo, BoundingRect, ElementStyles } from './types';

/**
 * DOM 工具函數集
 */
export const DOMUtils = {
  /**
   * 生成元素的唯一選擇器路徑
   * @param element - 目標 HTML 元素
   * @returns CSS 選擇器字串
   */
  getElementSelector(element: HTMLElement): string {
    if (element.id) {
      return `#${element.id}`;
    }
    
    const path: string[] = [];
    let current: HTMLElement | null = element;
    
    while (current && current !== document.body) {
      let selector = current.tagName.toLowerCase();
      
      if (current.className) {
        const classes = current.className.split(' ').filter(cls => cls).join('.');
        selector += `.${classes}`;
      }
      
      // 如果有兄弟節點，添加 nth-child
      const parent = current.parentElement;
      if (parent) {
        const siblings = Array.from(parent.children);
        const sameTagSiblings = siblings.filter(sibling => sibling.tagName === current!.tagName);
        if (sameTagSiblings.length > 1) {
          const index = sameTagSiblings.indexOf(current) + 1;
          selector += `:nth-child(${index})`;
        }
      }
      
      path.unshift(selector);
      current = current.parentElement;
    }
    
    return path.join(' > ');
  },

  /**
   * 獲取元素的詳細資訊
   * @param element - 目標 HTML 元素
   * @returns 元素詳細資訊
   */
  getElementInfo(element: HTMLElement): ElementInfo {
    const rect = element.getBoundingClientRect();
    const computedStyle = window.getComputedStyle(element);
    
    return {
      tagName: element.tagName.toLowerCase(),
      id: element.id || null,
      className: element.className || null,
      textContent: element.textContent?.trim().substring(0, 100) || null,
      innerHTML: element.innerHTML?.substring(0, 200) || null,
      attributes: this.getElementAttributes(element),
      selector: this.getElementSelector(element),
      boundingRect: this.getBoundingRectInfo(rect),
      styles: this.getElementStyles(computedStyle)
    };
  },

  /**
   * 獲取元素的所有屬性
   * @param element - 目標 HTML 元素
   * @returns 屬性物件
   */
  getElementAttributes(element: HTMLElement): Record<string, string> {
    const attributes: Record<string, string> = {};
    for (let i = 0; i < element.attributes.length; i++) {
      const attr = element.attributes[i];
      if (attr) {
        attributes[attr.name] = attr.value;
      }
    }
    return attributes;
  },

  /**
   * 獲取邊界框資訊
   * @param rect - DOMRect 物件
   * @returns 格式化的邊界框資訊
   */
  getBoundingRectInfo(rect: DOMRect): BoundingRect {
    return {
      x: Math.round(rect.x),
      y: Math.round(rect.y),
      width: Math.round(rect.width),
      height: Math.round(rect.height),
      top: Math.round(rect.top),
      right: Math.round(rect.right),
      bottom: Math.round(rect.bottom),
      left: Math.round(rect.left)
    };
  },

  /**
   * 獲取元素樣式資訊
   * @param computedStyle - 計算後的樣式
   * @returns 樣式資訊物件
   */
  getElementStyles(computedStyle: CSSStyleDeclaration): ElementStyles {
    return {
      position: computedStyle.position,
      display: computedStyle.display,
      visibility: computedStyle.visibility,
      zIndex: computedStyle.zIndex
    };
  },

  /**
   * 獲取視窗資訊
   * @returns 視窗尺寸和滾動位置
   */
  getViewportInfo(): ViewportInfo {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
      scrollX: window.pageXOffset || document.documentElement.scrollLeft,
      scrollY: window.pageYOffset || document.documentElement.scrollTop,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    };
  },

  /**
   * 計算相對於元素的座標
   * @param pageX - 頁面 X 座標
   * @param pageY - 頁面 Y 座標
   * @param element - 目標元素
   * @returns 相對座標
   */
  getRelativeCoordinates(pageX: number, pageY: number, element: HTMLElement): { x: number; y: number } {
    const rect = element.getBoundingClientRect();
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    
    return {
      x: Math.round(pageX - rect.left - scrollX),
      y: Math.round(pageY - rect.top - scrollY)
    };
  }
};
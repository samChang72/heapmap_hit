import type { ElementInfo, ViewportInfo, BoundingRect, ElementStyles } from './types';
/**
 * DOM 工具函數集
 */
export declare const DOMUtils: {
    /**
     * 生成元素的唯一選擇器路徑
     * @param element - 目標 HTML 元素
     * @returns CSS 選擇器字串
     */
    getElementSelector(element: HTMLElement): string;
    /**
     * 獲取元素的詳細資訊
     * @param element - 目標 HTML 元素
     * @returns 元素詳細資訊
     */
    getElementInfo(element: HTMLElement): ElementInfo;
    /**
     * 獲取元素的所有屬性
     * @param element - 目標 HTML 元素
     * @returns 屬性物件
     */
    getElementAttributes(element: HTMLElement): Record<string, string>;
    /**
     * 獲取邊界框資訊
     * @param rect - DOMRect 物件
     * @returns 格式化的邊界框資訊
     */
    getBoundingRectInfo(rect: DOMRect): BoundingRect;
    /**
     * 獲取元素樣式資訊
     * @param computedStyle - 計算後的樣式
     * @returns 樣式資訊物件
     */
    getElementStyles(computedStyle: CSSStyleDeclaration): ElementStyles;
    /**
     * 獲取視窗資訊
     * @returns 視窗尺寸和滾動位置
     */
    getViewportInfo(): ViewportInfo;
    /**
     * 計算相對於元素的座標
     * @param pageX - 頁面 X 座標
     * @param pageY - 頁面 Y 座標
     * @param element - 目標元素
     * @returns 相對座標
     */
    getRelativeCoordinates(pageX: number, pageY: number, element: HTMLElement): {
        x: number;
        y: number;
    };
};
//# sourceMappingURL=domUtils.d.ts.map
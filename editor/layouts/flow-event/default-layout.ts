/* eslint-disable @typescript-eslint/no-explicit-any */
const defaultLayout = {
  /**
   * 布局类型
   */
  type: "compactBox",
  /**
   * 布局方向
   */
  direction: "TB",
  /**
   * 获取节点id
   */
  getId: function getId(d: any) {
    return d.id;
  },
  /**
   * 获取节点高度
   */
  getLineHeight: function getHeight() {
    return 16;
  },
  /**
   * 获取节点宽度
   */
  getWidth: function getWidth() {
    return 16;
  },
  /**
   * 获取垂直间距
   */
  getVGap: function getVGap() {
    return 40;
  },
  /**
   * 获取水平间距
   */
  getHGap: function getHGap() {
    return 70;
  },
};
export default defaultLayout;

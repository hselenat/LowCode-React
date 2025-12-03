import {createPortal} from "react-dom";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
} from "react";
import {Dropdown, Popconfirm, Space} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import {useComponentsStore} from "../store/components";
import {getComponentById} from "../utils";
import {useComponentConfigStore} from "../store/component-config";
interface Props {
  /** 选中的组件id */
  componentId: number;
  /** 容器类名 */
  containerClassName: string;
  /** 相对容器类名 */
  offsetContainerClassName: string;
}

function SelectedMask(props: Props, ref: any) {
  const {componentId, containerClassName, offsetContainerClassName} = props;
  const {
    curComponent,
    curComponentId,
    components,
    setCurComponentId,
    deleteComponent,
  } = useComponentsStore();
  const {componentConfig} = useComponentConfigStore();
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
    toolsTop: 0,
    toolsLeft: 0,
  });

  // 对外暴露更新位置的方法
  useImperativeHandle(ref, () => ({
    updatePosition,
  }));

  useEffect(() => {
    updatePosition();
  }, [componentId]);

  const parentComponents = useMemo(() => {
    const parentComponents = [];
    let component = curComponent;
    while (component?.parentId) {
      component = getComponentById(component.parentId, components);
      parentComponents.push(component);
    }
    return parentComponents;
  }, [curComponent]);

  function updatePosition() {
    if (!componentId) return;
    const container = document.querySelector(`.${offsetContainerClassName}`);
    if (!container) return;
    const node = document.querySelector(`[data-component-id="${componentId}"]`);
    if (!node) return;
    // 获取节点位置
    const {top, left, width, height} = node.getBoundingClientRect();
    // 获取容器的位置
    const {top: containerTop, left: containerLeft} =
      container.getBoundingClientRect();
    // 动态计算工具栏的位置
    let toolsTop = top - containerTop + container.scrollTop;
    let toolsLeft = left - containerLeft + width;
    // 防止超出容器边界
    if (toolsTop <= 0) {
      toolsTop -= -30;
      toolsLeft -= 10;
    }

    setPosition({
      top: top - containerTop + container.scrollTop,
      left: left - containerLeft + container.scrollTop,
      width,
      height,
      toolsTop,
      toolsLeft,
    });
  }

  function deleteHandle() {
    console.log("删除组件");
    setCurComponentId(null);
    deleteComponent(curComponentId);
  }

  return createPortal(
    <>
      <div
        // className={`${containerClassName} ${offsetContainerClassName}`}
        style={{
          position: "absolute",
          top: position.top,
          left: position.left,
          width: position.width,
          height: position.height,
          border: "1px solid rgba(66, 133, 244)",
          backgroundColor: "rgba(66, 133, 244, 0.2)",
          pointerEvents: "none",
          zIndex: 13,
          borderRadius: 4,
          boxSizing: "border-box",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: position.toolsTop,
          left: position.toolsLeft,
          display: !position.width || position.width < 10 ? "none" : "inline",
          transform: "translate(-100%, -100%)",
          color: "#ff4d4f",
          fontSize: 14,
          zIndex: 14,
        }}
      >
        <Space>
          <Dropdown
            menu={{
              items: parentComponents.map((item) => ({
                key: item?.id + "",
                label: item?.name,
              })),
              onClick: ({key}: {key: string}) => {
                setCurComponentId(+key);
              },
            }}
            placement="bottomLeft"
            disabled={parentComponents.length === 0}
            getPopupContainer={(node) => node.parentElement!}
          >
            <div
              style={{
                padding: "0 8px",
                backgroundColor: "#1890ff",
                color: "#fff",
                borderRadius: 4,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {componentConfig[curComponent?.name || ""]?.desc}
            </div>
          </Dropdown>
          <div
            style={{
              padding: "0 8px",
              backgroundColor: "#1890ff",
              color: "#fff",
              borderRadius: 4,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            <Popconfirm
              className="min-w-103px cursor-pointer"
              title="是否删除该组件？"
              okText={
                <div className="delete-confirm-btn" style={{padding: "0 7px"}}>
                  确定
                </div>
              }
              cancelText={
                <div className="delete-confirm-btn" style={{padding: "0 7px"}}>
                  取消
                </div>
              }
              onConfirm={deleteHandle}
              okButtonProps={{
                style: {
                  padding: 0,
                },
              }}
              cancelButtonProps={{
                style: {
                  padding: 0,
                },
              }}
            >
              <DeleteOutlined style={{color: "#fff", fontSize: 16}} />
            </Popconfirm>
          </div>
        </Space>
      </div>
    </>,
    document.querySelector(`.${containerClassName}`)!
  );
}

export default forwardRef(SelectedMask);

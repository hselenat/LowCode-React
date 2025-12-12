import ComponentItem from "../../common/component-item";
// import {ItemType} from "../../item-type";
import {useComponentsStore} from "../../store/components";
import {useComponentConfigStore} from "../../store/component-config";
import {useMemo} from "react";
import type {ComponentConfig} from "../../interface";

interface Props {
  onDragging: () => void;
}
const Material: React.FC<Props> = (props: Props) => {
  const {onDragging} = props;
  const {addComponent} = useComponentsStore();
  const {componentConfig} = useComponentConfigStore();
  /**
   * 拖拽结束时，添加组件到画布
   * @param dropResult 拖拽结果
   */
  const onDragEnd = (dropResult: {
    name: string;
    props: any;
    id?: number;
    desc: string;
  }) => {
    console.log("onDragEnd", dropResult);
    addComponent(
      {
        id: new Date().getTime(),
        name: dropResult.name,
        desc: dropResult.desc,
        props: {
          ...dropResult.props,
        },
      },
      dropResult.id
    );
  };

  const components = useMemo(() => {
    // 加载所有组件
    const componentsNew = Object.values(componentConfig)
      .filter((o) => !o.hiddenInMaterial)
      .map((config: ComponentConfig) => {
        return {
          name: config.name,
          description: config.desc,
          order: config.order,
        };
      });
    componentsNew.sort((a, b) => a.order - b.order);
    return componentsNew;
  }, [componentConfig]);
  console.log("components===>", components);
  return (
    <div className="w-[200px] flex p-[10px] gap-4 flex-wrap">
      {/* <ComponentItem
        name={ItemType.Button}
        description="按钮"
        onDragEnd={onDragEnd}
      />
      <ComponentItem
        name={ItemType.Space}
        description="间距"
        onDragEnd={onDragEnd}
      />
      <ComponentItem
        name={ItemType.RemoteComponent}
        description="远程组件"
        onDragEnd={onDragEnd}
      /> */}
      {components.map((item: any) => (
        <ComponentItem
          key={item.name}
          onDragging={onDragging}
          onDragEnd={onDragEnd}
          {...item}
        />
      ))}
    </div>
  );
};

export default Material;

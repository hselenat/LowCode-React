import ComponentItem from "../../common/component-item";
// import {ItemType} from "../../item-type";
import {useComponents} from "../../store/components";
import {useComponentConfigStore} from "../../store/component-config";
import {useMemo} from "react";
import type {ComponentConfig} from "../../interface";

const Material: React.FC = () => {
  const {addComponent} = useComponents();
  const {componentConfig} = useComponentConfigStore();
  const onDragEnd = (dropResult: any) => {
    console.log("onDragEnd", dropResult);
    addComponent(
      {
        id: new Date().getTime(),
        name: dropResult.name,
        props: {
          ...dropResult.props,
        },
      },
      dropResult.id
    );
  };

  const components = useMemo(() => {
    // 加载所有组件
    const componentsNew = Object.values(componentConfig).map(
      (config: ComponentConfig) => {
        return {
          name: config.name,
          description: config.desc,
          order: config.order,
        };
      }
    );
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
      {components.map((item) => (
        <ComponentItem
          key={item.name}
          name={item.name}
          description={item.description}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
};

export default Material;

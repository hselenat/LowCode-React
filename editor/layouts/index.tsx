import React from "react";
import {Allotment} from "allotment";
import "allotment/dist/style.css";
import Header from "./header";
import Material from "./material";
import EditStage from "./stage/edit";
import ProdStage from "./stage/prod";
import Setting from "./setting";
import {useComponents} from "../store/components";

const Layout: React.FC = () => {
  const {mode} = useComponents();
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col">
      <div className="h-[50px] flex items-center border-b-[1px] border-b-[#e5e5e5]">
        <Header />
      </div>
      {/* <div className="flex-1 flex">
        <div className="w-[200px] bg-green-300">Material</div>
        <div className="flex-1 bg-blue-300">Stage</div>
        <div className="w-[200px] bg-orange-300">Setting</div>
      </div> */}
      {mode === "edit" ? (
        <Allotment>
          <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
            <Material />
          </Allotment.Pane>
          <Allotment.Pane>
            <EditStage />
          </Allotment.Pane>
          <Allotment.Pane preferredSize={200} maxSize={400} minSize={200}>
            <Setting />
          </Allotment.Pane>
        </Allotment>
      ) : (
        <ProdStage />
      )}
    </div>
  );
};

export default Layout;

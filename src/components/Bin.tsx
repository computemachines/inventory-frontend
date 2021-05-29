import * as React from "react";
import { useFrontload } from "react-frontload";
import { useParams } from "react-router-dom";
import { FrontloadContext } from "../api-client/inventory-api";

import "../styles/infoPanel.css";
import DataTable from "./DataTable";
import FilterWidget from "./FilterWidget";
import { FourOhFour } from "./FourOhFour";

import ItemLabel from "./ItemLabel";
import PrintButton from "./PrintButton";

function BinContentsTable({
  key = "",
  contents,
}: {
  key?: string;
  contents: Record<string, number>;
}) {
  const { data, frontloadMeta } = useFrontload(
    `bin-contents-table-${key}-component`,
    async ({ api }: FrontloadContext) => ({
      api: api,
      detailedContents: await Promise.all(
        Object.entries(contents).map(async function ([id, quantity]) {
          const sku = await api.getSku(id);
          if (sku.kind == "problem")
            return { id, quantity, kind: "problem", problem: sku };
          else return { id, quantity, kind: "sku", item: sku };
        })
      ),
    })
  );
  if (frontloadMeta.error) return <span>"Connection Error"</span>;

  let tabularData: {
    Identifier: string;
    Name: string;
    Quantity: number;
    Type: string;
  }[];

  if (frontloadMeta.done) {
    tabularData = data.detailedContents.map((row) => ({
      Identifier: row.id,
      Quantity: row.quantity,
      Type: row.kind,
      Name: row.kind != "problem" ? row.item.state.name : null,
    }));
  } else {
    tabularData = Object.entries(contents).map(([Identifier, Quantity]) => ({
      Identifier,
      Quantity,
      Type: "Loading",
      Name: "Loading",
    }));
  }

  return (
    <DataTable
      headers={["Identifier", "Name", "Quantity", "Type"]}
      data={tabularData}
      types={{
        Identifier: "ItemLabel",
      }}
    />
  );
}
function Bin() {
  const { id } = useParams();
  const { data, frontloadMeta } = useFrontload(
    "bin-component",
    async ({ api }: FrontloadContext) => ({
      api: api,
      bin: await api.getBin(id),
    })
  );
  if (frontloadMeta.done && data.bin.kind == "problem") {
    if (data.bin.type == "missing-resource") return <FourOhFour />;
    else return <h2>{data.bin.title}</h2>;
  }

  if (frontloadMeta.error) {
    return "Connection Error";
  }

  return (
    <div className="info-panel">
      <div className="info-item">
        <div className="info-item-title">Bin Label</div>
        <div className="info-item-description">
          <ItemLabel link={false} label={id} />
          <PrintButton />
        </div>
      </div>
      <div className="info-item">
        <div className="info-item-title">
          Contents
          <FilterWidget />
        </div>
        <div className="info-item-description">
          {frontloadMeta.done && data.bin.kind != "problem" ? (
            <BinContentsTable contents={data.bin.state.contents} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Bin;

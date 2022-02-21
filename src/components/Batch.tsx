import * as React from "react";
import { useContext, useEffect, useState } from "react";
import { useFrontload } from "react-frontload";
import * as Sentry from "@sentry/react";
import {
  generatePath,
  Link,
  Prompt,
  useHistory,
  useParams,
} from "react-router-dom";
import { ApiContext, FrontloadContext } from "../api-client/api-client";
// import { Problem, Sku as ApiSku } from "../api-client/data-models";
import ReactModal from "react-modal";

import "../styles/infoPanel.css";
import "../styles/warnModal.css";
import { AlertContext } from "./Alert";
import CodesInput, { Code } from "./CodesInput";
import { FourOhFour } from "./FourOhFour";
import ItemLabel from "./ItemLabel";
import PrintButton from "./PrintButton";
import ItemLocations from "./ItemLocations";
import { stringifyUrl } from "query-string";

function Batch({ editable = false }: { editable?: boolean }) {
  const { id } = useParams<{ id: string }>();
  const { data, frontloadMeta, setData } = useFrontload(
    "batch-component",
    async ({ api }: FrontloadContext) => {
      const batch = await api.getBatch(id);
      const parentSku =
        batch.kind == "batch" && batch.state.sku_id
          ? await api.getSku(batch.state.sku_id)
          : null;
      const batchBins = batch.kind == "batch" ? await batch.bins() : null;
      return { batch, parentSku, batchBins };
    }
  );
  const { setAlertContent } = useContext(AlertContext);
  const [showModal, setShowModal] = useState(false);
  const [saveState, setSaveState] = useState<"live" | "unsaved" | "saving">(
    "live"
  );
  const history = useHistory();
  const [unsavedParentSkuId, setUnsavedParentSkuId] = useState("");
  const [unsavedName, setUnsavedName] = useState("");
  const [unsavedCodes, setUnsavedCodes] = useState<Code[]>([]);
  const api = useContext(ApiContext);

  useEffect(() => {
    if (!editable) setSaveState("live");
  }, [editable]);

  useEffect(() => {
    if (
      frontloadMeta.done &&
      data.batch.kind != "problem" &&
      saveState == "live"
    ) {
      setUnsavedName(data.batch.state.name);
      setUnsavedCodes([
        ...data.batch.state.owned_codes.map((value) => ({
          value,
          kind: "owned" as const,
        })),
        ...data.batch.state.associated_codes.map((value) => ({
          value,
          kind: "associated" as const,
        })),
      ]);
    }
  }, [frontloadMeta, data, saveState]);

  // useEffect(() => {});

  if (frontloadMeta.pending) return <div>Loading...</div>;
  if (frontloadMeta.error) return <div>Connection Error</div>;
  if (data.batch.kind == "problem") {
    if (data.batch.type == "missing-resource") return <FourOhFour />;
    else return <div>{data.batch.title}</div>;
  }

  let parentSkuShowItemDesc = null;
  if (editable) {
    parentSkuShowItemDesc = (
      <input
        type="text"
        id="parent_sku_id"
        name="parent_sku_id"
        className="form-single-code-input"
        value={unsavedParentSkuId}
        onChange={(e) => setUnsavedParentSkuId(e.target.value)}
      />
    );
  } else if (!data.batch.state.sku_id) {
    parentSkuShowItemDesc = (
      <div style={{ fontStyle: "italic" }}>(Anonymous)</div>
    );
  } else if (!data.parentSku || data.parentSku.kind == "problem") {
    parentSkuShowItemDesc = <div>{data.batch.state.sku_id} not found</div>;
  } else if (data.parentSku.kind == "sku") {
    parentSkuShowItemDesc = (
      <ItemLabel link={true} label={data.parentSku.state.id} />
    );
  } else {
    throw Error("impossible fallthrough");
  }

  return (
    <div className="info-panel">
      <Prompt
        message="Leave without saving changes?"
        when={saveState != "live"}
      />
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="warn-modal"
      >
        <button className="modal-close" onClick={() => setShowModal(false)}>
          X
        </button>
        <h3>Are you sure?</h3>
        <button onClick={() => setShowModal(false)}>Cancel</button>
        <button
          onClick={async () => {
            if (data.batch.kind == "problem") throw "impossible";
            const resp = await api.hydrate(data.batch).delete();
            // setShowModal(false); // this doesn't seem to be necessary?
            if (resp.kind == "status") {
              setAlertContent({ content: <p>Deleted</p>, mode: "success" });
              const updatedBatch = await api.getBatch(id);
              const updatedParentSku =
                updatedBatch.kind == "batch"
                  ? await api.getSku(updatedBatch.state.sku_id)
                  : null;
              const updatedBatchBins =
                updatedBatch.kind == "batch" ? await updatedBatch.bins() : null;
              setData(() => ({
                batch: updatedBatch,
                parentSku: updatedParentSku,
                batchBins: updatedBatchBins,
              }));
            } else {
              setAlertContent({
                content: <p>{resp.title}</p>,
                mode: "failure",
              });
            }
          }}
          className="button-danger"
        >
          Delete
        </button>
      </ReactModal>
      <div className="info-item">
        <div className="info-item-title">Parent Sku</div>
        <div className="info-item-description">{parentSkuShowItemDesc}</div>
      </div>
      <div className="info-item">
        <div className="info-item-title">Batch Label</div>
        <div className="info-item-description">
          <ItemLabel link={false} label={id} />
          <PrintButton value={id} />
        </div>
      </div>
      <div className="info-item">
        <div className="info-item-title">Name</div>
        <div className="info-item-description">
          {/* <div className="item-description-oneline"> */}
          {editable ? (
            <input
              type="text"
              id="parent_sku_id"
              name="parent_sku_id"
              className="form-single-code-input"
              value={unsavedName}
              onChange={(e) => setUnsavedName(e.target.value)}
            />
          ) : (
            unsavedName || <div style={{ fontStyle: "italic" }}>(Empty)</div>
          )}
          {/* </div> */}
        </div>
      </div>
      <div className="info-item">
        <div className="info-item-title">Locations</div>
        <div className="info-item-description">
          {data.batchBins.kind == "batch-locations" ? (
            <ItemLocations itemLocations={data.batchBins} />
          ) : (
            "Problem loading locations."
          )}
        </div>
      </div>
      <div className="info-item">
        <div className="info-item-title">Codes</div>
        <div className="info-item-description">
          {unsavedCodes.length == 0 && !editable ? (
            "None"
          ) : (
            <CodesInput
              codes={unsavedCodes}
              setCodes={(codes) => {
                setSaveState("unsaved");
                setUnsavedCodes(codes);
              }}
              editable={editable}
            />
          )}
        </div>
      </div>
      <div className="info-item">
        <div className="info-item-title">Actions</div>
        <div className="info-item-description" style={{ display: "block" }}>
          {editable ? (
            <div className="edit-controls">
              <button
                className="edit-controls-cancel-button"
                onClick={(e) => {
                  history.push(generatePath("/batch/:id", { id }));
                }}
              >
                Cancel
              </button>
              <button
                className="edit-controls-save-button"
                onClick={async () => {
                  if (data.batch.kind == "problem") throw "impossible";
                  setSaveState("saving");
                  const resp = await api.hydrate(data.batch).update({
                    sku_id: unsavedParentSkuId,
                    name: unsavedName,
                    owned_codes: unsavedCodes
                      .filter(({ kind, value }) => kind == "owned" && value)
                      .map(({ value }) => value),
                    associated_codes: unsavedCodes
                      .filter(
                        ({ kind, value }) => kind == "associated" && value
                      )
                      .map(({ value }) => value),
                  });

                  if (resp.kind == "problem") {
                    setSaveState("unsaved");
                    setAlertContent({
                      content: <p>{resp.title}</p>,
                      mode: "failure",
                    });
                  } else {
                    setSaveState("live");
                    setAlertContent({
                      content: <div>Saved!</div>,
                      mode: "success",
                    });
                    const updatedBatch = await api.getBatch(id);
                    const updatedParentSku =
                      updatedBatch.kind == "batch" && updatedBatch.state.sku_id
                        ? await api.getSku(updatedBatch.state.sku_id)
                        : null;
                    const updatedBatchBins =
                      updatedBatch.kind == "batch"
                        ? await updatedBatch.bins()
                        : null;
                    setData((old) => ({
                      ...old,
                      batch: updatedBatch,
                      parentSku: updatedParentSku,
                      batchBins: updatedBatchBins,
                    }));
                    history.push(generatePath("/batch/:id", { id }));
                  }
                }}
              >
                {saveState == "saving" ? "Saving..." : "Save"}
              </button>
            </div>
          ) : (
            <>
              <Link
                to={generatePath("/batch/:id/edit", { id })}
                className="action-link"
              >
                Edit
              </Link>
              <Link
                to={stringifyUrl({ url: "/receive", query: { item: id } })}
                className="action-link"
              >
                Receive
              </Link>
              <Link
                to="#"
                className="action-link"
                onClick={() => setShowModal(true)}
              >
                Delete?
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Batch;

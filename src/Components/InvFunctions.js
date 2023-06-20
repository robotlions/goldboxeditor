import { useState, useEffect } from "react";


// props: setLoadedItem setUnsavedChanges loadedItem datalist dataArray setDataArray nameIndex typeIndex bonusIndex chargeIndex ammoIndex weightIndex
export function ItemEditModule(props) {
    let tempArray = props.dataArray;

    const [displayName1, setDisplayName1] = useState("");
    const [displayName2, setDisplayName2] = useState("");
    const [displayName3, setDisplayName3] = useState("");
    const [updated, setUpdated] = useState(true);

    useEffect(() => {
      if (props.loadedItem) {
        setDisplayName1(
          props.dataList[tempArray[parseInt(Object.keys(props.loadedItem)) + (props.nameIndex+2)]]
        );
        setDisplayName2(
          props.dataList[tempArray[parseInt(Object.keys(props.loadedItem)) + (props.nameIndex+1)]]
        );
        setDisplayName3(
          props.dataList[tempArray[parseInt(Object.keys(props.loadedItem)) + props.nameIndex]]
        );
      }
    }, [tempArray, updated]);

    function ValueModule(props) {
      const [valueState, setValueState] = useState(tempArray[props.value]);

      function saveValue() {
        tempArray[props.value] = valueState;
      }

      return (
        <>
          {
            <input
              value={valueState}
              onChange={(e) => setValueState(e.target.value)}
              type="text"
              style={{ maxWidth: "30%" }}
              onBlur={() => saveValue()}
            />
          }
        </>
      );
    }
    function NameSelect(props) {
        let dropList = Object.entries(props.dataList).map((item, index) => (
          <option key={index} value={item[0]}>
            {item[1]}
          </option>
        ));
  
        let defaultDisplay = tempArray[props.value];
  
        return (
          <>
            <select
              className="form-select"
              defaultValue={defaultDisplay}
              aria-label="Item value dropdown"
              onChange={(e) => {
                tempArray[props.value] = e.target.value;
                setUpdated(!updated);
                props.setDataArray(tempArray);
              }}
            >
              <option disabled value={-1}>
                Select name
              </option>
              {dropList}
            </select>
          </>
        );
      }
  
      const mainDisplay =
        props.loadedItem != null ? (
          <div className="card">
            <div className="card-header row">
              <div className="card-title">
                <h5>
                  {displayName1} {displayName2} {displayName3}
                </h5>
              </div>
            </div>
            <div className="card-body"></div>
            <div className="row">
              <div className="col-3 inventoryText">
                Type:{" "}
                <ValueModule value={parseInt(Object.keys(props.loadedItem)) + props.typeIndex} />
              </div>
              <div className="col-3 inventoryText">
                Bonus:{" "}
                <ValueModule value={parseInt(Object.keys(props.loadedItem)) + props.bonusIndex} />
              </div>
              <div className="col-3 inventoryText">
                Charges:{" "}
                <ValueModule value={parseInt(Object.keys(props.loadedItem)) + props.chargeIndex} />
              </div>
              <div className="col-3 inventoryText">
                Ammo:{" "}
                <ValueModule value={parseInt(Object.keys(props.loadedItem)) + props.ammoIndex} />
              </div>
            </div>
            <div style={{ marginTop: 20 }} className="row">
              <div className="col-3 inventoryText">
                Weight:{" "}
                <ItemWeightModule
                  value={parseInt(Object.keys(props.loadedItem)) + props.weightIndex}
                  dataArray={props.dataArray}
                />
              </div>
            </div>
            <div style={{ marginTop: 20 }} className="row">
              <h5>Rename</h5>
            </div>
  
            <div className="row">
              <div className="col-4">
                <NameSelect setDataArray={props.setDataArray} dataList={props.dataList} value={parseInt(Object.keys(props.loadedItem)) + (props.nameIndex+2)} />
              </div>
              <div className="col-4">
                <NameSelect setDataArray={props.setDataArray} dataList={props.dataList} value={parseInt(Object.keys(props.loadedItem)) + (props.nameIndex+1)} />
              </div>
              <div className="col-4">
                <NameSelect setDataArray={props.setDataArray} dataList={props.dataList} value={parseInt(Object.keys(props.loadedItem)) + props.nameIndex} />
              </div>
            </div>
            <br />
            <div className="card-footer row d-flex flex-row-reverse">
              <button
                style={{ maxWidth: 200 }}
                className="btn btn-primary shadow"
                onClick={() => {
                  props.setLoadedItem(null);
                  props.setUnsavedChanges(true);
                }}
              >
                Done Editing
              </button>
            </div>
          </div>
        ) : null;
  
      const emptySelect = (
        <select
          className="form-select"
          defaultValue={0}
          aria-label="Item value dropdown"
          onChange={(e) => {
            tempArray[props.value] = e.target.value;
          }}
        >
          <option disabled value={0}></option>
        </select>
      );
  
      const emptyDisplay = (
        <div className="card">
          <div className="card-header row">
            <div id="cardTitle" className="card-title">
              <h5 style={{ color: "transparent" }}>Easter Egg secret message</h5>
            </div>
          </div>
          <div className="card-body"></div>
          <div className="row">
            <div className="col-3 inventoryText">
              Type: <input type="text" disabled style={{ width: "30%" }} />
            </div>
            <div className="col-3 inventoryText">
              Bonus: <input type="text" disabled style={{ width: "30%" }} />
            </div>
            <div className="col-3 inventoryText">
              Charges: <input type="text" disabled style={{ width: "30%" }} />
            </div>
            <div className="col-3 inventoryText">
              Ammo: <input type="text" disabled style={{ width: "30%" }} />
            </div>
          </div>
          <div style={{ marginTop: 20 }} className="row">
            <div className="col-3 inventoryText">
              Weight: <input type="text" disabled style={{ width: "30%" }} />
            </div>
          </div>
          <div style={{ marginTop: 20 }} className="row">
            <h5>Rename</h5>
          </div>
  
          <div className="row">
            <div className="col-4">{emptySelect}</div>
            <div className="col-4">{emptySelect}</div>
            <div className="col-4">{emptySelect}</div>
          </div>
          <br />
          <div className="card-footer row d-flex flex-row-reverse">
            <button className="btn" disabled style={{ maxWidth: 200 }}>
              No Item Selected
            </button>
          </div>
        </div>
      );
  
      return props.loadedItem ? mainDisplay : emptyDisplay;
    }

    export function ItemWeightModule(props) {
        let tempArray = props.dataArray;
    
        const [inputText, setInputText] = useState(
          parseInt(
            (0 + props.dataArray[props.value + 1].toString(16)).slice(-2) +
              (0 + props.dataArray[props.value].toString(16)).slice(-2),
            16
          )
        );
    
        const editDisplay = (
          <>
            {
              <input
                type="text"
                style={{ maxWidth: "30%" }}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onBlur={() => convertDecimaltoBinary()}
              />
            }
          </>
        );
    
        function convertDecimaltoBinary() {
          let eightBit = (
            "0000" + parseInt(inputText).toString(16).toUpperCase()
          ).slice(-4);
          let eightBitSplit = eightBit.match(/.{1,2}/g) ?? [];
          for (let i = 0; i < 1; i++) {
            if (eightBitSplit[i] === "00") {
              eightBitSplit[i] = "0";
            } else if (eightBitSplit[i].charAt(0) === "0") {
              eightBitSplit[i] = eightBitSplit[i].charAt(1);
            }
          }
    
          tempArray[props.value + 1] = parseInt(eightBitSplit[0], 16);
          tempArray[props.value] = parseInt(eightBitSplit[1], 16);
          props.setDataArray(tempArray);
        }
    
        return editDisplay;
      }
import { useState, useEffect } from "react";

// props: setLoadedItem setUnsavedChanges loadedItem datalist dataArray setDataArray nameIndex typeIndex bonusIndex chargeIndex ammoIndex weightIndex
export function ItemEditModule(props) {
  let tempArray = props.dataArray;

  const [displayName1, setDisplayName1] = useState("");
  const [displayName2, setDisplayName2] = useState("");
  const [displayName3, setDisplayName3] = useState("");
  const [ammo, setAmmo] = useState("")
  const [updated, setUpdated] = useState(true);

  useEffect(() => {
    if (props.loadedItem) {
      setDisplayName1(
        props.dataList[
          tempArray[
            parseInt(Object.keys(props.loadedItem)) + (props.nameIndex + 2)
          ]
        ]
      );
      setDisplayName2(
        props.dataList[
          tempArray[
            parseInt(Object.keys(props.loadedItem)) + (props.nameIndex + 1)
          ]
        ]
      );
      setDisplayName3(
        props.dataList[
          tempArray[parseInt(Object.keys(props.loadedItem)) + props.nameIndex]
        ]
      );
      setAmmo(
        
          tempArray[parseInt(Object.keys(props.loadedItem)) + props.ammoIndex]
        
      );
    }
  }, [tempArray, updated, props.dataList, props.loadedItem, props.nameIndex, props.ammoIndex]);

  function ValueModule(props) {
    const [valueState, setValueState] = useState(tempArray[props.value]);

    function saveValue() {
      tempArray[props.value] = valueState;
      setUpdated(!updated);
    }

    return (
      <>
        {
          <input
            value={valueState}
            onChange={(e) => setValueState(e.target.value)}
            type="text"
            onBlur={() => saveValue()}
          />
        }
      </>
    );
  }
  function NameSelect(props) {
    let dropList = Object.entries(props.dataList)
      .filter((item) => parseInt(item[0]) !== 0)
      .map((item, index) => (
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
          <option value={0}>{`<Blank>`}</option>
          {dropList}
        </select>
      </>
    );
  }

  const mainDisplay = (
    <div className="accordion" id="inventoryAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header" id={`heading${props.index}`}>
          <button
            className="accordion-button collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#collapse${props.index}`}
            aria-expanded="true"
            aria-controls={`collapse${props.index}`}
          >
            <div className="col-md-8">
              <h6>
              {ammo > 0 ? ammo : null} {displayName1} {displayName2} {displayName3}
              </h6>
            </div>
          </button>
        </h2>
        <div
          id={`collapse${props.index}`}
          className="accordion-collapse collapse"
          aria-labelledby={`heading${props.index}`}
        >
          <div className="accordion-body">
            <>
              <div className="row">
                <div className="col-6 col-md-auto inventoryText">
                  Type:{" "}
                  <ValueModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) + props.typeIndex
                    }
                  />
                </div>
                <div className="col-6 col-md-auto inventoryText">
                  Bonus:{" "}
                  <ValueModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) + props.bonusIndex
                    }
                  />
                </div>
                <div className="col-6 col-md-auto inventoryText">
                  Effect1(Charges):{" "}
                  <ValueModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) +
                      props.chargeIndex
                    }
                  />
                </div>
                <div className="col-6 col-md-auto inventoryText">
                  Effect2:{" "}
                  <ValueModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) +
                      props.effect2Index
                    }
                  />
                </div>
                <div className="col-6 col-md-auto inventoryText">
                  Effect3:{" "}
                  <ValueModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) +
                      props.effect3Index
                    }
                  />
                </div>
                {tempArray[parseInt(Object.keys(props.loadedItem)) + props.ammoIndex] > 0 ? <div className="col-6 col-md-auto inventoryText">
                  Ammo:{" "}
                  <ValueModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) + props.ammoIndex
                    }
                  />
                </div> : null}
              </div>
              <div style={{ marginTop: 20 }} className="row">
                <div className="col-6 col-md-auto inventoryText">
                  Weight:{" "}
                  <ItemWeightModule
                    value={
                      parseInt(Object.keys(props.loadedItem)) +
                      props.weightIndex
                    }
                    dataArray={props.dataArray}
                    setDataArray={props.setDataArray}
                  />
                </div>
              </div>
              <div style={{ marginTop: 20 }} className="row">
                <h5 style={{ textAlign: "center" }}>Rename</h5>
              </div>

              <div className="row">
                <div className="col-4">
                  <NameSelect
                    setDataArray={props.setDataArray}
                    dataList={props.dataList}
                    value={
                      parseInt(Object.keys(props.loadedItem)) +
                      (props.nameIndex + 2)
                    }
                  />
                </div>
                <div className="col-4">
                  <NameSelect
                    setDataArray={props.setDataArray}
                    dataList={props.dataList}
                    value={
                      parseInt(Object.keys(props.loadedItem)) +
                      (props.nameIndex + 1)
                    }
                  />
                </div>
                <div className="col-4">
                  <NameSelect
                    setDataArray={props.setDataArray}
                    dataList={props.dataList}
                    value={
                      parseInt(Object.keys(props.loadedItem)) + props.nameIndex
                    }
                  />
                </div>
              </div>
              <div
                className="row d-flex flex-row-reverse"
                style={{ marginTop: 10 }}
              >
                <button
                  className="btn downloadButton editButton"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={`#collapse${props.index}`}
                  aria-expanded="true"
                  aria-controls={`collapse${props.index}`}
                >
                  Done Editing
                </button>
                <button
                  className="btn editButton duplicateButton"
                  onClick={() => props.duplicateItem(props.item)}
                  style={{marginRight:30}}
                >
                  Duplicate Item
                </button>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );

  return mainDisplay;
}

// props: arrayLength, nameIndex, itemValueList, loadedItem, setLoadedItem
export function ItemListModule(props) {
  const [loading, setLoading] = useState(true);
  const [itemListArray, setItemListArray] = useState([]);

  useEffect(() => {
    if (loading === true) {
      assembleList();
    }
  });

  const defaultDisplay = itemListArray.map((item, index) => (
    <div key={index} className="row inventoryItem">
      <ItemEditModule
        loadedItem={item}
        nameIndex={props.nameIndex}
        typeIndex={props.typeIndex}
        dataArray={props.dataArray}
        setDataArray={props.setDataArray}
        bonusIndex={props.bonusIndex}
        weightIndex={props.weightIndex}
        ammoIndex={props.ammoIndex}
        chargeIndex={props.chargeIndex}
        dataList={props.dataList}
        arrayLength={props.arrayLength}
        editingIndex={props.editingIndex}
        setEditingIndex={props.setEditingIndex}
        quantityIndex={props.quantityIndex}
        index={index}
        item={item}
        duplicateItem={duplicateItem}
      />
    </div>
  ));

  function duplicateItem(item) {
    let tempArray = Array.from(props.dataArray);
    for (let i = 0; i <= props.arrayLength - 1; i++) {
      let n = tempArray[parseInt(Object.keys(item)) + i];
      tempArray.push(n);
    }
    let newArray = new Uint8Array(tempArray);
    props.setDataArray(newArray);
    assembleList();
  }

  function assembleList() {
    let nameArray = [];
    for (let i = 0; i < Array.from(props.dataArray).length; i++) {
      let assembledName = "";
      if (i === 0 || i % props.arrayLength === 0) {
        let j = props.dataArray[i + props.nameIndex + 2];
        let k = props.dataArray[i + props.nameIndex + 1];
        let l = props.dataArray[i + props.nameIndex];
        assembledName = `${props.dataList[j]} ${props.dataList[k]} ${props.dataList[l]}`;
        nameArray.push({ [i]: assembledName });
      }
    }
    setItemListArray(nameArray);
    setLoading(false);
  }

  return defaultDisplay;
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
    <input
      type="text"
      style={{ maxWidth: "100%" }}
      value={inputText}
      onChange={(e) => setInputText(e.target.value)}
      onBlur={() => convertDecimaltoBinary()}
    />
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

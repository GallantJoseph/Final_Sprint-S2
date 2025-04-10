import { useContext, useEffect, useState } from "react";
import PCBuilderCategory from "./pcbuilder/PCBuilderCategory";
import { PCBuildContext } from "../context/PCBuild";
import "./PCBuilder.css";

const PCBuilder = () => {
  const [productData, setProductData] = useState(null);
  const [pcBuildData, setPcBuildData] = useState(null);
  const [psuSelected, setPsuSelected] = useState(false);
  const [caseSelected, setCaseSelected] = useState(false);
  const [motherboardSelected, setMotherboardSelected] = useState(false);
  const [cpuSelected, setCpuSelected] = useState(false);
  const [ramSelected, setRamSelected] = useState(false);
  const [storageSelected, setStorageSelected] = useState(false);

  // Context that stores the current PC Build data.
  const pcBuild = useContext(PCBuildContext);
  console.log(pcBuild.buildItems);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");
      const products = await response.json();

      setProductData(products);
    };

    fetchData();
  }, []);

  const updateBuild = async (id) => {
    // const response = await fetch("http://localhost:5000/pcbuild", {
    //   method: "POST",
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    //   body: `{
    //   "category": "gpu",
    //   "id": "1",
    //   "quantity": 1}`,
    // });
    // const pcBuild = await response.json();
    // console.log(pcBuild);
  };

  const submitBuild = (evt) => {
    evt.preventDefault();
    alert("Submitted!");
  };

  updateBuild(1);

  return (
    <section id="pcbuilder-section">
      <div>
        <h1>Codebrew PC Builder</h1>
        <p>
          Our advanced PC Builder will guide you step-by-step through the
          building process.
        </p>
      </div>
      <PCBuilderCategory
        title="Power Supply"
        category="psu"
        data={productData}
        onClick={() => setPsuSelected(true)}
      />
      {psuSelected && (
        <>
          <PCBuilderCategory
            title="Case"
            category="case"
            data={productData}
            onClick={() => setCaseSelected(true)}
          />
          {caseSelected && (
            <>
              <PCBuilderCategory
                title="Motherboard"
                category="motherboard"
                data={productData}
                onClick={() => setMotherboardSelected(true)}
              />
              {motherboardSelected && (
                <>
                  <PCBuilderCategory
                    title="Processor"
                    category="cpu"
                    data={productData}
                    onClick={() => setCpuSelected(true)}
                  />
                  {cpuSelected && (
                    <>
                      <PCBuilderCategory
                        title="Memory"
                        category="ram"
                        data={productData}
                        onClick={() => setRamSelected(true)}
                      />
                      {ramSelected && (
                        <>
                          <PCBuilderCategory
                            title="Storage"
                            category="storage"
                            data={productData}
                            onClick={() => setStorageSelected(true)}
                          />
                          {storageSelected && (
                            <>
                              <h3>You're almost done!</h3>
                              <p>
                                You have selected all the necessary components
                                for your build. Click the Submit Build button
                                once you're satisfied with your selection.
                              </p>
                              <button
                                onClick={(evt) => {
                                  submitBuild(evt);
                                }}
                              >
                                Submit Build
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </>
              )}
            </>
          )}
        </>
      )}
      <footer>
        <p>© 2025 Codebrew PC Building Inc. All rights reserved.</p>
      </footer>
    </section>
  );
};
export default PCBuilder;

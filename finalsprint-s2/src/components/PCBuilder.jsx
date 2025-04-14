import { useContext, useEffect, useState } from "react";
import PCBuilderCategory from "./pcbuilder/PCBuilderCategory";
import { PCBuildContext } from "../context/PCBuild";
import "./PCBuilder.css";

const PCBuilder = () => {
  const [productsData, setProductsData] = useState(null);
  const [pcBuildData, setPcBuildData] = useState(null);
  const [psuSelected, setPsuSelected] = useState(false);
  const [caseSelected, setCaseSelected] = useState(false);
  const [motherboardSelected, setMotherboardSelected] = useState(false);
  const [cpuSelected, setCpuSelected] = useState(false);
  const [gpuSelected, setGpuSelected] = useState(false);
  const [ramSelected, setRamSelected] = useState(false);
  const [storageSelected, setStorageSelected] = useState(false);

  // Context that stores the current PC Build data.
  const pcBuild = useContext(PCBuildContext);
  console.log(pcBuild.buildItems);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/products");
      const products = await response.json();

      setProductsData(products);
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
      <div className="product-header">
        <h1>Codebrew PC Builder</h1>
        <p>
          Our advanced PC Builder will guide you step-by-step through the
          building process.
        </p>
      </div>
      <PCBuilderCategory
        title="Power Supply"
        category="psu"
        data={productsData}
        onClick={() => setPsuSelected(true)}
      />
      {psuSelected && (
        <>
          <PCBuilderCategory
            title="Case"
            category="case"
            data={productsData}
            onClick={() => setCaseSelected(true)}
          />
          {caseSelected && (
            <>
              <PCBuilderCategory
                title="Motherboard"
                category="motherboard"
                data={productsData}
                onClick={() => setMotherboardSelected(true)}
              />
              {motherboardSelected && (
                <>
                  <PCBuilderCategory
                    title="Processor"
                    category="cpu"
                    data={productsData}
                    onClick={() => setCpuSelected(true)}
                  />
                  {cpuSelected && (
                    <>
                      <PCBuilderCategory
                        title="Graphics Card"
                        category="gpu"
                        data={productsData}
                        onClick={() => setGpuSelected(true)}
                      />
                      {gpuSelected && (
                        <>
                          <PCBuilderCategory
                            title="Memory"
                            category="ram"
                            data={productsData}
                            onClick={() => setRamSelected(true)}
                          />
                          {ramSelected && (
                            <>
                              <PCBuilderCategory
                                title="Storage"
                                category="storage"
                                data={productsData}
                                onClick={() => setStorageSelected(true)}
                              />
                              {storageSelected && (
                                <>
                                  <div className="product-submit">
                                    <h3>You're almost done!</h3>
                                    <p>
                                      You have selected all the necessary
                                      components for your build. Click the
                                      Submit Build button once you're satisfied
                                      with your selection.
                                    </p>
                                    <button
                                      className="submitbtn"
                                      onClick={(evt) => {
                                        submitBuild(evt);
                                      }}
                                    >
                                      Submit Build
                                    </button>
                                  </div>
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
        </>
      )}
    </section>
  );
};
export default PCBuilder;

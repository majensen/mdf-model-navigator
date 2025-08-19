import React from 'react';
import { useState, useRef, useEffect } from 'react';
import {
  inputToUrls
} from './getModel';
import { modelRepos, modelFileList } from './repos';
  
export default function UrlBox({
  setFileBoxText,
  setUrls,
  setModel,
  setUploadedFiles
}) {
  const [fileList, setFileList] = useState([]);
  const textareaRef = useRef(null);
  
  const ModelOpts = () => {
    const ret =  Object.keys(modelRepos).toSorted()
      .map( (lbl) => {
        return (
          <option key={lbl} value={lbl}>{lbl}</option>
        );
      } );
    return [ (<option key="dum" value="">Select:</option>), ...ret ];
  };
  function handleSelectFileList(e) {
    const hdl = e.target.value;
    setFileList(modelFileList(hdl));
  }
  // Handle file upload and store files
  function handleFileUpload(e) {
    console.debug("We are here")
    const files = e.target.files;
    if (!files.length) return;
    setFileList(Array.from(files).map(file => file.name));
    const readers = Array.from(files).map(file => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = e => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsText(file);
      });
    });
    Promise.all(readers).then(contents => 
      setUploadedFiles(contents)
    );
  }
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const jsn = Object.fromEntries(formData.entries());
    setFileBoxText(jsn.urlBoxContent)
    setUrls( inputToUrls(jsn.urlBoxContent) );
    setModel(null); // kick Effect
  }
  useEffect( () => {
    if (fileList) {
      textareaRef.current.value = fileList.join('\n');
    }
  }, [fileList]);
  return (
    <>
      <form method="post" onSubmit={handleSubmit}>
        <label>
          Choose a model:
          <select
            name="model"
            onChange={handleSelectFileList}
            style={{ padding:"5px", marginLeft:"10px" }}
          >
            <ModelOpts />
          </select>
          <br />
        </label>
        <label>
          Or enter URLs of a set of MDF files, one per line:
          <br />
          <textarea
            ref={textareaRef}
            name='urlBoxContent'
            rows={4}
            columns={150}
            style={{width: "800px"}}
          />
        </label>
        <label>
          Or upload MDF YAML files from your machine:
          <br />
          <input
            type="file"
            accept=".yaml,.yml"
            multiple
            onChange={handleFileUpload}
          />
          <br />
        </label>
        <br />
        <button
          type="submit"
          style={{ padding:"5px" }}
        >Navigate</button>
        <button
          type="reset"
          style={{ padding:"5px" }}
        >Reset</button>
      </form>
    </>
  );
}
                              

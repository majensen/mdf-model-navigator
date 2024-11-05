import url from 'url';

export const modelRepos = {
  CRDC: {
    home: "https://github.com/pihltd/CRDCSearchModel",
    branch: "main",
    path: "/",
    files: ["CRDC_Submission_MDF_09262024.yml", "CRDC_Submission_MDF_Props_09262024.yml"]
  },
  CDS: {
    home: "https://github.com/CBIIT/cds-model",
    branch: "main",
    path: "/model-desc",
    files: ["cds-model.yml", "cds-model-props.yml"],
  },
  ICDC: {
    home: "https://github.com/CBIIT/icdc-model-tool",
    branch: "develop",
      path: "/model-desc",
    files: ["icdc-model.yml", "icdc-model-props.yml"],
  },
  CTDC: {
    home: "https://github.com/CBIIT/ctdc-model",
    branch: "master",
    path: "/model-desc",
    files: ["ctdc_model_file.yaml", "ctdc_model_properties_file.yaml"],
  },
  CCDI: {
    home: "https://github.com/CBIIT/ccdi-model",
    branch: "main",
    path: "/model-desc",
    files: ["ccdi-model.yml", "ccdi-model-props.yml", "terms.yml"],
  },
  INS: {
    home: "https://github.com/CBIIT/ins-model",
    branch: "main",
      path: "/model-desc",
    files: ["ins-model.yml", "ins-model-props.yml"],
  },
  GDC: {
    home: "https://github.com/CBIIT/gdc-model",
    branch: "main",
    path: "/model-desc",
    files: ["gdc-model.yaml", "gdc-model-props.yaml", "gdc-model-terms.yaml"],
  },
  PDC: {
    home: "https://github.com/CBIIT/pdc-model",
    branch: "main",
    path: "/model-desc",
    files: ["pdc-model.yaml", "pdc-model-props.yaml", "pdc-model-terms.yaml"],
  },
};

function rawFileUrlList({
  home,
  branch,
  path,
  files
}) {
  if (!files || files.length === 0) {
    return [];
  }
  const repoUrl = url.parse(home);
  if (!repoUrl.protocol || !repoUrl.host) {
    return [];
  }
  const contentUrl = url.parse("https://raw.githubusercontent.com/");
  const br = branch ? branch : "main";
  const pth = path ? (path == "/" ? "" : path) : "/model-desc";
  const base = url.parse( contentUrl.resolve(repoUrl.path)+'/' );
  return files.map( (fl) =>
    base.resolve(br)+pth+'/'+fl );
}

export const modelFileList = (handle) => {
  if (modelRepos[handle]) {
    return rawFileUrlList(modelRepos[handle]);
  }
  else {
    return [];
  }
};

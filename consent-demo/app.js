const records = {
  history: [
    {id:"history-1",title:"Example: no history entered",details:"Placeholder only. Confirm the patient's actual history from approved records."},
    {id:"history-2",title:"Example: history needs review",details:"Placeholder only. A qualified clinician must verify all relevant conditions, medicines, allergies, and prior procedures."}
  ],
  diagnosis: [
    {id:"diagnosis-1",title:"Example diagnosis A",details:"Demo placeholder. Replace with a clinician-confirmed diagnosis."},
    {id:"diagnosis-2",title:"Example diagnosis B",details:"Demo placeholder. Replace with a clinician-confirmed diagnosis."}
  ],
  surgery: [
    {id:"surgery-1",title:"Example procedure A",details:"Demo placeholder. Confirm exact procedure and site with the treating clinician."},
    {id:"surgery-2",title:"Example procedure B",details:"Demo placeholder. Confirm exact procedure and site with the treating clinician."}
  ]
};
const fields = {
  history:{search:"history-search",select:"history-select",target:"form-history",label:"Medical History"},
  diagnosis:{search:"diagnosis-search",select:"diagnosis-select",target:"form-diagnosis",label:"Diagnosis"},
  surgery:{search:"surgery-search",select:"surgery-select",target:"form-surgery",label:"Surgery / Procedure"}
};
const byId = id => document.getElementById(id);
function renderOptions(kind){
  const config=fields[kind], search=byId(config.search).value.trim().toLowerCase(), select=byId(config.select), previous=select.value;
  select.replaceChildren(new Option("Choose demo record",""));
  records[kind].filter(r=>(r.title+" "+r.details).toLowerCase().includes(search)).forEach(r=>select.add(new Option(r.title,r.id)));
  if([...select.options].some(o=>o.value===previous)) select.value=previous;
}
function selectedRecord(kind){return records[kind].find(r=>r.id===byId(fields[kind].select).value)||null}
function renderPreview(){
  const preview=byId("preview"), selected=Object.keys(fields).map(kind=>({kind,record:selectedRecord(kind)})).filter(x=>x.record);
  preview.replaceChildren();
  if(!selected.length){preview.className="preview empty";preview.textContent="Choose one or more records above to see the preview.";return}
  preview.className="preview";
  const grid=document.createElement("div");grid.className="preview-grid";
  selected.forEach(({kind,record})=>{const card=document.createElement("article");card.className="preview-card";const h=document.createElement("h3");h.textContent=fields[kind].label;const title=document.createElement("p");title.textContent=record.title;const detail=document.createElement("p");detail.textContent=record.details;detail.style.marginTop="8px";card.append(h,title,detail);grid.append(card)});
  preview.append(grid);
}
Object.keys(fields).forEach(kind=>{byId(fields[kind].search).addEventListener("input",()=>renderOptions(kind));byId(fields[kind].select).addEventListener("change",renderPreview);renderOptions(kind)});
byId("apply-btn").addEventListener("click",()=>{
  let count=0;
  Object.keys(fields).forEach(kind=>{const record=selectedRecord(kind);if(record){byId(fields[kind].target).value=record.title+"\n"+record.details;count++}});
  byId("status").textContent=count ? "Applied "+count+" demo record(s) to the draft fields. Review and replace placeholders; nothing was submitted." : "Choose at least one demo record before applying.";
});
byId("clear-btn").addEventListener("click",()=>{
  Object.keys(fields).forEach(kind=>{byId(fields[kind].search).value="";byId(fields[kind].select).value="";byId(fields[kind].target).value="";renderOptions(kind)});
  ["form-description","form-risks","form-preparation","form-aftercare"].forEach(id=>byId(id).value="");
  byId("status").textContent="Selections and draft fields cleared.";renderPreview();
});
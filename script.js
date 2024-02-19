const decoIdMap = {
  "Normal": 0,
  "Repose1": 1,
  "AlternateDeco": 2,
  "Legendary": 3,
  "Event": 4,
  "Repose2": 5,
  "LightDirect": 6,
  "LightStored": 7,
  "LightEnhanced": 8,
  "Repose3": 9,
  "Repose4": 10,
  "Repose5": 11,
  "Valentines": 12,
  "Easter": 13,
  "Winter": 14,
  "Virtual": 15,
  "Premium": 16,
  "GlowDark": 17,
  "StoneStatue": 18,
  "GlitterSpectrum": 19,
  "TreasureHunt2012": 20,
  "Halloween": 21,
  "TreasureHunt2013": 22,
  "ColorShift": 23,
  "WiiU": 24,
  "TH_BestBuy": 25,
  "TH_FritoLay": 26,
  "TreasureHunt2014": 29,
  "TreasureHunt2015": 30,
  "Mobile": 31,
};

const yearEntryDropdown = document.getElementById("year_entry_dropdown");
const yearEntryText = document.getElementById("year_entry_text");
const yearToggle = document.getElementById("year_toggle");

const decoIdEntryDropdown = document.getElementById("deco_id_entry_dropdown");
const decoIdEntryText = document.getElementById("deco_id_entry_text");
const decoIdToggle = document.getElementById("deco_id_toggle");

function toggleYearEntry() {
  if (yearEntryDropdown.style.display === "block") {
    yearEntryDropdown.style.display = "none";
    yearEntryText.style.display = "block";
    yearToggle.innerText = "Toggle to Dropdown";
  } else {
    yearEntryDropdown.style.display = "block";
    yearEntryText.style.display = "none";
    yearToggle.innerText = "Toggle to Text";
  }
}

function toggleDecoId() {
  if (decoIdEntryDropdown.style.display === "block") {
    decoIdEntryDropdown.style.display = "none";
    decoIdEntryText.style.display = "block";
    decoIdToggle.innerText = "Toggle to Dropdown";
  } else {
    decoIdEntryDropdown.style.display = "block";
    decoIdEntryText.style.display = "none";
    decoIdToggle.innerText = "Toggle to Text";
  }
}

function generateVariantID() {
  const yearCode = yearEntryDropdown.style.display === "block" ? parseInt(yearEntryDropdown.value) : parseInt(yearEntryText.value);
  const decoId = decoIdEntryDropdown.style.display === "block" ? decoIdMap[decoIdEntryDropdown.value] : parseInt(decoIdEntryText.value);
  const bool1 = document.getElementById("bool1_check").checked ? 1 : 0;
  const bool2 = document.getElementById("bool2_check").checked ? 1 : 0;
  const bool3 = document.getElementById("bool3_check").checked ? 1 : 0;
  const bool4 = document.getElementById("bool4_check").checked ? 1 : 0;
  
  const yearBinary = ('0000' + yearCode.toString(2)).slice(-4);
  const boolBinary = `${bool1}${bool2}${bool3}${bool4}`;
  const decoIdBinary = ('0000' + decoId.toString(2)).slice(-4);

  const variantId = `${yearBinary}${boolBinary}0000${decoIdBinary}`;
  document.getElementById("variant_id_label").innerText = "Binary: " + variantId;

  const combinedBinary = yearBinary + boolBinary + "0000" + decoIdBinary;
  const combinedDecimal = parseInt(combinedBinary, 2);
  document.getElementById("binary_values_label").innerText = `Variant ID: ${combinedDecimal}`;
}

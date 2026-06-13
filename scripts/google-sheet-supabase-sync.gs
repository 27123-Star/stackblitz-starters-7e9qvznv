/**
 * Google Apps Script to sync a Google Sheet to a Supabase table.
 *
 * Usage:
 * 1. Create a sheet named "teachers" with header row: name,password,role
 * 2. In Apps Script, set script properties for SUPABASE_URL and SUPABASE_KEY
 * 3. Run setSupabaseConfig() once to initialize the values
 * 4. Run syncSheetToSupabase() manually or create a time-driven trigger
 */

const SHEET_NAME = "teachers";
const TABLE_NAME = "teachers";

function setSupabaseConfig() {
  const scriptProperties = PropertiesService.getScriptProperties();
  scriptProperties.setProperty("SUPABASE_URL", "your-project-id.supabase.co");
  scriptProperties.setProperty("SUPABASE_KEY", "your-supabase-service-role-key");
  Logger.log("Supabase config saved. Replace values before running sync.");
}

function syncSheetToSupabase() {
  const scriptProperties = PropertiesService.getScriptProperties();
  const SUPABASE_URL = scriptProperties.getProperty("SUPABASE_URL");
  const SUPABASE_KEY = scriptProperties.getProperty("SUPABASE_KEY");

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Missing Supabase configuration. Run setSupabaseConfig() first.");
  }

  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) {
    throw new Error(`Sheet '${SHEET_NAME}' not found.`);
  }

  const values = sheet.getDataRange().getValues();
  if (values.length < 2) {
    Logger.log("No teacher rows found to sync.");
    return;
  }

  const headers = values[0].map((value) => String(value).trim().toLowerCase());
  const nameIndex = headers.indexOf("name");
  const passwordIndex = headers.indexOf("password");
  const roleIndex = headers.indexOf("role");

  if (nameIndex === -1 || passwordIndex === -1 || roleIndex === -1) {
    throw new Error("Sheet must include header columns: name, password, role");
  }

  const rows = values.slice(1).map((row) => ({
    name: String(row[nameIndex] || "").trim(),
    password: String(row[passwordIndex] || "").trim(),
    role: String(row[roleIndex] || "").trim(),
  }))
  .filter((row) => row.name && row.password && row.role);

  if (!rows.length) {
    Logger.log("No valid teacher rows found after filtering empty data.");
    return;
  }

  const url = `https://${SUPABASE_URL}/rest/v1/${TABLE_NAME}?on_conflict=name`;
  const options = {
    method: "post",
    contentType: "application/json",
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${SUPABASE_KEY}`,
      Prefer: "resolution=merge-duplicates",
    },
    payload: JSON.stringify(rows),
    muteHttpExceptions: true,
  };

  const response = UrlFetchApp.fetch(url, options);
  const code = response.getResponseCode();
  const body = response.getContentText();

  if (code >= 200 && code < 300) {
    Logger.log(`Synced ${rows.length} rows to Supabase successfully.`);
  } else {
    Logger.log(`Supabase sync failed: HTTP ${code}`);
    Logger.log(body);
    throw new Error(`Supabase sync failed with status ${code}. See logs for details.`);
  }
}

function testSyncSheetToSupabase() {
  try {
    syncSheetToSupabase();
    Logger.log("Sync completed successfully.");
  } catch (error) {
    Logger.log(`Sync error: ${error.message}`);
  }
}

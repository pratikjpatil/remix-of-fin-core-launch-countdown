/**
 * Launch API Service
 *
 * MOCK MODE: Currently using mock data for testing.
 * PRODUCTION: Uncomment the real API call and remove mock data when ready.
 */

/**
 * Fetches the production launch date and time from the API.
 *
 * TO SWITCH TO REAL API:
 * 1. Uncomment the real API call below
 * 2. Remove or comment out the mock data section
 * 3. Update the API_BASE_URL to your actual backend URL
 */
export async function fetchLaunchData() {
  // ============================================================
  // MOCK DATA - Remove this block when connecting to real API
  // ============================================================
  const mockData = {
    prodDate: new Date(Date.now() + 30 * 1000).toISOString().split("T")[0],
    launchTime: new Date(Date.now() + 30 * 1000)
      .toISOString()
      .split("T")[1]
      .split(".")[0],
    timezone: "UTC",
    version: "1.0",
    appName: "Fin-core",
  };

  await new Promise((resolve) => setTimeout(resolve, 800));
  return mockData;
  // ============================================================
  // END MOCK DATA
  // ============================================================

  // ============================================================
  // REAL API CALL - Uncomment below when ready for production
  // ============================================================
  // const API_BASE_URL = "https://your-api-domain.com"; // TODO: Replace with actual API URL
  //
  // const response = await fetch(`${API_BASE_URL}/start-prod`, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //     // "Authorization": `Bearer ${token}`,
  //   },
  // });
  //
  // if (!response.ok) {
  //   throw new Error(`Failed to fetch launch data: ${response.status}`);
  // }
  //
  // const data = await response.json();
  // return {
  //   prodDate: data.prodDate,
  //   launchTime: data.launchTime,
  //   timezone: data.timezone || "UTC",
  //   version: data.version || "1.0",
  //   appName: data.appName || "Fin-core",
  // };
  // ============================================================
}

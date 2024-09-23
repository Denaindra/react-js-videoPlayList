export async function GetVideoListItems() {
    try {
      const response = await fetch("assets/indexPanel/ashes-2019.json");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching meeting list:", error);
    }
  }
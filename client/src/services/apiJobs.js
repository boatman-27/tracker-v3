const BASE_URL = "<YOUR_SERVER_URL>";

export async function getJobs() {
  try {
    const res = await fetch(`${BASE_URL}/getJobs`, {
      method: "GET",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch jobs");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching jobs:", error);
    throw new Error("Error fetching jobs: " + error.message);
  }
}

export async function deleteJob(id) {
  try {
    const res = await fetch(`${BASE_URL}/deleteJob/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error("Failed to delete job");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error deleting job:", error);
    throw new Error("Error deleting job: " + error.message);
  }
}

export async function addJob(job) {
  try {
    const res = await fetch(`${BASE_URL}/addJobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      throw new Error("Failed to add job");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding job:", error);
    throw new Error("Error adding job: " + error.message);
  }
}

export async function updateStatus(id, status) {
  try {
    const res = await fetch(`${BASE_URL}/modifyStatus/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) {
      throw new Error("Failed to update job status");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error updating job status:", error);
    throw new Error("Error updating job status: " + error.message);
  }
}

export async function editJob(id, job) {
  try {
    const res = await fetch(`${BASE_URL}/editJob/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(job),
    });
    if (!res.ok) {
      throw new Error("Failed to edit job");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error editing job:", error);
    throw new Error("Error editing job: " + error.message);
  }
}

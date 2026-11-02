const apiBaseUrl = import.meta.env.VITE_API_URL ?? "";

async function request(path, options = {}) {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...options.headers,
    },
  });

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error("The server returned an invalid response.");
  }

  if (!response.ok) {
    throw new Error(result.error || `Request failed with status ${response.status}.`);
  }

  return result;
}

export function loginStudent(student) {
  return request("/api/students/login", {
    method: "POST",
    body: JSON.stringify(student),
  });
}

export function getOrders(reg) {
  return request(`/api/orders?reg=${encodeURIComponent(reg)}`);
}

export function createOrder(order) {
  return request("/api/orders", {
    method: "POST",
    body: JSON.stringify(order),
  });
}

export function cancelOrder(id, reg) {
  return request(`/api/orders/${encodeURIComponent(id)}/cancel`, {
    method: "PATCH",
    body: JSON.stringify({ reg }),
  });
}

// export const BASE_URL = "http://127.0.0.1:8000"; // your Django backend

// // export async function apiPost(url, body) {
// //   const res = await fetch(BASE_URL + url, {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(body),
// //   });
// //   return res.json();
// // }

// export async function apiPost(url, body) {
//   const res = await fetch(BASE_URL + url, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//   });

//   let data;
//   try {
//     data = await res.json();
//   } catch (e) {
//     console.error("Server returned non-JSON:", await res.text());
//     throw new Error("Invalid JSON response from server");
//   }

//   return data;
// }



// export async function apiGet(url, token) {
//   const res = await fetch(BASE_URL + url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return res.json();
// }

// export async function apiPut(url, body, token) {
//   const res = await fetch(BASE_URL + url, {
//     method: "PUT",
//     headers: { 
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify(body),
//   });
//   return res.json();
// }


export const BASE_URL = "http://127.0.0.1:8000";

export async function apiPost(url, body) {
  const res = await fetch(BASE_URL + url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // SAFELY handle non-JSON (like Django 500 error HTML)
  // let data;
 try {
    return await res.json();
  } catch (err) {
    console.error("Server returned non-JSON:", await res.text());
    return { success: false, message: "Server error" };
  }

  return data;
}

export async function apiGet(url, token) {
  const res = await fetch(BASE_URL + url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function apiPut(url, body, token) {
  const res = await fetch(BASE_URL + url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

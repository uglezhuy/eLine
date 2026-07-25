export function deleteRequest(id, onSuccess) {
  fetch("http://localhost:8888/backend/api/deleteRequest.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success && onSuccess) {
        onSuccess();
      }
    });
}

export function changeStatus(id, newStatus, onSuccess) {
  fetch("http://localhost:8888/backend/api/updateRequest.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fields: {
        status: newStatus,
        statusChangedAt: new Date().toLocaleString("sv-SE").replace(" ", " "),
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success && onSuccess) {
        onSuccess();
      }
    });

  // props.setRequests(
  //     props.requests.map((r) =>
  //         r.id === id
  //             ? {
  //                 ...r, status: newStatus,
  //                 statusChangedAt: new Date().toLocaleString("ru-RU")
  //             }
  //             : r
  //     )
  // );
}

export function startWork(id, nameAdmin, onSuccess) {
  fetch("http://localhost:8888/backend/api/updateRequest.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fields: {
        status: "В обработке",
        nameAdminInWork: nameAdmin,
        statusChangedAt: new Date().toLocaleString("sv-SE").replace(" ", " "),
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success && onSuccess) {
        onSuccess();
      }
    });

  // props.setRequests(
  //     props.requests.map((r) =>
  //         r.id === id
  //             ? {
  //                 ...r,
  //                 status: "В обработке",
  //                 nameAdminInWork: nameAdmin
  //             }
  //             : r
  //     )
  // );
}

export function updateRequestField(id, value, fieldName, onSuccess) {
  fetch("http://localhost:8888/backend/api/updateRequest.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      fields: {
        [fieldName]: value,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success && onSuccess) {
        onSuccess();
      }
    });

  // props.setRequests(prevRequests =>
  //     prevRequests.map((r) =>
  //         r.id === id
  //             ? { ...r, [fieldName]: value }
  //             : r
  //     )
  // );
}

export function loadRequests() {
  fetch("http://localhost:8888/backend/api/getRequests.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setRequests(data);
    });
}

export function loadSchedule(setSchedule) {
  fetch("http://localhost:8888/backend/api/getSchedule.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setSchedule(data);
    });
}
export function loadScheduleAdmin(setSchedule) {
  fetch("http://localhost:8888/backend/api/getScheduleAdmin.php")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setSchedule(data);
    });
}

export function updateScheduleFieldisActive(id, isActive, onSuccess) {
  fetch("http://localhost:8888/backend/api/updateScheduleFieldisActive.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      isActive: isActive,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success && onSuccess) {
        onSuccess();
      }
    });
}

export function addScheduleGenerator(
  employee_id,
  dateStart,
  dateEnd,
  timeStart,
  timeEnd,
  interval,
  workingDays,
) {
  fetch("http://localhost:8888/backend/api/addScheduleGenerator.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee_id: employee_id,
      dateStart: dateStart,
      dateEnd: dateEnd,
      timeStart: timeStart,
      timeEnd: timeEnd,
      interval: interval,
      workingDays: workingDays,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });
}

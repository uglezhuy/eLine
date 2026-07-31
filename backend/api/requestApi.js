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
      if (data.success && onSuccess) {
        onSuccess();
      }
    });
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
      if (data.success && onSuccess) {
        onSuccess();
      }
    });
}

export function loadRequests(setRequests) {
  fetch("http://localhost:8888/backend/api/getRequests.php")
    .then((response) => response.json())
    .then((data) => {
      setRequests(data);
    });
}

export function loadSchedule(setSchedule) {
  fetch("http://localhost:8888/backend/api/getSchedule.php")
    .then((response) => response.json())
    .then((data) => {
      setSchedule(data);
    });
}

export function loadScheduleAdmin(setSchedule) {
  fetch("http://localhost:8888/backend/api/getScheduleAdmin.php")
    .then((response) => response.json())
    .then((data) => {
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
  return fetch("http://localhost:8888/backend/api/addScheduleGenerator.php", {
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

export function handleSubmit(
  selectedService,
  name,
  studentTicket,
  phone,
  commentStudent,
  selectedScheduleId,
  onSuccess,
) {
  fetch("http://localhost:8888/backend/api/addRequest.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      service: selectedService.name,
      name: name,
      studentTicket: studentTicket,
      phone: phone,
      commentStudent: commentStudent,
      selectedScheduleId: selectedScheduleId,
      status: "Ожидает подтверждения",
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

export function moveRequest(
  requestId,
  selectedScheduleId,
  oldSelectedScheduleId,
  onSuccess,
  onSuccessSetSchedule,
) {
  fetch("http://localhost:8888/backend/api/moveRequest.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newSelectedScheduleId: selectedScheduleId,
      oldSelectedScheduleId: oldSelectedScheduleId,
      requestId: requestId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.success) {
        if (onSuccess) {
          onSuccess();
        }

        if (onSuccessSetSchedule) {
          onSuccessSetSchedule();
        }
      }
    });
}

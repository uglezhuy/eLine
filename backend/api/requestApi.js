//
export function deleteRequest(id, onSuccess, CommentAdminForHistory) {
  fetch("http://localhost:8888/backend/api/deleteRequest.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      CommentAdminForHistory: CommentAdminForHistory,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success && onSuccess) {
        onSuccess();
      }
    });
}
//
export function changeStatus(id, newStatus, onSuccess, CommentAdminForHistory) {
  fetch("http://localhost:8888/backend/api/updateRequest.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      CommentAdminForHistory: CommentAdminForHistory,
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
}
//
export function startWork(id, nameAdmin, onSuccess, CommentAdminForHistory) {
  fetch("http://localhost:8888/backend/api/updateRequest.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
      CommentAdminForHistory: CommentAdminForHistory,
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
//
export function updateRequestField(id, value, fieldName, onSuccess) {
  fetch("http://localhost:8888/backend/api/updateRequest.php", {
    method: "POST",
    credentials: "include",
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
//
export function loadRequests(setRequests) {
  fetch("http://localhost:8888/backend/api/getRequests.php", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      setRequests(data);
    });
}
//
export function loadSchedule(setSchedule) {
  fetch("http://localhost:8888/backend/api/getSchedule.php", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      setSchedule(data);
    });
}
//
export function loadScheduleAdmin(setSchedule) {
  fetch("http://localhost:8888/backend/api/getScheduleAdmin.php", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      setSchedule(data);
    });
}
//
export function updateScheduleFieldisActive(id, isActive, onSuccess) {
  fetch("http://localhost:8888/backend/api/updateScheduleFieldisActive.php", {
    method: "POST",
    credentials: "include",
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
//
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
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      employee_id,
      dateStart,
      dateEnd,
      timeStart,
      timeEnd,
      interval,
      workingDays,
    }),
  }).then(async (response) => {
    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      throw data;
    }

    return data;
  });
}
//
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
    credentials: "include",
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
//
export function moveRequest(
  requestId,
  selectedScheduleId,
  oldSelectedScheduleId,
  onSuccess,
  onSuccessSetSchedule,
) {
  fetch("http://localhost:8888/backend/api/moveRequest.php", {
    method: "POST",
    credentials: "include",
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
//
export function getRequestHistoryByID(RequestId, setRequestHistory) {
  fetch("http://localhost:8888/backend/api/getRequestHistoryByID.php", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      RequestId: RequestId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setRequestHistory(data);
    });
}
//
export function loadServices(setServices) {
  fetch("http://localhost:8888/backend/api/getServices.php", {
    credentials: "include",
  })
    .then((response) => response.json())

    .then((data) => {
      setServices(data);
    });
}

export function loadUser(roleID, setPreviewUser) {
  fetch("http://localhost:8888/backend/api/getUser.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roleID: roleID,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      setPreviewUser(data);
    });
}
//
export function loginDemo(roleID) {
  return fetch("http://localhost:8888/backend/api/loginDemo.php", {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      roleID: roleID,
    }),
  }).then((response) => response.json());
}
//
export function loadCurrentUser(setUser) {
  return fetch("http://localhost:8888/backend/api/getCurrentUser.php", {
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      setUser(data);
      return data;
    });
}

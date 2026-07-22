<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

$stmt = $pdo->query("SELECT
    id,
    service,
    name,
    student_ticket AS studentTicket,
    phone,
    comment_student AS commentStudent,
    selected_schedule_id AS selectedScheduleId,
    status,
    created_at AS createdAt,
    status_changed_at AS statusChangedAt,
    comment_admin AS commentAdmin,
    name_admin_in_work AS nameAdminInWork
FROM requests");
$requests = $stmt->fetchAll();



header("Content-Type: application/json; charset=utf-8");

echo json_encode($requests);
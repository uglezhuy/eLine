<?php

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';

require_once "../auth/auth.php";

requireRole(["employee", "admin"]);

$data = json_decode(file_get_contents("php://input"), true);



$stmt = $pdo->query("SELECT * FROM schedule  ORDER BY schedule_date, schedule_time");
$schedule = $stmt->fetchAll();


header("Content-Type: application/json; charset=utf-8");

echo json_encode($schedule);

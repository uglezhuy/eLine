<?php
require_once "../auth/auth.php";

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/database.php';



requireRole(["employee", "admin", "student"]);

$stmt = $pdo->query("SELECT *
FROM services");
$services = $stmt->fetchAll();



header("Content-Type: application/json; charset=utf-8");

echo json_encode($services);